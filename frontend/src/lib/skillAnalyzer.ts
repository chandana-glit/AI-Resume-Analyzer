// ================================
// SKILL DATABASE
// ================================

const SKILL_DATABASE: Record<
  string,
  { category: string; weight: number; aliases: string[] }
> = {
  // ================= AI =================
langchain: { category: "AI", weight: 0.9, aliases: [] },
"prompt engineering": { category: "AI", weight: 0.9, aliases: [] },
"vector database": { category: "AI", weight: 0.8, aliases: [] },
huggingface: { category: "AI", weight: 0.8, aliases: [] },
llm: { category: "AI", weight: 1.0, aliases: ["large language model"] },

// ================= DevOps =================
"ci/cd": { 
  category: "DevOps", 
  weight: 1.0, 
  aliases: ["pipeline", "ci cd", "cicd", "ci/cd tools"] 
},
linux: { category: "DevOps", weight: 0.9, aliases: [] },
"github actions": { category: "DevOps", weight: 0.9, aliases: [] },

// ================= Data Engineering =================
spark: { category: "Data Engineering", weight: 1.0, aliases: ["apache spark"] },
hadoop: { category: "Data Engineering", weight: 0.9, aliases: [] },
airflow: { category: "Data Engineering", weight: 0.9, aliases: [] },
etl: { category: "Data Engineering", weight: 1.0, aliases: [] },
"data warehouse": { category: "Data Engineering", weight: 0.9, aliases: [] },

// ================= SOC / Security =================
siem: { category: "Security Operations", weight: 1.0, aliases: [] },
"incident response": { category: "Security Operations", weight: 1.0, aliases: [] },
"threat detection": { category: "Security Operations", weight: 0.9, aliases: [] },
"log analysis": { category: "Security Operations", weight: 0.9, aliases: [] },

// ================= UI/UX =================
figma: { category: "UI/UX", weight: 1.0, aliases: [] },
wireframing: { category: "UI/UX", weight: 0.9, aliases: [] },
prototyping: { category: "UI/UX", weight: 0.9, aliases: [] },
"user research": { category: "UI/UX", weight: 0.9, aliases: [] },

// ================= Product Analyst =================
"a/b testing": { category: "Product Analytics", weight: 1.0, aliases: ["ab testing"] },
"business metrics": { category: "Product Analytics", weight: 0.9, aliases: [] },

// ================= Blockchain =================
solidity: { category: "Blockchain", weight: 1.0, aliases: [] },
ethereum: { category: "Blockchain", weight: 0.9, aliases: [] },
"smart contracts": { category: "Blockchain", weight: 1.0, aliases: [] },
web3: { category: "Blockchain", weight: 0.9, aliases: ["web3.js"] },

// ================= Marketing =================
"google analytics": { category: "Digital Marketing", weight: 1.0, aliases: [] },
seo: { category: "Digital Marketing", weight: 0.9, aliases: [] },
"campaign analysis": { category: "Digital Marketing", weight: 0.9, aliases: [] },

// ================= MLOps =================
"model deployment": { category: "MLOps", weight: 1.0, aliases: [] },
monitoring: { category: "MLOps", weight: 0.9, aliases: [] },

  // ================= Android =================
android: { category: "Mobile", weight: 1.0, aliases: ["android development"] },

// ================= Cloud =================
aws: { 
  category: "Cloud", 
  weight: 0.9, 
  aliases: ["amazon web services", "aws cloud"] 
},

azure: { 
  category: "Cloud", 
  weight: 0.9, 
  aliases: ["microsoft azure"] 
},
gcp: { category: "Cloud", weight: 1.0, aliases: ["google cloud"] },
docker: { category: "Cloud", weight: 0.9, aliases: [] },
kubernetes: { category: "Cloud", weight: 0.9, aliases: ["k8s"] },

// ================= BI =================
powerbi: { category: "Business Intelligence", weight: 1.0, aliases: ["power bi"] },
tableau: { category: "Business Intelligence", weight: 1.0, aliases: [] },
"data visualization": { category: "Business Intelligence", weight: 0.9, aliases: [] },

// ================= Game Dev =================
unity: { category: "Game Development", weight: 1.0, aliases: [] },
unreal: { category: "Game Development", weight: 1.0, aliases: ["unreal engine"] },
"game development": { category: "Game Development", weight: 1.0, aliases: [] },

  // Programming
  javascript: { category: "Programming", weight: 1.0, aliases: ["js"] },
  typescript: { category: "Programming", weight: 1.0, aliases: ["ts"] },
  java: { category: "Programming", weight: 1.0, aliases: [] },
  "c++": { category: "Programming", weight: 0.9, aliases: ["cpp"] },
  git: { category: "Programming", weight: 0.8, aliases: [] },

  // Frontend
  react: { category: "Frontend", weight: 1.0, aliases: ["reactjs"] },
  angular: { category: "Frontend", weight: 0.9, aliases: [] },
  vue: { category: "Frontend", weight: 0.9, aliases: [] },
  html: { category: "Frontend", weight: 0.8, aliases: [] },
  css: { category: "Frontend", weight: 0.8, aliases: [] },

  // Backend
  "node.js": { category: "Backend", weight: 1.0, aliases: ["nodejs"] },
  python: { category: "Backend", weight: 1.0, aliases: ["py"] },
  express: { category: "Backend", weight: 0.8, aliases: [] },
  django: { category: "Backend", weight: 0.8, aliases: [] },
  flask: { category: "Backend", weight: 0.9, aliases: [] },
  fastapi: { category: "Backend", weight: 0.8, aliases: [] },
  spring: { category: "Backend", weight: 0.9, aliases: ["spring boot"] },
  "rest api": { category: "Backend", weight: 0.9, aliases: ["api"] },

  // Database
  mysql: { category: "Database", weight: 0.8, aliases: [] },
  mongodb: { category: "Database", weight: 0.8, aliases: [] },

  // Data Science
  sql: { category: "Data Science", weight: 1.0, aliases: [] },
  "machine learning": { category: "Data Science", weight: 1.0, aliases: ["ml"] },
  tensorflow: { category: "Data Science", weight: 0.9, aliases: [] },
  pandas: { category: "Data Science", weight: 0.8, aliases: [] },
  numpy: { category: "Data Science", weight: 0.8, aliases: [] },
  statistics: { category: "Data Science", weight: 0.8, aliases: [] },

  //devops
  devops: { category: "DevOps", weight: 2.0, aliases: ["devops engineer"] },

  

  // Security
networking: { category: "Security", weight: 0.8, aliases: [] },
"ethical hacking": { category: "Security", weight: 1.0, aliases: ["penetration testing"] },
firewalls: { category: "Security", weight: 0.8, aliases: [] },

"network security": { category: "Security", weight: 0.9, aliases: [] },
"penetration testing": { category: "Security", weight: 0.9, aliases: ["pentesting"] },
"risk assessment": { category: "Security", weight: 0.8, aliases: [] },
"vulnerability assessment": { category: "Security", weight: 0.8, aliases: [] },
"security tools": { category: "Security", weight: 0.8, aliases: [] },
"cryptography": { category: "Security", weight: 0.8, aliases: [] },
"malware analysis": { category: "Security", weight: 0.8, aliases: [] },

  // Mobile
  flutter: { category: "Mobile", weight: 0.9, aliases: [] },
  "react native": { category: "Mobile", weight: 0.9, aliases: [] },
  kotlin: { category: "Mobile", weight: 0.8, aliases: [] },
  swift: { category: "Mobile", weight: 0.8, aliases: [] },

  // Business
  excel: { category: "Business", weight: 0.8, aliases: [] },
  communication: { category: "Business", weight: 0.7, aliases: [] },
  "requirement gathering": { category: "Business", weight: 0.9, aliases: [] },

  // Core CS Concepts
"oop": { category: "Programming", weight: 0.9, aliases: ["object oriented programming"] },
"data structures": { category: "Programming", weight: 1.0, aliases: ["ds"] },
"file handling": { category: "Programming", weight: 0.8, aliases: [] },
"debugging": { category: "Programming", weight: 0.8, aliases: [] },
"problem solving": { category: "Programming", weight: 0.9, aliases: [] },

   
};

