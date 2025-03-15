import React, { useState, useEffect, useCallback } from "react";

const QuizPopup = ({ quiz, onClose }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [answeredQuestions, setAnsweredQuestions] = useState({});
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [showFeedbackAnimation, setShowFeedbackAnimation] = useState(false);

    const question = quiz[currentQuestion];

    const handleSubmitAnswer = useCallback(() => {
        if (!selectedOption) return;

        setAnsweredQuestions((prev) => ({
            ...prev,
            [currentQuestion]: selectedOption === question.correctAnswer ? "✅" : "❌"
        }));

        if (selectedOption === question.correctAnswer) {
            setCorrectAnswers(correctAnswers + 1);
            setFeedback("correct");
        } else {
            setFeedback("incorrect");
        }

        setShowFeedbackAnimation(true);

        setTimeout(() => {
            setShowFeedbackAnimation(false);
            setTimeout(() => {
                if (currentQuestion + 1 < quiz.length) {
                    setCurrentQuestion(currentQuestion + 1);
                    setSelectedOption(null);
                    setFeedback(null);
                } else {
                    setQuizCompleted(true); // Show summary screen
                }
            }, 300);
        }, 1500);
    }, [selectedOption, currentQuestion, question, quiz.length, correctAnswers]);

    const handleRestartQuiz = () => {
        setCurrentQuestion(0);
        setSelectedOption(null);
        setFeedback(null);
        setAnsweredQuestions({});
        setCorrectAnswers(0);
        setQuizCompleted(false);
    };

    // Progress calculation
    const progress = ((currentQuestion + 1) / quiz.length) * 100;
    
    // Score calculation for completed quiz
    const scorePercentage = Math.round((correctAnswers / quiz.length) * 100);
    const scoreGrade = 
        scorePercentage >= 90 ? "Excellent!" :
        scorePercentage >= 75 ? "Great Job!" :
        scorePercentage >= 60 ? "Good Work!" :
        scorePercentage >= 40 ? "Keep Practicing!" : "Try Again!";

    // Common styles
    const styles = {
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(20, 22, 36, 0.85)",
            backdropFilter: "blur(8px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            fontFamily: "'Poppins', sans-serif",
            transition: "all 0.3s ease",
        },
        quizBox: {
            background: "#252a41",
            padding: "0",
            borderRadius: "16px",
            boxShadow: "0px 15px 35px rgba(0, 0, 0, 0.25)",
            width: "800px",
            maxWidth: "90%",
            textAlign: "left",
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            display: "flex",
            flexDirection: "column",
            maxHeight: "90vh",
        },
        header: {
            background: "linear-gradient(135deg, #2b3252 0%, #363b63 100%)",
            padding: "1.5rem 2rem",
            position: "relative",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        },
        headerOverlay: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle at top right, rgba(167, 119, 227, 0.15) 0%, transparent 70%)",
        },
        content: {
            padding: "2rem",
            flex: 1,
            overflowY: "auto",
        },
        progressContainer: {
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        },
        progressBar: {
            height: "6px",
            backgroundColor: "#363b63",
            borderRadius: "3px",
            flex: 1,
            marginRight: "15px",
            overflow: "hidden",
        },
        progressFill: {
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #6e8efb 0%, #a777e3 100%)",
            borderRadius: "3px",
            transition: "width 0.5s ease",
        },
        progressText: {
            color: "#a9adc1",
            fontSize: "0.9rem",
            fontWeight: "500",
            whiteSpace: "nowrap",
        },
        questionTitle: {
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
            color: "#e4e6f1",
            lineHeight: "1.4",
        },
        optionsContainer: {
            marginTop: "1.5rem",
        },
        optionButton: {
            display: "flex",
            alignItems: "center",
            width: "100%",
            margin: "12px 0",
            padding: "16px",
            fontSize: "1rem",
            textAlign: "left",
            backgroundColor: "#2b3252",
            color: "#e4e6f1",
            border: "1px solid #363b63",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "500",
            transition: "all 0.2s ease",
            position: "relative",
            overflow: "hidden",
        },
        optionSelected: {
            backgroundColor: "rgba(167, 119, 227, 0.15)",
            borderColor: "#a777e3",
            boxShadow: "0px 4px 15px rgba(167, 119, 227, 0.2)",
        },
        optionCorrect: {
            backgroundColor: "rgba(46, 213, 115, 0.15)",
            borderColor: "#2ed573",
            boxShadow: "0px 4px 15px rgba(46, 213, 115, 0.2)",
        },
        optionIncorrect: {
            backgroundColor: "rgba(255, 71, 87, 0.15)",
            borderColor: "#ff4757",
            boxShadow: "0px 4px 15px rgba(255, 71, 87, 0.2)",
        },
        optionDisabled: {
            opacity: 0.7,
            cursor: "not-allowed",
        },
        optionLetter: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "#363b63",
            color: "#e4e6f1",
            fontWeight: "600",
            marginRight: "15px",
            flexShrink: 0,
            transition: "all 0.2s ease",
        },
        optionLetterSelected: {
            backgroundColor: "#a777e3",
            color: "white",
        },
        optionLetterCorrect: {
            backgroundColor: "#2ed573",
            color: "white",
        },
        optionLetterIncorrect: {
            backgroundColor: "#ff4757",
            color: "white",
        },
        optionText: {
            flex: 1,
        },
        submitButton: {
            marginTop: "2rem",
            width: "100%",
            padding: "16px",
            fontSize: "1rem",
            backgroundColor: selectedOption ? "linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)" : "#363b63",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: selectedOption ? "pointer" : "not-allowed",
            fontWeight: "600",
            transition: "all 0.3s ease",
            background: selectedOption ? "linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)" : "#363b63",
            boxShadow: selectedOption ? "0 5px 15px rgba(110, 142, 251, 0.3)" : "none",
            opacity: selectedOption ? 1 : 0.7,
        },
        feedbackOverlay: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: feedback === "correct" ? "rgba(46, 213, 115, 0.15)" : "rgba(255, 71, 87, 0.15)",
            backdropFilter: "blur(4px)",
            zIndex: 10,
            opacity: showFeedbackAnimation ? 1 : 0,
            visibility: showFeedbackAnimation ? "visible" : "hidden",
            transition: "all 0.3s ease",
        },
        feedbackIcon: {
            fontSize: "5rem",
            color: feedback === "correct" ? "#2ed573" : "#ff4757",
            animation: "pulse 0.5s ease-in-out",
        },
        feedbackText: {
            fontSize: "1.5rem",
            fontWeight: "600",
            color: feedback === "correct" ? "#2ed573" : "#ff4757",
            marginTop: "1rem",
            textAlign: "center",
        },
        correctAnswer: {
            fontSize: "1rem",
            color: "#e4e6f1",
            marginTop: "0.5rem",
            textAlign: "center",
        },
        summaryContainer: {
            textAlign: "center",
            padding: "1rem",
        },
        summaryTitle: {
            fontSize: "2rem",
            fontWeight: "700",
            color: "#e4e6f1",
            marginBottom: "1.5rem",
        },
        scoreContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "2rem 0",
        },
        scoreCircle: {
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: "#2b3252",
            border: "8px solid",
            borderColor: 
                scorePercentage >= 90 ? "#2ed573" :
                scorePercentage >= 75 ? "#7bed9f" :
                scorePercentage >= 60 ? "#ffdd59" :
                scorePercentage >= 40 ? "#ff9f43" : "#ff4757",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            position: "relative",
            overflow: "hidden",
        },
        scoreCircleOverlay: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 70%)",
        },
        scorePercentage: {
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#e4e6f1",
            lineHeight: 1,
        },
        scoreText: {
            fontSize: "0.9rem",
            color: "#a9adc1",
            marginTop: "5px",
        },
        scoreGrade: {
            fontSize: "1.5rem",
            fontWeight: "600",
            color: 
                scorePercentage >= 90 ? "#2ed573" :
                scorePercentage >= 75 ? "#7bed9f" :
                scorePercentage >= 60 ? "#ffdd59" :
                scorePercentage >= 40 ? "#ff9f43" : "#ff4757",
            marginTop: "1rem",
        },
        scoreDetails: {
            fontSize: "1.1rem",
            color: "#a9adc1",
            margin: "1rem 0",
        },
        buttonGroup: {
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginTop: "2rem",
        },
        button: {
            padding: "14px 25px",
            borderRadius: "10px",
            border: "none",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
        },
        primaryButton: {
            background: "linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)",
            color: "white",
            boxShadow: "0 5px 15px rgba(110, 142, 251, 0.3)",
        },
        secondaryButton: {
            background: "#363b63",
            color: "#e4e6f1",
            border: "1px solid rgba(255,255,255,0.1)",
        },
        buttonIcon: {
            fontSize: "1.2rem",
        },
        closeButton: {
            position: "absolute",
            top: "15px",
            right: "15px",
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.7)",
            fontSize: "1.5rem",
            cursor: "pointer",
            zIndex: 5,
            transition: "all 0.2s ease",
            width: "30px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
        },
        feedbackContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            animation: "fadeIn 0.5s ease-in-out",
        },
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.quizBox}>
                <div style={styles.header}>
                    <div style={styles.headerOverlay}></div>
                    <button 
                        style={styles.closeButton}
                        onClick={onClose}
                        aria-label="Close quiz"
                    >
                        ✕
                    </button>
                    <h2 style={{
                        fontSize: "1.5rem",
                        fontWeight: "600",
                        margin: 0,
                        color: "#fff",
                        position: "relative",
                    }}>
                        {quizCompleted ? "Quiz Results" : "Quiz in Progress"}
                    </h2>
                    {!quizCompleted && (
                        <p style={{
                            fontSize: "0.9rem",
                            margin: "0.5rem 0 0 0",
                            color: "rgba(255,255,255,0.7)",
                            position: "relative",
                        }}>
                            Question {currentQuestion + 1} of {quiz.length}
                        </p>
                    )}
                </div>

                <div style={styles.content}>
                    {quizCompleted ? (
                        <div style={styles.summaryContainer}>
                            <h3 style={styles.summaryTitle}>Quiz Completed!</h3>
                            
                            <div style={styles.scoreContainer}>
                                <div style={styles.scoreCircle}>
                                    <div style={styles.scoreCircleOverlay}></div>
                                    <span style={styles.scorePercentage}>{scorePercentage}%</span>
                                    <span style={styles.scoreText}>Score</span>
                                </div>
                                <div style={styles.scoreGrade}>{scoreGrade}</div>
                            </div>
                            
                            <p style={styles.scoreDetails}>
                                You answered <strong>{correctAnswers}</strong> out of <strong>{quiz.length}</strong> questions correctly
                            </p>
                            
                            <div style={styles.buttonGroup}>
                                <button 
                                    onClick={handleRestartQuiz} 
                                    style={{...styles.button, ...styles.primaryButton}}
                                >
                                    <span style={styles.buttonIcon}>🔄</span> Try Again
                                </button>
                                <button 
                                    onClick={onClose} 
                                    style={{...styles.button, ...styles.secondaryButton}}
                                >
                                    <span style={styles.buttonIcon}>✖️</span> Exit Quiz
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div style={styles.progressContainer}>
                                <div style={styles.progressBar}>
                                    <div style={styles.progressFill}></div>
                                </div>
                                <div style={styles.progressText}>
                                    {currentQuestion + 1}/{quiz.length}
                                </div>
                            </div>

                            <h3 style={styles.questionTitle}>
                                {question.question}
                            </h3>

                            <div style={styles.optionsContainer}>
                                {["A", "B", "C", "D"].map((option) => {
                                    const isSelected = selectedOption === option;
                                    const isCorrect = feedback !== null && option === question.correctAnswer;
                                    const isIncorrect = feedback !== null && isSelected && !isCorrect;
                                    
                                    let optionStyle = {...styles.optionButton};
                                    let letterStyle = {...styles.optionLetter};
                                    
                                    if (isSelected) {
                                        optionStyle = {...optionStyle, ...styles.optionSelected};
                                        letterStyle = {...letterStyle, ...styles.optionLetterSelected};
                                    }
                                    
                                    if (isCorrect) {
                                        optionStyle = {...optionStyle, ...styles.optionCorrect};
                                        letterStyle = {...letterStyle, ...styles.optionLetterCorrect};
                                    }
                                    
                                    if (isIncorrect) {
                                        optionStyle = {...optionStyle, ...styles.optionIncorrect};
                                        letterStyle = {...letterStyle, ...styles.optionLetterIncorrect};
                                    }
                                    
                                    if (feedback !== null) {
                                        optionStyle = {...optionStyle, ...styles.optionDisabled};
                                    }
                                    
                                    return (
                                        <button 
                                            key={option}
                                            style={optionStyle}
                                            disabled={feedback !== null}
                                            onClick={() => setSelectedOption(option)}
                                        >
                                            <span style={letterStyle}>
                                                {option}
                                            </span>
                                            <span style={styles.optionText}>
                                                {question.options[option]}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            <button 
                                onClick={handleSubmitAnswer}
                                style={styles.submitButton}
                                disabled={!selectedOption || feedback !== null}
                            >
                                Submit Answer
                            </button>
                            
                            {/* Feedback Overlay */}
                            <div style={styles.feedbackOverlay}>
                                <div style={styles.feedbackContainer}>
                                    <div style={styles.feedbackIcon}>
                                        {feedback === "correct" ? "✅" : "❌"}
                                    </div>
                                    <div style={styles.feedbackText}>
                                        {feedback === "correct" ? "Correct!" : "Incorrect!"}
                                    </div>
                                    {feedback === "incorrect" && (
                                        <div style={styles.correctAnswer}>
                                            Correct answer: {question.correctAnswer}. {question.options[question.correctAnswer]}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            
            <style jsx global>{`
                @keyframes pulse {
                    0% { transform: scale(0.8); opacity: 0; }
                    50% { transform: scale(1.2); opacity: 1; }
                    100% { transform: scale(1); opacity: 1; }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 7px 15px rgba(110, 142, 251, 0.3);
                }
                
                button:active {
                    transform: translateY(0);
                }
                
                button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none;
                    box-shadow: none;
                }
                
                ${styles.closeButton}:hover {
                    color: white;
                    background: rgba(255,255,255,0.1);
                    transform: rotate(90deg);
                }
                
                ${styles.content} {
                    scrollbar-width: thin;
                    scrollbar-color: #363b63 #252a41;
                }
                
                ${styles.content}::-webkit-scrollbar {
                    width: 8px;
                }
                
                ${styles.content}::-webkit-scrollbar-track {
                    background: #252a41;
                }
                
                ${styles.content}::-webkit-scrollbar-thumb {
                    background-color: #363b63;
                    border-radius: 4px;
                }
            `}</style>
        </div>
    );
};

export default QuizPopup;
