import asyncio
import pytest
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from redis.asyncio import Redis
from backend.main import app
from backend.database.session import get_db, get_redis
from backend.models.base import Base
from backend.config.settings import settings
from unittest.mock import MagicMock, AsyncMock
import os

# Set dummy keys before any imports that might use them
os.environ["GEMINI_API_KEY"] = "dummy_key"

@pytest.fixture(autouse=True)
def mock_llm(mocker):
    """Mocks the LLM to prevent actual API calls and credential checks."""
    return mocker.patch("backend.agents.factory.ChatGoogleGenerativeAI", autospec=True)
@pytest.fixture(scope="session")
def event_loop():
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()

@pytest.fixture(scope="session")
async def test_engine(mocker):
    """
    Mocks the database engine to allow tests to run without a live PostgreSQL instance.
    In a real scenario, this would use a test DB.
    """
    mock_engine = MagicMock()
    mock_conn = AsyncMock()
    mock_engine.begin.return_value.__aenter__.return_value = mock_conn
    return mock_engine

@pytest.fixture
async def db_session():
    """Mocks the DB session"""
    mock_session = AsyncMock(spec=AsyncSession)
    return mock_session

@pytest.fixture(autouse=True)
def mock_redis(mocker):
    """Globally mock redis_client to prevent hangs in startup events."""
    mock = AsyncMock()
    mock.ping.return_value = True
    mock.close = AsyncMock()
    mocker.patch("backend.main.redis_client", mock)
    mocker.patch("backend.database.session.redis_client", mock)
    return mock

@pytest.fixture
async def test_client(db_session, mock_redis):
    """
    Creates a test client with mocked dependencies.
    """
    async def override_get_db():
        yield db_session

    async def override_get_redis():
        return mock_redis

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_redis] = override_get_redis
    
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        yield client
    
    app.dependency_overrides.clear()

@pytest.fixture
async def mock_ai_orchestrator(mocker):
    """Fixture to mock AI crew executions for deterministic testing"""
    mock = mocker.patch("backend.workflows.orchestrator.ResQOrchestrator.run_emergency_pipeline")
    mock.return_value = {"status": "success", "confirmed_crisis": True, "severity": "high"}
    return mock
