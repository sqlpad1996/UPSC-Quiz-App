import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const FileUpload = ({ onUploadSuccess }) => {
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [numQuestions, setNumQuestions] = useState(5);
    const [difficulty, setDifficulty] = useState("Easy");

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length === 0) return;

        const file = acceptedFiles[0];
        setUploading(true);
        setMessage("");

        const formData = new FormData();
        formData.append("pdf", file);
        formData.append("numQuestions", numQuestions);
        formData.append("difficulty", difficulty);

        axios
            .post("http://localhost:5000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                setMessage("Upload successful!");
                onUploadSuccess(response.data.quiz); // Pass quiz data to parent
            })
            .catch(() => {
                setMessage("Upload failed!");
            })
            .finally(() => {
                setUploading(false);
            });
    }, [onUploadSuccess, numQuestions, difficulty]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "application/pdf": [".pdf"] },
        multiple: false,
    });

    return (
        <div style={{
            textAlign: "center",
            maxWidth: "500px",
            margin: "auto",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)"
        }}>
            <h2 style={{ marginBottom: "10px" }}>Upload Study Material</h2>

            {/* Number of Questions Selection */}
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Select Number of Questions:</label>
            <select value={numQuestions} onChange={(e) => setNumQuestions(Number(e.target.value))} style={{
                padding: "8px",
                width: "100%",
                marginBottom: "15px",
                borderRadius: "5px",
                border: "1px solid #ccc"
            }}>
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
                <option value={15}>15 Questions</option>
            </select>

            {/* Difficulty Level Selection */}
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Select Difficulty Level:</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} style={{
                padding: "8px",
                width: "100%",
                marginBottom: "15px",
                borderRadius: "5px",
                border: "1px solid #ccc"
            }}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>

            {/* Drag and Drop Box */}
            <div style={{
                border: "2px dashed #ccc",
                padding: "30px",
                textAlign: "center",
                borderRadius: "10px",
                backgroundColor: isDragActive ? "#f0f8ff" : "#ffffff",
                cursor: "pointer",
                marginBottom: "15px"
            }} {...getRootProps()}>
                <input {...getInputProps()} />
                <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {uploading ? "Uploading..." : "Drag & drop your file here"}
                </p>
                <p style={{ fontSize: "14px", color: "#666" }}>or click to select a file</p>
            </div>

            {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
        </div>
    );
};

export default FileUpload;
