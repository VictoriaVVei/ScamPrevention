import React, { useState } from "react";
import styles from "./StyleGuide.module.css";
import { Header } from "../../components/Header/Header.jsx";
import { Footer } from "../../components/Footer/Footer.jsx";

export function StyleGuide() {
	const [showDialog, setShowDialog] = useState(false);

	return (
		<div className={styles.page}>
			{/* 0. Overview (English, no Landing Page UI) */}
			<section className={styles.hero}>
				<div className={styles.container}>
					<div className={styles.kicker}>Scam Hub · UI Style Guide</div>
					<h1 className={styles.h1}>Overview</h1>
					<p className={styles.body} style={{ marginTop: 8 }}>
						This guide documents the exact UI patterns used across the app (excluding Landing Page UI): logo, colors, typography, page layout (id + .main), buttons in use, icons, dialogs (Phone format), navigation, cards, tags, and code tokens.
					</p>
					<div className={styles.pillNav}>
						{["logo","colors","type","layout","buttons","icons","dialogs","navigation","cards","components","code","onepager"].map(id => (
							<a key={id} className={styles.anchor} href={`#${id}`}>{id}</a>
						))}
					</div>
				</div>
			</section>

			{/* 1. Logo */}
			<section id="logo" className={styles.section}>
				<div className={styles.container}>
					<h2 className={styles.h2}>1. Logo</h2>
					<p className={styles.caption}>Final logo, min size 24×24, usable on light and dark backgrounds.</p>
					<div className={styles.logoRow} style={{ marginTop: 12 }}>
						<img className={styles.logo} src="/img/logo.png" alt="Scam Hub logo" />
						<div className={`${styles.logoBox} ${styles.bgLight}`}>
							<img className={styles.logo} src="/img/logo.png" alt="Logo on light" />
						</div>
						<div className={`${styles.logoBox} ${styles.bgDark}`}>
							<img className={styles.logo} src="/img/logo.png" alt="Logo on dark" />
						</div>
					</div>
					<div className={styles.caption} style={{ marginTop: 8 }}>Don’t: stretch, recolor, add outlines/glows.</div>
				</div>
			</section>

			{/* 2. Color System (only colors used) */}
			<section id="colors" className={styles.section}>
				<div className={styles.container}>
					<h2 className={styles.h2}>2. Color System</h2>
					<div className={`${styles.grid} ${styles.gridCols4}`} style={{ marginTop: 8 }}>
						{[{name:'Primary',var:'--primary'},{name:'Teal (secondary usage)',var:'--accent'},{name:'Accent Blue',var:'--secondary'}].map(c => (
							<div key={c.name} className={styles.swatch}>
								<div className={styles.swatchColor} style={{ background: `var(${c.var})` }} />
								<div className={styles.swatchMeta}>{c.name} · {c.var}</div>
							</div>
						))}
					</div>
					<div className={`${styles.grid} ${styles.gridCols4}`} style={{ marginTop: 8 }}>
						{["--gray-900","--gray-700","--gray-600","--gray-300","--gray-200","--gray-100","--white"].map(v => (
							<div key={v} className={styles.swatch}>
								<div className={styles.swatchColor} style={{ background: `var(${v})` }} />
								<div className={styles.swatchMeta}>{v}</div>
							</div>
						))}
					</div>
					<div className={`${styles.grid} ${styles.gridCols4}`} style={{ marginTop: 8 }}>
						{[{name:'Success',var:'--success'},{name:'Warning',var:'--warning'},{name:'Error',var:'--error'}].map(c => (
							<div key={c.name} className={styles.swatch}>
								<div className={styles.swatchColor} style={{ background: `var(${c.var})` }} />
								<div className={styles.swatchMeta}>{c.name} · {c.var}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* 3. Typography (Arimo only) */}
			<section id="type" className={styles.section}>
				<div className={styles.container}>
					<h2 className={styles.h2}>3. Typography</h2>
					<p className={styles.caption}>Font: Arimo, sans-serif.</p>
					<div style={{ marginTop: 12 }}>
						<div className={styles.h1}>H1 · 32px</div>
						<div className={styles.h2} style={{ marginTop: 8 }}>H2 · 24px</div>
						<div className={styles.h3} style={{ marginTop: 8 }}>H3 · 20px</div>
						<div className={styles.body} style={{ marginTop: 8 }}>Body · 16px</div>
						<div className={styles.caption} style={{ marginTop: 8 }}>Caption · 12px</div>
					</div>
				</div>
			</section>

			{/* 4. Page Layout Pattern (id + .main) */}
			<section id="layout" className={styles.section}>
				<div className={styles.container}>
					<h2 className={styles.h2}>4. Page Layout Pattern</h2>
					<p className={styles.body}>Each page uses an id root with 100vh and a .main that flexes, with overflow-y for inner scroll. Entry animation via keyframes.</p>
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
			<section id="buttons" className={styles.section}>
				<div className={styles.container}>
					<h2 className={styles.h2}>5. Buttons</h2>
					<p className={styles.caption}>Only two buttons are used across the app.</p>
					<div className={styles.demoRow} style={{ marginTop: 8 }}>
						<a className="backBtn" href="#buttons">Back (backBtn)</a>
						<button className="mainStartBtn" style={{ width: 220 }}>Start (mainStartBtn)</button>
					</div>
					<div style={{ marginTop: 12 }}>
						<div className={styles.caption}>Selection button (Daily Question):</div>
						<div className={styles.option} style={{ width: 320 }}>
							<span className={styles.optionCircle}></span>
							<span className={styles.optionText}>Selectable option</span>
						</div>
					</div>
				</div>
			</section>

			{/* 6. Icons (from iconfont.cn) */}
			<section id="icons" className={styles.section}>
				<div className={styles.container}>
					<h2 className={styles.h2}>6. Icons</h2>
					<p className={styles.caption}>Source: iconfont.cn. Size varies by context (common: 16 / 20 / 24).</p>
					<div className={styles.demoRow} style={{ marginTop: 8 }}>
						<svg width="16" height="16" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4M12 22a10 10 0 100-20 10 10 0 000 20z" stroke="#4A5565" strokeWidth="2" fill="none"/></svg>
						<svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 8h.01M11 12h1v4h1m-1-12a10 10 0 100 20 10 10 0 000-20z" stroke="#4A5565" strokeWidth="2" fill="none"/></svg>
						<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 9v4m0 4h.01M10.29 3.86l-8 14A1 1 0 003.1 19h17.8a1 1 0 00.87-1.5l-8-14a1 1 0 00-1.74 0z" stroke="#4A5565" strokeWidth="2" fill="none"/></svg>
					</div>
					<a className={styles.anchor} href="https://www.iconfont.cn/" target="_blank" rel="noreferrer">iconfont.cn</a>
				</div>
			</section>

			{/* 7. Dialogs (Phone format) */}
			<section id="dialogs" className={styles.section}>
				<div className={styles.container}>
					<h2 className={styles.h2}>7. Dialogs</h2>
					<p className={styles.caption}>Matches PhoneGame modal format.</p>
					<button className="mainStartBtn" onClick={() => setShowDialog(true)} style={{ width: 220 }}>Open Demo Modal</button>
					{showDialog && (
						<div className={styles.modalOverlay} onClick={() => setShowDialog(false)}>
							<div className={styles.modal} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
								<div className={styles.modalTitle}>Confirm Action?</div>
								<div className={styles.modalText}>This matches the Phone modal style used in the app.</div>
								<div className={styles.modalButtons}>
									<button className={`${styles.modalBtn} ${styles.modalCancel}`} onClick={() => setShowDialog(false)}>Cancel</button>
									<button className={`${styles.modalBtn} ${styles.modalConfirm}`} onClick={() => setShowDialog(false)}>Confirm</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</section>

			{/* 8. Navigation */}
			<section id="navigation" className={styles.section}>
				<div className={styles.container}>
					<h2 className={styles.h2}>8. Navigation Patterns</h2>
					<div className={styles.card}>
						<Header />
						<div className={styles.body} style={{ padding: 16 }}>Content area</div>
						<Footer />
					</div>
				</div>
			</section>

			{/* 9. Cards */}
			<section id="cards" className={styles.section}>
				<div className={styles.container}>
					<h2 className={styles.h2}>9. Cards</h2>
					<div className={styles.card}>
						<div className={styles.h3}>Standard Card</div>
						<div className={styles.body}>Padding 1.5rem · gap 0.625rem · 1.5rem radius · subtle shadow · #e5e7eb border.</div>
					</div>
				</div>
			</section>

			{/* 10. Components (Tags only for now) */}
			<section id="components" className={styles.section}>
				<div className={styles.container}>
					<h2 className={styles.h2}>10. Components</h2>
					<div className={styles.demoRow}>
						<span className={styles.sgTag}>Tag</span>
						<span className={styles.sgTag}>Bank</span>
						<span className={styles.sgTag}>Scam</span>
					</div>
					<div className={styles.caption} style={{ marginTop: 8 }}>No table; no toast/snackbar used.</div>
				</div>
			</section>

			{/* 11. Code tokens */}
			<section id="code" className={styles.section}>
				<div className={styles.container}>
					<h2 className={styles.h2}>11. Code Tokens</h2>
					<pre className={styles.code}>{`:root {
	--primary: #18a193; --accent: #009689; --secondary: #155dfc;
	--success: #00a63e; --warning: #f54900; --error: #b91c1c;
	--gray-900: #1a1a1a; --gray-700: #4a5565; --gray-600: #555555; --gray-300: #e5e7eb; --gray-200: #e2e8f0; --gray-100: #f8fafc; --white: #ffffff;
}`}</pre>
				</div>
			</section>

			{/* 12. One-Pager Overview */}
			<section id="onepager" className={styles.section}>
				<div className={styles.container}>
					<h2 className={styles.h2}>12. One-Pager Overview</h2>
					<div className={styles.onePagerGrid} style={{ marginTop: 12 }}>
						<div>
							<div className={styles.h3}>Colors</div>
							<div className={styles.demoRow} style={{ marginTop: 8 }}>
								{["--primary","--accent","--secondary","--success","--warning","--error"].map(v => (
									<div key={v} className={styles.swatch} style={{ width: 80 }}>
										<div className={styles.swatchColor} style={{ background: `var(${v})` }} />
										<div className={styles.swatchMeta}>{v}</div>
									</div>
								))}
							</div>
						</div>
						<div>
							<div className={styles.h3}>Typography</div>
							<div className={styles.body}>Arimo · H2 / Body / Caption</div>
						</div>
						<div>
							<div className={styles.h3}>Buttons</div>
							<div className={styles.demoRow} style={{ marginTop: 8 }}>
								<a className="backBtn" href="#">Back</a>
								<button className="mainStartBtn">Start</button>
							</div>
						</div>
						<div>
							<div className={styles.h3}>Icons</div>
							<div className={styles.demoRow} style={{ marginTop: 8 }}>
								<svg width="20" height="20" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4M12 22a10 10 0 100-20 10 10 0 000 20z" stroke="#4A5565" strokeWidth="2" fill="none"/></svg>
								<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 8h.01M11 12h1v4h1m-1-12a10 10 0 100 20 10 10 0 000-20z" stroke="#4A5565" strokeWidth="2" fill="none"/></svg>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default StyleGuide;
 