// ================================
// TYPES
// ================================

export interface AnalysisResult {
  domain: string;
  matchScore: number;
  matchedSkills: { skill: string; category: string }[];
  missingSkills: { skill: string; category: string }[];
  additionalSkills: { skill: string; category: string }[];
}

// ================================
// SKILL EXTRACTION
// ================================

function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractSkills(text: string): Set<string> {
  const normalized = text.toLowerCase();
  const found = new Set<string>();

  for (const [skill, data] of Object.entries(SKILL_DATABASE)) {
  const safeSkill = escapeRegex(skill);
  const isPhrase = skill.includes(" ");

  const regex = isPhrase
    ? new RegExp(`${safeSkill}`, "i")
    : new RegExp(`\\b${safeSkill}\\b`, "i");

  // ✅ CHECK MAIN SKILL
  if (regex.test(normalized)) {
    found.add(skill);
    continue;
  }

  // ✅ CHECK ALIASES
  for (const alias of data.aliases) {
    const safeAlias = escapeRegex(alias);
    const aliasRegex = new RegExp(`\\b${safeAlias}\\b`, "i");

    if (aliasRegex.test(normalized)) {
      found.add(skill);
      break;
    }
  }
}

  return found;
}

// ================================
// SMART DOMAIN DETECTION
// ================================

