from fastapi import APIRouter, BackgroundTasks
from typing import Dict, Any
from backend.workflows.orchestrator import ResQOrchestrator

router = APIRouter()

@router.get("/")
async def list_incidents():
    return []

@router.post("/ingest")
async def ingest_signal(signal: Dict[str, Any], background_tasks: BackgroundTasks):
    """
    Ingests a raw signal and triggers the autonomous AI response pipeline.
    """
    orchestrator = ResQOrchestrator()
    background_tasks.add_task(orchestrator.run_emergency_pipeline, signal)
    return {"status": "processing"}
