import React, { useRef, useState, useEffect } from "react";
import styles from "./PhoneGame.module.css";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header.jsx";
import { Footer } from "../../components/Footer/Footer.jsx";

export function Success() {
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

    //----------------------------------------------

    //----------------------------------------------
    // Func
    //--------------------------------------------------
    const handleBack = () => {
        navigate("/main");
    };

    //----------------------------------------------
    return (
        <div id={styles.PhoneGame}>
            <Header />
            <main className={styles.main}>
                <div className={"backBtn"} onClick={handleBack}>
                    &lt; Back
                </div>

                <svg width="140" height="175" viewBox="0 0 140 175" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M69.8047 174.961C69.8047 174.961 94.4336 169.727 115.43 147.207C133.906 127.383 139.141 81.9531 139.141 16.9922C95.3516 23.0859 69.8047 0 69.8047 0H69.3555C69.3555 0 43.8086 23.0859 0 16.9922C0 81.9336 5.23437 127.441 23.7305 147.266C44.7266 169.785 69.3555 175 69.3555 175" fill="#0EC469" />
                </svg>

            </main>
            <Footer />
        </div>
    )
}