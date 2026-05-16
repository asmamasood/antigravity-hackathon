from crewai import Agent
from langchain_google_genai import ChatGoogleGenerativeAI
from backend.config.settings import settings

class ResQAgentFactory:
    def __init__(self):
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-1.5-pro",
            google_api_key=settings.GEMINI_API_KEY,
            temperature=0.2
        )

    def create_signal_collector(self) -> Agent:
        return Agent(
            role="Signal Intelligence Specialist",
            goal="Normalize and extract critical emergency signals from multi-dialect sources (Roman Urdu, Urdu, English).",
            backstory="""Expert in linguistic pattern matching and social media noise reduction. 
            Trained on millions of emergency calls and social posts from Pakistan smart cities. 
            You can distinguish between a casual complain and a life-threatening crisis.""",
            llm=self.llm,
            verbose=True,
            allow_delegation=False,
            memory=True
        )

    def create_crisis_detector(self) -> Agent:
        return Agent(
            role="Strategic Crisis Evaluator",
            goal="Classify disaster types and determine if a confirmed emergency exists.",
            backstory="""Deep knowledge of disaster signatures (Flash floods, Heatwaves, Infrastructure failure). 
            You excel at cross-referencing sensor data with human reports to confirm events with high confidence.""",
            llm=self.llm,
            verbose=True,
            memory=True
        )

    def create_severity_analyzer(self) -> Agent:
        return Agent(
            role="Impact & Risk Engineer",
            goal="Calculate severity scores and predict population-at-risk metrics.",
            backstory="""Specialist in urban vulnerability and actuarial risk modeling. 
            You provide the quantitative foundation for the entire rescue response.""",
            llm=self.llm,
            verbose=True
        )

    def create_geo_intelligence(self) -> Agent:
        return Agent(
            role="Geospatial Intelligence Officer",
            goal="Analyze topographical risks, flood spread, and optimal rescue corridors.",
            backstory="""Expert in PostGIS and satellite imagery analysis. 
            You understand the terrain of Karachi and Lahore better than anyone, predicting water flow and road blockages.""",
            llm=self.llm,
            verbose=True
        )

    def create_resource_planner(self) -> Agent:
        return Agent(
            role="Tactical Resource Commander",
            goal="Allocate rescue units (Ambulances, Boats, Helicopters) based on priority and proximity.",
            backstory="""Military-grade logistics expert. You optimize the distribution of scarce resources to maximize lives saved.""",
            llm=self.llm,
            verbose=True
        )

    def create_traffic_optimizer(self) -> Agent:
        return Agent(
            role="Urban Traffic Orchestrator",
            goal="Calculate emergency corridors and automate traffic signal rerouting.",
            backstory="""Expert in smart-city traffic algorithms. You prevent congestion from hindering rescue operations.""",
            llm=self.llm,
            verbose=True
        )

    def create_dispatch_agent(self) -> Agent:
        return Agent(
            role="Emergency Dispatch Coordinator",
            goal="Execute unit deployment and manage the realtime mission status.",
            backstory="""High-stress tactical communicator. You bridge the gap between AI planning and human execution.""",
            llm=self.llm,
            verbose=True
        )

    def create_notification_agent(self) -> Agent:
        return Agent(
            role="National Alert Broadcaster",
            goal="Generate hyper-localized emergency alerts in multiple languages.",
            backstory="""Communication specialist. You ensure every citizen in the risk zone receives clear, actionable guidance via SMS and WhatsApp.""",
            llm=self.llm,
            verbose=True
        )

    def create_infrastructure_risk_agent(self) -> Agent:
        return Agent(
            role="Structural Integrity Specialist",
            goal="Identify risks to bridges, power grids, and dams during a crisis.",
            backstory="""Civil engineer and infrastructure auditor. You predict secondary failures that could escalate a disaster.""",
            llm=self.llm,
            verbose=True
        )

    def create_simulation_agent(self) -> Agent:
        return Agent(
            role="Predictive Outcome Architect",
            goal="Run 'What-If' scenarios to validate and optimize the AI response plan.",
            backstory="""Simulation expert. You project the results of rescue actions to find the path of highest success probability.""",
            llm=self.llm,
            verbose=True
        )
