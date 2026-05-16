export type Severity = "critical" | "high" | "medium" | "low";
export type CrisisType = "flood" | "heatwave" | "accident" | "road_blockage" | "infrastructure";

export interface Crisis {
  id: string;
  type: CrisisType;
  title: string;
  location: string;
  coordinates: { lat: number; lng: number };
  severity: Severity;
  confidence: number;
  timestamp: string;
  affectedPeople: number;
  status: "active" | "responding" | "resolved";
  description: string;
  aiReasoning: string;
  source: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: "idle" | "thinking" | "executing" | "done";
  currentTask: string;
  logs: string[];
  completedTasks: number;
  icon: string;
}

export interface RescueUnit {
  id: string;
  type: "ambulance" | "fire" | "police" | "rescue" | "helicopter";
  location: string;
  coordinates: { lat: number; lng: number };
  status: "available" | "deployed" | "en-route";
  crisisId?: string;
  eta?: string;
}

export interface SimulationResult {
  crisisId: string;
  title: string;
  before: {
    responseTime: number;
    affectedPeople: number;
    congestion: number;
    resourcesDeployed: number;
  };
  after: {
    responseTime: number;
    affectedPeople: number;
    congestion: number;
    resourcesDeployed: number;
  };
  alertsSent: number;
  rescueTickets: number;
  livesProtected: number;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  agent: string;
  action: string;
  detail: string;
  severity: Severity;
}

export const MOCK_CRISES: Crisis[] = [
  {
    id: "CRS-001",
    type: "flood",
    title: "Severe Urban Flooding",
    location: "Karachi, Gulshan-e-Iqbal",
    coordinates: { lat: 24.9056, lng: 67.0822 },
    severity: "critical",
    confidence: 97,
    timestamp: "2026-05-13T14:10:00Z",
    affectedPeople: 12500,
    status: "responding",
    description: "Heavy monsoon rains causing flash floods in residential areas. Multiple roads submerged. Water level rising at 8cm/hr.",
    aiReasoning: "Cross-referenced rainfall sensors, social media reports in Roman Urdu, satellite imagery, and historical flood patterns. NDMA advisories matched.",
    source: "Multi-sensor fusion + Social media",
  },
  {
    id: "CRS-002",
    type: "heatwave",
    title: "Extreme Heatwave Alert",
    location: "Lahore, Cantonment Area",
    coordinates: { lat: 31.5204, lng: 74.3587 },
    severity: "high",
    confidence: 92,
    timestamp: "2026-05-13T13:45:00Z",
    affectedPeople: 8200,
    status: "active",
    description: "Temperature exceeding 48°C. Heat index at dangerous levels. Multiple heat stroke cases reported at Civil Hospital.",
    aiReasoning: "Weather API data shows record temperatures. Hospital admission rates spiked 340%. Vulnerable population density mapped.",
    source: "Weather sensors + Hospital records",
  },
  {
    id: "CRS-003",
    type: "accident",
    title: "Multi-Vehicle Collision",
    location: "Islamabad, M2 Motorway KM 47",
    coordinates: { lat: 33.6844, lng: 73.0479 },
    severity: "critical",
    confidence: 99,
    timestamp: "2026-05-13T14:22:00Z",
    affectedPeople: 34,
    status: "responding",
    description: "12-vehicle pileup involving 2 passenger buses and 10 cars. Heavy fog reduced visibility to near zero.",
    aiReasoning: "Traffic camera feed analyzed. Infrared sensors confirmed collision. Emergency calls geolocated. Pattern matched fog-related accident database.",
    source: "Traffic cameras + Emergency calls",
  },
  {
    id: "CRS-004",
    type: "road_blockage",
    title: "Landslide Road Closure",
    location: "Peshawar, KKH Highway",
    coordinates: { lat: 34.0151, lng: 71.5249 },
    severity: "high",
    confidence: 95,
    timestamp: "2026-05-13T12:30:00Z",
    affectedPeople: 2100,
    status: "active",
    description: "Major landslide blocking Karakoram Highway. Estimated 500 vehicles stranded. Secondary route assessment ongoing.",
    aiReasoning: "Geological sensor alerts cross-referenced with drone imagery. Soil saturation levels exceeded critical threshold after 3 days of rain.",
    source: "Geological sensors + Drone feed",
  },
  {
    id: "CRS-005",
    type: "infrastructure",
    title: "Power Grid Failure",
    location: "Quetta, Central District",
    coordinates: { lat: 30.1798, lng: 66.975 },
    severity: "high",
    confidence: 88,
    timestamp: "2026-05-13T11:15:00Z",
    affectedPeople: 45000,
    status: "responding",
    description: "Main transmission tower collapsed. 45,000 households without power. Hospital on backup generators.",
    aiReasoning: "SCADA monitoring system detected voltage drop. Adjacent smart meters confirmed cascade failure. Repair crew dispatched.",
    source: "SCADA + Smart meter network",
  },
  {
    id: "CRS-006",
    type: "flood",
    title: "River Breach Warning",
    location: "Multan, Chenab River Bank",
    coordinates: { lat: 30.1575, lng: 71.5249 },
    severity: "medium",
    confidence: 79,
    timestamp: "2026-05-13T10:00:00Z",
    affectedPeople: 5600,
    status: "active",
    description: "Chenab river water levels at 89% of danger mark. Evacuations recommended for low-lying areas.",
    aiReasoning: "River gauge readings combined with upstream rainfall data predict 73% probability of breach within 6 hours.",
    source: "River gauges + Rainfall models",
  },
];

