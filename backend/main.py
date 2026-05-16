from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import time
import structlog
from backend.config.settings import settings
from backend.api.v1.router import api_router
from backend.utils.logging import setup_logging
from backend.database.session import redis_client
from backend.realtime.event_manager import rt_manager

# Setup Structured Logging
setup_logging()
logger = structlog.get_logger()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Autonomous National Disaster Command System Infrastructure",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Enterprise CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Custom Middleware for Request Timing and Logging
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    
    logger.info(
        "http.request",
        method=request.method,
        path=request.url.path,
        status_code=response.status_code,
        duration=f"{process_time:.4f}s"
    )
    return response

# Global Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error("unhandled_exception", path=request.url.path, error=str(exc))
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal system error occurred in the ResQ core.", "type": "INTERNAL_SERVER_ERROR"}
    )

# Health Check Endpoint
@app.get("/health", tags=["System"])
async def health_check():
    return {
        "status": "operational",
        "timestamp": time.time(),
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT
    }

# Include V1 Routers
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.websocket("/api/v1/ws/tactical")
async def tactical_websocket_endpoint(websocket: WebSocket, client_id: str):
    await rt_manager.connect(websocket, client_id)
    try:
        while True:
            data = await websocket.receive_json()
            # Simple Echo for testing
            await websocket.send_json({"type": "ACK", "echo": data})
    except WebSocketDisconnect:
        rt_manager.disconnect(websocket, client_id)

@app.on_event("startup")
async def startup_event():
    logger.info("system.startup", msg="Initializing ResQ AI Backend Grid...")
    try:
        # Warm up Redis connection
        await redis_client.ping()
        logger.info("system.redis_ready", msg="Redis connection established.")
        
        # Start the distributed realtime task
        asyncio.create_task(rt_manager.subscribe_and_broadcast())
        logger.info("system.rt_manager_active", msg="Tactical broadcast channel subscribed.")
        
    except Exception as e:
        logger.warning("system.redis_offline", error=str(e), msg="Redis is unreachable. Some realtime features may be limited.")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("system.shutdown", msg="Deactivating Command Infrastructure...")
    try:
        await redis_client.close()
    except:
        pass

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
