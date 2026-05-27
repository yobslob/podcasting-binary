"use client";

import { useState, useEffect } from "react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("bg_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = (type: "all" | "necessary") => {
    localStorage.setItem("bg_cookie_consent", type);
    setIsVisible(false);
    
    if (window.bgAnalytics) {
      window.bgAnalytics.track("Cookie Consent Set", { choice: type });
    }
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "1.5rem",
        right: "1.5rem",
        maxWidth: "600px",
        background: "rgba(10, 10, 10, 0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1.5px solid var(--border-strong, rgba(255, 255, 255, 0.12))",
        borderRadius: "20px",
        padding: "1.25rem 1.5rem",
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
        fontFamily: "'DM Sans', sans-serif",
        animation: "slideUpCookie 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <h4
          style={{
            fontSize: "0.85rem",
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "#fff",
            margin: 0,
          }}
        >
          Cookie & Privacy Preferences
        </h4>
        <p
          style={{
            fontSize: "0.78rem",
            color: "rgba(255, 255, 255, 0.6)",
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          We use lightweight local data tracking to analyze website traffic, optimize your loading experience, and support our marketing efforts. Click "Accept All" to enable full features.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          justifyContent: "flex-end",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => handleAccept("necessary")}
          style={{
            background: "transparent",
            color: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            padding: "0.55rem 1.1rem",
            fontSize: "0.7rem",
            fontWeight: 600,
            borderRadius: "99px",
            cursor: "pointer",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.7)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
          }}
        >
          Reject Non-Essential
        </button>

        <button
          onClick={() => handleAccept("all")}
          style={{
            background: "#ffffff",
            color: "#000000",
            border: "none",
            padding: "0.55rem 1.25rem",
            fontSize: "0.7rem",
            fontWeight: 700,
            borderRadius: "99px",
            cursor: "pointer",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#c084fc";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(168, 85, 247, 0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#ffffff";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Accept All
        </button>
      </div>

      <style>{`
        @keyframes slideUpCookie {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 640px) {
          .cookie-consent-banner {
            left: 1rem;
            right: 1rem;
            bottom: 1rem;
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
