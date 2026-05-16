from sqlalchemy import Column, String, Float, DateTime, Enum, ForeignKey, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from geoalchemy2 import Geometry
from datetime import datetime
from .base import Base, generate_uuid

class Citizen(Base):
    __tablename__ = "citizens"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=generate_uuid)
    phone_number: Mapped[str] = mapped_column(String(20), unique=True)
    full_name: Mapped[str] = mapped_column(String(255))
    
    # Primary residential location for targeted alerts
    home_geom = mapped_column(Geometry("POINT", srid=4326))
    
    is_vulnerable: Mapped[bool] = mapped_column(Boolean, default=False)
    medical_vitals: Mapped[dict] = mapped_column(JSON, nullable=True)
    
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    notifications = relationship("Notification", back_populates="citizen")

class Alert(Base):
    __tablename__ = "alerts"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=generate_uuid)
    incident_id: Mapped[str] = mapped_column(ForeignKey("incidents.id"))
    
    title: Mapped[str] = mapped_column(String(255))
    message: Mapped[str] = mapped_column(String)
    severity: Mapped[str] = mapped_column(String(50))
    
    # Spatial broadcast zone
    broadcast_geom = mapped_column(Geometry("MULTIPOLYGON", srid=4326), nullable=True)
    
    timestamp: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class Notification(Base):
    __tablename__ = "notifications"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=generate_uuid)
    citizen_id: Mapped[str] = mapped_column(ForeignKey("citizens.id"))
    alert_id: Mapped[str] = mapped_column(ForeignKey("alerts.id"))
    
    channel: Mapped[str] = mapped_column(String(50)) # e.g. "SMS", "WhatsApp", "App"
    sent_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    is_delivered: Mapped[bool] = mapped_column(Boolean, default=False)

    citizen = relationship("Citizen", back_populates="notifications")
