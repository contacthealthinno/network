export type Category = 
  | "extending-care" 
  | "health-signals" 
  | "data-modeling" 
  | "operations-intelligence" 
  | "immersive-training" 
  | "next-gen-decisions";

export type Stage = 
  | "pre-seed" 
  | "seed" 
  | "series-a" 
  | "series-b-plus" 
  | "revenue" 
  | "other";

export type NMConnection = 
  | "nm-based" 
  | "national-nm-customers" 
  | "national-seeking" 
  | "university-spinout";

export type DeploymentReadiness = 
  | "pilot-ready-now" 
  | "q2-2026" 
  | "q3-2026" 
  | "q4-2026";

export type Tier = "general" | "preferred";

export type StartupStatus = "active" | "pending" | "inactive";

export interface Compliance {
  hipaa: boolean;
  soc2: boolean;
  baa: boolean;
  ehrIntegrations: string[];
}

export interface PilotFormat {
  duration: string;
  population: string;
  metrics: string[];
}

export interface Outcome {
  setting: string;
  duration: string;
  population: string;
  result: string;
}

export interface TeamMember {
  name: string;
  title: string;
  email: string;
  linkedin?: string;
}

export interface Startup {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  logo?: string;
  website: string;
  category: Category;
  stage: Stage;
  nmConnection: NMConnection;
  deploymentReadiness: DeploymentReadiness;
  ruralFeasible: boolean;
  description: string;
  capabilities: string[];
  careSettings: string[];
  compliance: Compliance;
  pilotFormat: PilotFormat;
  tier: Tier;
  pilotsCompleted: number;
  advisoryNote?: string;
  outcomes?: Outcome[];
  team: TeamMember[];
  status: StartupStatus;
  appliedAt: string;
  approvedAt?: string;
  promotedAt?: string;
  hq?: string;
  foundedYear?: number;
  fundingStage?: string;
  differentiators?: string[];
  nmPriorities?: string[];
  targetPopulations?: string[];
}

export interface Priority {
  title: string;
  statement: string;
  outcome: string;
  constraints: string;
  pilotReady: boolean;
}

export interface HealthcareOrg {
  id: string;
  name: string;
  type: string;
  contactName: string;
  contactEmail: string;
  priorities: Priority[];
  watchlist: string[];
  alignmentReports: string[];
  pilots: string[];
  joinedAt: string;
}

export interface AlignmentReport {
  id: string;
  orgId: string;
  startupIds: string[];
  prioritiesAddressed: string[];
  status: "new" | "reviewed" | "pilot-initiated";
  createdAt: string;
  healthInnoNotes?: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  "extending-care": "Extending Care Across Distance",
  "health-signals": "Identifying Health Signals Earlier",
  "data-modeling": "Population & Data Modeling",
  "operations-intelligence": "Enhancing Operations Intelligence",
  "immersive-training": "Immersive Training & Support",
  "next-gen-decisions": "Next-Gen Decisions for Health Systems",
};

export const STAGE_LABELS: Record<Stage, string> = {
  "pre-seed": "Pre-Seed",
  "seed": "Seed",
  "series-a": "Series A",
  "series-b-plus": "Series B+",
  "revenue": "Revenue Stage",
  "other": "Other",
};

export const NM_CONNECTION_LABELS: Record<NMConnection, string> = {
  "nm-based": "New Mexico Based",
  "national-nm-customers": "National with NM Customers",
  "national-seeking": "National - Seeking NM Entry",
  "university-spinout": "University Spin-out",
};

export const DEPLOYMENT_READINESS_LABELS: Record<DeploymentReadiness, string> = {
  "pilot-ready-now": "Pilot-Ready Now",
  "q2-2026": "Q2 2026",
  "q3-2026": "Q3 2026",
  "q4-2026": "Q4 2026",
};
