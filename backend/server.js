import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/* ================= SKILL EXTRACTION ================= */

async function extractSkills(text, type) {
  const prompt = `
Extract ONLY technical skills from this ${type}.
Return ONLY a valid JSON array.

${text}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
  });

  try {
    return JSON.parse(response.choices[0].message.content.trim());
  } catch {
    return [];
  }
}

/* ================= DOMAIN DETECTION ================= */

async function detectDomain(jobDescription) {
  const prompt = `
Identify the exact job role based on this job description.

Return ONLY one role title.

${jobDescription}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
  });

  return response.choices[0].message.content.trim();
}

/* ================= ROADMAP GENERATION ================= */

async function generateRoadmap(domain, skills) {
  const prompt = `
Create a structured 4-week roadmap for becoming a ${domain}.
Focus on these missing skills: ${skills.join(", ")}

Return ONLY valid JSON:

{
  "week1": { "title": "", "topics": [] },
  "week2": { "title": "", "topics": [] },
  "week3": { "title": "", "topics": [] },
  "week4": { "title": "", "topics": [] }
}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  try {
    return JSON.parse(response.choices[0].message.content.trim());
  } catch {
    return null;
  }
}

/* ================= ANALYZE ROUTE ================= */

app.post("/analyze", async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        error: "Resume text and Job Description are required.",
      });
    }

    const jobSkills = await extractSkills(jobDescription, "job description");
    const resumeSkills = await extractSkills(resumeText, "resume");

    const normalizedResume = resumeSkills.map((s) => s.toLowerCase().trim());

    const matchedSkills = jobSkills
      .filter((skill) =>
        normalizedResume.includes(skill.toLowerCase().trim())
      )
      .map((skill) => ({ skill, category: "AI Detected" }));

    const missingSkills = jobSkills
      .filter(
        (skill) =>
          !normalizedResume.includes(skill.toLowerCase().trim())
      )
      .map((skill) => ({ skill, category: "AI Detected" }));

    const additionalSkills = resumeSkills
      .filter(
        (skill) =>
          !jobSkills.map((j) => j.toLowerCase().trim()).includes(
            skill.toLowerCase().trim()
          )
      )
      .map((skill) => ({ skill, category: "AI Detected" }));

    const matchScore =
      jobSkills.length === 0
        ? 0
        : Math.round((matchedSkills.length / jobSkills.length) * 100);

    const domain = await detectDomain(jobDescription);

    let roadmap = null;

    if (missingSkills.length > 0) {
      roadmap = await generateRoadmap(
        domain,
        missingSkills.map((s) => s.skill)
      );
    }

    res.json({
      domain,
      matchScore,
      matchedSkills,
      missingSkills,
      additionalSkills,
      roadmap,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "AI processing failed.",
    });
  }
});

app.listen(5000, () => {
  console.log("AI Backend running on port 5000");
});