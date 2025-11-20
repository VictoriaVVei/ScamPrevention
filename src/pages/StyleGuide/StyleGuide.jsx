import React, { useState } from "react";
import styles from "./StyleGuide.module.css";
import { Header } from "../../components/Header/Header.jsx";
import { Footer } from "../../components/Footer/Footer.jsx";

export function StyleGuide() {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);

  return (
    <div className={styles.page}>
      {/* 0. Overview */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.kicker}>Scam Hub · UI Style Guide</div>
          <h1 className={styles.h1}>Overview</h1>
          <p className={styles.body} style={{ marginTop: 8 }}>
            This guide documents the exact UI patterns used across the app
            (excluding Landing Page UI): logo, colors, typography, page layout
            (id + .main), buttons in use, icons, dialogs (Phone format),
            navigation, cards, tags, and code tokens.
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
          <p className={styles.caption}>Word logo and svg logo</p>
          <div className={styles.logoRow} style={{ marginTop: 12 }}>
            <div className={`${styles.logoBox} ${styles.bgDark}`}>
              <img
                className={styles.logo}
                src="/img/logo.png"
                alt="Logo on dark"
              />
            </div>
          </div>
          <div>
            <svg
              t="1762207636465"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5589"
              width="40"
              height="40"
            >
              <path
                d="M768 597.333333c94.208 0 170.666667 76.458667 170.666667 170.666667s-76.458667 170.666667-170.666667 170.666667-170.666667-76.458667-170.666667-170.666667 76.458667-170.666667 170.666667-170.666667zM128 230.314667c11.648 0 21.333333 8.533333 23.168 19.626666l0.298667 3.84v196.309334c0 169.984 90.282667 335.018667 229.162666 423.936a23.466667 23.466667 0 0 1-25.258666 39.509333C206.933333 818.602667 109.738667 645.546667 104.746667 464.768l-0.213334-14.677333v-196.266667a23.466667 23.466667 0 0 1 23.466667-23.466667z m406.613333-143.317334l6.186667 2.56 248.874667 115.541334c23.637333 11.008 39.68 34.645333 42.026666 61.312l0.298667 6.698666v174.677334c0 38.4-4.693333 76.330667-13.610667 112.938666a211.072 211.072 0 0 0-72.277333-4.949333c5.632-19.029333 9.984-38.570667 13.013333-58.453333l1.749334-12.714667H512V157.525333l-248.874667 115.626667v211.797333H512v331.904a299.306667 299.306667 0 0 0 44.842667-18.688c3.498667 25.258667 11.52 49.066667 23.125333 70.698667a360.789333 360.789333 0 0 1-67.968 24.917333c-179.797333-45.909333-314.538667-232.064-319.829333-433.621333l-0.170667-12.373333V273.109333c0-27.093333 14.250667-51.968 36.565333-64.981333l5.76-2.986667 248.874667-115.626666a67.968 67.968 0 0 1 51.456-2.517334z m340.736 600.618667a16.981333 16.981333 0 0 0-24.064 0L733.866667 805.034667l-49.322667-49.152a16.981333 16.981333 0 1 0-24.064 24.064l61.269333 61.269333a16.981333 16.981333 0 0 0 24.064 0l129.536-129.536a16.981333 16.981333 0 0 0 0-24.064zM896 230.314667c11.648 0 21.333333 8.533333 23.168 19.626666l0.298667 3.84v195.541334c0 50.944-7.338667 101.418667-21.034667 149.845333a213.248 213.248 0 0 0-41.813333-25.301333c9.216-35.882667 14.592-72.96 15.701333-110.293334l0.213333-14.250666V253.781333a23.466667 23.466667 0 0 1 23.466667-23.466666z"
                p-id="5590"
                fill="#009689"
              ></path>
            </svg>
          </div>
        </div>
      </section>

      {/* 2. Color System (only colors used) */}
      <section id="Color" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.h2}>2. Color System</h2>
          <div
            className={`${styles.grid} ${styles.gridCols4}`}
            style={{ marginTop: 8 }}
          >
            {[
              { name: "Primary", var: "--primary" },
              { name: "Teal (secondary usage)", var: "--secondary" },
              { name: 'Dark Teal', var: '--tag-selected' },
              { name: 'Accent Blue', var: '--accent' }
            ].map((c) => (
              <div key={c.name} className={styles.swatch}>
                <div
                  className={styles.swatchColor}
                  style={{ background: `var(${c.var})` }}
                />
                <div className={styles.swatchMeta}>
                  {c.name} · {c.var}
                </div>
              </div>
            ))}
          </div>
          <div
            className={`${styles.grid} ${styles.gridCols4}`}
            style={{ marginTop: 8 }}
          >
            {[
              "--gray-900",
              "--gray-700",
              "--gray-600",
              "--gray-300",
              "--gray-200",
              "--gray-100",
              "--white",
            ].map((v) => (
              <div key={v} className={styles.swatch}>
                <div
                  className={styles.swatchColor}
                  style={{ background: `var(${v})` }}
                />
                <div className={styles.swatchMeta}>{v}</div>
              </div>
            ))}
          </div>
          <div
            className={`${styles.grid} ${styles.gridCols4}`}
            style={{ marginTop: 8 }}
          >
            {[
              { name: "Success", var: "--success" },
              { name: "Warning", var: "--warning" },
              { name: "Error", var: "--error" },
            ].map((c) => (
              <div key={c.name} className={styles.swatch}>
                <div
                  className={styles.swatchColor}
                  style={{ background: `var(${c.var})` }}
                />
                <div className={styles.swatchMeta}>
                  {c.name} · {c.var}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Typography (Arimo only) */}
      <section id="Typography" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.h2}>3. Typography</h2>
          <p className={styles.caption}>Font: Arimo, sans-serif.</p>
          <div style={{ marginTop: 12 }}>
            <div className={styles.h1}>H1 · 32px</div>
            <div className={styles.h2} style={{ marginTop: 8 }}>
              H2 · 24px
            </div>
            <div className={styles.h3} style={{ marginTop: 8 }}>
              H3 · 20px
            </div>
            <div className={styles.body} style={{ marginTop: 8 }}>
              Body · 16px
            </div>
            <div className={styles.caption} style={{ marginTop: 8 }}>
              Caption · 12px
            </div>
          </div>
        </div>
      </section>

      {/* 4. Page Layout Pattern (id + .main) */}
      <section id="Layout" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.h2}>4. Page Layout and Spacing</h2>
          <p className={styles.body}>
            Each page uses an id root with 100vh and a .main that flexes, with
            overflow-y for inner scroll. Entry animation via keyframes.
          </p>
          <pre className={styles.code}>
            {`#DetectionResult {
	width: 100%;
	height: 100vh;
	background: #F8FAFC;
	display: flex;
	flex-direction: column;
	font-family: "Arimo", sans-serif;
	animation: pageSlideInFromRight 320ms ease both;
}
@keyframes pageSlideInFromRight {
	from { transform: translateX(100%); opacity: 0; }
	to { transform: translateX(0); opacity: 1; }
}
.main {
	flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column;
	gap: 1rem; padding: 1rem; overflow-y: auto;
}`}
          </pre>
        </div>
      </section>

      {/* 5. Buttons (only used ones) */}
      <section id="Buttons" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.h2}>5. Buttons</h2>
          <p className={styles.caption}>
            Only two buttons are used across the app.
          </p>
          <div className={styles.demoRow} style={{ marginTop: 8 }}>
            <a className="backBtn" href="#buttons">
              Back (backBtn)
            </a>
            <button className="mainStartBtn" style={{ width: 220 }}>
              Start (mainStartBtn)
            </button>
          </div>
          <div style={{ marginTop: 12 }}>
            <div className={styles.caption}>
              Selection button (Daily Question):
            </div>
            <div className={styles.option} style={{ width: 320 }}>
              <span className={styles.optionCircle}></span>
              <span className={styles.optionText}>Selectable option</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Icons (from iconfont.cn) */}
      <section id="Icons" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.h2}>6. Icons</h2>
          <p className={styles.caption}>
            Source: iconfont.cn. Size varies by context (common: 16 / 20 / 24).
          </p>
          <div className={styles.demoRow} style={{ marginTop: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path
                d="M9 12l2 2 4-4M12 22a10 10 0 100-20 10 10 0 000 20z"
                stroke="#4A5565"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                d="M12 8h.01M11 12h1v4h1m-1-12a10 10 0 100 20 10 10 0 000-20z"
                stroke="#4A5565"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M12 9v4m0 4h.01M10.29 3.86l-8 14A1 1 0 003.1 19h17.8a1 1 0 00.87-1.5l-8-14a1 1 0 00-1.74 0z"
                stroke="#4A5565"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
          <a
            className={styles.anchor}
            href="https://www.iconfont.cn/"
            target="_blank"
            rel="noreferrer"
          >
            iconfont.cn
          </a>
        </div>
      </section>

      {/* 7. Dialogs (Phone format) */}
      <section id="Dialogs" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.h2}>7. Dialogs</h2>
          <p className={styles.caption}>Matches PhoneGame modal format.</p>
          <button
            className="mainStartBtn"
            onClick={() => setShowDialog(true)}
            style={{ width: 220 }}
          >
            Open Demo Modal
          </button>
          {showDialog && (
            <div
              className={styles.modalOverlay}
              onClick={() => setShowDialog(false)}
            >
              <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
              >
                <div className={styles.modalTitle}>Confirm Action?</div>
                <div className={styles.modalText}>
                  This matches the Phone modal style used in the app.
                </div>
                <div className={styles.modalButtons}>
                  <button
                    className={`${styles.modalBtn} ${styles.modalCancel}`}
                    onClick={() => setShowDialog(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className={`${styles.modalBtn} ${styles.modalConfirm}`}
                    onClick={() => setShowDialog(false)}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
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
          <div className={styles.card}>
            <Header />
            <div className={styles.body} style={{ padding: 16 }}>
              Content area
            </div>
            <Footer />
          </div>
        </div>
      </section>

      {/* 11. Cards */}
      <section id="Cards" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.h2}>11. Cards</h2>
          <div className={styles.card}>
            <div className={styles.h3}>Standard Card</div>
            <div className={styles.body}>
              Padding 1.5rem · gap 0.625rem · 1.5rem radius · subtle shadow ·
              #e5e7eb border.
            </div>
          </div>
        </div>
      </section>

      {/* 12. Simulation */}
      <section id="Simulation" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.h2}>12. Simulation</h2>
          <div className={styles.card}>
            <div className={styles.h3}>Standard Simulation</div>
          </div>
        </div>
      </section>

      {/* 13. ContinuousScrolling */}
      <section id="ContinuousScrolling" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.h2}>13. ContinuousScrolling</h2>
          <div className={styles.card}>
            <div className={styles.h3}>Standard ContinuousScrolling</div>
          </div>
        </div>
      </section>

      {/* 14. SegmentingData */}
      <section id="SegmentingData" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.h2}>14. SegmentingData</h2>
          <div className={styles.card}>
            <div className={styles.h3}>Standard SegmentingData</div>
          </div>
        </div>
      </section>

      {/* 15. Components */}
      <section id="components" className={styles.section}>
				<div className={styles.container}>
					<h2 className={styles.h2}>10. Components</h2>
					
					{/* Tags */}
					<div style={{ marginTop: 12 }}>
						<div className={styles.caption} style={{ marginBottom: 8 }}>Tags</div>
						<div className={styles.demoRow}>
							<span 
								className={`${styles.sgTag} ${selectedTag === 'Tag' ? styles.sgTagSelected : ''}`}
								onClick={() => setSelectedTag(selectedTag === 'Tag' ? null : 'Tag')}
								style={{ cursor: 'pointer' }}
							>Tag</span>
							<span 
								className={`${styles.sgTag} ${selectedTag === 'Bank' ? styles.sgTagSelected : ''}`}
								onClick={() => setSelectedTag(selectedTag === 'Bank' ? null : 'Bank')}
								style={{ cursor: 'pointer' }}
							>Bank</span>
							<span 
								className={`${styles.sgTag} ${selectedTag === 'Scam' ? styles.sgTagSelected : ''}`}
								onClick={() => setSelectedTag(selectedTag === 'Scam' ? null : 'Scam')}
								style={{ cursor: 'pointer' }}
							>Scam</span>
						</div>
					</div>

					{/* Search Input */}
					<div style={{ marginTop: 24 }}>
						<div className={styles.caption} style={{ marginBottom: 8 }}>Search Input</div>
						<div className={styles.searchInputWrapper}>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
								<path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#555555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
						<div className={styles.caption} style={{ marginBottom: 8 }}>List End State</div>
						<div className={styles.hitButtonDivider}>
							<span className={styles.hitButtonLine}></span>
							<span className={styles.hitButtonText}>You Hit The Button</span>
							<span className={styles.hitButtonLine}></span>
						</div>
					</div>

					{/* Date Display */}
					<div style={{ marginTop: 24 }}>
						<div className={styles.caption} style={{ marginBottom: 8 }}>Timestamp Display</div>
						<div className={styles.demoRow} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
							<div className={styles.dateDisplayLong}>December 31, 2025</div>
							<div className={styles.dateDisplayRelative}>Today</div>
							<div className={styles.dateDisplayRelative}>Yesterday</div>
							<div className={styles.dateDisplayRelative}>1 hour ago</div>
							<div className={styles.dateDisplayRelative}>1 min ago</div>
						</div>
					</div>
					<div className={styles.caption} style={{ marginTop: 8 }}>No table; no toast/snackbar used.</div>
				</div>
			</section>

      {/* 16. One-Pager Overview */}
      <section id="OnePagerOverview" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.h2}>16. One-Pager Overview</h2>
          <div className={styles.onePagerGrid} style={{ marginTop: 12 }}></div>
        </div>
      </section>
    </div>
  );
}

export default StyleGuide;
