import React from "react";
import styles from "./Modal.module.css";

/**
 * Shared Modal component
 * Props:
 * - isOpen: boolean
 * - onClose: function (called when clicking overlay or cancel when no onCancel provided)
 * - title: string
 * - summary: React.ReactNode (renders in gray summary box)
 * - children: React.ReactNode (custom body; ignored if summary provided)
 * - confirmText: string (default: "Confirm")
 * - cancelText: string (default: "Cancel")
 * - onConfirm: function
 * - onCancel: function (default: onClose)
 * - within: boolean (if true, overlay is absolute within parent instead of fixed)
 */
export function Modal({
  isOpen,
  onClose,
  title,
  summary,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  within = false,
}) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      if (onCancel) onCancel();
      else if (onClose) onClose();
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    else if (onClose) onClose();
  };

  const showButtons = Boolean(onConfirm) || Boolean(onCancel) || Boolean(onClose);

  return (
    <div
      className={within ? styles.modalOverlayWithin : styles.modalOverlay}
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div className={styles.modal} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        {title ? <div className={styles.modalTitle}>{title}</div> : null}
        {summary ? (
          <div className={styles.modalSummary}>{summary}</div>
        ) : children ? (
          <div className={styles.modalText}>{children}</div>
        ) : null}

        {showButtons && (
          <div className={styles.modalButtons}>
            {/* Cancel button visible when onCancel or onClose provided and confirm exists or not */}
            {(onCancel || onClose) && (
              <button className={`${styles.modalBtn} ${styles.modalCancel}`} onClick={handleCancel}>
                {cancelText}
              </button>
            )}
            {onConfirm && (
              <button className={`${styles.modalBtn} ${styles.modalConfirm}`} onClick={onConfirm}>
                {confirmText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
