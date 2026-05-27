"use client";

import { useState, useEffect } from "react";

type PolicyType = "privacy" | "terms" | "cookie" | null;

export function PolicyModal() {
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);

  useEffect(() => {
    const handlePrivacy = () => setActivePolicy("privacy");
    const handleTerms = () => setActivePolicy("terms");
    const handleCookie = () => setActivePolicy("cookie");

    window.addEventListener("open-policy-privacy", handlePrivacy);
    window.addEventListener("open-policy-terms", handleTerms);
    window.addEventListener("open-policy-cookie", handleCookie);

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActivePolicy(null);
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("open-policy-privacy", handlePrivacy);
      window.removeEventListener("open-policy-terms", handleTerms);
      window.removeEventListener("open-policy-cookie", handleCookie);
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    if (activePolicy) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activePolicy]);

  if (!activePolicy) return null;

  const getPolicyContent = () => {
    switch (activePolicy) {
      case "privacy":
        return {
          title: "Privacy Policy",
          updated: "Last Updated: May 2026",
          body: (
            <>
              <p>At Binary Growth, we prioritize your privacy. This policy outlines how we handle data when you visit our website.</p>
              <h3>1. Data Collection</h3>
              <p>We do not run tracking cookies or collect personally identifiable information unless you explicitly submit a form or book a call. We use client-side local storage to monitor site interactions (e.g. scroll depth, buttons clicked) to improve website usability and performance. This data never leaves your device unless shared with your consent.</p>
              <h3>2. Submitting Information</h3>
              <p>When you request a call or submit a form, we store your name, email, and description of your project to coordinate our consultation. We do not sell or lease this data to third parties.</p>
              <h3>3. Analytics</h3>
              <p>Our analytics run entirely on your browser using standard browser APIs, adding zero tracking scripts or page load overhead, which preserves your privacy and security.</p>
            </>
          ),
        };
      case "terms":
        return {
          title: "Terms of Service",
          updated: "Last Updated: May 2026",
          body: (
            <>
              <p>Welcome to Binary Growth. By using our website and services, you agree to these terms.</p>
              <h3>1. Use of Content</h3>
              <p>All video portfolios, text, graphics, logos, and custom code on this site are intellectual property of Binary Growth and its respective clients. You may not distribute, modify, or repurpose any media found on this site without explicit authorization.</p>
              <h3>2. Booking & Consultations</h3>
              <p>Booking a calendar slot or submitting an inquiry does not constitute a binding contract. Consultation slots are subject to availability and scheduling changes.</p>
              <h3>3. Disclaimers</h3>
              <p>All metrics, viewership numbers, and client results shown on this website are illustrative of our past performance and do not guarantee identical outcomes for every project. Media growth depends on multiple creative factors.</p>
            </>
          ),
        };
      case "cookie":
        return {
          title: "Cookie Policy",
          updated: "Last Updated: May 2026",
          body: (
            <>
              <p>This policy details our usage of cookies and local storage mechanisms.</p>
              <h3>1. Cookies in Use</h3>
              <p>We avoid placing traditional tracking cookies. Instead, we use `localStorage` to save your design preferences (such as light/dark mode resolve) and cookie banner choices, preventing repeated pop-ups.</p>
              <h3>2. Interactive Tracker</h3>
              <p>We use local storage keys (`bg_analytics_events`, `bg_analytics_session`) to track your click and scroll milestones to analyze web performance. No third-party network requests are made for tracking purposes.</p>
              <h3>3. Management</h3>
              <p>You can clear your cookie consent choice and analytics log at any time using your browser's clear storage options, or click the "Clear Local Logs" inside the dashboard (`Ctrl + Shift + A`).</p>
            </>
          ),
        };
      default:
        return { title: "", updated: "", body: null };
    }
  };

  const content = getPolicyContent();

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "rgba(3, 3, 3, 0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        color: "#fff",
        fontFamily: "'DM Sans', sans-serif",
        animation: "policyFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }}
      onClick={() => setActivePolicy(null)}
    >
      <div
        style={{
          background: "#0f0f0f",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "24px",
          width: "100%",
          maxWidth: "600px",
          maxHeight: "80vh",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          boxShadow: "0 25px 50px rgba(0,0,0,0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setActivePolicy(null)}
          style={{
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
            background: "rgba(255,255,255,0.05)",
            border: "none",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            color: "rgba(255,255,255,0.7)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.9rem",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
          aria-label="Close modal"
        >
          ✕
        </button>

        <header style={{ marginBottom: "1.25rem", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontFamily: "Georgia, serif", fontWeight: 400, margin: "0 0 0.25rem 0" }}>{content.title}</h2>
          <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>{content.updated}</span>
        </header>

        <div
          className="policy-modal-body"
          style={{
            overflowY: "auto",
            paddingRight: "0.5rem",
            fontSize: "0.85rem",
            color: "rgba(255, 255, 255, 0.7)",
            lineHeight: 1.65,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {content.body}
        </div>
      </div>
    </div>
  );
}
