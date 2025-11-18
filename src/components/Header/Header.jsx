import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import { useNavigate, useParams } from "react-router";
export function Header() {
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

  //----------------------------------------------
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.logoIcon}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 14C0 6.26801 6.26801 0 14 0H26C33.732 0 40 6.26801 40 14V26C40 33.732 33.732 40 26 40H14C6.26801 40 0 33.732 0 26V14Z"
              fill="#F0FDFA"
            />
            <path
              d="M28 21C28 26 24.5 28.5 20.34 29.95C20.1222 30.0238 19.8855 30.0203 19.67 29.94C15.5 28.5 12 26 12 21V14C12 13.7348 12.1054 13.4805 12.2929 13.2929C12.4804 13.1054 12.7348 13 13 13C15 13 17.5 11.8 19.24 10.28C19.4519 10.099 19.7214 9.99957 20 9.99957C20.2786 9.99957 20.5481 10.099 20.76 10.28C22.51 11.81 25 13 27 13C27.2652 13 27.5196 13.1054 27.7071 13.2929C27.8946 13.4805 28 13.7348 28 14V21Z"
              stroke="#009689"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className={styles.logoText}>ScamHub</span>
      </div>
    </header>
  );
}
