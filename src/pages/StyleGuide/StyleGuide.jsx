import React, { useState } from "react";
import styles from "./StyleGuide.module.css";

export function StyleGuide() {
	const [showDialog, setShowDialog] = useState(false);
	const [switchOn, setSwitchOn] = useState(true);

	return (
		<div className={styles.page}>
					{/* 0. Overview */}
					{/* Landing Page UI intentionally excluded from this guide snapshot */}
			<section className={styles.hero}>
				<div className={styles.container}>
							<div className={styles.kicker}>Scam Hub · UI Style Guide</div>
							<h1 className={styles.h1}>Design System Overview</h1>
							<p className={styles.body} style={{ marginTop: 8 }}>
								This Style Guide documents Scam Hub’s visual and interaction foundations: brand, colors, type, layout, buttons, forms, icons, dialogs, navigation patterns, and more. Landing Page UI is not included yet.
							</p>

					<div className={styles.pillNav}>
						{[
							"logo",
							"colors",
							"type",
							"layout",
							"buttons",
							"icons",
							"forms",
							"dialogs",
							"navigation",
							"cards",
							"tables",
							"components",
							"code",
							"onepager",
						].map((id) => (
							<a key={id} className={styles.anchor} href={`#${id}`}>
								{id}
							</a>
						))}
					</div>
				</div>
			</section>

					{/* 1. Logo */}
			<section id="logo" className={styles.section}>
				<div className={styles.container}>
							<h2 className={styles.h2}>1. Logo</h2>
							<p className={styles.body}>Final logo and approved backgrounds. Minimum size: 24×24.</p>
					<div className={styles.logoRow} style={{ marginTop: 12 }}>
						<img className={styles.logo} src="/img/logo.png" alt="Scam Hub Logo" />
						<div className={`${styles.logoBox} ${styles.bgLight}`}>
							<img className={styles.logo} src="/img/logo.png" alt="Logo on light" />
						</div>
						<div className={`${styles.logoBox} ${styles.bgDark}`}>
							<img className={styles.logo} src="/img/logo.png" alt="Logo on dark" />
						</div>
					</div>
					<div style={{ marginTop: 12 }}>
								<div className={styles.caption}>Don’t: stretch, recolor, add glow or outlines.</div>
					</div>
				</div>
			</section>

					{/* 2. Color System */}
			<section id="colors" className={styles.section}>
				<div className={styles.container}>
							<h2 className={styles.h2}>2. Color System</h2>

							<h3 className={styles.h3} style={{ marginTop: 12 }}>2.1 Primary Colors</h3>
					<div className={`${styles.grid} ${styles.gridCols4}`} style={{ marginTop: 8 }}>
						{[
							{ name: "Primary", var: "--primary" },
							{ name: "Secondary", var: "--secondary" },
							{ name: "Accent", var: "--accent" },
									{ name: "Mint Bg", var: "--bg-mint" },
						].map((c) => (
							<div key={c.name} className={styles.swatch}>
								<div className={styles.swatchColor} style={{ background: `var(${c.var})` }} />
								<div className={styles.swatchMeta}>
									{c.name} · {c.var}
								</div>
							</div>
						))}
					</div>

							<h3 className={styles.h3} style={{ marginTop: 16 }}>2.2 Neutral Colors</h3>
					<div className={`${styles.grid} ${styles.gridCols4}`} style={{ marginTop: 8 }}>
						{[
							"--gray-900",
							"--gray-700",
							"--gray-600",
							"--gray-400",
							"--gray-300",
							"--gray-200",
									"--gray-100",
							"--white",
						].map((v) => (
							<div key={v} className={styles.swatch}>
								<div className={styles.swatchColor} style={{ background: `var(${v})` }} />
								<div className={styles.swatchMeta}>{v}</div>
							</div>
						))}
					</div>

							<h3 className={styles.h3} style={{ marginTop: 16 }}>2.3 Semantic Colors</h3>
					<div className={`${styles.grid} ${styles.gridCols4}`} style={{ marginTop: 8 }}>
						{[
							{ name: "Success", var: "--success", bg: "--success-bg" },
							{ name: "Warning", var: "--warning", bg: "--warning-bg" },
							{ name: "Error", var: "--error", bg: "#FEF2F2" },
							{ name: "Info", var: "--info", bg: "--info-bg" },
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

							<h3 className={styles.h3} style={{ marginTop: 16 }}>2.4 Usage Rules</h3>
							<ul className={styles.body}>
								<li>Primary buttons must use var(--primary) as background.</li>
								<li>Success is for confirmed success feedback only.</li>
								<li>Warning is for cautionary notices, not errors.</li>
								<li>Error is for blocking errors and validation failures.</li>
								<li>Icons default to var(--gray-700); in buttons they should be white.</li>
							</ul>
				</div>
			</section>

					{/* 3. Typography */}
			<section id="type" className={styles.section}>
				<div className={styles.container}>
							<h2 className={styles.h2}>3. Typography</h2>
							<p className={styles.caption}>Default font: Arimo (sans-serif). Scale below.</p>
					<div style={{ marginTop: 12 }}>
								<div className={styles.h1}>H1 · 32px · Page title</div>
								<div className={styles.h2} style={{ marginTop: 8 }}>H2 · 24px · Section title</div>
								<div className={styles.h3} style={{ marginTop: 8 }}>H3 · 20px · Subsection title</div>
								<div className={styles.body} style={{ marginTop: 8 }}>Body · 16px · Main body text</div>
								<div className={styles.caption} style={{ marginTop: 8 }}>Caption · 12px · Helper text</div>
					</div>
				</div>
			</section>

					{/* 4. Layout & Spacing */}
			<section id="layout" className={styles.section}>
				<div className={styles.container}>
							<h2 className={styles.h2}>4. Layout & Spacing</h2>
					<div className={`${styles.grid} ${styles.gridCols2}`} style={{ marginTop: 12 }}>
						<div>
									<h3 className={styles.h3}>4.1 Grid System</h3>
									<p className={styles.body}>12-column grid, container max-width 1200px, 16px gutter.</p>
						</div>
						<div>
									<h3 className={styles.h3}>4.2 Spacing Scale</h3>
							<ul className={styles.body}>
										<li>xxs 4px · xs 8px · sm 12px · md 16px · lg 24px · xl 32px</li>
							</ul>
						</div>
					</div>
					<div className={styles.card} style={{ marginTop: 12 }}>
								<div className={styles.caption}>Container example: .container</div>
								<div className={styles.container} style={{ border: '1px dashed var(--gray-300)', borderRadius: 8 }}>Content area</div>
					</div>
				</div>
			</section>

					{/* 5. Buttons */}
			<section id="buttons" className={styles.section}>
				<div className={styles.container}>
							<h2 className={styles.h2}>5. Buttons</h2>
					<div className={styles.btnRow} style={{ marginTop: 12 }}>
						<button className={`${styles.btn} ${styles.btnPrimary}`}>Primary</button>
						<button className={`${styles.btn} ${styles.btnSecondary}`}>Secondary</button>
						<button className={`${styles.btn} ${styles.btnGhost}`}>Ghost</button>
						<button className={`${styles.btn} ${styles.btnDestructive}`}>Destructive</button>
						<button className={`${styles.btn}`} disabled>Disabled</button>
						<button className={`${styles.btn} ${styles.btnPrimary} ${styles.iconBtn}`}>
							<svg className={styles.icon} viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" strokeWidth="2" stroke="currentColor" strokeLinecap="round"/></svg>
							Icon Button
						</button>
					</div>
				</div>
			</section>

					{/* 6. Icons */}
			<section id="icons" className={styles.section}>
				<div className={styles.container}>
							<h2 className={styles.h2}>6. Icons</h2>
							<p className={styles.caption}>Line icons, 24px, stroke var(--gray-700) by default.</p>
					<div className={styles.btnRow} style={{ marginTop: 12 }}>
						{/* warning */}
						<svg className={styles.icon} viewBox="0 0 24 24"><path d="M12 9v4m0 4h.01M10.29 3.86l-8 14A1 1 0 003.1 19h17.8a1 1 0 00.87-1.5l-8-14a1 1 0 00-1.74 0z" strokeWidth="2" stroke="currentColor" fill="none"/></svg>
						{/* message */}
						<svg className={styles.icon} viewBox="0 0 24 24"><path d="M21 15a4 4 0 01-4 4H8l-5 3V6a4 4 0 014-4h10a4 4 0 014 4z" strokeWidth="2" stroke="currentColor" fill="none"/></svg>
						{/* chat bubble */}
						<svg className={styles.icon} viewBox="0 0 24 24"><path d="M8 10h8M8 14h5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" stroke="currentColor" fill="none"/></svg>
						{/* check-circle */}
						<svg className={styles.icon} viewBox="0 0 24 24"><path d="M9 12l2 2 4-4M12 22a10 10 0 100-20 10 10 0 000 20z" strokeWidth="2" stroke="currentColor" fill="none"/></svg>
						{/* info-circle */}
						<svg className={styles.icon} viewBox="0 0 24 24"><path d="M12 8h.01M11 12h1v4h1m-1-12a10 10 0 100 20 10 10 0 000-20z" strokeWidth="2" stroke="currentColor" fill="none"/></svg>
						{/* error alert */}
						<svg className={styles.icon} viewBox="0 0 24 24"><path d="M12 9v4m0 4h.01M10.29 3.86l-8 14A1 1 0 003.1 19h17.8a1 1 0 00.87-1.5l-8-14a1 1 0 00-1.74 0z" strokeWidth="2" stroke="currentColor" fill="none"/></svg>
					</div>
				</div>
			</section>

					{/* 7. Forms */}
			<section id="forms" className={styles.section}>
				<div className={styles.container}>
							<h2 className={styles.h2}>7. Forms</h2>
					<div className={`${styles.grid} ${styles.gridCols2}`} style={{ marginTop: 12 }}>
						<div>
									<label className={styles.label}>Input field</label>
									<input className={styles.input} placeholder="Type something" />
									<div className={styles.help}>Default + focus shows primary outline.</div>

									<label className={styles.label} style={{ marginTop: 12 }}>Input with error</label>
									<input className={`${styles.input} ${styles.inputError}`} placeholder="Wrong email" />
									<div className={`${styles.help} ${styles.errorText}`}>Please enter a valid email</div>

									<label className={styles.label} style={{ marginTop: 12 }}>Textarea</label>
									<textarea className={styles.textarea} placeholder="Multiline text..." />
						</div>
						<div>
							<label className={styles.label}>Dropdown</label>
							<select className={styles.select}>
										<option>Option A</option>
										<option>Option B</option>
										<option>Option C</option>
							</select>

							<div className={styles.checkRow} style={{ marginTop: 12 }}>
								<input id="ck1" type="checkbox" className={styles.checkbox} defaultChecked />
								<label htmlFor="ck1">Checkbox</label>
							</div>
							<div className={styles.checkRow}>
								<input id="rd1" name="rds" type="radio" className={styles.radio} defaultChecked />
										<label htmlFor="rd1">Radio A</label>
								<input id="rd2" name="rds" type="radio" className={styles.radio} />
								<label htmlFor="rd2">Radio B</label>
							</div>

							<div style={{ marginTop: 12 }}>
								<div className={`${styles.switch} ${switchOn ? styles.switchOn : ''}`} onClick={() => setSwitchOn(v => !v)} role="switch" aria-checked={switchOn}>
									<span className={styles.switchKnob} />
								</div>
										<div className={styles.caption}>Toggle switch</div>
							</div>
						</div>
					</div>
				</div>
			</section>

					{/* 8. Dialogs */}
			<section id="dialogs" className={styles.section}>
				<div className={styles.container}>
							<h2 className={styles.h2}>8. Dialogs</h2>
							<button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => setShowDialog(true)}>Open sample dialog</button>
					{showDialog && (
						<div className={styles.dialogOverlay} onClick={() => setShowDialog(false)}>
							<div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
								<div className={styles.dialogHeader}>
											<div className={styles.h3}>Confirm submission</div>
											<button className={`${styles.btn} ${styles.btnGhost}`} onClick={() => setShowDialog(false)}>Close</button>
								</div>
										<div className={styles.body}>Are you sure you want to submit this report? This action can’t be undone.</div>
								<div className={styles.dialogActions}>
											<button className={`${styles.btn} ${styles.btnGhost}`} onClick={() => setShowDialog(false)}>Cancel</button>
											<button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => setShowDialog(false)}>Confirm</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</section>

					{/* 9. Navigation / Patterns */}
			<section id="navigation" className={styles.section}>
				<div className={styles.container}>
							<h2 className={styles.h2}>9. Navigation / Design Patterns</h2>
							<p className={styles.caption}>Top nav, bottom tab bar, back button, confirmation modal.</p>
							<ul className={styles.body} style={{ marginTop: 12 }}>
								<li>Tab bar: bottom navigation (Guide / Add / Daily Checkup).</li>
								<li>Top navigation: left-aligned brand with generous whitespace.</li>
								<li>Confirmation dialog: for risky or irreversible actions (e.g., report).</li>
								<li>Scam story card: summarize case with tags and primary action.</li>
							</ul>
				</div>
			</section>

					{/* 10. Cards & Lists + 11. Tables */}
			<section id="cards" className={styles.section}>
				<div className={styles.container}>
							<h2 className={styles.h2}>10. Cards & Lists</h2>
					<div className={`${styles.grid} ${styles.gridCols2}`} style={{ marginTop: 12 }}>
						<div className={styles.card}>
							<div className={styles.h3}>Scam Story</div>
							<div className={styles.storyMeta} style={{ marginTop: 8 }}>
								<span className={styles.tag}>Phishing</span>
								<span className={styles.tag}>Bank</span>
								<span className={styles.badge}>New</span>
							</div>
							<p className={styles.body} style={{ marginTop: 8 }}>
										Received SMS pretending to be from a bank. The link led to a fake page asking for card details…
							</p>
							<div style={{ marginTop: 12 }}>
										<button className={`${styles.btn} ${styles.btnSecondary}`}>View details</button>
							</div>
						</div>

						<div>
							<div className={styles.list}>
								{[1,2,3].map((i) => (
									<div key={i} className={styles.listItem}>
										<div className={styles.avatar} />
										<div>
																	<div className={styles.h3}>Message #{i}</div>
																	<div className={styles.caption}>Potential scam indicators · {i} min ago</div>
										</div>
																<span className={styles.badge}>Scan</span>
									</div>
								))}
							</div>
						</div>
					</div>

											<h2 id="tables" className={styles.h2} style={{ marginTop: 24 }}>11. Tables</h2>
					<table className={styles.table} style={{ marginTop: 12 }}>
						<thead>
							<tr>
														<th>Type</th>
														<th>Source</th>
														<th>Status</th>
														<th>Timestamp</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Phishing</td>
								<td>SMS</td>
														<td><span className={styles.badge}>Pending</span></td>
														<td>2025-11-19</td>
							</tr>
							<tr>
								<td>Fake Invoice</td>
								<td>Email</td>
														<td><span className={styles.badge}>Reviewed</span></td>
														<td>2025-11-18</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

					{/* 12. Components Summary */}
			<section id="components" className={styles.section}>
				<div className={styles.container}>
							<h2 className={styles.h2}>12. Components Summary</h2>
					<div className={`${styles.grid} ${styles.gridCols3}`} style={{ marginTop: 12 }}>
						<div>
									<div className={`${styles.alert} ${styles.alertInfo}`}>Info message</div>
									<div className={`${styles.alert} ${styles.alertSuccess}`} style={{ marginTop: 8 }}>Success state</div>
									<div className={`${styles.alert} ${styles.alertWarning}`} style={{ marginTop: 8 }}>Warning notice</div>
									<div className={`${styles.alert} ${styles.alertError}`} style={{ marginTop: 8 }}>Error state</div>
						</div>
						<div>
							<div>
								<span className={styles.tag}>Tag</span>{" "}
								<span className={styles.tag}>Bank</span>{" "}
								<span className={styles.tag}>Scam</span>
							</div>
							<div className={styles.empty} style={{ marginTop: 12 }}>
										No data · Empty State
							</div>
						</div>
						<div>
									<div className={styles.toast}>Toast / Snackbar example</div>
							<div style={{ marginTop: 12 }}>
								<span className={styles.spinner} />
										<span className={styles.caption} style={{ marginLeft: 8 }}>Loading Spinner</span>
							</div>
						</div>
					</div>
				</div>
			</section>

					{/* 13. Code Section */}
			<section id="code" className={styles.section}>
				<div className={styles.container}>
							<h2 className={styles.h2}>13. Code (CSS library)</h2>
							<p className={styles.caption}>Global tokens, components, layout and responsive samples.</p>
					<pre className={styles.body} style={{ background: "#0f172a", color: "#e2e8f0", padding: 16, borderRadius: 8, overflow: 'auto' }}>
{`:root {
	--primary: #18a193; --secondary: #009689; --accent: #155dfc;
	--success: #00a63e; --warning: #f54900; --error: #b91c1c; --info: #155dfc;
	--gray-900: #1a1a1a; --gray-700: #4a5565; --gray-600: #555555; --gray-300: #e5e7eb; --gray-100: #f5f5f5; --white: #ffffff;
	--fs-h1: 32px; --fs-h2: 24px; --fs-h3: 20px; --fs-body: 16px; --fs-caption: 12px;
	--space-xxs: 4px; --space-xs: 8px; --space-sm: 12px; --space-md: 16px; --space-lg: 24px; --space-xl: 32px;
}
.btn-primary { background: var(--primary); color: #fff; padding: 12px 20px; border-radius: 8px; }
.input { padding: 12px; border: 1px solid var(--gray-300); border-radius: 8px; }
@media (max-width: 600px) { .container { padding: 16px; } }
`}
					</pre>
				</div>
			</section>

					{/* 14. One-Pager Overview */}
			<section id="onepager" className={styles.section}>
				<div className={styles.container}>
							<h2 className={styles.h2}>14. One-Pager Style Guide Overview</h2>
					<div className={styles.onePagerGrid} style={{ marginTop: 12 }}>
						{/* Colors */}
						<div>
							<div className={styles.h3}>Colors</div>
							<div className={styles.btnRow} style={{ marginTop: 8 }}>
								{['--primary','--secondary','--accent','--success','--warning','--error'].map(v => (
									<div key={v} className={styles.swatch} style={{ width: 80 }}>
										<div className={styles.swatchColor} style={{ background: `var(${v})` }} />
										<div className={styles.swatchMeta}>{v}</div>
									</div>
								))}
							</div>
						</div>
						{/* Type */}
						<div>
							<div className={styles.h3}>Typography</div>
							<div className={styles.h2} style={{ marginTop: 8 }}>H2</div>
							<div className={styles.body}>Body text</div>
							<div className={styles.caption}>Caption</div>
						</div>
						{/* Buttons */}
						<div>
							<div className={styles.h3}>Buttons</div>
							<div className={styles.btnRow} style={{ marginTop: 8 }}>
								<button className={`${styles.btn} ${styles.btnPrimary}`}>Primary</button>
								<button className={`${styles.btn} ${styles.btnGhost}`}>Ghost</button>
							</div>
						</div>
						{/* Icons */}
						<div>
							<div className={styles.h3}>Icons</div>
							<div className={styles.btnRow} style={{ marginTop: 8 }}>
								<svg className={styles.icon} viewBox="0 0 24 24"><path d="M9 12l2 2 4-4M12 22a10 10 0 100-20 10 10 0 000 20z" strokeWidth="2" stroke="currentColor"/></svg>
								<svg className={styles.icon} viewBox="0 0 24 24"><path d="M12 8h.01M11 12h1v4h1m-1-12a10 10 0 100 20 10 10 0 000-20z" strokeWidth="2" stroke="currentColor"/></svg>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default StyleGuide;

