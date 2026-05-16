import asyncio
import json
from typing import Dict, List, Any
from fastapi import WebSocket
from redis.asyncio import Redis, from_url
from backend.config.settings import settings
import structlog

logger = structlog.get_logger()

class DistributedRealtimeManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}
        self.redis_url = settings.REDIS_URL
        self.pubsub_channel = "resq_tactical_feed"
        self._redis_client: Optional[Redis] = None

    async def get_redis(self):
        if not self._redis_client:
            self._redis_client = from_url(self.redis_url, decode_responses=True)
        return self._redis_client

    async def connect(self, websocket: WebSocket, client_id: str):
        await websocket.accept()
        if client_id not in self.active_connections:
            self.active_connections[client_id] = []
        self.active_connections[client_id].append(websocket)
        logger.info("ws.connected", client_id=client_id)

    def disconnect(self, websocket: WebSocket, client_id: str):
        if client_id in self.active_connections:
            self.active_connections[client_id].remove(websocket)
            if not self.active_connections[client_id]:
                del self.active_connections[client_id]
        logger.info("ws.disconnected", client_id=client_id)

    async def publish_event(self, event_type: str, payload: Any):
        """Publish event to Redis for cross-pod synchronization"""
        redis = await self.get_redis()
        message = json.dumps({
            "type": event_type,
            "payload": payload,
            "timestamp": str(asyncio.get_event_loop().time())
        })
        await redis.publish(self.pubsub_channel, message)

    async def subscribe_and_broadcast(self):
        """Background task to listen to Redis and broadcast to local connections"""
        redis = await self.get_redis()
        pubsub = redis.pubsub()
        await pubsub.subscribe(self.pubsub_channel)
        
        logger.info("ws.subscription_active", channel=self.pubsub_channel)
        
        try:
            async for message in pubsub.listen():
                if message["type"] == "message":
                    data = json.loads(message["data"])
                    await self._local_broadcast(data)
        except Exception as e:
            logger.error("ws.subscription_error", error=str(e))
        finally:
            await pubsub.unsubscribe(self.pubsub_channel)

    async def _local_broadcast(self, data: dict):
        """Broadcasts to all local connections on this specific pod"""
        for connections in self.active_connections.values():
            for connection in connections:
                try:
                    await connection.send_json(data)
                except Exception:
                    pass # Connection likely closed

rt_manager = DistributedRealtimeManager()
