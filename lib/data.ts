import { Startup, HealthcareOrg } from "./types";

export const startups: Startup[] = [
  // PREFERRED STARTUPS
  {
    id: "1",
    slug: "amplifier-health",
    name: "Amplifier Health",
    tagline: "The Standard for Clinical Voice Intelligence",
    website: "https://www.amplifierhealth.com",
    category: "health-signals",
    stage: "series-a",
    nmConnection: "national-seeking",
    deploymentReadiness: "pilot-ready-now",
    ruralFeasible: true,
    description: "Amplifier Health decodes human health with sound. Their Sona-2 platform extracts biological data from voice acoustics, analyzing raw waveform physics to detect validated biomarkers across respiratory, cardiac, and neurological systems. The technology detects sub-audible micro-tremors of early pathology for pre-symptomatic intervention.",
    capabilities: [
      "Language-agnostic voice biomarker analysis",
      "Multi-system health intelligence (respiratory, cardiac, neurological)",
      "On-device or cloud processing",
      "Real-time clinical-grade audio intelligence API",
      "Population-scale deployment ready"
    ],
    careSettings: ["Primary Care", "Home Health", "Population Health", "Clinical Trials"],
    compliance: {
      hipaa: true,
      soc2: true,
      baa: true,
      ehrIntegrations: ["Epic", "Cerner", "Custom API"]
    },
    pilotFormat: {
      duration: "3-6 months",
      population: "100-500 patients",
      metrics: ["Early detection rate", "Patient engagement", "Cost per screening"]
    },
    tier: "preferred",
    pilotsCompleted: 2,
    advisoryNote: "Strong fit for remote monitoring and early detection programs. Zero hardware dependencies - works with any audio source.",
    outcomes: [
      {
        setting: "Population Health Screening",
        duration: "6 months",
        population: "Major Health System",
        result: "34% increase in early detection rate, 89% patient engagement, 78% reduction in cost per screening"
      }
    ],
    team: [
      { name: "Business Development", title: "Contact Team", email: "info@amplifierhealth.com", linkedin: "https://www.linkedin.com/company/amplifier-health" }
    ],
    status: "active",
    appliedAt: "2024-01-15",
    approvedAt: "2024-02-01",
    promotedAt: "2024-06-01",
    hq: "San Francisco, CA",
    foundedYear: 2020,
    fundingStage: "Series A",
    differentiators: [
      "Largest voice dataset in the world with 2.8M+ unique sessions",
      "Language-agnostic - analyzes physics, not words",
      "Sub-12ms latency for real-time analysis",
      "Privacy-first with zero-retention pipelines"
    ],
    nmPriorities: [
      "Early detection for chronic disease",
      "Remote patient monitoring",
      "Reducing healthcare access barriers in rural areas"
    ],
    targetPopulations: ["Chronic disease patients", "Remote monitoring", "Population health"]
  },
  {
    id: "2",
    slug: "evidently",
    name: "Evidently",
    tagline: "AI-Assisted Clinical Data Intelligence for Every Healthcare Organization",
    website: "https://www.evidently.com",
    category: "next-gen-decisions",
    stage: "series-a",
    nmConnection: "national-seeking",
    deploymentReadiness: "pilot-ready-now",
    ruralFeasible: true,
    description: "EvidentlyOne uses advanced AI to streamline chart reviews and EHR documentation, significantly lowering provider workload. It automatically processes complete medical charts, including unstructured data from faxes, notes, reports, PDFs, and Health Information Exchanges. By aggregating and summarizing this information, EvidentlyOne reduces time spent in the EHR, improves documentation quality, enhances risk capture accuracy (HCC/RAF), and automates MIPS, HEDIS, and other quality metrics.",
    capabilities: [
      "AI-assisted chart summarization with traceable provenance",
      "Ask Evidently - conversational AI that pre-reads entire patient chart",
      "HCC gap identification with supporting ICD-10 evidence",
      "Intelligent note drafting and denial appeal letters",
      "Knowledge Graph with SNOMED, ICD10, RxNorm, LOINC crosswalks"
    ],
    careSettings: ["Hospital", "Primary Care", "Emergency Medicine", "Perioperative Care"],
    compliance: {
      hipaa: true,
      soc2: true,
      baa: true,
      ehrIntegrations: ["Epic", "Cerner", "Any SMART on FHIR EHR"]
    },
    pilotFormat: {
      duration: "2-4 months",
      population: "10-50 clinicians",
      metrics: ["Net EHR Experience Score", "Documentation time", "ROI"]
    },
    tier: "preferred",
    pilotsCompleted: 5,
    advisoryNote: "Named 2nd most physician-requested tool in 2025. Deploys in weeks, not years. Proven 6x ROI at Allina Health.",
    outcomes: [
      {
        setting: "University of Iowa Health Care",
        duration: "12 months",
        population: "Health System",
        result: "+31.7 point increase in Net EHR Experience Score per KLAS Research"
      },
      {
        setting: "Allina Health",
        duration: "Ongoing",
        population: "Health System",
        result: "6x return on investment through value-based care risk adjustment and revenue capture"
      }
    ],
    team: [
      { name: "Chris Neville", title: "Contact", email: "chris.neville@evidently.com", linkedin: "https://www.linkedin.com/company/evidently" }
    ],
    status: "active",
    appliedAt: "2024-02-01",
    approvedAt: "2024-02-15",
    promotedAt: "2024-05-01",
    hq: "California",
    foundedYear: 2019,
    fundingStage: "$10M+",
    differentiators: [
      "KLAS Research validated outcomes",
      "Integrates with any SMART on FHIR EHR",
      "Ask Evidently - conversational AI that has read the entire patient chart",
      "Fastest implementation - deploys in weeks"
    ],
    nmPriorities: [
      "Reducing clinician burnout",
      "Improving documentation quality",
      "Revenue integrity and value-based care"
    ],
    targetPopulations: ["Hospitalists", "Primary care providers", "CDI teams", "Emergency physicians"]
  },
  {
    id: "3",
    slug: "scriptchain-health",
    name: "ScriptChain Health",
    tagline: "AI Prediction Platform for Heart Disease Readmissions",
    website: "https://www.scriptchainhealth.com",
    category: "next-gen-decisions",
    stage: "pre-seed",
    nmConnection: "national-seeking",
    deploymentReadiness: "pilot-ready-now",
    ruralFeasible: true,
    description: "ScriptChain Health is a B2B SaaS AI prediction platform for heart disease readmissions. It integrates with EHRs to identify high-risk patients and delivers personalized nutrition/exercise plans using 'Food & Exercise as Medicine' methodology. The platform auto-generates CPT/HCPCS billing codes to enable reimbursement for preventive care.",
    capabilities: [
      "AI-powered heart disease readmission prediction",
      "EHR integration for risk identification",
      "Personalized nutrition and exercise plans",
      "Automated CPT/HCPCS billing code generation",
      "Clinical decision support system"
    ],
    careSettings: ["Cardiology", "Health System", "Primary Care"],
    compliance: {
      hipaa: true,
      soc2: false,
      baa: true,
      ehrIntegrations: ["EHR Integration Available"]
    },
    pilotFormat: {
      duration: "3-6 months",
      population: "Cardiology practice or health system",
      metrics: ["Readmission rate reduction", "Risk identification accuracy", "Reimbursement capture"]
    },
    tier: "preferred",
    pilotsCompleted: 1,
    advisoryNote: "Patented AI system with Morehouse School of Medicine partnership. 'Food as Medicine' aligns with 2024 federal legislation priorities.",
    outcomes: [],
    team: [
      { name: "Moh Noori", title: "CEO & Founder", email: "moh@scriptchain.co", linkedin: "https://www.linkedin.com/company/scriptchain-health" }
    ],
    status: "active",
    appliedAt: "2024-03-01",
    approvedAt: "2024-03-15",
    promotedAt: "2024-07-01",
    hq: "San Francisco, CA (Boston + Remote)",
    foundedYear: 2020,
    fundingStage: "Pre-Seed (seeking seed round)",
    differentiators: [
      "Patented AI prediction system",
      "Auto-generates billing codes for reimbursement",
      "Food & Exercise as Medicine methodology",
      "Partnership with Morehouse School of Medicine"
    ],
    nmPriorities: [
      "Chronic disease management (cardiovascular)",
      "Preventive care and readmission reduction",
      "Value-based care support"
    ],
    targetPopulations: ["Heart failure patients", "High-risk cardiac patients", "Cardiology practices"]
  },
  {
    id: "4",
    slug: "senior-one",
    name: "Senior.One",
    tagline: "Find Care for Aging Parents - Simply and Free",
    website: "https://senior.one",
    category: "extending-care",
    stage: "seed",
    nmConnection: "nm-based",
    deploymentReadiness: "pilot-ready-now",
    ruralFeasible: true,
    description: "Senior.One makes finding care for aging parents simple and free. The platform helps families compare senior living options, coordinate extra help in the home, consider adult day care, and prepare for downsizing - all in one comprehensive dashboard.",
    capabilities: [
      "Senior care provider search and comparison",
      "Care plan management dashboard",
      "Direct provider communication",
      "Tour and appointment scheduling",
      "Healthcare document storage"
    ],
    careSettings: ["Home Health", "Assisted Living", "Memory Care", "Hospice", "Adult Day Care"],
    compliance: {
      hipaa: true,
      soc2: false,
      baa: true,
      ehrIntegrations: []
    },
    pilotFormat: {
      duration: "3-6 months",
      population: "100-500 families",
      metrics: ["Time to care placement", "Family satisfaction", "Care provider connections"]
    },
    tier: "preferred",
    pilotsCompleted: 1,
    advisoryNote: "Covers the entire senior care continuum from independent living to hospice. Free for families.",
    outcomes: [
      {
        setting: "Family Care Coordination",
        duration: "Ongoing",
        population: "Beta Users",
        result: "Significant time savings in care search; families able to compare 12+ care categories in one place"
      }
    ],
    team: [
      { name: "Evan Thompson", title: "CEO", email: "ethompson@senior.one", linkedin: "https://www.linkedin.com/company/seniorone" }
    ],
    status: "active",
    appliedAt: "2024-04-01",
    approvedAt: "2024-04-15",
    promotedAt: "2024-08-01",
    hq: "New Mexico",
    foundedYear: 2022,
    fundingStage: "Early Stage",
    differentiators: [
      "Covers entire senior care continuum (12+ categories)",
      "Free for families",
      "One-stop dashboard for care planning",
      "Direct connection to care providers"
    ],
    nmPriorities: [
      "Supporting aging in place",
      "Family caregiver support",
      "Care navigation for seniors"
    ],
    targetPopulations: ["Family caregivers", "Aging adults", "Care coordinators"]
  },
  {
    id: "5",
    slug: "karoo-health",
    name: "Karoo Health",
    tagline: "A New Paradigm of Cardiovascular Care",
    website: "https://www.karoohealth.com",
    category: "extending-care",
    stage: "series-a",
    nmConnection: "national-seeking",
    deploymentReadiness: "pilot-ready-now",
    ruralFeasible: true,
    description: "Karoo Health helps cardiology networks, health systems, and health plans transition to and succeed in value-based care. Their Complete Hybrid Care Model combines dedicated on-site and virtual care teams with proprietary technology for cardiovascular care.",
    capabilities: [
      "Hybrid care model (on-site + virtual)",
      "Dedicated care team support",
      "VBC technology platform",
      "Patient engagement tools",
      "SDoH and lifestyle support integration"
    ],
    careSettings: ["Cardiology", "Health System", "Health Plan"],
    compliance: {
      hipaa: true,
      soc2: true,
      baa: true,
      ehrIntegrations: ["Epic", "Cerner", "Custom Integration"]
    },
    pilotFormat: {
      duration: "6-12 months",
      population: "Cardiology practice or network",
      metrics: ["Readmission rates", "Patient engagement", "Cost of care"]
    },
    tier: "preferred",
    pilotsCompleted: 2,
    advisoryNote: "Cardiovascular care is #1 cost to health system ($450B in 2022). Karoo addresses this with proven hybrid care model.",
    outcomes: [
      {
        setting: "Cardiology Network Partner",
        duration: "12 months",
        population: "Value-based cardiology initiative",
        result: "Significant reduction in hospital readmissions, improved patient engagement and adherence"
      }
    ],
    team: [
      { name: "Ian Koons", title: "CEO", email: "partner@karoohealth.com", linkedin: "https://www.linkedin.com/company/karoo-health" },
      { name: "Ben Selzer", title: "CFO", email: "partner@karoohealth.com", linkedin: "https://www.linkedin.com/company/karoo-health" }
    ],
    status: "active",
    appliedAt: "2024-02-15",
    approvedAt: "2024-03-01",
    promotedAt: "2024-06-15",
    hq: "New Mexico",
    foundedYear: 2020,
    fundingStage: "$8.5M Total ($3.4M Seed, June 2023)",
    differentiators: [
      "Complete hybrid care model with dedicated care teams",
      "Purpose-built for cardiovascular value-based care",
      "Proprietary VBC technology platform",
      "360-degree view of patient health"
    ],
    nmPriorities: [
      "Chronic disease management (cardiovascular)",
      "Value-based care transition",
      "Reducing cost of care"
    ],
    targetPopulations: ["Cardiovascular patients", "Heart failure patients", "High-risk cardiac patients"]
  },

  // GENERAL TIER STARTUPS
  {
    id: "6",
    slug: "shape-health",
    name: "Shape Health",
    tagline: "Personalized Health Coaching for New Mexico",
    website: "https://www.shapehealth.io",
    category: "extending-care",
    stage: "seed",
    nmConnection: "nm-based",
    deploymentReadiness: "pilot-ready-now",
    ruralFeasible: true,
    description: "Shape Health provides personalized health coaching guided by certified coaches who understand your goals, schedule, and community. Built specifically for New Mexico residents with flexible sessions available in-person, online, or by phone.",
    capabilities: [
      "1:1 health coaching sessions",
      "Personalized health plans",
      "Meal planning with grocery lists",
      "Progress tracking across 6 dimensions",
      "Group coaching sessions"
    ],
    careSettings: ["Primary Care", "Community Health", "Home"],
    compliance: {
      hipaa: true,
      soc2: false,
      baa: true,
      ehrIntegrations: []
    },
    pilotFormat: {
      duration: "3-6 months",
      population: "50-200 members",
      metrics: ["Health score improvement", "Engagement rate", "Lifestyle changes"]
    },
    tier: "general",
    pilotsCompleted: 0,
    advisoryNote: "New Mexico-focused health coaching. Works with verified insurance partners.",
    outcomes: [],
    team: [
      { name: "Josiah", title: "Co-Founder", email: "josiah@shapehealth.io", linkedin: "https://www.linkedin.com/company/shape-health" },
      { name: "Isaiah", title: "Co-Founder", email: "isaiah@shapehealth.io", linkedin: "https://www.linkedin.com/company/shape-health" }
    ],
    status: "active",
    appliedAt: "2024-06-01",
    approvedAt: "2024-06-15",
    hq: "New Mexico",
    foundedYear: 2023,
    fundingStage: "Seed",
    differentiators: [
      "Built specifically for New Mexico residents",
      "Flexible delivery (in-person, online, phone)",
      "Certified coaches with local community knowledge",
      "Insurance partner integrations"
    ],
    nmPriorities: [
      "Chronic disease prevention",
      "Behavioral health support",
      "Community-based care"
    ],
    targetPopulations: ["Chronic disease prevention", "Lifestyle modification", "New Mexico residents"]
  },
  {
    id: "7",
    slug: "fidari",
    name: "Fidari",
    tagline: "Oncology Care Navigation and Coordination Platform",
    website: "https://fidari.care",
    category: "extending-care",
    stage: "seed",
    nmConnection: "nm-based",
    deploymentReadiness: "pilot-ready-now",
    ruralFeasible: true,
    description: "Fidari is a software platform that enables oncology care teams, including nurse navigators, APPs, and care coordinators, to manage patient navigation and care coordination through structured workflows. It captures and organizes care interactions across the cancer journey, helping health systems improve access to care, streamline operations, and generate actionable data on outcomes and program value.",
    capabilities: [
      "Structured oncology navigation workflows",
      "Care interaction capture and organization",
      "Program performance analytics",
      "Epic integration alongside existing systems",
      "SDOH tracking and support"
    ],
    careSettings: ["Oncology", "Health System", "Cancer Centers"],
    compliance: {
      hipaa: true,
      soc2: false,
      baa: true,
      ehrIntegrations: ["Epic"]
    },
    pilotFormat: {
      duration: "3-6 months",
      population: "Oncology navigation program",
      metrics: ["Patient access improvement", "Navigation efficiency", "Program value demonstration"]
    },
    tier: "general",
    pilotsCompleted: 0,
    advisoryNote: "Mission-driven team focused on complex and underserved patient populations. Initial oncology focus with plans to extend to other high-cost specialty areas.",
    outcomes: [],
    team: [
      { name: "Othman Ouenes", title: "Founder", email: "othman@fidari.care", linkedin: "https://www.linkedin.com/company/fidari" }
    ],
    status: "active",
    appliedAt: "2024-07-01",
    approvedAt: "2024-07-15",
    hq: "New Mexico",
    foundedYear: 2021,
    fundingStage: "$1M - $2.99M",
    differentiators: [
      "Purpose-built for oncology navigation workflows",
      "Creates foundational data layer alongside Epic",
      "Demonstrates navigation program value to leadership",
      "Designed to extend to other high-cost specialty areas"
    ],
    nmPriorities: [
      "Cancer care access and coordination",
      "Care navigation for complex patients",
      "Health equity and underserved populations"
    ],
    targetPopulations: ["Oncology patients", "Cancer navigation programs", "Complex care populations"]
  },
  {
    id: "8",
    slug: "waveon-health",
    name: "WaveOn Health",
    tagline: "Redefining Athletic Training Access with Hybrid, Scalable Solutions",
    website: "https://waveonhealth.com",
    category: "extending-care",
    stage: "pre-seed",
    nmConnection: "nm-based",
    deploymentReadiness: "pilot-ready-now",
    ruralFeasible: true,
    description: "WaveOn Health instantly expands athletic training capacity to help prevent injuries, accelerate recovery, and protect athletes as they return to play. Their hybrid model combines virtual and on-site support from credentialed athletic trainers, addressing the growing athletic care gap where 33% of high schools lack a full-time athletic trainer.",
    capabilities: [
      "Virtual athletic trainer consultations",
      "Injury prevention programs",
      "Return-to-play protocols",
      "Rehab program management",
      "Coverage gap solutions"
    ],
    careSettings: ["Schools & Academies", "Sports Organizations", "Clinics & Health Systems"],
    compliance: {
      hipaa: true,
      soc2: false,
      baa: true,
      ehrIntegrations: []
    },
    pilotFormat: {
      duration: "3-6 months",
      population: "1-5 schools or organizations",
      metrics: ["Injury reduction rate", "Return-to-play time", "Coverage hours expanded", "Athlete satisfaction"]
    },
    tier: "general",
    pilotsCompleted: 0,
    advisoryNote: "Strong fit for schools and sports programs needing to expand athletic training coverage without expanding payroll.",
    outcomes: [],
    team: [
      { name: "Adam Halpern", title: "Founder", email: "adam@waveonhealth.com", linkedin: "https://www.linkedin.com/company/waveonhealth" }
    ],
    status: "active",
    appliedAt: "2024-07-15",
    approvedAt: "2024-08-01",
    hq: "New Mexico",
    foundedYear: 2020,
    fundingStage: "Pre-Seed (backed by GOS Capital)",
    differentiators: [
      "Hybrid virtual + on-site athletic training model",
      "Scalable coverage without expanding payroll",
      "Credentialed athletic trainers on demand",
      "Integrated rehab platform (Wibbi) for compliance tracking"
    ],
    nmPriorities: [
      "Rural healthcare access",
      "Youth health and injury prevention",
      "School health services"
    ],
    targetPopulations: ["Youth athletes", "High school sports programs", "Collegiate athletics", "Sports organizations"]
  },
  {
    id: "9",
    slug: "electronic-caregiver",
    name: "Electronic Caregiver",
    tagline: "Remote Patient Monitoring with AI Virtual Caregiver",
    website: "https://electroniccaregiver.com",
    category: "health-signals",
    stage: "series-b-plus",
    nmConnection: "nm-based",
    deploymentReadiness: "pilot-ready-now",
    ruralFeasible: true,
    description: "Electronic Caregiver provides remote patient monitoring, chronic care management, and telehealth platform featuring Addison, an AI Virtual Caregiver companion. Based in Las Cruces, NM with significant expansion including 770 jobs planned. The platform combines wearable devices, medication management, and AI-powered virtual care support.",
    capabilities: [
      "Remote patient monitoring platform",
      "Addison AI Virtual Caregiver companion",
      "Chronic care management",
      "Telehealth integration",
      "Medication management and reminders"
    ],
    careSettings: ["Home Health", "Chronic Care", "Senior Care", "Primary Care"],
    compliance: {
      hipaa: true,
      soc2: true,
      baa: true,
      ehrIntegrations: ["Custom Integration"]
    },
    pilotFormat: {
      duration: "3-6 months",
      population: "100-500 patients",
      metrics: ["Patient engagement", "Care adherence", "Hospital readmission reduction"]
    },
    tier: "general",
    pilotsCompleted: 5,
    advisoryNote: "Major NM employer with $43.5M+ raised. AI virtual caregiver differentiator. Massive Las Cruces expansion planned (770 jobs).",
    outcomes: [
      {
        setting: "Chronic Care Management",
        duration: "Ongoing",
        population: "Multiple health systems",
        result: "Significant improvement in care adherence and patient engagement through AI companion"
      }
    ],
    team: [
      { name: "Anthony Dohrmann", title: "CEO & Founder", email: "info@electroniccaregiver.com", linkedin: "https://www.linkedin.com/company/electronic-caregiver" }
    ],
    status: "active",
    appliedAt: "2024-01-01",
    approvedAt: "2024-01-15",
    hq: "Las Cruces, New Mexico",
    foundedYear: 2009,
    fundingStage: "$43.5M+ ($42.5M in 2023 + $1M LEDA grant)",
    differentiators: [
      "Addison AI Virtual Caregiver - first of its kind",
      "Comprehensive RPM + CCM + telehealth platform",
      "Major NM employer with 770 jobs expansion planned",
      "LEDA grant recipient"
    ],
    nmPriorities: [
      "Remote patient monitoring for rural areas",
      "Chronic disease management",
      "Senior care and aging in place"
    ],
    targetPopulations: ["Chronic disease patients", "Seniors", "Home health patients", "Rural populations"]
  },
  {
    id: "10",
    slug: "indica-labs",
    name: "Indica Labs",
    tagline: "AI-Powered Digital Pathology Software",
    website: "https://indicalab.com",
    category: "next-gen-decisions",
    stage: "revenue",
    nmConnection: "nm-based",
    deploymentReadiness: "pilot-ready-now",
    ruralFeasible: false,
    description: "Indica Labs provides HALO, an AI-powered digital pathology software platform for image analysis used globally by pathologists and researchers. The company has achieved 323% revenue growth (2022), employs 110+ people globally, and has been organically profitable since 2011 without VC dependency.",
    capabilities: [
      "HALO AI-powered image analysis",
      "Digital pathology platform",
      "Tissue analysis algorithms",
      "Research and clinical workflows",
      "Multi-site deployment"
    ],
    careSettings: ["Pathology Labs", "Research Institutions", "Academic Medical Centers"],
    compliance: {
      hipaa: true,
      soc2: true,
      baa: true,
      ehrIntegrations: ["LIMS Integration"]
    },
    pilotFormat: {
      duration: "3-6 months",
      population: "Pathology department or research team",
      metrics: ["Analysis throughput", "Diagnostic accuracy", "Research productivity"]
    },
    tier: "general",
    pilotsCompleted: 10,
    advisoryNote: "Profitable and self-funded since 2011. 323% revenue growth in 2022. Global presence with 110+ employees. Major NM success story.",
    outcomes: [
      {
        setting: "Global Pathology Labs",
        duration: "Ongoing",
        population: "110+ global clients",
        result: "Industry-leading digital pathology platform with 323% revenue growth"
      }
    ],
    team: [
      { name: "Steven Hashagen", title: "CEO & Founder", email: "info@indicalab.com", linkedin: "https://www.linkedin.com/company/indica-labs" }
    ],
    status: "active",
    appliedAt: "2024-02-01",
    approvedAt: "2024-02-15",
    hq: "New Mexico",
    foundedYear: 2011,
    fundingStage: "Profitable / Self-funded (bootstrapped)",
    differentiators: [
      "HALO platform is industry-leading digital pathology software",
      "Profitable without VC dependency since 2011",
      "323% revenue growth (2022)",
      "110+ employees globally"
    ],
    nmPriorities: [
      "Advanced diagnostics and AI",
      "Research and clinical pathology",
      "Economic development and job creation"
    ],
    targetPopulations: ["Pathologists", "Researchers", "Academic medical centers", "Pharma companies"]
  },
  {
    id: "11",
    slug: "carevid",
    name: "CareVid",
    tagline: "Patient Video Education Through Peer Storytelling",
    website: "https://carevid.com",
    category: "extending-care",
    stage: "seed",
    nmConnection: "nm-based",
    deploymentReadiness: "q2-2026",
    ruralFeasible: true,
    description: "CareVid is a patient video education platform where patients share experiences to empower others. The peer-to-peer storytelling model creates authentic, relatable health education content that helps patients understand their conditions and treatment options through real patient stories.",
    capabilities: [
      "Patient video stories library",
      "Condition-specific education content",
      "Peer support through storytelling",
      "Health literacy improvement tools",
      "Provider content integration"
    ],
    careSettings: ["Primary Care", "Health System", "Patient Education"],
    compliance: {
      hipaa: true,
      soc2: false,
      baa: true,
      ehrIntegrations: []
    },
    pilotFormat: {
      duration: "3-6 months",
      population: "Patient population or clinic",
      metrics: ["Patient engagement", "Health literacy scores", "Patient satisfaction"]
    },
    tier: "general",
    pilotsCompleted: 0,
    advisoryNote: "Novel peer-to-peer patient storytelling approach to health education. Based in Albuquerque.",
    outcomes: [],
    team: [
      { name: "Brad Woodward", title: "Founder", email: "info@carevid.com", linkedin: "https://www.linkedin.com/company/carevid" }
    ],
    status: "active",
    appliedAt: "2024-05-01",
    approvedAt: "2024-05-15",
    hq: "Albuquerque, New Mexico",
    foundedYear: 2020,
    fundingStage: "Early Stage",
    differentiators: [
      "Peer-to-peer patient storytelling model",
      "Authentic patient experiences for education",
      "Novel approach to health literacy"
    ],
    nmPriorities: [
      "Patient education and engagement",
      "Health literacy improvement",
      "Community-based health support"
    ],
    targetPopulations: ["Patients seeking peer support", "Health literacy programs", "Community health initiatives"]
  }
];

