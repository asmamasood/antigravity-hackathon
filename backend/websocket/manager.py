from fastapi import WebSocket
from typing import Dict, List
import json
import structlog

logger = structlog.get_logger()

class ConnectionManager:
    def __init__(self):
        # Maps user_id or session_id to their active websocket connections
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, client_id: str):
        await websocket.accept()
        if client_id not in self.active_connections:
            self.active_connections[client_id] = []
        self.active_connections[client_id].append(websocket)
        logger.info("websocket.connect", client_id=client_id)

    def disconnect(self, websocket: WebSocket, client_id: str):
        if client_id in self.active_connections:
            self.active_connections[client_id].remove(websocket)
            if not self.active_connections[client_id]:
                del self.active_connections[client_id]
        logger.info("websocket.disconnect", client_id=client_id)

    async def send_personal_message(self, message: dict, client_id: str):
        if client_id in self.active_connections:
            for connection in self.active_connections[client_id]:
                await connection.send_json(message)

    async def broadcast(self, message: dict):
        """Broadcasts intelligence to all connected command center instances"""
        for connections in self.active_connections.values():
            for connection in connections:
                try:
                    await connection.send_json(message)
                except Exception as e:
                    logger.error("websocket.broadcast_failed", error=str(e))

ws_manager = ConnectionManager()
