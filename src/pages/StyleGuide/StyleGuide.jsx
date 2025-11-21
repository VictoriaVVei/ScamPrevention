import React, { useEffect, useState } from "react";
import styles from "./StyleGuide.module.css";
import { Header } from "../../components/Header/Header.jsx";
import { Footer } from "../../components/Footer/Footer.jsx";
import { HomeIcon } from "../../components/Phone/Phone.jsx";
import { MessageRow } from "../../components/Phone/Phone.jsx";
import { Modal } from "../../components/Modal/Modal.jsx";

export function StyleGuide() {
  const [showDialog, setShowDialog] = useState(false);
  const [colorValues, setColorValues] = useState({});
  const [slideIndex, setSlideIndex] = useState(0);
  const [selectedTag, setSelectedTag] = useState(null);
  const slidesData = [
    {
      title: "Slide Title 1",
      text: "Example explanatory text for the first slide. Keep copy concise and focused on a single concept.",
    },
    {
      title: "Slide Title 2",
      text: "Second slide content. In production this would appear after swiping or pressing Next.",
    },
    {
      title: "Slide Title 3",
      text: "Third slide content. Carousel loops or ends depending on product requirements.",
    },
  ];
  const totalSlides = slidesData.length;
  const canPrev = slideIndex > 0;
  const canNext = slideIndex < totalSlides - 1;

  const goPrev = () => {
    if (canPrev) setSlideIndex((i) => i - 1);
  };
  const goNext = () => {
    if (canNext) setSlideIndex((i) => i + 1);
  };

  // Touch swipe support
  const [touchStartX, setTouchStartX] = useState(null);
  const onTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const onTouchEnd = (e) => {
    if (touchStartX == null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    const threshold = 50; // px
    if (diff > threshold) {
      goPrev();
    } else if (diff < -threshold) {
      goNext();
    }
    setTouchStartX(null);
  };

  const MailSvg = (props) => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.3331 9.33325L17.3453 16.9692C16.9385 17.2055 16.4764 17.3299 16.0059 17.3299C15.5355 17.3299 15.0734 17.2055 14.6666 16.9692L2.66675 9.33325"
        stroke="white"
        stroke-width="2.66664"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M26.6665 5.33325H5.33339C3.86064 5.33325 2.66675 6.52715 2.66675 7.99989V23.9997C2.66675 25.4725 3.86064 26.6664 5.33339 26.6664H26.6665C28.1393 26.6664 29.3331 25.4725 29.3331 23.9997V7.99989C29.3331 6.52715 28.1393 5.33325 26.6665 5.33325Z"
        stroke="white"
        stroke-width="2.66664"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  // All color tokens declared in :root of StyleGuide.module.css
  const COLOR_VARS = [
    { name: "--primary", label: "Primary", category: "Brand" },
    { name: "--right", label: "Success", category: "Semantic" },
    { name: "--report", label: "Report", category: "Semantic" },
    { name: "--warning", label: "Warning", category: "Semantic" },
    { name: "--wrong", label: "Error", category: "Semantic" },
    { name: "--info", label: "Info", category: "Semantic" },

    { name: "--btn-right", label: "Success BG", category: "Backgrounds" },
    { name: "--btn-report", label: "Report BG", category: "Backgrounds" },
    { name: "--btn-warning", label: "Warning BG", category: "Backgrounds" },
    { name: "--btn-wrong", label: "Error BG", category: "Backgrounds" },
    { name: "--btn-info", label: "Info BG", category: "Backgrounds" },
    { name: "--btn-normal", label: "Normal BG", category: "Backgrounds" },
    {
      name: "--success-alt-bg",
      label: "Success Alt BG",
      category: "Backgrounds",
    },
    { name: "--error-alt-bg", label: "Error Alt BG", category: "Backgrounds" },
    { name: "--bg-normal", label: "Page BG", category: "Backgrounds" },
    { name: "--li-bg", label: "List BG", category: "Backgrounds" },
    { name: "--white", label: "White", category: "Backgrounds" },

    { name: "--info-tint", label: "Info Border", category: "Borders" },
    {
      name: "--right-border-tint",
      label: "Success Border",
      category: "Borders",
    },
    {
      name: "--report-border-tint",
      label: "Report Border",
      category: "Borders",
    },
    { name: "--wrong-border-tint", label: "Error Border", category: "Borders" },

    { name: "--title-normal-c", label: "Title", category: "Text" },
    { name: "--body-normal-c", label: "Body", category: "Text" },
    { name: "--neutral-muted", label: "Muted", category: "Text" },
    { name: "--black-200", label: "Black 200", category: "Text" },
    { name: "--black-100", label: "Black 100", category: "Text" },
  ];

  // Typography size tokens for demo
  const TYPE_VARS = [
    { name: "--title", label: "Title (H1)" },
    { name: "--subTitle-large", label: "SubTitle Large (H2)" },
    { name: "--subTitle-normal", label: "SubTitle Normal (H3)" },
    { name: "--subTitle-small", label: "SubTitle Small (H4)" },
    { name: "--body-normal-t", label: "Body Text" },
    { name: "--caption", label: "Caption" },
  ];

  useEffect(() => {
    // Resolve actual color values of CSS variables from :root
    const root = document.documentElement;
    const cs = getComputedStyle(root);
    const resolved = {};
    COLOR_VARS.forEach((v) => {
      resolved[v.name] = cs.getPropertyValue(v.name).trim();
    });
    setColorValues(resolved);
  }, []);

  return (
    <div id={styles.StyleGuide}>
      <Header />
      <main className={styles.main} style={{ position: "relative" }}>
        {/* 0. Overview */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <div
              style={{
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                opacity: 0.9,
              }}
            >
              Scam Hub Design System
            </div>
            <h1 className={styles.h1}>UI Style Guide</h1>
            <p
              className={styles.caption}
              style={{ fontSize: "1rem", marginBottom: "2rem" }}
            >
              A comprehensive guide to our design tokens, components, and
              patterns.
            </p>
            <ul className={styles.pillNav}>
              {[
                "Logo",
                "Color",
                "Typography",
                "Layout ",
                "Buttons",
                "Icons",
                "Dialogs",
                "Forms",
                "Tables",
                "Navigation",
                "Cards",
                "Simulation",
                "Slides",
                "ContinuousScrolling",
                "SegmentingData",
                "Components",
                "OnePagerOverview",
              ].map((id) => (
                <li key={id}>
                  <a className={styles.anchor} href={`#${id}`}>
                    {id}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 1. Logo */}
        <section id="Logo" className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.h2}>1. Logo</h2>
            <p className={styles.body}>
              Our brand identity across different backgrounds.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1.5rem",
                marginTop: "1rem",
              }}
            >
              <div
                style={{
                  background: "var(--white)",
                  padding: "2rem",
                  borderRadius: "0.75rem",
                  border: "1px solid #e5e7eb",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <img
                  style={{ width: "80px", height: "auto" }}
                  src="/img/logo.png"
                  alt="Logo on light"
                />
                <span
                  style={{ fontSize: "0.75rem", color: "var(--body-normal-c)" }}
                >
                  Light Background
                </span>
              </div>
              <div
                style={{
                  background: "var(--title-normal-c)",
                  padding: "2rem",
                  borderRadius: "0.75rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <img
                  style={{ width: "80px", height: "auto" }}
                  src="/img/logo.png"
                  alt="Logo on dark"
                />
                <span style={{ fontSize: "0.75rem", color: "var(--white)" }}>
                  Dark Background
                </span>
              </div>
              <div
                style={{
                  background: "var(--primary)",
                  padding: "2rem",
                  borderRadius: "0.75rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <svg
                  t="1762207636465"
                  className="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="5589"
                  width="40"
                  height="40"
                  style={{ color: "var(--white)" }}
                >
                  <path
                    d="M768 597.333333c94.208 0 170.666667 76.458667 170.666667 170.666667s-76.458667 170.666667-170.666667 170.666667-170.666667-76.458667-170.666667-170.666667 76.458667-170.666667 170.666667-170.666667zM128 230.314667c11.648 0 21.333333 8.533333 23.168 19.626666l0.298667 3.84v196.309334c0 169.984 90.282667 335.018667 229.162666 423.936a23.466667 23.466667 0 0 1-25.258666 39.509333C206.933333 818.602667 109.738667 645.546667 104.746667 464.768l-0.213334-14.677333v-196.266667a23.466667 23.466667 0 0 1 23.466667-23.466667z m406.613333-143.317334l6.186667 2.56 248.874667 115.541334c23.637333 11.008 39.68 34.645333 42.026666 61.312l0.298667 6.698666v174.677334c0 38.4-4.693333 76.330667-13.610667 112.938666a211.072 211.072 0 0 0-72.277333-4.949333c5.632-19.029333 9.984-38.570667 13.013333-58.453333l1.749334-12.714667H512V157.525333l-248.874667 115.626667v211.797333H512v331.904a299.306667 299.306667 0 0 0 44.842667-18.688c3.498667 25.258667 11.52 49.066667 23.125333 70.698667a360.789333 360.789333 0 0 1-67.968 24.917333c-179.797333-45.909333-314.538667-232.064-319.829333-433.621333l-0.170667-12.373333V273.109333c0-27.093333 14.250667-51.968 36.565333-64.981333l5.76-2.986667 248.874667-115.626666a67.968 67.968 0 0 1 51.456-2.517334z m340.736 600.618667a16.981333 16.981333 0 0 0-24.064 0L733.866667 805.034667l-49.322667-49.152a16.981333 16.981333 0 1 0-24.064 24.064l61.269333 61.269333a16.981333 16.981333 0 0 0 24.064 0l129.536-129.536a16.981333 16.981333 0 0 0 0-24.064zM896 230.314667c11.648 0 21.333333 8.533333 23.168 19.626666l0.298667 3.84v195.541334c0 50.944-7.338667 101.418667-21.034667 149.845333a213.248 213.248 0 0 0-41.813333-25.301333c9.216-35.882667 14.592-72.96 15.701333-110.293334l0.213333-14.250666V253.781333a23.466667 23.466667 0 0 1 23.466667-23.466666z"
                    p-id="5590"
                    fill="currentColor"
                  ></path>
                </svg>
                <span style={{ fontSize: "0.75rem", color: "var(--white)" }}>
                  Brand Background
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Color System (only colors used) */}
        <section id="Color" className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.h2}>2. Color System</h2>
            <p className={styles.body}>
              Our color palette is designed for clarity and accessibility.
            </p>

            {["Brand", "Semantic", "Backgrounds", "Borders", "Text"].map(
              (category) => (
                <div key={category} style={{ marginTop: "2rem" }}>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      color: "var(--title-normal-c)",
                      marginBottom: "1rem",
                    }}
                  >
                    {category}
                  </h3>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(160px, 1fr))",
                      gap: "1rem",
                    }}
                  >
                    {COLOR_VARS.filter((v) => v.category === category).map(
                      (v) => (
                        <div
                          key={v.name}
                          style={{
                            borderRadius: "0.75rem",
                            background: "var(--white)",
                            border: "1px solid #e5e7eb",
                            overflow: "hidden",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                            transition: "transform 0.2s, box-shadow 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                              "translateY(-4px)";
                            e.currentTarget.style.boxShadow =
                              "0 4px 12px rgba(0,0,0,0.15)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                              "0 1px 3px rgba(0,0,0,0.1)";
                          }}
                        >
                          <div
                            style={{
                              height: 80,
                              background: `var(${v.name})`,
                              border: v.name.includes("white")
                                ? "1px solid #e5e7eb"
                                : "none",
                            }}
                          />
                          <div
                            style={{
                              padding: "0.75rem",
                              display: "flex",
                              flexDirection: "column",
                              gap: "0.25rem",
                            }}
                          >
                            <div
                              style={{
                                fontWeight: 600,
                                fontSize: "0.875rem",
                                color: "var(--title-normal-c)",
                              }}
                            >
                              {v.label}
                            </div>
                            <code
                              style={{
                                fontSize: "0.75rem",
                                color: "var(--neutral-muted)",
                                fontFamily: "monospace",
                              }}
                            >
                              {v.name}
                            </code>
                            <div
                              style={{
                                fontSize: "0.75rem",
                                color: "var(--body-normal-c)",
                                fontFamily: "monospace",
                              }}
                            >
                              {colorValues[v.name] || ""}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* 3. Typography */}
        <section id="Typography" className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.h2}>3. Typography</h2>
            <p className={styles.body}>
              We use <strong>Arimo</strong> for all text. Our type scale ensures
              consistency and visual hierarchy.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginTop: "1.5rem",
              }}
            >
              {TYPE_VARS.map((t) => (
                <div
                  key={t.name}
                  style={{
                    background: "var(--white)",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ flex: 1, minWidth: "200px" }}>
                    <div
                      style={{
                        fontSize: `var(${t.name})`,
                        lineHeight: 1.3,
                        fontFamily: "var(--font-normal)",
                        color: "var(--title-normal-c)",
                        fontWeight: t.name.includes("title") ? 600 : 400,
                      }}
                    >
                      The quick brown fox
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.25rem",
                      alignItems: "flex-end",
                      minWidth: "150px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--title-normal-c)",
                      }}
                    >
                      {t.label}
                    </div>
                    <code
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--neutral-muted)",
                        fontFamily: "monospace",
                      }}
                    >
                      {t.name}
                    </code>
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: "1.5rem",
                background: "#0f172a",
                borderRadius: "0.75rem",
                padding: "1.5rem",
                overflow: "auto",
              }}
            >
              <pre
                style={{
                  margin: 0,
                  color: "#e2e8f0",
                  fontSize: "0.875rem",
                  fontFamily: "monospace",
                  lineHeight: 1.6,
                }}
              >{`/* Usage examples */
.h1 { font-size: var(--title); }
.h2 { font-size: var(--subTitle-large); }
.h3 { font-size: var(--subTitle-normal); }
.body { font-size: var(--body-normal-t); }
.caption { font-size: var(--caption); }`}</pre>
            </div>
          </div>
        </section>

        {/* 4. Page Layout Pattern (id + .main) */}
        <section id="Layout" className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.h2}>4. Layout and Spacing</h2>
            <p className={styles.body}>
              Consistent spacing creates visual rhythm and hierarchy.
            </p>

            <div style={{ marginTop: "2rem" }}>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  marginBottom: "1rem",
                  color: "var(--title-normal-c)",
                }}
              >
                Spacing Tokens
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "1rem",
                }}
              >
                {[
                  { name: "--gap-outter", label: "Outer Gap", value: "1rem" },
                  {
                    name: "--gap-inner",
                    label: "Inner Gap",
                    value: "0.625rem",
                  },
                  {
                    name: "--padding-page",
                    label: "Page Padding",
                    value: "1rem",
                  },
                  {
                    name: "--padding-cards",
                    label: "Card Padding",
                    value: "1.5rem",
                  },
                  {
                    name: "--padding-msgs",
                    label: "Message Padding",
                    value: "1rem",
                  },
                ].map((token) => (
                  <div
                    key={token.name}
                    style={{
                      background: "var(--white)",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.75rem",
                      padding: "1rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        color: "var(--title-normal-c)",
                      }}
                    >
                      {token.label}
                    </div>
                    <code
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--neutral-muted)",
                      }}
                    >
                      {token.name}
                    </code>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--body-normal-c)",
                      }}
                    >
                      {token.value}
                    </div>
                    <div
                      style={{
                        height: "8px",
                        background: "var(--primary)",
                        borderRadius: "4px",
                        width: token.value,
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "2rem" }}>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  marginBottom: "1rem",
                  color: "var(--title-normal-c)",
                }}
              >
                Border Radius
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "1rem",
                }}
              >
                {[
                  { name: "--radius-small", label: "Small", value: "4px" },
                  { name: "--radius-normal", label: "Normal", value: "1rem" },
                  { name: "--radius-large", label: "Large", value: "1.5rem" },
                  { name: "--radius-xlarge", label: "Circle", value: "100%" },
                ].map((token) => (
                  <div
                    key={token.name}
                    style={{
                      background: "var(--white)",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.75rem",
                      padding: "1rem",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        background: "var(--primary)",
                        borderRadius: `var(${token.name})`,
                      }}
                    ></div>
                    <div
                      style={{
                        fontWeight: 600,
                        color: "var(--title-normal-c)",
                        textAlign: "center",
                      }}
                    >
                      {token.label}
                    </div>
                    <code
                      style={{
                        fontSize: "0.7rem",
                        color: "var(--neutral-muted)",
                      }}
                    >
                      {token.name}
                    </code>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "2rem" }}>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  marginBottom: "1rem",
                  color: "var(--title-normal-c)",
                }}
              >
                Page Patterns
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    background: "#0f172a",
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    overflow: "auto",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: "#94a9c9",
                      marginBottom: "0.5rem",
                      fontWeight: 600,
                    }}
                  >
                    Scrollable Page
                  </div>
                  <pre className={styles.code}>
                    {`
#yourPageID {
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100dvh;
  background: var(--bg-normal);
  font-family: "Arimo", sans-serif;
}

.main {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: var(--gap-outter);

  padding: 1rem;
  overflow-y: auto;
}
            `}
                  </pre>
                </div>
                <div
                  style={{
                    background: "#0f172a",
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    overflow: "auto",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: "#94a9c9",
                      marginBottom: "0.5rem",
                      fontWeight: 600,
                    }}
                  >
                    Fixed Height Page
                  </div>
                  <pre className={styles.code}>
                    {`
#yourPageID {
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100dvh;
  background: var(--bg-normal);
  font-family: "Arimo", sans-serif;
}

.main {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1rem;

  padding: 1rem;
  height: 100%;
}
            `}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Buttons */}
        <section id="Buttons" className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.h2}>5. Buttons</h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--gap-outter)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--gap-inner)",
                }}
              >
                <p className={styles.body}>Back</p>
                <div className={styles.demoRow}>
                  <div className={"backBtn"}>&lt; Back to Main</div>
                  <button className={"backButton"}>&lt; Back</button>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--gap-inner)",
                }}
              >
                <p className={styles.body}>Main button</p>
                <div className={styles.demoRow}>
                  <button className="mainStartBtn">Start (mainStartBtn)</button>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--gap-inner)",
                }}
              >
                <p className={styles.body}>Selectable option</p>
                <div className={styles.optionsList} style={{ maxWidth: 420 }}>
                  <button type="button" className={styles.option}>
                    <span className={styles.optionCircle} />
                    <span className={styles.optionText}>Default option</span>
                  </button>
                  <button
                    type="button"
                    className={`${styles.option} ${styles.optionSelected}`}
                  >
                    <span className={styles.optionCircle} />
                    <span className={styles.optionText}>Selected option</span>
                  </button>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--gap-inner)",
                }}
              >
                <p className={styles.body}>
                  Navigation for jumping between pages.
                </p>
                <div className={`${styles.item}`}>
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 10C0 4.47715 4.47715 0 10 0H26C31.5228 0 36 4.47715 36 10V26C36 31.5228 31.5228 36 26 36H10C4.47715 36 0 31.5228 0 26V10Z"
                      fill="white"
                      fill-opacity="0.8"
                    />
                    <path
                      d="M12.9999 26.3333C12.5579 26.3333 12.134 26.1577 11.8214 25.8451C11.5088 25.5326 11.3333 25.1087 11.3333 24.6666V11.3333C11.3333 10.8913 11.5088 10.4673 11.8214 10.1548C12.134 9.84222 12.5579 9.66663 12.9999 9.66663H19.6666C19.9304 9.6662 20.1917 9.71796 20.4354 9.81894C20.6791 9.91991 20.9004 10.0681 21.0866 10.255L24.0766 13.245C24.264 13.4312 24.4126 13.6527 24.5138 13.8968C24.6151 14.1408 24.667 14.4024 24.6666 14.6666V24.6666C24.6666 25.1087 24.491 25.5326 24.1784 25.8451C23.8659 26.1577 23.4419 26.3333 22.9999 26.3333H12.9999Z"
                      stroke="var(--info)"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M19.6667 9.66663V13.8333C19.6667 14.0543 19.7545 14.2663 19.9108 14.4225C20.0671 14.5788 20.2791 14.6666 20.5001 14.6666H24.6667"
                      stroke="var(--info)"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16.3334 15.5H14.6667"
                      stroke="var(--info)"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M21.3334 18.8334H14.6667"
                      stroke="var(--info)"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M21.3334 22.1666H14.6667"
                      stroke="var(--info)"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Destnation
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--gap-inner)",
                }}
              >
                <p className={styles.body}>
                  Navigation for jumping between pages with explanations.
                </p>
                <div className={styles.toolItem}>
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
                    <div className={styles.toolTitle}>Destnation</div>
                    <div className={styles.toolDesc}>Explaination</div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--gap-inner)",
                }}
              >
                <p className={styles.body}>Small widget close</p>
                <button className={styles.photoModalClose}>✕</button>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--gap-inner)",
                }}
              >
                <p className={styles.body}>Small widget delete</p>
                <button className={styles.removeBar}>✕</button>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Icons */}
        <section id="Icons" className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.h2}>6. Icons</h2>
            <div>
              <p className={styles.body}>Size: </p>
              <p className={styles.body}>
                <span>1. 20px: Bottom Nav</span>
              </p>
              <p className={styles.body}>
                <span>2. 24px: Other button</span>
              </p>
              <p className={styles.body}>
                <span>3. 32px: Phone app</span>
              </p>
              <p className={styles.body}>
                <span>4. 36px: Popup Nav</span>
              </p>
              <p className={styles.body}>
                <span>5. 40px: Logo</span>
              </p>
            </div>
            <div>
              <p className={styles.body}>Source: </p>
              <p className={styles.body}>
                <span>1. </span>
                <span>
                  <a
                    className={styles.anchor}
                    href="https://www.iconfont.cn/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    iconfont.cn
                  </a>
                </span>
              </p>
              <p className={styles.body}>
                <span>2. </span>
                <span>
                  <a
                    className={styles.anchor}
                    href="https://fonts.google.com/icons"
                    target="_blank"
                    rel="noreferrer"
                  >
                    google fonts
                  </a>
                </span>
              </p>
              <p className={styles.body}>
                <span>2. </span>
                <span>
                  <a
                    className={styles.anchor}
                    href="https://www.figma.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Composed in Figma
                  </a>
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* 7. Dialogs */}
        <section id="Dialogs" className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.h2}>7. Dialogs & Modals</h2>
            <p className={styles.body}>
              Modals interrupt the user flow to capture attention for important
              actions or information.
            </p>
            <button
              className="mainStartBtn"
              onClick={() => setShowDialog(true)}
              style={{ width: 220, marginTop: "1rem" }}
            >
              Open Demo Modal
            </button>
            {showDialog && (
              <Modal
                isOpen={true}
                onClose={() => setShowDialog(false)}
                title="Confirm Action?"
                summary="This matches the Phone modal style used in the app."
                cancelText="Cancel"
                onCancel={() => setShowDialog(false)}
                confirmText="Confirm"
                onConfirm={() => setShowDialog(false)}
              />
            )}
          </div>
        </section>

        {/* 8. Forms */}
        <section id="Forms" className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.h2}>8. Forms</h2>
            <p className={styles.caption}>Matches PhoneGame form format.</p>
          </div>
        </section>

        {/* 9. Tables */}
        <section id="Tables" className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.h2}>9. Tables</h2>
            <p className={styles.caption}>Matches PhoneGame table format.</p>
          </div>
        </section>

        {/* 10. Navigation */}
        <section id="Navigation" className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.h2}>10. Navigation Patterns</h2>
            <Footer />
          </div>
        </section>

        {/* 11. Cards */}
        <section id="Cards" className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.h2}>11. Cards</h2>
            <div className={styles.card}>
              <div className={styles.h3}>Standard Card</div>
              <div className={styles.body}>
                <pre className={styles.code}>
                  {`
.card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap-outter);

  padding: var(--padding-cards);
  box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.1),
    0 0.0625rem 0.125rem -0.0625rem rgba(0, 0, 0, 0.1);
  border-radius: var(--radius-large);
  background: var(--white);
}

            `}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* 12. Simulation */}
        <section id="Simulation" className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.h2}>12. Simulation</h2>
            <p className={styles.body}>
              Let users explore and experiment in a safe and non-threatening
              environment. Simulate an environment. Create situations that
              reward and motivate people for a specific behavior as you allow
              users to rehearse and practice a target behavior in a safe
              setting. Simulating an environment can help you facilitate
              role-playing, adopting another person’s perspective, and control
              exposure to new or frightening situations. Simulate context. Make
              the impact on normal life clear by creating a simulation of a
              context. Although it might be costly and complicated, simulating
              the context itself will make the persuasion less dependent on
              imagination or disbelief and individual implications clearer.
            </p>
            <div className={styles.h3}>
              <img
                src="/img/phone.png"
                alt="phone"
                style={{
                  width: "250px",
                  height: "auto",
                  borderRadius: "var(--radius-normal)",
                }}
              />
            </div>
          </div>
        </section>

        {/* 13. ContinuousScrolling */}
        <section id="ContinuousScrolling" className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.h2}>13. Continuous Scrolling</h2>
            <p className={styles.caption}>ContinuousScrolling.</p>
          </div>
        </section>

        {/* 14. SegmentingData */}
        <section id="SegmentingData" className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.h2}>14. SegmentingData</h2>
            <p className={styles.body}>Green: Positive</p>
            <p className={styles.body}>Red: Negative</p>
            <p className={styles.body}>Yellow: Warning</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                width: "100%",
              }}
            >
              <div className={`${styles.block} ${styles.greenBlock}`}>
                <div className={styles.row}>
                  <div className={styles.left}>
                    <span className={styles.label}>Broad Type</span>
                  </div>
                </div>
                <div className={styles.detailBox}>
                  <div className={styles.detailItem}>
                    <span className={styles.appTag}>Smaller Type</span>
                    <span className={styles.detailLink}>Specific</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.appTag}>Smaller Type</span>
                    <span className={styles.detailLink}>Specific</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.appTag}>Smaller Type</span>
                    <span className={styles.detailLink}>Specific</span>
                  </div>
                </div>
              </div>

              <div className={`${styles.block} ${styles.redBlock}`}>
                <div className={styles.row}>
                  <div className={styles.left}>
                    <span className={styles.label}>Broad Type</span>
                  </div>
                </div>
                <div className={styles.detailBox}>
                  <div className={styles.detailItem}>
                    <span className={styles.appTag}>Smaller Type</span>
                    <span className={styles.detailLink}>Specific</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.appTag}>Smaller Type</span>
                    <span className={styles.detailLink}>Specific</span>
                  </div>
                </div>
              </div>

              <div className={`${styles.block} ${styles.yellowBlock}`}>
                <div className={styles.row}>
                  <div className={styles.left}>
                    <span className={styles.label}>Broad Type</span>
                  </div>
                </div>
                <div className={styles.detailBox}>
                  <div className={styles.detailItem}>
                    <span className={styles.appTag}>Smaller Type</span>
                    <span className={styles.detailLink}>Specific</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 15. Components */}
        <section id="Components" className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.h2}>15. Other Common Components</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--gap-outter)",
              }}
            >
              <div>
                <p className={styles.body}>1. Tag</p>
                <div className={styles.tagRow}>
                  <span className={styles.tag}>#Tag</span>
                  <span className={styles.tag}>#Bank</span>
                  <span className={styles.tag}>#Scam</span>
                </div>
              </div>

              <div>
                <p className={styles.body}>2. Slide</p>
                <div className={styles.card}>
                  <h2 className={styles.h2}>Slides Pattern (Interactive)</h2>
                  <div
                    className={styles.slidesViewport}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                  >
                    <div
                      className={styles.slidesTrack}
                      style={{ transform: `translateX(-${slideIndex * 100}%)` }}
                    >
                      {slidesData.map((s) => (
                        <div className={styles.slideItem} key={s.title}>
                          <div className={styles.slideHeader}>
                            <div className={styles.slideTitle}>{s.title}</div>
                          </div>
                          <div className={styles.slideTextBox}>
                            <p className={styles.slideText}>{s.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={styles.navRow}>
                    <button
                      className={`${styles.navButton} ${
                        !canPrev ? styles.navDisabled : ""
                      }`}
                      onClick={goPrev}
                      disabled={!canPrev}
                      aria-label="Previous slide"
                    >
                      <span className={styles.navArrow}>←</span> Prev
                    </button>
                    <div className={styles.dots}>
                      {slidesData.map((_, i) => (
                        <div
                          key={i}
                          className={`${styles.dot} ${
                            i === slideIndex ? styles.dotActive : ""
                          }`}
                          aria-label={`Slide ${i + 1}`}
                        ></div>
                      ))}
                    </div>
                    <button
                      className={`${styles.navButton} ${
                        !canNext ? styles.navDisabled : ""
                      }`}
                      onClick={goNext}
                      disabled={!canNext}
                      aria-label="Next slide"
                    >
                      Next <span className={styles.navArrow}>→</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Search Input */}
              <div style={{ marginTop: 24 }}>
                <div className={styles.caption} style={{ marginBottom: 8 }}>
                  Search Input
                </div>
                <div className={styles.searchInputWrapper}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      position: "absolute",
                      left: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                    }}
                  >
                    <path
                      d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                      stroke="#555555"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Search"
                  />
                </div>
              </div>

              {/* Button Divider */}
              <div style={{ marginTop: 24 }}>
                <div className={styles.caption} style={{ marginBottom: 8 }}>
                  List End State
                </div>
                <div className={styles.hitButtonDivider}>
                  <span className={styles.hitButtonLine}></span>
                  <span className={styles.hitButtonText}>
                    You Hit The Button
                  </span>
                  <span className={styles.hitButtonLine}></span>
                </div>
              </div>

              {/* Date Display */}
              <div style={{ marginTop: 24 }}>
                <div className={styles.caption} style={{ marginBottom: 8 }}>
                  Timestamp Display
                </div>
                <div
                  className={styles.demoRow}
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 8,
                  }}
                >
                  <div className={styles.dateDisplayLong}>
                    December 31, 2025
                  </div>
                  <div className={styles.dateDisplayRelative}>Today</div>
                  <div className={styles.dateDisplayRelative}>Yesterday</div>
                  <div className={styles.dateDisplayRelative}>1 hour ago</div>
                  <div className={styles.dateDisplayRelative}>1 min ago</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final section */}
        <section
          style={{
            padding: "4rem 1.5rem",
            background:
              "linear-gradient(135deg, var(--primary) 0%, #007669 100%)",
            color: "var(--white)",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                marginBottom: "1rem",
              }}
            >
              Consistent Design, Better Experience
            </h2>
            <p style={{ fontSize: "1rem", opacity: 0.9, marginBottom: "2rem" }}>
              This design system ensures our Scam Prevention app maintains
              visual consistency and provides users with an intuitive,
              accessible experience.
            </p>
            <div
              style={{
                display: "inline-block",
                padding: "0.75rem 1.5rem",
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "999px",
                fontSize: "0.875rem",
                backdropFilter: "blur(10px)",
              }}
            >
              Last updated: November 2025
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default StyleGuide;
