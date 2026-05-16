import asyncio
from typing import List, Dict, Any
from crewai import Crew, Task, Process
from backend.agents.factory import ResQAgentFactory
import structlog

logger = structlog.get_logger()

class ResQOrchestrator:
    def __init__(self):
        self.factory = ResQAgentFactory()
        self.agents = self.factory # Instance of factory to create agents
        
    async def run_emergency_pipeline(self, raw_signal: Dict[str, Any]):
        """
        Main autonomous pipeline for disaster response.
        Orchestrates 10 specialized agents across detection, planning, and dispatch.
        """
        logger.info("ai.orchestration_started", signal_id=raw_signal.get("id"))
        
        # 1. Create Agents
        collector = self.factory.create_signal_collector()
        detector = self.factory.create_crisis_detector()
        analyzer = self.factory.create_severity_analyzer()
        geo = self.factory.create_geo_intelligence()
        planner = self.factory.create_resource_planner()
        notifier = self.factory.create_notification_agent()
        simulation = self.factory.create_simulation_agent()

        # 2. Define Tasks (Sequential & Parallel)
        t1 = Task(
            description=f"Extract location and intent from signal: {raw_signal}",
            agent=collector
        )
        
        t2 = Task(
            description="Confirm if this is a valid crisis and classify it.",
            agent=detector
        )
        
        t3 = Task(
            description="Calculate impact and severity for the confirmed crisis.",
            agent=analyzer
        )
        
        t4 = Task(
            description="Analyze geospatial risks and find safe rescue routes.",
            agent=geo
        )
        
        t5 = Task(
            description="Run simulation of the current situation and proposed response.",
            agent=simulation
        )

        t6 = Task(
            description="Allocate resources based on severity and simulation results.",
            agent=planner
        )

        t7 = Task(
            description="Prepare citizen notification strategy based on risk zones.",
            agent=notifier
        )

        # 3. Create & Execute the Crew
        resq_crew = Crew(
            agents=[collector, detector, analyzer, geo, simulation, planner, notifier],
            tasks=[t1, t2, t3, t4, t5, t6, t7],
            process=Process.sequential, # Hierarchical can be used for more complexity
            verbose=True
        )

        # Execute in a thread pool to avoid blocking the async event loop
        result = await asyncio.to_thread(resq_crew.kickoff)
        
        logger.info("ai.orchestration_complete", signal_id=raw_signal.get("id"))
        return result
