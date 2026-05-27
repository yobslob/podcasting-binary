"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime error caught:", error);
  }, [error]);

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
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 2, maxWidth: "500px" }}>
        <span
          style={{
            fontSize: "0.85rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: "#ef4444",
            textTransform: "uppercase",
            marginBottom: "1rem",
            display: "inline-block",
          }}
        >
          System Alert
        </span>

        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(2rem, 6vw, 3rem)",
            fontWeight: 400,
            lineHeight: 1.1,
            marginBottom: "1.5rem",
          }}
        >
          Something Went <br />
          <span style={{ fontStyle: "italic", color: "#ef4444" }}>Unstable</span>
        </h1>

        <p
          style={{
            fontSize: "0.9rem",
            color: "rgba(255, 255, 255, 0.55)",
            lineHeight: 1.6,
            marginBottom: "2.5rem",
          }}
        >
          An unexpected error occurred during execution. We've logged this internally. Please attempt to reload the component or return.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <button
            onClick={reset}
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
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#ef4444";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.boxShadow = "0 6px 24px rgba(239, 68, 68, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#ffffff";
              e.currentTarget.style.color = "#000000";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Retry Execution
          </button>
        </div>
      </div>
    </div>
  );
}