export const MOCK_AGENTS: Agent[] = [
  {
    id: "agent-001",
    name: "Signal Collector",
    role: "Data Ingestion & Aggregation",
    status: "executing",
    currentTask: "Aggregating 847 real-time data streams",
    logs: [
      "Connected to 23 IoT sensor networks",
      "Scraping social media: Twitter, Facebook, WhatsApp Web",
      "Monitoring 156 traffic camera feeds",
      "Processing Roman Urdu text reports from citizen portal",
      "Weather API sync: PMDC, AccuWeather, Weather.gov",
    ],
    completedTasks: 1284,
    icon: "Antenna",
  },
  {
    id: "agent-002",
    name: "Crisis Detector",
    role: "Pattern Recognition & Classification",
    status: "thinking",
    currentTask: "Analyzing flood patterns in Karachi DHA",
    logs: [
      "NLP model processing Urdu/Roman Urdu reports",
      "Image classification on 34 satellite frames",
      "Anomaly detected: rainfall 400% above 10yr average",
      "Cross-matching with historical crisis database",
      "Confidence threshold met: FLOOD CONFIRMED",
    ],
    completedTasks: 892,
    icon: "Brain",
  },
  {
    id: "agent-003",
    name: "Severity Analyzer",
    role: "Impact Assessment & Risk Scoring",
    status: "executing",
    currentTask: "Computing risk score for CRS-001",
    logs: [
      "Population density mapping: 12,500 at risk",
      "Vulnerable groups identified: 2,100 elderly, 890 children",
      "Infrastructure at risk: 3 hospitals, 7 schools",
      "Economic impact estimate: PKR 2.3 billion",
      "Severity score: CRITICAL (94.7/100)",
    ],
    completedTasks: 445,
    icon: "BarChart3",
  },
  {
    id: "agent-004",
    name: "Action Planner",
    role: "Resource Allocation & Strategy",
    status: "thinking",
    currentTask: "Generating multi-phase response plan",
    logs: [
      "Identifying available rescue units: 23 teams",
      "Calculating optimal deployment routes",
      "Requesting helicopter support from PAF",
      "Coordinating with NDMA, PDMA, Rescue 1122",
      "Action plan generated: 7 phases, 4hr timeline",
    ],
    completedTasks: 312,
    icon: "GitBranch",
  },
  {
    id: "agent-005",
    name: "Dispatch Agent",
    role: "Resource Deployment & Coordination",
    status: "executing",
    currentTask: "Dispatching 8 rescue teams to Gulshan",
    logs: [
      "Rescue 1122: 6 units dispatched — ETA 8 min",
      "EDHI Foundation: 4 ambulances en route",
      "Pakistan Army: 2 boats requested",
      "Traffic rerouting: 12 signals reprogrammed",
      "Evacuation routes: 3 corridors activated",
    ],
    completedTasks: 567,
    icon: "Send",
  },
  {
    id: "agent-006",
    name: "Notification Agent",
    role: "Public Alert & Communication",
    status: "done",
    currentTask: "Mass alerts sent to 12,500 citizens",
    logs: [
      "SMS alerts: 12,500 sent (Urduu + English)",
      "Emergency broadcast: 5 FM stations activated",
      "WhatsApp community groups: 340 notified",
      "Government portal updated: real-time",
      "International orgs notified: UN-OCHA, IFRC",
    ],
    completedTasks: 3421,
    icon: "Bell",
  },
];

