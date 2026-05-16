# CIRO — Crisis Intelligence & Response Orchestrator

CIRO is a production-grade AI-powered emergency command center backend designed for Pakistan's smart cities, specifically Karachi. It orchestrates a multi-agent system to detect, analyze, and respond to urban crises like flooding and accidents.

## 🧠 AI Orchestration
The system uses **Antigravity AI Orchestration** patterns with **Gemini AI** for:
- **Signal Collection**: Aggregating data from social, weather, and traffic sources.
- **Crisis Detection**: NLP-driven classification of incidents.
- **Severity Analysis**: Estimating danger and public safety impact.
- **Action Planning**: Generating intelligent response strategies.
- **Execution Simulation**: Simulating real-time coordination logs.
- **Outcome Engine**: Predicting impact reduction and efficiency gains.

## 🛠 Tech Stack
- **Node.js & Express**: Core backend server.
- **Gemini 1.5 Flash**: AI reasoning and NLP.
- **Firebase Firestore**: Secure persistence of workflows and logs.
- **Winston**: Enterprise-grade logging.
- **Helmet & Rate Limiter**: Production-level security.

## 📂 Structure
- `src/agents/`: Autonomous AI agents.
- `src/workflows/`: Centralized orchestration engine.
- `src/services/`: External integrations (Gemini, Firebase, etc.).
- `src/database/`: Mock signal sources.

## 🚀 Getting Started

### 1. Installation
```bash
cd backend
npm install
```

### 2. Configuration
Copy `.env.example` to `.env` and add your API keys.

### 3. Run Development
```bash
npm run dev
```

### 4. Docker Deployment
```bash
docker-compose up --build
```

## 🚥 API Endpoints
- `GET /api/crisis`: Start a new AI orchestration cycle.
- `GET /api/signals`: View current raw signals.
- `GET /api/logs`: View recent system audit logs.
- `GET /api/health`: System health check.

---
*Built for the Antigravity Hackathon 2026*
