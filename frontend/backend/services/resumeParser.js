// backend/services/resumeParser.js
const supabase = require('../config/supabase.config');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Google Gemini (free tier)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function parseResume(filePath) {
  try {
    // 1. Download from Supabase
    const { data: fileBuffer, error } = await supabase.storage
      .from('resumes')
      .download(filePath);
    
    if (error) throw error;

    // 2. Extract text
    let textContent = '';
    if (filePath.endsWith('.pdf')) {
      const data = await pdf(fileBuffer);
      textContent = data.text;
    } else if (filePath.endsWith('.docx')) {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      textContent = result.value;
    }

    // 3. Use Gemini for analysis
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Extract the following from this resume text:
    - Skills (technical only, as array)
    - Experience (summary in 1 paragraph)
    - Education (summary in 1 line)
    
    Return as JSON. Resume text: ${textContent.substring(0, 30000)}`; // Gemini has token limits

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonString = response.text().replace(/```json|```/g, '').trim();
    
    return JSON.parse(jsonString);
  } catch (err) {
    console.error('Resume parsing error:', err);
    throw err;
  }
}

module.exports = { parseResume };