export const MOCK_RESCUE_UNITS: RescueUnit[] = [
  { id: "RU-001", type: "ambulance", location: "Karachi Central", coordinates: { lat: 24.8607, lng: 67.0011 }, status: "deployed", crisisId: "CRS-001", eta: "8 min" },
  { id: "RU-002", type: "rescue", location: "Gulshan-e-Iqbal", coordinates: { lat: 24.9237, lng: 67.0989 }, status: "en-route", crisisId: "CRS-001", eta: "3 min" },
  { id: "RU-003", type: "helicopter", location: "PAF Base Karachi", coordinates: { lat: 24.8922, lng: 67.1598 }, status: "en-route", crisisId: "CRS-001", eta: "12 min" },
  { id: "RU-004", type: "fire", location: "Lahore Fire Station 3", coordinates: { lat: 31.5497, lng: 74.3436 }, status: "deployed", crisisId: "CRS-002", eta: "5 min" },
  { id: "RU-005", type: "police", location: "Islamabad Zone 4", coordinates: { lat: 33.7291, lng: 73.0931 }, status: "en-route", crisisId: "CRS-003", eta: "6 min" },
  { id: "RU-006", type: "ambulance", location: "Peshawar PHSA", coordinates: { lat: 34.0083, lng: 71.4687 }, status: "available" },
];

export const MOCK_SIMULATION: SimulationResult = {
  crisisId: "CRS-001",
  title: "Urban Flood Response — Karachi Gulshan",
  before: {
    responseTime: 47,
    affectedPeople: 12500,
    congestion: 89,
    resourcesDeployed: 3,
  },
  after: {
    responseTime: 8,
    affectedPeople: 3200,
    congestion: 23,
    resourcesDeployed: 23,
  },
  alertsSent: 12500,
  rescueTickets: 847,
  livesProtected: 9300,
};

export const MOCK_ACTIVITY_LOGS: ActivityLog[] = [
  { id: "log-001", timestamp: "14:22:31", agent: "Signal Collector", action: "Anomaly Detected", detail: "Flash flood signature in Karachi east district sensors", severity: "critical" },
  { id: "log-002", timestamp: "14:22:33", agent: "Crisis Detector", action: "Classification Started", detail: "Running flood detection model v4.2 on 847 data points", severity: "high" },
  { id: "log-003", timestamp: "14:22:38", agent: "Crisis Detector", action: "Crisis Confirmed", detail: "FLOOD event confirmed with 97% confidence — CRS-001 created", severity: "critical" },
  { id: "log-004", timestamp: "14:22:40", agent: "Severity Analyzer", action: "Impact Assessment", detail: "12,500 citizens at risk, 3 hospitals in flood zone", severity: "critical" },
  { id: "log-005", timestamp: "14:22:45", agent: "Action Planner", action: "Plan Generated", detail: "7-phase response plan created, 23 units identified", severity: "high" },
  { id: "log-006", timestamp: "14:22:47", agent: "Dispatch Agent", action: "Units Dispatched", detail: "Rescue 1122: 6 units, EDHI: 4 ambulances, PAF: 2 boats", severity: "high" },
  { id: "log-007", timestamp: "14:22:49", agent: "Notification Agent", action: "Alerts Sent", detail: "SMS + WhatsApp + FM broadcast to 12,500 citizens", severity: "medium" },
  { id: "log-008", timestamp: "14:22:52", agent: "Signal Collector", action: "Update Received", detail: "Water level rising 12cm/hr — updated from 8cm/hr", severity: "critical" },
  { id: "log-009", timestamp: "14:22:55", agent: "Action Planner", action: "Plan Updated", detail: "Escalating response: requesting additional PAF helicopters", severity: "critical" },
  { id: "log-010", timestamp: "14:23:01", agent: "Dispatch Agent", action: "Route Rerouted", detail: "12 traffic signals reprogrammed for emergency corridor", severity: "medium" },
  { id: "log-011", timestamp: "14:23:08", agent: "Notification Agent", action: "Evacuation Alert", detail: "Evacuation order issued for Zone A, B, C — 3,400 households", severity: "critical" },
  { id: "log-012", timestamp: "14:23:15", agent: "Crisis Detector", action: "Secondary Alert", detail: "Heatwave intensification detected in Lahore — CRS-002 updated", severity: "high" },
];

