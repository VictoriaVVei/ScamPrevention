// ScamGuidePage.jsx
import React, { useState, useRef, useMemo, useEffect } from "react";
import styles from "./ScamGuidePage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header/Header.jsx";
import { Footer } from "../../components/Footer/Footer.jsx";
import categoryScam from "../../data/categoryScam.json";

export function ScamGuidePage({ onBack }) {
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
    // Decode the type param and attempt to match category (case-insensitive)
    const { type } = useParams();
    const decodedType = type ? decodeURIComponent(type).trim() : "";
    const matchedCategory = useMemo(() => {
        if (!decodedType) return null;
        return (
            categoryScam.find(
                (c) => c.typeName.toLowerCase() === decodedType.toLowerCase()
            ) || null
        );
    }, [decodedType]);

    // Build dynamic slides from matched category or fallback
    const slides = useMemo(() => {
        if (!matchedCategory) {
            return [
                {
                    id: 0,
                    title: "Category Not Found",
                    text: `No scam category matched: ${decodedType || "(none)"}`,
                },
            ];
        }
        return [
            {
                id: 0,
                title: "Explanation",
                text: matchedCategory.explanation,
            },
            {
                id: 1,
                title: "Warning Signals",
                list: matchedCategory.warningSignals,
            },
            {
                id: 2,
                title: "Prevention Tips",
                list: matchedCategory.preventionTips,
            },
        ];
    }, [matchedCategory, decodedType]);

    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const touchStartX = useRef(null);

    // Reset slide index when category changes
    useEffect(() => {
        setCurrent(0);
    }, [decodedType]);

    //----------------------------------------------

    //----------------------------------------------
    // Func
    //--------------------------------------------------
    const handleNext = () => {
        setCurrent((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
    };

    const handlePrev = () => {
        setCurrent((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        if (touchStartX.current == null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        const threshold = 40;
        if (delta > threshold) {
            handlePrev();
        } else if (delta < -threshold) {
            handleNext();
        }
        touchStartX.current = null;
    };
    //----------------------------------------------

    const handleBackClick = onBack || (() => navigate(-1));

    return (
        <div id={styles.ScamGuidePage}>
            <Header />
            <main className={styles.main}>
                <button className={styles.backButton} onClick={handleBackClick}>
                    <span className={styles.backArrow}>‹</span>
                    <span>Back</span>
                </button>

                <section className={styles.card}>
                    <div className={styles.cardTitleRow}>
                        <span className={styles.cardTitle}>{matchedCategory ? matchedCategory.typeName : (decodedType || "Unknown Category")}</span>
                    </div>
                    {matchedCategory && matchedCategory.tags && matchedCategory.tags.length > 0 && (
                        <div className={styles.tagRow}>
                            {matchedCategory.tags.map((tag) => (
                                <span key={tag} className={styles.tag}>#{tag}</span>
                            ))}
                        </div>
                    )}
                </section>

                <section
                    className={styles.card}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className={styles.slidesViewport}>
                        <div
                            className={styles.slidesTrack}
                            style={{ transform: `translateX(-${current * 100}%)` }}
                        >
                            {slides.map((s) => (
                                <div key={s.id} className={styles.slideItem}>
                                    <div className={styles.slideHeader}>
                                        <span className={styles.slideTitle}>{s.title}</span>
                                    </div>
                                    <div className={styles.slideTextBox}>
                                        {s.list ? (
                                            <ul className={styles.slideText} style={{ paddingLeft: "1.1rem", margin: 0 }}>
                                                {s.list.map((item) => (
                                                    <li key={item}>{item}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className={styles.slideText}>{s.text}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.navRow}>
                        <button
                            className={`${styles.navButton} ${current === 0 ? styles.navDisabled : ""}`}
                            onClick={handlePrev}
                            disabled={current === 0}
                        >
                            <span className={styles.navArrow}>‹</span>
                            <span>Previous</span>
                        </button>

                        <div className={styles.dots}>
                            {slides.map((s) => (
                                <span
                                    key={s.id}
                                    className={`${styles.dot} ${s.id === current ? styles.dotActive : ""}`}
                                />
                            ))}
                        </div>

                        <button
                            className={`${styles.navButton} ${current === slides.length - 1 ? styles.navDisabled : ""}`}
                            onClick={handleNext}
                            disabled={current === slides.length - 1}
                        >
                            <span>Next</span>
                            <span className={styles.navArrow}>›</span>
                        </button>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
