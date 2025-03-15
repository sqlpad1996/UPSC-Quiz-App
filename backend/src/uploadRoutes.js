const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const pdfService = require("./pdfService");
const geminiService = require("./geminiService");

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("pdf"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const filename = req.file.originalname.replace(/\.[^/.]+$/, "");
        const extractedText = await pdfService.extractText(req.file.buffer, filename);
        
        // Get user preferences
        const numQuestions = req.body.numQuestions ? parseInt(req.body.numQuestions) : 5;
        const difficulty = req.body.difficulty || "Easy";

        // Generate quiz with user preferences
        const quiz = await geminiService.generateQuiz(extractedText, numQuestions, difficulty);

        res.json({ message: "Upload successful!", quiz });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Error processing PDF", error: error.message });
    }
});

module.exports = router;