export const TICKER_MESSAGES = [
  "🔴 CRITICAL: Flash flood in Karachi Gulshan — 12,500 at risk — AI Response Active",
  "🟠 HIGH: Heatwave 48°C in Lahore — Emergency cooling centers deployed",
  "🔴 CRITICAL: M2 Motorway 12-vehicle pileup — All units responding",
  "🟡 MEDIUM: Chenab river at 89% danger level — Evacuation advisory issued",
  "🟠 HIGH: KKH Landslide — 500 vehicles stranded — Rescue teams en route",
  "✅ RESOLVED: Rawalpindi power outage restored — 4.2 hours response time",
  "🤖 AI AGENT: Action Planner generated 7-phase flood response in 2.3 seconds",
  "📡 SIGNAL: 847 data streams analyzed — 6 active crisis zones detected",
];

export const SOCIAL_MEDIA_REPORTS = [
  {
    id: "sm-001",
    platform: "Twitter/X",
    handle: "@KarachiCitizen1",
    text: "Yaar Gulshan mein paani bohot zyada aa gaya hai! Gaadi doob gayi street pe. Koi rescue wala nahi aya abhi tak",
    language: "Roman Urdu",
    timestamp: "14:18",
    location: "Karachi, Gulshan",
    extractedCrisis: "flood",
    confidence: 94,
  },
  {
    id: "sm-002",
    platform: "Facebook",
    handle: "Lahore Updates Group",
    text: "گرمی کا موسم انتہائی خطرناک ہو گیا ہے۔ ہسپتال میں ہیٹ اسٹروک کے مریض بڑھ رہے ہیں",
    language: "Urdu",
    timestamp: "13:42",
    location: "Lahore, Cantonment",
    extractedCrisis: "heatwave",
    confidence: 88,
  },
  {
    id: "sm-003",
    platform: "WhatsApp",
    handle: "M2 Motorway Group",
    text: "Huge accident on M2 near Kalar Kahar! Multiple trucks and buses crashed. Please avoid this route. Fog is ZERO visibility",
    language: "English",
    timestamp: "14:20",
    location: "M2 Motorway, KM 47",
    extractedCrisis: "accident",
    confidence: 99,
  },
  {
    id: "sm-004",
    platform: "Rescue Portal",
    handle: "Citizen #3847",
    text: "KKH pe landslide hua hai. Hum 6 ghante se phansey hain. Khana pani khatam ho raha hai.",
    language: "Roman Urdu",
    timestamp: "12:35",
    location: "KKH Highway, Peshawar",
    extractedCrisis: "road_blockage",
    confidence: 96,
  },
];

export const ANALYTICS_DATA = {
  monthlyIncidents: [
    { month: "Jan", floods: 2, heatwaves: 0, accidents: 12, other: 5 },
    { month: "Feb", floods: 1, heatwaves: 0, accidents: 9, other: 4 },
    { month: "Mar", floods: 3, heatwaves: 2, accidents: 14, other: 7 },
    { month: "Apr", floods: 5, heatwaves: 8, accidents: 11, other: 6 },
    { month: "May", floods: 12, heatwaves: 15, accidents: 18, other: 9 },
    { month: "Jun", floods: 18, heatwaves: 22, accidents: 16, other: 11 },
  ],
  responseTimeData: [
    { name: "Before AI", value: 47 },
    { name: "With ResQ AI", value: 8 },
  ],
  crisisTypeDistribution: [
    { name: "Floods", value: 35, color: "#0080ff" },
    { name: "Heatwaves", value: 25, color: "#ff6600" },
    { name: "Accidents", value: 22, color: "#ff3366" },
    { name: "Road Blockage", value: 12, color: "#ffcc00" },
    { name: "Infrastructure", value: 6, color: "#9b59b6" },
  ],
  aiPerformance: [
    { metric: "Detection Accuracy", value: 96.7 },
    { metric: "False Positive Rate", value: 2.1 },
    { metric: "Avg Confidence", value: 91.4 },
    { metric: "Response Speed", value: 2.3 },
  ],
};
