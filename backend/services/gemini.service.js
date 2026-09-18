import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const analyzeResume = async (resumeText) => {
  try {
    const prompt = `
You are an expert technical recruiter and ATS resume analyst.

Analyze the following resume honestly.

Do not invent any experience, skills, education, projects, certifications, or achievements.

Return ONLY valid JSON with this exact structure:

{
  "atsScore": 0,
  "summary": "",
  "technicalSkills": [],
  "softSkills": [],
  "strengths": [],
  "weakAreas": [],
  "atsSuggestions": [],
  "recommendedJobRoles": [],
  "keywordsToConsider": []
}

ATS score must be an integer from 0 to 100.

Resume:
${resumeText}
`;

    const interaction = await ai.interactions.create({
      model: "gemini-3.1-flash-lite",
      input: prompt,
    });

    const output = interaction.output_text;

    if (!output) {
      throw new Error("Gemini returned an empty response");
    }

    return JSON.parse(output);
  } catch (error) {
    console.error("Gemini resume analysis error:", error);
    throw new Error("Failed to analyze resume with Gemini");
  }
};
export const generateInterviewQuestion = async ({
  jobRole,
  experience,
  interviewType,
  previousQuestions = [],
}) => {
  try {
    const prompt = `
You are an expert interviewer conducting a realistic job interview.

Generate exactly ONE interview question.

Candidate details:
- Job Role: ${jobRole}
- Experience Level: ${experience}
- Interview Type: ${interviewType}

Previous questions:
${previousQuestions.length > 0
  ? previousQuestions.map((q, index) => `${index + 1}. ${q}`).join("\n")
  : "No previous questions. This is the first question."
}

Rules:
- Ask a realistic interview question appropriate for the candidate's role and experience.
- Do not repeat any previous question.
- For technical interviews, focus on relevant technical concepts.
- For behavioral interviews, ask realistic behavioral questions.
- For mixed interviews, appropriately combine technical and behavioral questions.
- Do not provide the answer.
- Return ONLY the question as plain text.
`;

    console.time("Gemini Question Generation");


const interaction = await ai.interactions.create({
  model: "gemini-3.1-flash-lite",
  input: prompt,
});





    const output = interaction.output_text?.trim();

    if (!output) {
      throw new Error("Gemini returned an empty question");
    }

    return output;
  } catch (error) {
    console.error("Gemini interview question error:", error);
    throw new Error("Failed to generate interview question");
  }
};
export const evaluateInterviewAnswer = async ({
  question,
  answer,
  jobRole,
  experience,
  interviewType,
}) => {
  try {
    const prompt = `
You are an expert technical interviewer.

Evaluate the candidate's answer honestly.

Candidate:
- Job Role: ${jobRole}
- Experience: ${experience}
- Interview Type: ${interviewType}

Question:
${question}

Candidate Answer:
${answer}

Return ONLY valid JSON in this exact format:

{
  "score": 0,
  "feedback": "",
  "strengths": [],
  "improvements": []
}

Rules:
- score must be an integer from 0 to 10.
- Evaluate the answer based on correctness, relevance, clarity and depth.
- Do not invent information.
- Feedback should be concise and useful.
`;

    const interaction = await ai.interactions.create({
      model: "gemini-3.1-flash-lite",
      input: prompt,
    });

    const output = interaction.output_text;

    if (!output) {
      throw new Error("Gemini returned an empty evaluation");
    }

    return JSON.parse(output);
  } catch (error) {
    console.error("Gemini answer evaluation error:", error);
    throw new Error("Failed to evaluate interview answer");
  }
};