import React, { useState, useEffect, useCallback } from "react";

const QuizPopup = ({ quiz, onClose }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [answeredQuestions, setAnsweredQuestions] = useState({});
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const question = quiz[currentQuestion];

    const handleSubmitAnswer = useCallback(() => {
        if (!selectedOption) return;

        setAnsweredQuestions((prev) => ({
            ...prev,
            [currentQuestion]: selectedOption === question.correctAnswer ? "✅" : "❌"
        }));

        if (selectedOption === question.correctAnswer) {
            setCorrectAnswers(correctAnswers + 1);
            setFeedback("✅ Correct!");
        } else {
            setFeedback(`❌ Wrong! Correct Answer: ${question.correctAnswer}`);
        }

        setTimeout(() => {
            if (currentQuestion + 1 < quiz.length) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedOption(null);
                setFeedback(null);
            } else {
                setQuizCompleted(true); // Show summary screen
            }
        }, 2000);
    }, [selectedOption, currentQuestion, question, quiz.length, correctAnswers]);

    const handleRestartQuiz = () => {
        setCurrentQuestion(0);
        setSelectedOption(null);
        setFeedback(null);
        setAnsweredQuestions({});
        setCorrectAnswers(0);
        setQuizCompleted(false);
    };

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            fontFamily: "'Poppins', sans-serif"
        }}>
            {/* Quiz Box */}
            <div style={{
                background: "white",
                padding: "40px",
                borderRadius: "12px",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                width: "700px", // ✅ Increased box size
                maxWidth: "90%",
                textAlign: "left" // ✅ Left-align everything
            }}>
                {quizCompleted ? (
                    <>
                        <h2>Quiz Completed!</h2>
                        <p style={{ fontSize: "18px", fontWeight: "bold", marginTop: "10px" }}>
                            🎯 Score: {correctAnswers} / {quiz.length} ({Math.round((correctAnswers / quiz.length) * 100)}%)
                        </p>
                        <p>Would you like to try again?</p>
                        {/* ✅ Retry Button */}
                        <button onClick={handleRestartQuiz} style={{
                            marginTop: "10px",
                            padding: "12px 20px",
                            fontSize: "16px",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            transition: "0.3s"
                        }}>
                            Retry Quiz
                        </button>
                        <button onClick={onClose} style={{
                            marginTop: "10px",
                            marginLeft: "10px",
                            padding: "12px 20px",
                            fontSize: "16px",
                            backgroundColor: "#F44336",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            transition: "0.3s"
                        }}>
                            Exit
                        </button>
                    </>
                ) : (
                    <>
                        {/* Question Title */}
                        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
                            {question.question}
                        </h2>

                        {/* Answer Options */}
                        <div style={{ marginTop: "20px" }}>
                            {["A", "B", "C", "D"].map((option) => (
                                <button key={option}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        width: "100%",
                                        margin: "12px 0",
                                        padding: "16px",
                                        fontSize: "18px",
                                        textAlign: "left",
                                        backgroundColor: selectedOption === option ? "#e8f5e9" : "white",
                                        color: "#333",
                                        border: selectedOption === option ? "2px solid #4CAF50" : "2px solid #ddd",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                        transition: "0.3s",
                                        boxShadow: selectedOption === option ? "0px 2px 5px rgba(0, 255, 0, 0.3)" : "0px 2px 5px rgba(0, 0, 0, 0.1)"
                                    }}
                                    disabled={feedback !== null}
                                    onClick={() => setSelectedOption(option)}
                                >
                                    <span style={{
                                        display: "inline-block",
                                        width: "50px",
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        marginRight: "10px"
                                    }}>
                                        {option}.
                                    </span>
                                    {question.options[option]}
                                </button>
                            ))}
                        </div>

                        {/* ✅ Submit Answer Button */}
                        <button onClick={handleSubmitAnswer}
                            style={{
                                marginTop: "20px",
                                width: "100%",
                                padding: "16px",
                                fontSize: "18px",
                                backgroundColor: selectedOption ? "#4CAF50" : "#ddd",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                cursor: selectedOption ? "pointer" : "not-allowed",
                                fontWeight: "bold",
                                transition: "0.3s"
                            }}
                            disabled={!selectedOption || feedback !== null}
                        >
                            Submit Answer
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default QuizPopup;
