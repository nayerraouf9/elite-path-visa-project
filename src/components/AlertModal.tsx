"use client";
import React from "react";
import "../styles/AlertModal.css";

interface AlertModalProps {
  title?: string;
  message: string;
  onClose: () => void;
}

export default function AlertModal({
  title = "Alert",
  message,
  onClose,
}: AlertModalProps) {
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="modal-overlay">
      <div
        className="alert-modal"
        role="alertdialog"
        aria-live="assertive"
        aria-label={title}
      >
        <div className="alert-icon-wrap">
          <div className="alert-icon">
            <span>!</span>
          </div>
        </div>

        <h3 className="alert-title">{title}</h3>
        <p className="alert-message">{message}</p>

        <div>
          <button onClick={onClose} className="alert-ok">
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
