from sqlalchemy import Column, String, Float, DateTime, Enum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from geoalchemy2 import Geometry
from datetime import datetime
from .base import Base, generate_uuid
import enum

class UnitType(enum.Enum):
    AMBULANCE = "ambulance"
    FIRE_TRUCK = "fire_truck"
    RESCUE_BOAT = "rescue_boat"
    HELICOPTER = "helicopter"
    POLICE = "police"

class UnitStatus(enum.Enum):
    AVAILABLE = "available"
    DEPLOYED = "deployed"
    EN_ROUTE = "en_route"
    MAINTENANCE = "maintenance"

class RescueUnit(Base):
    __tablename__ = "rescue_units"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=generate_uuid)
    callsign: Mapped[str] = mapped_column(String(100), unique=True)
    type: Mapped[UnitType] = mapped_column(Enum(UnitType))
    status: Mapped[UnitStatus] = mapped_column(Enum(UnitStatus), default=UnitStatus.AVAILABLE)
    
    # Real-time PostGIS location
    current_geom = mapped_column(Geometry("POINT", srid=4326))
    
    last_updated: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    tasks = relationship("DispatchTask", back_populates="unit")

class DispatchTask(Base):
    __tablename__ = "dispatch_tasks"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=generate_uuid)
    incident_id: Mapped[str] = mapped_column(ForeignKey("incidents.id"))
    unit_id: Mapped[str] = mapped_column(ForeignKey("rescue_units.id"))
    
    status: Mapped[str] = mapped_column(String(50), default="pending")
    priority: Mapped[int] = mapped_column(default=1)
    
    assigned_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    completed_at: Mapped[datetime] = mapped_column(DateTime, nullable=True)

    incident = relationship("Incident", back_populates="dispatch_tasks")
    unit = relationship("RescueUnit", back_populates="tasks")
