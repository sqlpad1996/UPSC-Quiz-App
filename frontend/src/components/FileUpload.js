import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const FileUpload = ({ onUploadSuccess }) => {
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // success or error
    const [numQuestions, setNumQuestions] = useState(5);
    const [difficulty, setDifficulty] = useState("Easy");
    const [fileName, setFileName] = useState("");

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length === 0) return;

        const file = acceptedFiles[0];
        setUploading(true);
        setMessage("");
        setMessageType("");
        setFileName(file.name);

        const formData = new FormData();
        formData.append("pdf", file);
        formData.append("numQuestions", numQuestions);
        formData.append("difficulty", difficulty);

        axios
            .post("http://localhost:5000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                setMessage("Upload successful! Generating quiz...");
                setMessageType("success");
                onUploadSuccess(response.data.quiz); // Pass quiz data to parent
            })
            .catch(() => {
                setMessage("Upload failed. Please try again.");
                setMessageType("error");
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

    // Common styles
    const styles = {
        container: {
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            width: "100%",
            margin: 0,
            padding: 0,
            fontFamily: "'Poppins', 'Segoe UI', Roboto, Arial, sans-serif",
            background: "#1e2030",
            color: "#e4e6f1",
            overflow: "hidden",
        },
        header: {
            background: "linear-gradient(135deg, #2b3252 0%, #363b63 100%)",
            padding: "1.5rem 2rem",
            position: "relative",
            overflow: "hidden",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
        },
        headerOverlay: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle at top right, rgba(167, 119, 227, 0.15) 0%, transparent 70%)",
        },
        title: {
            fontSize: "1.8rem",
            fontWeight: "600",
            margin: "0 0 0.3rem 0",
            position: "relative",
            letterSpacing: "-0.5px",
            color: "#fff",
            textShadow: "0 2px 10px rgba(0,0,0,0.2)",
        },
        subtitle: {
            fontSize: "0.9rem",
            fontWeight: "400",
            opacity: "0.8",
            margin: 0,
            position: "relative",
        },
        mainContent: {
            display: "flex",
            flex: 1,
            padding: "0",
            overflow: "hidden",
        },
        sidebar: {
            width: "30%",
            padding: "1.5rem",
            background: "#252a41",
            borderRight: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            flexDirection: "column",
        },
        content: {
            flex: 1,
            padding: "1.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        },
        formGroup: {
            marginBottom: "1.5rem",
            textAlign: "left",
            position: "relative",
            width: "100%",
        },
        label: {
            fontWeight: "500",
            display: "block",
            marginBottom: "0.5rem",
            fontSize: "0.85rem",
            color: "#a9adc1",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
        },
        select: {
            padding: "12px 15px",
            width: "100%",
            borderRadius: "8px",
            border: "1px solid #363b63",
            backgroundColor: "#2b3252",
            fontSize: "0.95rem",
            transition: "all 0.3s ease",
            cursor: "pointer",
            outline: "none",
            color: "#e4e6f1",
            appearance: "none",
            backgroundImage: "url('data:image/svg+xml;utf8,<svg fill=\"%23a9adc1\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 10px center",
        },
        dropzone: {
            border: `2px dashed ${isDragActive ? "#a777e3" : "#363b63"}`,
            padding: "2rem 1.5rem",
            textAlign: "center",
            borderRadius: "12px",
            backgroundColor: isDragActive ? "rgba(167, 119, 227, 0.1)" : "#252a41",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            width: "100%",
            maxWidth: "500px",
            margin: "0 auto",
        },
        dropzoneActive: {
            borderColor: "#a777e3",
            backgroundColor: "rgba(167, 119, 227, 0.15)",
            transform: "scale(1.01)",
            boxShadow: "0 5px 15px rgba(167, 119, 227, 0.2)",
        },
        dropzoneIcon: {
            fontSize: "2.5rem",
            marginBottom: "1rem",
            color: isDragActive ? "#a777e3" : "#a9adc1",
            transition: "all 0.3s ease",
        },
        dropzoneText: {
            fontSize: "1.1rem",
            fontWeight: "500",
            color: isDragActive ? "#a777e3" : "#e4e6f1",
            marginBottom: "0.5rem",
            transition: "all 0.3s ease",
        },
        dropzoneSubtext: {
            fontSize: "0.9rem",
            color: "#a9adc1",
            marginBottom: "0.8rem",
        },
        fileInfo: {
            display: fileName ? "flex" : "none",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.6rem 1rem",
            backgroundColor: "rgba(167, 119, 227, 0.15)",
            borderRadius: "6px",
            marginTop: "1rem",
            gap: "8px",
        },
        fileName: {
            fontWeight: "500",
            color: "#a777e3",
            fontSize: "0.85rem",
            maxWidth: "200px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        },
        fileIcon: {
            color: "#a777e3",
            fontSize: "1.1rem",
        },
        message: {
            padding: "0.8rem 1.2rem",
            borderRadius: "8px",
            marginTop: "1.2rem",
            fontWeight: "500",
            fontSize: "0.9rem",
            backgroundColor: messageType === "success" ? "rgba(46, 213, 115, 0.15)" : messageType === "error" ? "rgba(255, 71, 87, 0.15)" : "transparent",
            color: messageType === "success" ? "#2ed573" : messageType === "error" ? "#ff4757" : "#e4e6f1",
            display: message ? "block" : "none",
            boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
            border: messageType === "success" ? "1px solid rgba(46, 213, 115, 0.3)" : messageType === "error" ? "1px solid rgba(255, 71, 87, 0.3)" : "none",
            maxWidth: "500px",
            width: "100%",
            textAlign: "center",
        },
        uploadingIndicator: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            color: "#a777e3",
        },
        loadingDot: {
            height: "8px",
            width: "8px",
            borderRadius: "50%",
            backgroundColor: "#a777e3",
            animation: "pulse 1.5s infinite ease-in-out",
            display: "inline-block",
            margin: "0 2px",
        },
        fileTypeInfo: {
            fontSize: "0.75rem",
            color: "#a9adc1",
            marginTop: "0.8rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
        },
        infoIcon: {
            fontSize: "0.8rem",
            color: "#a777e3",
        },
        buttonGroup: {
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginTop: "1.5rem",
            width: "100%",
            maxWidth: "500px",
        },
        button: {
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            fontSize: "0.9rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            flex: 1,
        },
        primaryButton: {
            background: "linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)",
            color: "white",
            boxShadow: "0 5px 15px rgba(110, 142, 251, 0.2)",
        },
        secondaryButton: {
            background: "#252a41",
            color: "#a9adc1",
            border: "1px solid #363b63",
        },
        buttonIcon: {
            fontSize: "1.1rem",
        },
        sidebarTitle: {
            fontSize: "1.1rem",
            fontWeight: "600",
            marginBottom: "1.2rem",
            color: "#e4e6f1",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            paddingBottom: "0.8rem",
        },
        infoCard: {
            background: "#2b3252",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1rem",
            border: "1px solid rgba(255,255,255,0.05)",
        },
        infoCardTitle: {
            fontSize: "0.9rem",
            fontWeight: "600",
            marginBottom: "0.5rem",
            color: "#e4e6f1",
        },
        infoCardText: {
            fontSize: "0.8rem",
            color: "#a9adc1",
            lineHeight: "1.4",
        },
        tipsList: {
            margin: "0.5rem 0 0 0",
            padding: "0 0 0 1rem",
            fontSize: "0.8rem",
            color: "#a9adc1",
        },
        tipItem: {
            marginBottom: "0.5rem",
        },
        footer: {
            padding: "0.8rem",
            textAlign: "center",
            fontSize: "0.75rem",
            color: "#a9adc1",
            borderTop: "1px solid rgba(255,255,255,0.05)",
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.headerOverlay}></div>
                <h2 style={styles.title}>Create Your Quiz</h2>
                <p style={styles.subtitle}>Upload your study material to generate personalized questions</p>
            </div>
            
            <div style={styles.mainContent}>
                <div style={styles.sidebar}>
                    <h3 style={styles.sidebarTitle}>Quiz Settings</h3>
                    
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Number of Questions</label>
                        <select 
                            value={numQuestions} 
                            onChange={(e) => setNumQuestions(Number(e.target.value))} 
                            style={styles.select}
                        >
                            <option value={5}>5 Questions</option>
                            <option value={10}>10 Questions</option>
                            <option value={15}>15 Questions</option>
                            <option value={20}>20 Questions</option>
                        </select>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Difficulty Level</label>
                        <select 
                            value={difficulty} 
                            onChange={(e) => setDifficulty(e.target.value)} 
                            style={styles.select}
                        >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                    
                    <div style={styles.infoCard}>
                        <h4 style={styles.infoCardTitle}>Tips for Better Results</h4>
                        <ul style={styles.tipsList}>
                            <li style={styles.tipItem}>Use clear, well-formatted PDFs</li>
                            <li style={styles.tipItem}>Choose difficulty based on your preparation level</li>
                            <li style={styles.tipItem}>Start with fewer questions to test quality</li>
                        </ul>
                    </div>
                </div>
                
                <div style={styles.content}>
                    <div 
                        style={{
                            ...styles.dropzone,
                            ...(isDragActive ? styles.dropzoneActive : {})
                        }} 
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        
                        {uploading ? (
                            <div style={styles.uploadingIndicator}>
                                <span style={styles.dropzoneText}>Uploading</span>
                                <span style={{...styles.loadingDot, animationDelay: "0s"}}></span>
                                <span style={{...styles.loadingDot, animationDelay: "0.2s"}}></span>
                                <span style={{...styles.loadingDot, animationDelay: "0.4s"}}></span>
                            </div>
                        ) : (
                            <>
                                <div style={styles.dropzoneIcon}>
                                    {isDragActive ? "📄" : "📚"}
                                </div>
                                <p style={styles.dropzoneText}>
                                    {isDragActive ? "Drop your PDF here" : "Drag & drop your PDF here"}
                                </p>
                                <p style={styles.dropzoneSubtext}>
                                    or click to browse files
                                </p>
                                
                                <div style={styles.fileTypeInfo}>
                                    <span style={styles.infoIcon}>ℹ️</span> 
                                    Accepts PDF files only
                                </div>
                            </>
                        )}
                        
                        {fileName && !uploading && (
                            <div style={styles.fileInfo}>
                                <span style={styles.fileIcon}>📄</span>
                                <span style={styles.fileName}>{fileName}</span>
                            </div>
                        )}
                    </div>

                    {message && <div style={styles.message}>{message}</div>}
                    
                    <div style={styles.buttonGroup}>
                        <button 
                            style={{...styles.button, ...styles.primaryButton}}
                            onClick={() => document.querySelector('input[type="file"]').click()}
                            disabled={uploading}
                        >
                            <span style={styles.buttonIcon}>📤</span> Select File
                        </button>
                        
                        <button 
                            style={{...styles.button, ...styles.secondaryButton}}
                            onClick={() => {
                                setFileName("");
                                setMessage("");
                            }}
                            disabled={uploading || !fileName}
                        >
                            <span style={styles.buttonIcon}>🗑️</span> Clear
                        </button>
                    </div>
                </div>
            </div>
            
            <div style={styles.footer}>
                UPSC Quiz Generator • Generate questions from your study material
            </div>
            
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
                
                * {
                    box-sizing: border-box;
                }
                
                body {
                    margin: 0;
                    padding: 0;
                    background: #1e2030;
                    color: #e4e6f1;
                    overflow: hidden;
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 0.5; transform: scale(0.8); }
                    50% { opacity: 1; transform: scale(1.2); }
                }
                
                select:hover {
                    border-color: #a777e3;
                }
                
                select:focus {
                    border-color: #6e8efb;
                    box-shadow: 0 0 0 2px rgba(110, 142, 251, 0.2);
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
                }
            `}</style>
        </div>
    );
};

export default FileUpload;
