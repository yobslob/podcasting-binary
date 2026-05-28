"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

const navLinks = [
  { label: "About", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const logoSrc = mounted && resolvedTheme === "light" ? "/black_logo.png" : "/white_logo.png";

  return (
    <header
      className="navbar-header"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "padding 0.35s ease",
        paddingTop: scrolled ? "0.75rem" : "1.25rem",
        paddingBottom: scrolled ? "0.75rem" : "1.25rem",
      }}
    >
      {/* Left: Logo */}
      <div style={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
        <Link
          href="https://binarygrowth.org"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.45rem",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <Image src={logoSrc} alt="Binary Growth Logo" width={28} height={28} />
          <span
            className="desktop-nav"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: "0.95rem",
              letterSpacing: "-0.01em",
              color: "var(--text-primary)",
              transition: "color 0.3s",
            }}
          >
            Binary Growth
          </span>
        </Link>
      </div>

      {/* Center: Nav Pill */}
      <nav
        className="nav-pill desktop-nav"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          padding: "0.5rem 1rem",
        }}
      >
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: "0.82rem",
              color: "var(--text-secondary)",
              textDecoration: "none",
              padding: "0.4rem 0.85rem",
              borderRadius: "999px",
              transition: "color 0.25s ease, background 0.25s ease",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = "var(--text-primary)";
              (e.target as HTMLElement).style.background = "rgba(255,255,255,0.06)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = "var(--text-secondary)";
              (e.target as HTMLElement).style.background = "transparent";
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Right: CTA & Mobile */}
      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1rem" }}>
        <a href="#contact" className="btn-accent desktop-nav" style={{ fontSize: "0.72rem" }}>
          Book a Call ↗
        </a>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "var(--text-primary)",
            padding: "0.5rem",
          }}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: "1rem",
            right: "1rem",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
            marginTop: "0.5rem",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                textDecoration: "none",
                padding: "0.65rem 1rem",
                borderRadius: "10px",
                transition: "all 0.2s ease",
              }}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn-accent" style={{ marginTop: "0.5rem", justifyContent: "center" }}>
            Book a Call ↗
          </a>
        </div>
      )}

      <style>{`
        .navbar-header {
          padding-left: 2.5rem;
          padding-right: 2.5rem;
        }
        @media (max-width: 850px) {
          .navbar-header {
            padding-left: 1.25rem;
            padding-right: 1.25rem;
          }
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
