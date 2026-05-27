"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

const footerLinks = {
  Services: [
    { label: "Podcasting", href: "#services" },
    { label: "Brand Launch Videos", href: "#services" },
    { label: "Content Clipping", href: "#services" },
  ],
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Our Work", href: "#work" },
    { label: "Case Studies", href: "#work" },
  ],
};

const socialLinks = [
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#000" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    href: "https://twitter.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export function Footer() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = mounted && resolvedTheme === "light" ? "/black_logo.png" : "/white_logo.png";

  return (
    <footer className="footer-container">
      <div className="footer-grid">
        {/* Brand column */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <Image src={logoSrc} alt="Binary Growth Logo" width={26} height={26} />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "var(--text-primary)",
              }}
            >
              Binary Growth
            </span>
          </div>
          <p
            style={{
              fontSize: "0.83rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: "240px",
              marginBottom: "1.5rem",
            }}
          >
            We build content empires for creators and brands
            through YouTube, podcasting, and short-form video.
          </p>
          {/* Social icons */}
          <div style={{ display: "flex", gap: "0.6rem" }}>
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.name}
                className="social-icon"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category} className="footer-column">
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-primary)",
                marginBottom: "1rem",
              }}
            >
              {category}
            </div>
            <ul className="footer-links-list">
              {links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.78rem",
            color: "var(--text-secondary)",
          }}
        >
          © {new Date().getFullYear()} Binary Growth. All rights reserved.
        </span>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <button
            onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent("open-policy-privacy"))}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            className="footer-mini-link"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent("open-policy-terms"))}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            className="footer-mini-link"
          >
            Terms of Service
          </button>
          <button
            onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent("open-policy-cookie"))}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            className="footer-mini-link"
          >
            Cookie Policy
          </button>
          <button
            onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent("open-stats-dashboard"))}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            className="footer-mini-link"
            title="Press Ctrl+Shift+A to toggle console"
          >
            Console ⚡
          </button>
        </div>
      </div>

      <style>{`
        .footer-container {
          border-top: 1px solid var(--border);
          padding: 4rem 1.5rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr auto auto;
          gap: 4rem;
          margin-bottom: 3.5rem;
        }
        .footer-column {
          text-align: right;
        }
        .footer-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.55rem;
          padding: 0;
          margin: 0;
        }
        .footer-bottom {
          border-top: 1px solid var(--border);
          padding-top: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        @media (max-width: 768px) {
          .footer-container {
            padding: 3rem 1.25rem 1.5rem;
          }
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            margin-bottom: 2.5rem;
          }
          .footer-column {
            text-align: left;
          }
          .footer-links-list {
            align-items: flex-start;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.25rem;
          }
        }
      `}</style>
    </footer>
  );
}
