from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from redis.asyncio import Redis, from_url
from typing import AsyncGenerator
from backend.config.settings import settings
import structlog

logger = structlog.get_logger()

# Async PostgreSQL Engine
engine = create_async_engine(
    settings.ASYNC_DATABASE_URL,
    pool_pre_ping=True,
    echo=settings.DEBUG,
)

# Async Session Factory
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
    expire_on_commit=False,
    class_=AsyncSession,
)

# Redis Client
redis_client: Redis = from_url(settings.REDIS_URL, decode_responses=True)

# Dependency Injection for DB Session
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()

# Dependency Injection for Redis
async def get_redis() -> Redis:
    return redis_client
