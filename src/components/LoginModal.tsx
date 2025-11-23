import React, { useState } from "react";
import "../styles/LoginModal.css";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [activeTab, setActiveTab] = useState("LOGIN NOW");

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="login-popup" style={{ maxHeight: 'none', height: 'auto', overflow: 'visible', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        {/* Close button */}
        <button className="close-btn" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === "LOGIN NOW" ? "active" : ""}`}
            onClick={() => setActiveTab("LOGIN NOW")}
          >
            LOGIN NOW
          </button>
          <button
            className={`tab ${activeTab === "MY BOOKING" ? "active" : ""}`}
            onClick={() => setActiveTab("MY BOOKING")}
          >
            MY BOOKING
          </button>
        </div>

        {/* Content */}
        <div className="popup-content" style={{ overflow: 'visible', maxHeight: 'none' }}>
          {activeTab === "LOGIN NOW" && (
            <>
              <p className="description">
                Sign in to unlock a world of rewards - accumulate Rayna Tours Loyalty
                points or snag exclusive discounts on your booked travel experiences!
              </p>

              <button className="social-btn">
                <img src="/google-icon.png" alt="Google" style={{ width: 20, height: 20, objectFit: 'contain' }} /> Sign In with Google
              </button>

              <button className="social-btn">
                <img src="/facebook-icon.png" alt="Facebook" style={{ width: 20, height: 20, objectFit: 'contain' }} /> Sign In with Facebook
              </button>

              {/* Divider */}
              <div className="divider">
                <span></span>
                <p>or Sign in with Email</p>
                <span></span>
              </div>

              {/* Email */}
              <input
                type="email"
                className="input"
                placeholder="Email address"
              />

              {/* Password */}
              <div className="password-wrapper">
                <input
                  type="password"
                  className="input"
                  placeholder="Enter password"
                />
                <span className="eye-icon">👁️</span>
              </div>

              {/* Remember / Forgot */}
              <div className="row-between">
                <label className="remember">
                  <input type="checkbox" /> Remember Me
                </label>
                <button className="link">Forgot password?</button>
              </div>

              {/* Login Button */}
              <button className="login-btn">LOG IN</button>
            </>
          )}

          {activeTab === "MY BOOKING" && (
            <>
              <p className="description booking-title">
                View/ Print/Cancel Your Booking without Signing in
              </p>

              <input
                type="email"
                className="input"
                placeholder="Email Address"
              />

              <input
                type="text"
                className="input"
                placeholder="Booking Reference Number"
              />

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
                <button className="booking-submit-btn">SUBMIT</button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="popup-footer">
          <span>No account yet? Sign up now!</span>
          <button className="signup-btn">Sign Up</button>
        </div>
      </div>
    </div>
  );
}