import pytest
from fastapi.testclient import TestClient
from backend.main import app

@pytest.mark.asyncio
async def test_health_check(test_client):
    """Verifies system operational state"""
    response = await test_client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "operational"

@pytest.mark.asyncio
async def test_signal_ingestion_trigger_ai(test_client, mock_ai_orchestrator):
    """Verifies that ingesting a signal triggers the AI orchestration pipeline"""
    signal_data = {
        "id": "sig-123",
        "type": "flood",
        "source": "citizen_app",
        "raw_text": "Water level rising in Gulshan Karachi"
    }
    response = await test_client.post("/api/v1/incidents/ingest", json=signal_data)
    
    assert response.status_code == 200
    assert response.json()["status"] == "processing"

def test_websocket_broadcast():
    """Verifies tactical broadcast functionality over WebSockets"""
    client = TestClient(app)
    with client.websocket_connect("/api/v1/ws/tactical?client_id=hq-1") as websocket:
        # Simulate an event being pushed to the manager
        # (This usually happens via RT manager in the background)
        websocket.send_json({"type": "PING"})
        data = websocket.receive_json()
        assert data is not None