export function getStartupBySlug(slug: string): Startup | undefined {
  return startups.find((s) => s.slug === slug);
}

export function getPreferredStartups(): Startup[] {
  return startups.filter((s) => s.tier === "preferred");
}

export function getGeneralStartups(): Startup[] {
  return startups.filter((s) => s.tier === "general");
}

export const healthcareOrgs: HealthcareOrg[] = [
  {
    id: "1",
    name: "Presbyterian Healthcare Services",
    type: "Health System",
    contactName: "Dr. Angela Rivera",
    contactEmail: "arivera@phs.org",
    priorities: [
      {
        title: "Rural Specialty Access",
        statement: "Our rural clinics struggle to connect patients with specialists, leading to delayed diagnoses and treatment.",
        outcome: "Reduce time from referral to specialist consultation by 50% in rural locations.",
        constraints: "Limited broadband in some areas; need solutions that work with low bandwidth.",
        pilotReady: true
      }
    ],
    watchlist: ["1", "2"],
    alignmentReports: [],
    pilots: [],
    joinedAt: "2024-03-15"
  },
  {
    id: "2",
    name: "UNM Health",
    type: "Academic Medical Center",
    contactName: "Dr. Michael Thompson",
    contactEmail: "mthompson@salud.unm.edu",
    priorities: [
      {
        title: "Clinician Documentation Burden",
        statement: "Our providers spend 2+ hours per day on documentation, contributing to burnout and limiting patient access.",
        outcome: "Reduce documentation time by 50% while maintaining note quality standards.",
        constraints: "Must integrate with Epic. Need Spanish language support.",
        pilotReady: true
      }
    ],
    watchlist: ["2", "5"],
    alignmentReports: [],
    pilots: [],
    joinedAt: "2024-04-01"
  },
  {
    id: "3",
    name: "Christus St. Vincent",
    type: "Hospital",
    contactName: "Maria Garcia",
    contactEmail: "mgarcia@stvin.org",
    priorities: [
      {
        title: "Senior Care Navigation",
        statement: "Families struggle to find appropriate post-acute and senior care options for discharged patients.",
        outcome: "Improve care transitions and reduce readmissions for elderly patients.",
        constraints: "Need solutions that work for diverse family situations and care needs.",
        pilotReady: true
      }
    ],
    watchlist: ["4", "5"],
    alignmentReports: [],
    pilots: [],
    joinedAt: "2024-05-01"
  }
];
