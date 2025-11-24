import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./DetectionGame.module.css";
import { useNavigate, useParams } from "react-router";
import { Header } from "../../components/Header/Header.jsx";
import { Footer } from "../../components/Footer/Footer.jsx";

export function DetectionGame() {
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
  const navigate = useNavigate();
  const params = useParams();

  //----------------------------------------------

  //----------------------------------------------
  // Func
  //--------------------------------------------------
  const handleBack = () => {
    navigate("/main");
  };

  //----------------------------------------------
  return (
    <div id={styles.DetectionGame}>
      <Header />

      <main className={styles.main}>
        <div className={"backBtn"} onClick={handleBack}>
          &lt; Back to Main
        </div>

        <h1 className={styles.title}>Scams Detection</h1>

        <div className={styles.timer}>
          <span className={styles.bell}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_275_396)">
                <path
                  d="M6.41748 13.125C6.52723 13.3151 6.68507 13.4729 6.87514 13.5826C7.06521 13.6924 7.28081 13.7501 7.50028 13.7501C7.71976 13.7501 7.93536 13.6924 8.12543 13.5826C8.3155 13.4729 8.47334 13.3151 8.58309 13.125"
                  stroke="var(--primary)"
                  stroke-width="1.99944"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2.03878 9.57875C1.95713 9.66824 1.90325 9.77953 1.88369 9.89907C1.86413 10.0186 1.87973 10.1413 1.9286 10.2521C1.97747 10.363 2.05749 10.4572 2.15894 10.5234C2.26039 10.5896 2.37889 10.6249 2.50003 10.625H12.5C12.6212 10.625 12.7397 10.5899 12.8412 10.5238C12.9427 10.4577 13.0228 10.3636 13.0718 10.2528C13.1208 10.142 13.1366 10.0194 13.1172 9.89987C13.0978 9.78031 13.044 9.66896 12.9625 9.57937C12.1313 8.7225 11.25 7.81188 11.25 5C11.25 4.00544 10.8549 3.05161 10.1517 2.34835C9.44842 1.64509 8.49459 1.25 7.50003 1.25C6.50547 1.25 5.55164 1.64509 4.84838 2.34835C4.14512 3.05161 3.75003 4.00544 3.75003 5C3.75003 7.81188 2.86816 8.7225 2.03878 9.57875Z"
                  stroke="var(--primary)"
                  stroke-width="1.99944"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_275_396">
                  <rect width="15" height="15" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
          <span className={styles.timeText}>5:00</span>
        </div>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>How to Play</h2>

          <ol className={styles.steps}>
            <li>
              <span className={styles.stepCircle}>1</span>
              <p>Browse the apps and long‑press any suspicious item to mark it as a scam.</p>
            </li>
            <li>
              <span className={styles.stepCircle}>2</span>
              <p>Answer incoming phone calls and choose how to handle them. (Turn on Voice)</p>
            </li>
            <li>
              <span className={styles.stepCircle}>3</span>
              <p>Use the tool menu in the top‑right corner to review Scams Found or finish.</p>
            </li>
            <li>
              <span className={styles.stepCircle}>4</span>
              <p>Your final score and results will be shown at the end.</p>
            </li>
          </ol>

          <div className={styles.rememberBox}>
            <p className={styles.rememberTitle}>Remember:</p>
            <p className={styles.rememberText}>
              Not all messages are scams! Be careful not to mark legitimate
              messages.
            </p>
          </div>
        </section>

        <button
          className={"mainStartBtn"}
          onClick={() => navigate("/detection-game/play")}
        >
          <span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.99854 4.99857C4.99843 4.64676 5.09115 4.30115 5.26734 3.99664C5.44353 3.69213 5.69695 3.43949 6.002 3.26425C6.30706 3.089 6.65296 2.99735 7.00476 2.99855C7.35657 2.99974 7.70183 3.09374 8.00569 3.27105L19.9993 10.2671C20.302 10.4427 20.5533 10.6947 20.7281 10.9979C20.9028 11.3011 20.995 11.6448 20.9953 11.9947C20.9956 12.3447 20.904 12.6886 20.7298 12.9921C20.5556 13.2955 20.3047 13.548 20.0023 13.7241L8.00569 20.7222C7.70183 20.8995 7.35657 20.9935 7.00476 20.9947C6.65296 20.9959 6.30706 20.9042 6.002 20.729C5.69695 20.5537 5.44353 20.3011 5.26734 19.9966C5.09115 19.6921 4.99843 19.3465 4.99854 18.9946V4.99857Z"
                stroke="white"
                stroke-width="1.99944"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span>Start Game</span>
        </button>
      </main>

      <Footer />
    </div>
  );
}
