import React, { useState } from "react";
import styles from "./ReportScam.module.css";
import { Header } from "../../components/Header/Header.jsx";
import { Footer } from "../../components/Footer/Footer.jsx";
import { Modal } from "../../components/Modal/Modal.jsx";
import { useNavigate } from "react-router-dom";

const INITIAL_FORM_STATE = {
  scamType: "",
  description: "",
  date: "",
  contactMethod: ""
};

const TYPE_LABEL_MAP = {
  "new-scam": "New Scam",
  "web-scam": "Web Scam",
  "phone-scam": "Phone Scam"
};

export function ReportScam() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => ({ ...INITIAL_FORM_STATE }));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState(() => ({ ...INITIAL_FORM_STATE }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  console.log("Report submitted:", formData);
  setSubmittedData({ ...formData });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    setFormData({ ...INITIAL_FORM_STATE });
    setSubmittedData({ ...INITIAL_FORM_STATE });
    navigate("/landing-page");
  };

  return (
    <div id={styles.ReportScam}>
      <Header />
      <main className={styles.main}>
        <div className="backBtn" onClick={() => navigate("/report-guideline")}> &lt; Back</div>
        <section className={styles.card}>
          <h1 className={styles.title}>Report a Scam</h1>
          
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="scamType">Type of Scam</label>
              <select 
                id="scamType"
                name="scamType" 
                className={styles.select}
                value={formData.scamType}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                <option value="new-scam">New Scam</option>
                <option value="web-scam">Web Scam</option>
                <option value="phone-scam">Phone Scam</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="contactMethod">How did they contact you?</label>
              <input
                type="text"
                id="contactMethod"
                name="contactMethod"
                className={styles.input}
                placeholder="e.g., WhatsApp, Email, Phone Call"
                value={formData.contactMethod}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="date">Date of Incident</label>
              <input
                type="date"
                id="date"
                name="date"
                className={styles.input}
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                className={styles.textarea}
                placeholder="Please describe what happened..."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Submit Report
            </button>
          </form>
        </section>
      </main>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onCancel={handleModalClose}
        cancelText="Back"
        title={
          <div className={styles.modalHeader}>
            <span className={styles.modalIcon} aria-hidden>✓</span>
            <span>Submitted</span>
          </div>
        }
        summary={
          <div className={styles.modalSummaryContent}>
            <p className={styles.modalSummarySmall}>We received your report</p>
            <p>
              <span className={styles.modalHighlight}>Scam Verify Experts</span> will review it shortly
            </p>
            <p>You have helped protect others.</p>
            <div className={styles.modalReviewBox}>
              <div>
                <span className={styles.modalReviewLabel}>Scam Type:</span>
                <span>{TYPE_LABEL_MAP[submittedData.scamType] || "—"}</span>
              </div>
              <div>
                <span className={styles.modalReviewLabel}>Contact Method:</span>
                <span>{submittedData.contactMethod || "—"}</span>
              </div>
              <div>
                <span className={styles.modalReviewLabel}>Date:</span>
                <span>{submittedData.date || "—"}</span>
              </div>
            </div>
          </div>
        }
        confirmText="Home"
        onConfirm={handleModalConfirm}
      />
      <Footer />
    </div>
  );
}
