from fastapi import APIRouter

router = APIRouter()

@router.post("/login")
async def login():
    return {"access_token": "mock_token"}
