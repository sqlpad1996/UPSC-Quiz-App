require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Load API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateQuiz(text, numQuestions = 5, difficulty = "Easy") {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        // Define prompt with user-selected options
        const prompt = `Generate a JSON array of ${numQuestions} multiple-choice questions based on the provided text.
        - Difficulty level: ${difficulty}
        - Each question should have "question", "options", and "correctAnswer".
        - "options" should be an object with keys "A", "B", "C", "D".
        - "correctAnswer" should be a single letter (A, B, C, or D).
        - Return only pure JSON. No additional text.

        TEXT: ${text}`;

        const result = await model.generateContent([prompt]);
        const response = await result.response.text();

        const jsonMatch = response.match(/\[.*\]/s); // Extract JSON
        if (!jsonMatch) {
            throw new Error("Failed to extract valid JSON from API response");
        }

        return JSON.parse(jsonMatch[0]);
    } catch (error) {
        console.error("Error generating quiz:", error);
        throw new Error("Quiz generation failed");
    }
}


module.exports = { generateQuiz };
