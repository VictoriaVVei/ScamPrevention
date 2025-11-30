import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ReportGuideline.module.css";
import { Header } from "../../components/Header/Header.jsx";
import { Footer } from "../../components/Footer/Footer.jsx";

export function ReportGuideline() {
  const navigate = useNavigate();

  return (
    <div id={styles.ReportGuideline}>
      <Header />
      <main className={styles.main}>
        <div className="backBtn" onClick={() => navigate("/landing-page")}> &lt; Back to Main</div>
        <section className={styles.card}>
          <div className={styles.headerSection}>
            <svg 
              className={styles.bookIcon} 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" 
                stroke="#155DFC" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M15.75 9h.008v.008H15.75V9Zm0 2.25h.008v.008H15.75v-.008Z" 
                stroke="#155DFC" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <h1 className={styles.title}>Guide</h1>
          </div>

          <div className={styles.infoBox}>
            ScamHub helps you submit suspicious messages, accounts, or links to trained community volunteers for quick review. This lets you confirm whether something is a scam and helps protect others.
          </div>

          <div>
            <h2 className={styles.sectionTitle}>How to Use:</h2>
            <ol className={styles.stepsList}>
              <li>
                Choose what you want to report: <span className={styles.highlightBlue}>SMS / Account / Website / others</span> .
              </li>
              <li>
                Enter key details (<span className={styles.highlightBlue}>phone number, username, URL, others</span>).
              </li>
              <li>
                Select a channel such as (<span className={styles.highlightBlue}>SMS / Web / Account</span>) to help categorize your report.
              </li>
              <li>
                Review your info and submit. We will check it soon.
              </li>
            </ol>
          </div>

          <div className={styles.warningBox}>
            <span className={styles.warningTitle}>Remember:</span>
            You don't need an account or any personal data. Just submit the suspicious content itself.
          </div>

          <button 
            className={styles.okButton}
            onClick={() => navigate("/report-scam")}
          >
            OK
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
