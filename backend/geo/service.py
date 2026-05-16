from sqlalchemy import select, func, and_
from sqlalchemy.ext.asyncio import AsyncSession
from geoalchemy2.functions import ST_Distance, ST_Contains, ST_Buffer, ST_Intersects
from backend.models.incident import Incident, GeoZone, BlockedRoad, EmergencyRoute
from backend.models.resource import RescueUnit
import structlog

logger = structlog.get_logger()

class GeoIntelligenceService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_units_in_radius(self, lat: float, lng: float, radius_km: float):
        """
        Retrieves all rescue units within a specific radius of an incident.
        Uses PostGIS ST_Distance for accurate ellipsoidal calculations.
        """
        point = f"SRID=4326;POINT({lng} {lat})"
        radius_meters = radius_km * 1000
        
        query = select(RescueUnit).where(
            func.ST_DWithin(RescueUnit.current_geom, point, radius_meters)
        ).order_by(func.ST_Distance(RescueUnit.current_geom, point))
        
        result = await self.db.execute(query)
        return result.scalars().all()

    async def check_risk_zones(self, lat: float, lng: float):
        """
        Determines if a location is currently within a high-risk geo-zone (e.g., active flood zone).
        """
        point = f"SRID=4326;POINT({lng} {lat})"
        
        query = select(GeoZone).where(
            func.ST_Contains(GeoZone.boundary_geom, point)
        )
        
        result = await self.db.execute(query)
        return result.scalars().all()

    async def analyze_blocked_paths(self, route_geom_wkt: str):
        """
        Cross-references a proposed emergency route with known blocked roads.
        """
        proposed_route = f"SRID=4326;{route_geom_wkt}"
        
        query = select(BlockedRoad).where(
            func.ST_Intersects(BlockedRoad.line_geom, proposed_route)
        )
        
        result = await self.db.execute(query)
        return result.scalars().all()

    async def calculate_impact_population(self, incident_id: str, buffer_km: float):
        """
        Estimates population impact by creating a buffer around an incident point.
        """
        # Complex spatial query to sum population density in the intersection area
        # This assumes a 'population_density' geo-layer exists
        pass

    async def generate_tactical_heatmap(self, crisis_type: str):
        """
        Generates incident density heatmaps for command center visualization.
        """
        # Implementation of spatial clustering (ST_ClusterKMeans)
        pass
