// ResultPage.jsx
import React, { useMemo, useState } from "react";
import styles from "./DetectionResult.module.css";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header.jsx";
import { Footer } from "../../components/Footer/Footer.jsx";
import { useScamContext } from "../../assets/ScamContext.jsx";

export function DetectionResult({ onBack, onPlayAgain }) {
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
    const [openSection, setOpenSection] = useState(null);
    const navigate = useNavigate();
    const { resultSavedMessages = [], resultCorrectScams = [], savedMessages = [], correctScams = [] } = useScamContext() || {};

    const keyOf = (m) => `${m.sourceApp}-${m.id}`;
    // Prefer finalized result arrays; fall back to current if not yet finalized
    const sourceSaved = (resultSavedMessages && resultSavedMessages.length > 0) ? resultSavedMessages : savedMessages;
    const sourceTruth = (resultCorrectScams && resultCorrectScams.length > 0) ? resultCorrectScams : correctScams;

    //----------------------------------------------

    //----------------------------------------------
    // Func
    //--------------------------------------------------
    // Removed snapshot/sessionStorage approach; now relying on context's finalized result arrays.

    const appLabel = (app) => {
        if (!app) return 'Unknown';
        const map = {
            tinder: 'Tinder',
            wechat: 'WeChat',
            mail: 'Mail',
            photos: 'Photos',
            message: 'Message',
            phone: 'Phone',
            bank: 'Bank',
        };
        const key = String(app).toLowerCase();
        return map[key] || (String(app).charAt(0).toUpperCase() + String(app).slice(1));
    };

    const stats = useMemo(() => {
        const truthMap = new Map(sourceTruth.map((m) => [keyOf(m), m]));
        const savedMap = new Map(sourceSaved.map((m) => [keyOf(m), m]));

        const correctlyIdentified = sourceSaved.filter((m) => truthMap.has(keyOf(m))); // TP
        const falsePos = sourceSaved.filter((m) => !truthMap.has(keyOf(m))); // FP
        const missed = sourceTruth.filter((m) => !savedMap.has(keyOf(m))); // FN
        const totalScams = sourceTruth.length;

        const TP = correctlyIdentified.length;
        const FP = falsePos.length;
        const FN = missed.length;

        // formula: (1/Total) * TP - (1/Total) * FP - (1/Total) * 0.5 * FN (floored at 0)
        const weight = totalScams > 0 ? 1 / totalScams : 0;
        const scoreRaw = weight * (TP - FP - 0.5 * FN);
        const score = Math.max(0, scoreRaw);
        const rate = Math.round(score * 100);

        return { correctlyIdentified, falsePos, missed, totalScams, TP, FP, FN, scoreRaw, score, rate };
    }, [sourceSaved, sourceTruth]);

    const goStudy = (item) => {
        const type = item?.type || 'General';
        navigate(`/detection-game/guide/${encodeURIComponent(type)}`);
    };

    const toggle = (key) => {
        setOpenSection(openSection === key ? null : key);
    };

    const isOpen = (key) => openSection === key;

    const handleBack = () => {
        navigate("/main");
    };
    const handlePlayAgain = onPlayAgain || (() => navigate('/detection-game/play'));

    return (
        <div id={styles.DetectionResult}>
            <Header />
            <main className={styles.main}>
                <div className={"backBtn"} onClick={handleBack}>
                    &lt; Back to Main
                </div>

                <section className={styles.hero}>
                    <p className={styles.heroTop}>Time is Up !</p>
                    <p className={styles.heroRate}>{stats.rate}%</p>
                    <p className={styles.heroBottom}>Detection Rate</p>
                </section>

                <section className={styles.card}>
                    <h2 className={styles.cardTitle}>Results</h2>

                    {/* Correctly Identified */}
                    <div
                        className={`${styles.block} ${styles.greenBlock}`}
                        onClick={() => toggle('correct')}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggle('correct')}
                    >
                        <div className={styles.row}>
                            <div className={styles.left}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.7905 9.99539C22.247 12.2357 21.9217 14.5647 20.8688 16.5941C19.8159 18.6236 18.0991 20.2307 16.0047 21.1476C13.9103 22.0644 11.5649 22.2355 9.35954 21.6324C7.15423 21.0293 5.22234 19.6883 3.88604 17.8332C2.54974 15.9781 1.88981 13.7209 2.01629 11.4381C2.14278 9.15531 3.04803 6.98486 4.5811 5.28873C6.11416 3.59259 8.18237 2.47328 10.4408 2.11747C12.6993 1.76166 15.0114 2.19084 16.9917 3.33346" stroke="#00A63E" stroke-width="1.99908" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8.99609 10.9949L11.9947 13.9936L21.9901 3.99817" stroke="#00A63E" stroke-width="1.99908" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span className={styles.label}>Correctly Identified</span>
                            </div>
                            <span className={styles.value}>{stats.correctlyIdentified.length}</span>
                        </div>

                        <div className={`${styles.detailBox} ${isOpen('correct') ? styles.open : styles.closed}`}>
                            {isOpen('correct') && (
                                <div className={styles.hint}>Click any item to view its detailed scam explanation.</div>
                            )}
                            {stats.correctlyIdentified.map((it) => (
                                <div key={keyOf(it)} className={styles.detailItem}>
                                    <span className={styles.appTag}>{appLabel(it.sourceApp)}</span>
                                    <span className={styles.detailLink} onClick={() => goStudy(it)}>
                                        {it.shortSummary || it.title || 'Item'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* False Positives */}
                    <div
                        className={`${styles.block} ${styles.redBlock}`}
                        onClick={() => toggle('false')}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggle('false')}
                    >
                        <div className={styles.row}>
                            <div className={styles.left}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.9944 21.9898C17.5147 21.9898 21.9898 17.5147 21.9898 11.9944C21.9898 6.47411 17.5147 1.99902 11.9944 1.99902C6.47411 1.99902 1.99902 6.47411 1.99902 11.9944C1.99902 17.5147 6.47411 21.9898 11.9944 21.9898Z" stroke="#E7000B" stroke-width="1.99908" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14.9933 8.99585L8.99609 14.9931" stroke="#E7000B" stroke-width="1.99908" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8.99609 8.99585L14.9933 14.9931" stroke="#E7000B" stroke-width="1.99908" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span className={styles.label}>False Positives</span>
                            </div>
                            <span className={styles.value}>{stats.falsePos.length}</span>
                        </div>

                        <div className={`${styles.detailBox} ${isOpen('false') ? styles.open : styles.closed}`}>
                            {isOpen('false') && (
                                <div className={styles.hint}>Click any item to view its detailed scam explanation.</div>
                            )}
                            {stats.falsePos.map((it) => (
                                <div key={keyOf(it)} className={styles.detailItem}>
                                    <span className={styles.appTag}>{appLabel(it.sourceApp)}</span>
                                    <span className={styles.detailLink} onClick={() => goStudy(it)}>
                                        {it.shortSummary || it.title || 'Item'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Missed Scams */}
                    <div
                        className={`${styles.block} ${styles.yellowBlock}`}
                        onClick={() => toggle('missed')}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggle('missed')}
                    >
                        <div className={styles.row}>
                            <div className={styles.left}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.7203 17.9917L13.724 3.99817C13.5497 3.69052 13.2968 3.43462 12.9913 3.25658C12.6858 3.07854 12.3385 2.98474 11.9848 2.98474C11.6312 2.98474 11.2839 3.07854 10.9784 3.25658C10.6728 3.43462 10.42 3.69052 10.2456 3.99817L2.24932 17.9917C2.07308 18.2969 1.98067 18.6433 1.98145 18.9958C1.98223 19.3482 2.07618 19.6942 2.25376 19.9986C2.43135 20.3031 2.68626 20.5551 2.99267 20.7293C3.29908 20.9035 3.64608 20.9935 3.99851 20.9903H19.9911C20.3419 20.99 20.6863 20.8973 20.99 20.7217C21.2936 20.5461 21.5456 20.2938 21.7209 19.9899C21.8961 19.6861 21.9883 19.3415 21.9882 18.9907C21.9881 18.64 21.8957 18.2955 21.7203 17.9917Z" stroke="#E17100" stroke-width="1.99908" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M11.9941 8.99585V12.994" stroke="#E17100" stroke-width="1.99908" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M11.9941 16.9922H12.0041" stroke="#E17100" stroke-width="1.99908" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span className={styles.label}>Missed Scams</span>
                            </div>
                            <span className={styles.value}>{stats.missed.length}</span>
                        </div>

                        <div className={`${styles.detailBox} ${isOpen('missed') ? styles.open : styles.closed}`}>
                            {isOpen('missed') && (
                                <div className={styles.hint}>Click any item to view its detailed scam explanation.</div>
                            )}
                            {stats.missed.map((it) => (
                                <div key={keyOf(it)} className={styles.detailItem}>
                                    <span className={styles.appTag}>{appLabel(it.sourceApp)}</span>
                                    <span className={styles.detailLink} onClick={() => goStudy(it)}>
                                        {it.shortSummary || it.title || 'Item'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Total Scams */}
                    <div className={`${styles.block} ${styles.whiteBlock}`}>
                        <div className={styles.row}>
                            <div className={styles.left}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.7203 17.9917L13.724 3.99817C13.5497 3.69052 13.2968 3.43462 12.9913 3.25658C12.6858 3.07854 12.3385 2.98474 11.9848 2.98474C11.6312 2.98474 11.2839 3.07854 10.9784 3.25658C10.6728 3.43462 10.42 3.69052 10.2456 3.99817L2.24932 17.9917C2.07308 18.2969 1.98067 18.6433 1.98145 18.9958C1.98223 19.3482 2.07618 19.6942 2.25376 19.9986C2.43135 20.3031 2.68626 20.5551 2.99267 20.7293C3.29908 20.9035 3.64608 20.9935 3.99851 20.9903H19.9911C20.3419 20.99 20.6863 20.8973 20.99 20.7217C21.2936 20.5461 21.5456 20.2938 21.7209 19.9899C21.8961 19.6861 21.9883 19.3415 21.9882 18.9907C21.9881 18.64 21.8957 18.2955 21.7203 17.9917Z" stroke="#4A5565" stroke-width="1.99908" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M11.9941 8.99585V12.994" stroke="#4A5565" stroke-width="1.99908" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M11.9941 16.9922H12.0041" stroke="#4A5565" stroke-width="1.99908" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span className={styles.label}>Total Scams</span>
                            </div>
                            <span className={styles.value}>{stats.totalScams}</span>
                        </div>
                    </div>
                </section>

                {/* Play Again */}
                <div className={styles.btnWrap}>
                    <button className="mainStartBtn" onClick={handlePlayAgain}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.99854 11.9945C2.99854 13.7737 3.52613 15.513 4.51461 16.9923C5.50309 18.4717 6.90805 19.6247 8.55182 20.3056C10.1956 20.9865 12.0044 21.1646 13.7494 20.8175C15.4944 20.4704 17.0973 19.6136 18.3554 18.3555C19.6135 17.0974 20.4703 15.4945 20.8174 13.7495C21.1645 12.0045 20.9863 10.1957 20.3055 8.55195C19.6246 6.90817 18.4716 5.50321 16.9922 4.51473C15.5129 3.52625 13.7736 2.99866 11.9944 2.99866C9.4795 3.00812 7.06563 3.98942 5.25749 5.73739L2.99854 7.99635" stroke="white" stroke-width="1.99908" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M2.99854 2.99866V7.99635H7.99623" stroke="white" stroke-width="1.99908" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                        Play Again
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
}
