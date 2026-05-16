from fastapi import APIRouter
from backend.api.v1.endpoints import incidents, auth, citizens

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(incidents.router, prefix="/incidents", tags=["Incidents"])
api_router.include_router(citizens.router, prefix="/citizens", tags=["Citizens"])
