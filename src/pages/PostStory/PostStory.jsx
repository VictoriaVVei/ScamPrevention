import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PostStory.module.css";
import { Footer } from "../../components/Footer/Footer.jsx";

export function PostStory() {
  const navigate = useNavigate();
  const [step, setStep] = useState("form"); // form, success
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [tags, setTags] = useState([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const availableTags = ["# Email", "# Message", "# Call", "# Other Topic"];

  const toggleTag = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (images.length < 3) {
          setImages([...images, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    }
    // Reset input so the same file can be selected again if needed (though unlikely for this use case)
    e.target.value = null;
  };

  const handleSubmit = () => {
    setShowModal(true);
  };

  const confirmSubmit = () => {
    setShowModal(false);
    // Here you would typically send the data to a backend
    console.log({ title, story, tags, isAnonymous, isConfirmed, images });
    setStep("success");
  };

  const TopBar = () => (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.logoIcon}>
          <svg
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
          >
            <path
              d="M768 597.333333c94.208 0 170.666667 76.458667 170.666667 170.666667s-76.458667 170.666667-170.666667 170.666667-170.666667-76.458667-170.666667-170.666667 76.458667-170.666667 170.666667-170.666667zM128 230.314667c11.648 0 21.333333 8.533333 23.168 19.626666l0.298667 3.84v196.309334c0 169.984 90.282667 335.018667 229.162666 423.936a23.466667 23.466667 0 0 1-25.258666 39.509333C206.933333 818.602667 109.738667 645.546667 104.746667 464.768l-0.213334-14.677333v-196.266667a23.466667 23.466667 0 0 1 23.466667-23.466667z m406.613333-143.317334l6.186667 2.56 248.874667 115.541334c23.637333 11.008 39.68 34.645333 42.026666 61.312l0.298667 6.698666v174.677334c0 38.4-4.693333 76.330667-13.610667 112.938666a211.072 211.072 0 0 0-72.277333-4.949333c5.632-19.029333 9.984-38.570667 13.013333-58.453333l1.749334-12.714667H512V157.525333l-248.874667 115.626667v211.797333H512v331.904a299.306667 299.306667 0 0 0 44.842667-18.688c3.498667 25.258667 11.52 49.066667 23.125333 70.698667a360.789333 360.789333 0 0 1-67.968 24.917333c-179.797333-45.909333-314.538667-232.064-319.829333-433.621333l-0.170667-12.373333V273.109333c0-27.093333 14.250667-51.968 36.565333-64.981333l5.76-2.986667 248.874667-115.626666a67.968 67.968 0 0 1 51.456-2.517334z m340.736 600.618667a16.981333 16.981333 0 0 0-24.064 0L733.866667 805.034667l-49.322667-49.152a16.981333 16.981333 0 1 0-24.064 24.064l61.269333 61.269333a16.981333 16.981333 0 0 0 24.064 0l129.536-129.536a16.981333 16.981333 0 0 0 0-24.064zM896 230.314667c11.648 0 21.333333 8.533333 23.168 19.626666l0.298667 3.84v195.541334c0 50.944-7.338667 101.418667-21.034667 149.845333a213.248 213.248 0 0 0-41.813333-25.301333c9.216-35.882667 14.592-72.96 15.701333-110.293334l0.213333-14.250666V253.781333a23.466667 23.466667 0 0 1 23.466667-23.466666z"
              fill="var(--primary)"
            ></path>
          </svg>
        </span>
        <span className={styles.logoText}>ScamHub</span>
      </div>
    </header>
  );

  if (step === "success") {
    return (
      <div className={styles.container}>
        <TopBar />
        <main className={styles.main}>
          <div className={styles.successContainer}>
             
            
            <img 
              src="https://www.figma.com/api/mcp/asset/7c7573bd-7134-4c86-9f57-913e69b33e0e" 
              alt="Success" 
              className={styles.successImage} 
            />
            
            <div style={{ flex: 1 }}></div>

            <button className={styles.toMainButton} onClick={() => navigate("/landing-page")}>
              To Main
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <TopBar />
      <main className={styles.main}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 16.25L6.25 10L12.5 3.75"
              stroke="currentColor"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Main
        </button>

        <div className={styles.formGroup}>
          <input
            type="text"
            className={styles.formInput}
            placeholder="Add Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className={styles.formTextarea}
            placeholder="Add Story (What happened, when, how)"
            value={story}
            onChange={(e) => setStory(e.target.value)}
          />
        </div>

        {images.length === 0 ? (
          <div
            className={styles.uploadSection}
            onClick={() => fileInputRef.current.click()}
          >
            <div className={styles.uploadLabel}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                  stroke="var(--title-normal-c)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 8L12 3L7 8"
                  stroke="var(--title-normal-c)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 3V15"
                  stroke="var(--title-normal-c)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Upload Screenshot (Optional)
            </div>
            <div className={styles.uploadHint}>
              Please ensure redacted all personal information
            </div>
          </div>
        ) : (
          <div className={styles.imageUploadGrid}>
            {images.map((imgSrc, index) => (
              <div key={index} className={styles.imagePreview}>
                <img src={imgSrc} alt={`Uploaded screenshot ${index + 1}`} />
              </div>
            ))}
            {images.length < 3 && (
              <div
                className={styles.addImageBtn}
                onClick={() => fileInputRef.current.click()}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5V19M5 12H19"
                    stroke="#94A3B8"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleImageUpload}
        />

        <div className={styles.tagsSection}>
          <div className={styles.sectionLabel}>Scam Tags (Optional)</div>
          <div className={styles.tagsList}>
            {availableTags.map((tag) => (
              <button
                key={tag}
                className={`${styles.tag} ${
                  tags.includes(tag) ? styles.tagSelected : ""
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.consentSection}>
          <div className={styles.checkboxRow} onClick={() => setIsAnonymous(!isAnonymous)}>
            <input
              type="checkbox"
              id="anonymous"
              className={styles.checkbox}
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            <label htmlFor="anonymous" className={styles.checkboxLabel} onClick={(e) => e.stopPropagation()}>
              Share Anonymous
            </label>
          </div>
          <div className={styles.checkboxRow} onClick={() => setIsConfirmed(!isConfirmed)}>
            <input
              type="checkbox"
              id="confirmed"
              className={styles.checkbox}
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
            />
            <label htmlFor="confirmed" className={styles.checkboxLabel} onClick={(e) => e.stopPropagation()}>
              I confirm this knowledge is true
            </label>
          </div>
        </div>

        <button
          className={styles.submitButton}
          disabled={!title || !story || !isConfirmed}
          onClick={handleSubmit}
        >
          Submit Story
        </button>
      </main>
      <Footer />

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalTitle}>Please Ensure Your Submission !</div>
            <div className={styles.modalActions}>
              <button
                className={`${styles.modalBtn} ${styles.btnPrimary}`}
                onClick={confirmSubmit}
              >
                Submit
              </button>
              <button
                className={`${styles.modalBtn} ${styles.btnSecondary}`}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostStory;

