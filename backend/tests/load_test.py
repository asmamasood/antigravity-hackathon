from locust import HttpUser, task, between
import uuid

class ResQLoadUser(HttpUser):
    wait_time = between(1, 3)

    @task(3)
    def ingest_emergency_signal(self):
        """Simulates high-volume citizen signal ingestion"""
        self.client.post("/api/v1/signals/ingest", json={
            "id": str(uuid.uuid4()),
            "type": "fire",
            "source": "citizen_app",
            "raw_text": "Fire detected in industrial area Lahore"
        })

    @task(1)
    def check_system_health(self):
        """Simulates monitoring pings"""
        self.client.get("/health")

    @task(2)
    def view_incident_map(self):
        """Simulates command center dashboard loading active incidents"""
        self.client.get("/api/v1/incidents/active")
