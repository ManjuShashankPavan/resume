// backend/services/questionService.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateTechnicalQuestions(skills) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Generate 5 technical interview questions focused on these skills: ${skills.join(', ')}.
    Include:
    - 2 coding/problem-solving questions
    - 2 system design/conceptual questions
    - 1 language/framework-specific question
    Return as a JSON array like this: ["Question 1", "Question 2"]`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean and parse the response
    const jsonString = text.replace(/```json|```/g, '').trim();
    return JSON.parse(jsonString);
  } catch (err) {
    console.error("Gemini technical question error:", err);
    throw new Error("Failed to generate technical questions");
  }
}

async function generateHRQuestions(experience) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Generate 5 HR/behavioral interview questions based on this experience: ${experience}.
    Include questions about:
    - Teamwork scenarios
    - Problem-solving approaches
    - Conflict resolution
    - Career motivations
    Return as a JSON array like this: ["Question 1", "Question 2"]`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean and parse the response
    const jsonString = text.replace(/```json|```/g, '').trim();
    return JSON.parse(jsonString);
  } catch (err) {
    console.error("Gemini HR question error:", err);
    throw new Error("Failed to generate HR questions");
  }
}

// For role-specific questions
async function generateRoleSpecificQuestions(role, skills) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Generate 3 advanced ${role} interview questions focusing on: ${skills.join(', ')}.
    Make them scenario-based and challenging.
    Return as JSON array.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return JSON.parse(text.replace(/```json|```/g, '').trim());
  } catch (err) {
    console.error("Gemini role-specific question error:", err);
    return []; // Fallback to empty array
  }
}

module.exports = { 
  generateTechnicalQuestions, 
  generateHRQuestions,
  generateRoleSpecificQuestions
};