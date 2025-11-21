import React, { useRef, useState, useEffect } from "react";
import styles from "./PhoneGame.module.css";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header.jsx";
import { Footer } from "../../components/Footer/Footer.jsx";
import { Phone } from "../../components/Phone/Phone.jsx";
import { useScamContext } from "../../assets/ScamContext.jsx";
import { Modal } from "../../components/Modal/Modal.jsx";

export function PhoneGame() {
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
  const { finalizeScamSession } = useScamContext() || {};
  const [showTools, setShowTools] = useState(false);
  const [externalView, setExternalView] = useState(null); // null | 'SCAMS_FOUND' | 'FINISH'
  const [showSuccessGif, setShowSuccessGif] = useState(false);
  const [successGifKey, setSuccessGifKey] = useState(0);
  const successTimerRef = useRef(null);
  // Confirm popups for tool actions
  const [confirmAction, setConfirmAction] = useState(null); // 'finish' | 'exit' | null

  //----------------------------------------------

  //----------------------------------------------
  // Func
  //--------------------------------------------------
  const openTools = () => setShowTools(true);
  const closeTools = () => setShowTools(false);
  const gotoScamsFound = () => {
    setShowTools(false);
    setExternalView("SCAMS_FOUND");
  };
  const exitGame = () => {
    setShowTools(false);
    navigate("/detection-game");
  };
  const finishGame = () => {
    setShowTools(false);
    if (typeof finalizeScamSession === "function") {
      finalizeScamSession();
    }
    navigate("/detection-game/result");
  };
  const askFinishConfirm = () => {
    setShowTools(false);
    setConfirmAction("finish");
  };
  const askExitConfirm = () => {
    setShowTools(false);
    setConfirmAction("exit");
  };
  const handleConfirmModalCancel = () => setConfirmAction(null);
  const handleConfirmModalOk = () => {
    if (confirmAction === "finish") {
      setConfirmAction(null);
      finishGame();
    } else if (confirmAction === "exit") {
      setConfirmAction(null);
      exitGame();
    }
  };

  // Called when a user confirms flagging a scam inside Phone
  const handleSaveSuccess = () => {
    // restart gif (force remount and bypass cache)
    const k = Date.now();
    setSuccessGifKey(k);
    setShowSuccessGif(true);
    if (successTimerRef.current) {
      clearTimeout(successTimerRef.current);
    }
    successTimerRef.current = setTimeout(() => {
      setShowSuccessGif(false);
    }, 1700);
  };

  useEffect(
    () => () => {
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    },
    []
  );

  //----------------------------------------------
  return (
    <div id={styles.PhoneGame}>
      <Header />

      <button
        className={styles.toolBtn}
        onClick={openTools}
        aria-haspopup="dialog"
        aria-expanded={showTools}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_486_594)">
            <path
              d="M8 8V0H24V8H32V16H0V8H8ZM0 18.6667H32V32H0V18.6667ZM10.6667 8H21.3333V2.66667H10.6667V8Z"
              fill="var(--primary)"
            />
          </g>
          <defs>
            <clipPath id="clip0_486_594">
              <rect width="32" height="32" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>

      <main className={styles.main}>
        <Phone
          externalView={externalView}
          onCloseExternalView={() => setExternalView(null)}
          onSaveSuccess={handleSaveSuccess}
          onTimeUp={finishGame}
        />
      </main>

      {showSuccessGif && (
        <div className={styles.successGifWrap} aria-live="polite">
          <img
            key={successGifKey}
            src={`/img/success.gif?t=${successGifKey}`}
            alt="Success"
            className={styles.successGif}
            style={{ backgroundColor: "transparent" }}
          />
        </div>
      )}

      {showTools && (
        <div className={styles.toolMenuOverlay} onClick={closeTools}>
          <div
            className={styles.toolMenu}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className={styles.toolItem} onClick={gotoScamsFound}>
              <div className={styles.toolIcon}>
                <svg
                  t="1763506170856"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="5622"
                  width="24"
                  height="24"
                >
                  <path
                    d="M192 736h640V128H256q-27.008 0.992-44.992 19.008T192 192v544zM256 64h608q14.016 0 23.008 8.992T896 96v672q0 14.016-8.992 23.008T864 800H160l-32 58.016V192q0.992-54.016 37.504-90.496T256 64z m-16 736q-20 0.992-33.504 14.496T192.992 848t13.504 33.504T240 896H832v-96H240z m0-64H896v160q-0.992 27.008-19.008 44.992T832 960H240q-48-0.992-79.488-32.512T128 848q0.992-48 32.512-79.488T240 736zM384 128v251.008l96-76.992 96 76.992V128h-192z m-64-64h320v380.992q-0.992 20-18.496 28.512t-33.504-3.488L480 384l-108 86.016q-16 12-33.504 3.488T320 444.992V64z"
                    p-id="5623"
                    fill="var(--info)"
                  ></path>
                </svg>
              </div>
              <div className={styles.toolText}>
                <div className={styles.toolTitle}>Scams Found</div>
                <div className={styles.toolDesc}>Check flagged items</div>
              </div>
            </div>
            <div className={styles.toolItem} onClick={askFinishConfirm}>
              <div className={styles.toolIcon}>
                <svg
                  t="1763506443268"
                  viewBox="0 0 1025 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="9311"
                  width="24"
                  height="24"
                >
                  <path
                    d="M511.9455 958.712809c-247.065724 0-448.054313-200.987589-448.054313-448.060313 0-247.065724 200.987589-448.054313 448.054313-448.054313 247.072724 0 448.060313 200.987589 448.060313 448.054313C960.005813 757.72422 759.017224 958.712809 511.9455 958.712809L511.9455 958.712809zM511.9455 126.893372c-211.60762 0-383.758124 172.150504-383.758124 383.758124 0 211.58062 172.150504 383.765124 383.758124 383.765124 211.58062 0 383.765124-172.184504 383.765124-383.765124C895.709624 299.043876 723.52512 126.893372 511.9455 126.893372L511.9455 126.893372zM511.9455 126.893372"
                    fill="var(--right)"
                    p-id="9312"
                  ></path>
                  <path
                    d="M726.94813 391.825148c-12.545037-12.448036-32.837096-12.322036-45.249133 0.254001L448.388314 627.94784l-103.280303-106.122311c-12.350036-12.707037-32.612096-12.932038-45.249133-0.640002-12.678037 12.322036-12.965038 32.612096-0.640002 45.251133l126.032369 129.522379c0.064 0.093 0.190001 0.093 0.254001 0.190001 0.064 0.064 0.097 0.191001 0.161 0.254001 2.017006 1.988006 4.512013 3.204009 6.88102 4.547013 1.250004 0.674002 2.241007 1.793005 3.52001 2.305007 3.873011 1.601005 8.000023 2.398007 12.096035 2.398007 4.063012 0 8.131024-0.796002 11.969035-2.334007 1.250004-0.513002 2.208006-1.539005 3.39401-2.178006 2.398007-1.344004 4.898014-2.525007 6.94502-4.542013 0.063-0.064 0.098-0.196001 0.190001-0.259001 0.064-0.094 0.161-0.128 0.259001-0.191001l256.253751-259.041759C739.626167 424.499244 739.494166 404.242184 726.94813 391.825148L726.94813 391.825148zM726.94813 391.825148"
                    fill="var(--right)"
                    p-id="9313"
                  ></path>
                </svg>
              </div>
              <div className={styles.toolText}>
                <div className={styles.toolTitle}>Finish Game</div>
                <div className={styles.toolDesc}>Check final result</div>
              </div>
            </div>
            <div className={styles.toolItem} onClick={askExitConfirm}>
              <div className={styles.toolIcon}>
                <svg
                  t="1763506259663"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="6781"
                  width="24"
                  height="24"
                >
                  <path
                    d="M918.4 489.6l-160-160c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l105.6 105.6L512 480c-19.2 0-32 12.8-32 32s12.8 32 32 32l307.2 0-105.6 105.6c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l160-163.2c0 0 0-3.2 3.2-3.2C931.2 518.4 931.2 499.2 918.4 489.6z"
                    p-id="6782"
                    fill="var(--report)"
                  ></path>
                  <path
                    d="M832 736c-19.2 0-32 12.8-32 32l0 64c0 19.2-12.8 32-32 32L224 864c-19.2 0-32-12.8-32-32L192 192c0-19.2 12.8-32 32-32l544 0c19.2 0 32 12.8 32 32l0 64c0 19.2 12.8 32 32 32s32-12.8 32-32L864 192c0-54.4-41.6-96-96-96L224 96C169.6 96 128 137.6 128 192l0 640c0 54.4 41.6 96 96 96l544 0c54.4 0 96-41.6 96-96l0-64C864 748.8 851.2 736 832 736z"
                    p-id="6783"
                    fill="var(--report)"
                  ></path>
                </svg>
              </div>
              <div className={styles.toolText}>
                <div className={styles.toolTitle}>Exit Game</div>
                <div className={styles.toolDesc}>Return to instructions</div>
              </div>
            </div>

            <button
              className={"mainStartBtn"}
              onClick={closeTools}
              style={{ height: "2.5rem" }}
            >
              <span>Close</span>
            </button>
          </div>
        </div>
      )}

      {confirmAction && (
        <Modal
          isOpen={true}
          onClose={handleConfirmModalCancel}
          title={confirmAction === "finish" ? "Finish Game?" : "Exit Game?"}
          summary={
            confirmAction === "finish"
              ? "You will submit and view the final results."
              : "You will leave the play screen and return to the instructions."
          }
          cancelText="Cancel"
          onCancel={handleConfirmModalCancel}
          confirmText="Confirm"
          onConfirm={handleConfirmModalOk}
        />
      )}

      <Footer />
    </div>
  );
}
