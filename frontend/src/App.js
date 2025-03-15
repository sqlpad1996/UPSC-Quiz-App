import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import QuizPopup from "./components/QuizPopup";

function App() {
    const [quiz, setQuiz] = useState(null);
    const [showQuiz, setShowQuiz] = useState(false);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>AI Exam Prep Assistant</h1>

            {/* File Upload Component */}
            <FileUpload onUploadSuccess={(quizData) => {
                setQuiz(quizData);
                setShowQuiz(true);
            }} />

            {/* Show Quiz Popup if Available */}
            {showQuiz && quiz && <QuizPopup quiz={quiz} onClose={() => setShowQuiz(false)} />}
        </div>
    );
}

export default App;
