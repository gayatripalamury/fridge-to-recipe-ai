require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini SDK with explicit key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/generate-recipe', async (req, res) => {
  try {
    const { ingredients } = req.body;
    
    const prompt = `
      You are an expert chef. Return ONLY valid JSON matching this exact schema, with no markdown formatting blocks and no extra conversational text:
      {
        "title": "string",
        "prepTime": "string",
        "baseServings": number,
        "ingredients": [{"name": "string", "amount": number, "unit": "string"}],
        "steps": ["string"],
        "swaps": [{"original": "string", "alternative": "string"}]
      }
      
      Create a recipe using these ingredients: ${ingredients}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: prompt,
    });

    let rawText = response.text.trim();
    rawText = rawText.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '');
    
    const parsedJson = JSON.parse(rawText);
    res.json(parsedJson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate recipe from Gemini.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Gemini proxy server running on port ${PORT}`));