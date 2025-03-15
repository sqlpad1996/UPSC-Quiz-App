const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

async function extractText(pdfBuffer, filename) {
    try {
        const data = await pdfParse(pdfBuffer);
        const extractedText = data.text;

        // Save extracted text to a file inside data/extracted_text/
        const filePath = path.join(__dirname, "../../data/extracted_text", filename + ".txt");
        fs.writeFileSync(filePath, extractedText);

        return extractedText;
    } catch (error) {
        throw new Error("Error extracting text from PDF");
    }
}

module.exports = { extractText };
