from sqlalchemy import Column, String, Float, DateTime, Enum, JSON, ForeignKey, Table
from sqlalchemy.orm import Mapped, mapped_column, relationship
from geoalchemy2 import Geometry
from datetime import datetime
from .base import Base, generate_uuid
import enum

class IncidentStatus(enum.Enum):
    DETECTED = "detected"
    ANALYZING = "analyzing"
    PLANNING = "planning"
    EXECUTING = "executing"
    RESOLVED = "resolved"

class IncidentType(enum.Enum):
    FLOOD = "flood"
    FIRE = "fire"
    HEATWAVE = "heatwave"
    ACCIDENT = "accident"
    INFRASTRUCTURE = "infrastructure"

class Incident(Base):
    __tablename__ = "incidents"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=generate_uuid)
    type: Mapped[IncidentType] = mapped_column(Enum(IncidentType))
    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(String)
    status: Mapped[IncidentStatus] = mapped_column(Enum(IncidentStatus), default=IncidentStatus.DETECTED)
    severity_score: Mapped[float] = mapped_column(Float, default=0.0)
    
    # PostGIS Location
    location_geom = mapped_column(Geometry("POINT", srid=4326))
    location_name: Mapped[str] = mapped_column(String(512))
    
    # AI Data
    ai_reasoning: Mapped[dict] = mapped_column(JSON, nullable=True)
    
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    dispatch_tasks = relationship("DispatchTask", back_populates="incident")
    emergency_routes = relationship("EmergencyRoute", back_populates="incident")

class GeoZone(Base):
    __tablename__ = "geo_zones"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=generate_uuid)
    name: Mapped[str] = mapped_column(String(255))
    type: Mapped[str] = mapped_column(String(100)) # e.g. "Flood Risk Area"
    
    # PostGIS Polygon
    boundary_geom = mapped_column(Geometry("MULTIPOLYGON", srid=4326))
    risk_level: Mapped[float] = mapped_column(Float)

class BlockedRoad(Base):
    __tablename__ = "blocked_roads"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=generate_uuid)
    road_name: Mapped[str] = mapped_column(String(255))
    
    # PostGIS LineString
    line_geom = mapped_column(Geometry("LINESTRING", srid=4326))
    blockage_type: Mapped[str] = mapped_column(String(100))
    incident_id: Mapped[str] = mapped_column(ForeignKey("incidents.id"), nullable=True)

class EmergencyRoute(Base):
    __tablename__ = "emergency_routes"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=generate_uuid)
    incident_id: Mapped[str] = mapped_column(ForeignKey("incidents.id"))
    
    # PostGIS LineString
    route_geom = mapped_column(Geometry("LINESTRING", srid=4326))
    estimated_travel_time: Mapped[float] = mapped_column(Float) # in minutes
    
    incident = relationship("Incident", back_populates="emergency_routes")