function detectDomain(jobSkills: Set<string>): string {

  const categoryScore: Record<string, number> = {};

  for (const skill of jobSkills) {

    const skillData = SKILL_DATABASE[skill];

    if (!skillData) continue;

    const category = skillData.category;
    const weight = skillData.weight || 1;

    categoryScore[category] = (categoryScore[category] || 0) + weight;
  }

  let bestCategory = "";
  let maxScore = 0;

  for (const category in categoryScore) {
  if (categoryScore[category] > maxScore) {
    bestCategory = category;
    maxScore = categoryScore[category];
  }
}

// ✅ ML override (TOP priority)
if (
  jobSkills.has("machine learning") ||
  jobSkills.has("tensorflow")
) {
  return "machine learning engineer";
}

// ✅ Data Analyst
if (
  categoryScore["Business Intelligence"] >= 1 &&
  jobSkills.has("sql")
) {
  return "data analyst";
}

// ✅ DevOps
if (categoryScore["DevOps"] >= 2) {
  return "devops engineer";
}

// ✅ Full Stack (IMPORTANT FIX)
if (
  categoryScore["Frontend"] >= 1 &&
  categoryScore["Backend"] >= 1
) {
  return "full stack developer";
}

// ✅ Software Developer (GENERAL ROLE FIX)
if (categoryScore["Programming"] >= 2) {
  return "software developer";
}

// ✅ Python-specific
if (
  jobSkills.has("python") &&
  categoryScore["Backend"] >= 2
) {
  return "python developer";
}

// ✅ Backend (MOVE DOWN)
if (categoryScore["Backend"] >= 2) {
  return "backend developer";
}


  switch (bestCategory) {

    case "AI":
      return "ai engineer";

    case "DevOps":
      return "devops engineer";

    case "Data Engineering":
      return "data engineer";

    case "Security Operations":
      return "soc analyst";

    case "UI/UX":
      return "ui ux designer";

    case "Product Analytics":
      return "product analyst";

    case "Blockchain":
      return "blockchain developer";

    case "Digital Marketing":
      return "digital marketing analyst";

    case "MLOps":
      return "mlops engineer";

    case "Cloud":
      return "cloud engineer";

    case "Business Intelligence":
      return "business intelligence developer";

    case "Game Development":
      return "game developer";

    case "Frontend":
      return "frontend developer";

    case "Backend":
      return "backend developer";

    case "Data Science":
      return "machine learning engineer";

    case "Security":
      return "cybersecurity analyst";

    case "Mobile":
      return "mobile app developer";

    case "Business":
      return "business analyst";

    case "Programming":
      return "software developer";

    default:
      return "Doamin not detected";
  }
}

// ================================
// MAIN ANALYZER
// ================================

export function analyzeSkills(
  resumeText: string,
  jobDescription: string
): AnalysisResult {
  const resumeSkills = extractSkills(resumeText);
  const jobSkills = extractSkills(jobDescription);

  const matched: { skill: string; category: string }[] = [];
  const missing: { skill: string; category: string }[] = [];
  const additional: { skill: string; category: string }[] = [];

  for (const skill of jobSkills) {
    const category = SKILL_DATABASE[skill].category;
    if (resumeSkills.has(skill)) {
      matched.push({ skill, category });
    } else {
      missing.push({ skill, category });
    }
  }

  for (const skill of resumeSkills) {
    if (!jobSkills.has(skill)) {
      additional.push({
        skill,
        category: SKILL_DATABASE[skill].category,
      });
    }
  }

  const matchScore =
    jobSkills.size > 0
      ? Math.round((matched.length / jobSkills.size) * 100)
      : 0;

  const domain = detectDomain(jobSkills);

  return {
    domain,
    matchScore,
    matchedSkills: matched,
    missingSkills: missing,
    additionalSkills: additional,
  };
}
