// DailyQuestionPage.jsx
import React, { useState, useEffect } from "react";
import styles from "./DailyQuestion.module.css";
import { Header } from "../../components/Header/Header.jsx";
import { Footer } from "../../components/Footer/Footer.jsx";
import { useNavigate } from "react-router-dom";
import DAILY_QUESTIONS from "../../data/dailyQuestion.json";


export function DailyQuestion({ onBack }) {
    //----------------------------------------------
    // Domain
    //--------------------------------------------------
    const domain =
        process.env.NODE_ENV === "development"
            ? "http://localhost:4000"
            : "http://localhost:4000";
    //----------------------------------------------

    //----------------------------------------------
    // Var
    //--------------------------------------------------
    // helper to get local date string YYYY-MM-DD
    const getTodayStr = () => {
        const d = new Date();
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${y}-${m}-${day}`;
    };

    // read saved state for today (if any)
    const todayStr = getTodayStr();
    let savedForToday = null;
    try {
        const savedRaw = localStorage.getItem("dailyQuiz");
        const saved = savedRaw ? JSON.parse(savedRaw) : null;
        if (saved && saved.date === todayStr) savedForToday = saved;
    } catch (_) { }

    // pick today's question (use saved id if exists for today; else random)
    const [question] = useState(() => {
        const list = Array.isArray(DAILY_QUESTIONS) ? DAILY_QUESTIONS : [];
        if (!list.length) return null;
        if (savedForToday && savedForToday.id != null) {
            const found = list.find((q) => q.id === savedForToday.id);
            if (found) return found;
        }
        const idx = Math.floor(Math.random() * list.length);
        return list[idx];
    });
    const [selectedIndex, setSelectedIndex] = useState(() => savedForToday?.selectedIndex ?? null);
    const [hasSubmitted, setHasSubmitted] = useState(() => savedForToday?.hasSubmitted ?? false);
    const [isCorrect, setIsCorrect] = useState(() => savedForToday?.isCorrect ?? false);
    const navigate = useNavigate();
    //----------------------------------------------

    //----------------------------------------------
    // Func
    //--------------------------------------------------
    const handleSubmit = () => {
        if (selectedIndex == null) return;
        if (!question) return;
        const correct = selectedIndex === question.correctAnswer;
        setIsCorrect(correct);
        setHasSubmitted(true);
        // lock today's question after completion until next day, and store result
        try {
            localStorage.setItem(
                "dailyQuiz",
                JSON.stringify({
                    date: todayStr,
                    id: question.id,
                    selectedIndex,
                    hasSubmitted: true,
                    isCorrect: correct,
                })
            );
        } catch (_) { }
    };

    // Persist selection even before submit so refresh keeps user's choice
    useEffect(() => {
        if (!question) return;
        try {
            const next = {
                date: todayStr,
                id: question.id,
                selectedIndex,
                hasSubmitted,
                isCorrect,
            };
            localStorage.setItem("dailyQuiz", JSON.stringify(next));
        } catch (_) { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedIndex]);

    const handleSelect = (index) => {
        if (hasSubmitted) return;
        setSelectedIndex(index);
    };

    const getOptionClass = (index) => {
        const classes = [styles.option];

        if (!hasSubmitted) {
            if (index === selectedIndex) classes.push(styles.optionSelected);
            return classes.join(" ");
        }

        if (index === (question?.correctAnswer ?? -1)) {
            classes.push(styles.optionCorrect);
        }
        if (!isCorrect && index === selectedIndex && index !== (question?.correctAnswer ?? -1)) {
            classes.push(styles.optionWrong);
        }
        return classes.join(" ");
    };

    const handleBack = () => {
        navigate("/main");
    };
    //----------------------------------------------

    return (
        <div id={styles.DailyQuestion}>
            <Header />
            <main className={styles.main}>
                <div className={"backBtn"} onClick={handleBack}>
                    &lt; Back to Main
                </div>

                {/* Main card */}
                <section
                    className={`${styles.card} ${hasSubmitted && !isCorrect ? styles.cardShake : ""}`}
                >
                    <div className={styles.cardHeader}>
                        <div className={styles.sectionTitle}>Daily Question</div>
                        <div className={styles.progressText}>1 question per day</div>
                    </div>

                    <div className={styles.questionBox}>
                        <p className={styles.questionText}>{question?.question || ""}</p>
                    </div>

                    <div className={styles.optionsList}>
                        {(question?.options || []).map((opt, index) => (
                            <button
                                key={index}
                                type="button"
                                className={getOptionClass(index)}
                                onClick={() => handleSelect(index)}
                            >
                                <span className={styles.optionCircle} />
                                <span className={styles.optionText}>{opt}</span>
                            </button>
                        ))}
                    </div>

                    <button
                        className={`${styles.submitButton} mainStartBtn`}
                        onClick={handleSubmit}
                        disabled={selectedIndex == null || hasSubmitted}
                    >
                        Submit Answer
                    </button>

                    {hasSubmitted && (
                        <div
                            className={`${styles.resultBanner} ${isCorrect ? styles.resultCorrect : styles.resultIncorrect}`}
                        >
                            {isCorrect ? (
                                <>
                                    <span className={styles.resultIcon}>✓</span>
                                    <span>{question?.whyCorrect || "This is correct."}</span>
                                </>
                            ) : (
                                <>
                                    <span className={styles.resultIcon}>✗</span>
                                    <span>
                                        {(() => {
                                            const q = question;
                                            if (!q) return "Incorrect.";
                                            const total = q.options?.length || 0;
                                            const correctIdx = q.correctAnswer;
                                            const arr = Array(total).fill("");
                                            let k = 0;
                                            for (let i = 0; i < total; i++) {
                                                if (i === correctIdx) {
                                                    arr[i] = q.whyCorrect || "This is correct.";
                                                } else {
                                                    arr[i] = (q.whyIncorrect && q.whyIncorrect[k]) || "";
                                                    k++;
                                                }
                                            }
                                            return arr[selectedIndex] || "Incorrect.";
                                        })()}
                                    </span>
                                </>
                            )}
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
}
