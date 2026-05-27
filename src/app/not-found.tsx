"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
        color: "#fff",
        textAlign: "center",
        padding: "2rem",
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div style={{ position: "relative", zIndex: 2, maxWidth: "500px" }}>
        <span
          style={{
            fontSize: "0.85rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: "#c084fc",
            textTransform: "uppercase",
            marginBottom: "1rem",
            display: "inline-block",
          }}
        >
          404 Error
        </span>

        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(2rem, 7vw, 3.5rem)",
            fontWeight: 400,
            lineHeight: 1.1,
            marginBottom: "1.5rem",
          }}
        >
          Lost in the <br />
          <span style={{ fontStyle: "italic", color: "#c084fc" }}>
            Airwaves
          </span>
        </h1>

        <p
          style={{
            fontSize: "0.9rem",
            color: "rgba(255, 255, 255, 0.55)",
            lineHeight: 1.6,
            marginBottom: "2.5rem",
          }}
        >
          The page you are looking for doesn't exist or the broadcast is temporarily offline. Let's redirect you back.
        </p>

        <Link
          href="/"
          style={{
            background: "#ffffff",
            color: "#000000",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            borderRadius: "999px",
            padding: "0.8rem 1.8rem",
            border: "none",
            cursor: "pointer",
            transition: "all 0.25s ease",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            boxShadow: "0 6px 20px rgba(255, 255, 255, 0.15)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#c084fc";
            e.currentTarget.style.boxShadow = "0 6px 24px rgba(168, 85, 247, 0.4)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#ffffff";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 255, 255, 0.15)";
            e.currentTarget.style.transform = "none";
          }}
        >
          Return Home ↗
        </Link>
      </div>
    </div>
  );
}
