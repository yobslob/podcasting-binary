"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VideoGrid } from "@/components/VideoGrid";

// Premium Inline SVG Logos
function AmpLogo() {
  return (
    <svg viewBox="0 0 120 40" className="h-7 opacity-40 hover:opacity-100 hover:scale-105 transition-all duration-300 fill-current text-current max-w-[100px]">
      <path d="M15,5 L28,30 L2,30 Z" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M22,17 L31,34 L13,34 Z" fill="currentColor" opacity="0.6" />
      <text x="42" y="27" fontFamily="'DM Sans', sans-serif" fontWeight="800" fontSize="16" fill="currentColor" letterSpacing="0.05em">AMP</text>
    </svg>
  );
}

function IvcLogo() {
  return (
    <svg viewBox="0 0 120 40" className="h-7 opacity-40 hover:opacity-100 hover:scale-105 transition-all duration-300 fill-current text-current max-w-[100px]">
      <rect x="8" y="8" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(45 17 17)" />
      <path d="M17,11 L17,23 M11,17 L23,17" stroke="currentColor" strokeWidth="2" />
      <text x="42" y="27" fontFamily="'DM Sans', sans-serif" fontWeight="800" fontSize="16" fill="currentColor" letterSpacing="0.05em">IVC</text>
    </svg>
  );
}

function WilbeLogo() {
  return (
    <svg viewBox="0 0 120 40" className="h-7 opacity-40 hover:opacity-100 hover:scale-105 transition-all duration-300 fill-current text-current max-w-[100px]">
      <circle cx="16" cy="18" r="9" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5 3" />
      <circle cx="16" cy="18" r="3.5" fill="currentColor" />
      <text x="38" y="27" fontFamily="'DM Sans', sans-serif" fontWeight="800" fontSize="16" fill="currentColor" letterSpacing="0.05em">WILBE</text>
    </svg>
  );
}

function SergeLogo() {
  return (
    <svg viewBox="0 0 120 40" className="h-7 opacity-40 hover:opacity-100 hover:scale-105 transition-all duration-300 fill-current text-current max-w-[100px]">
      <path d="M5,18 C15,5 15,31 25,18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M10,18 C20,5 20,31 30,18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />
      <text x="42" y="27" fontFamily="'DM Sans', sans-serif" fontWeight="800" fontSize="15" fill="currentColor" letterSpacing="0.05em">SERGE</text>
    </svg>
  );
}

function AlecLogo() {
  return (
    <svg viewBox="0 0 120 40" className="h-7 opacity-40 hover:opacity-100 hover:scale-105 transition-all duration-300 fill-current text-current max-w-[100px]">
      <circle cx="18" cy="18" r="11" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M14,14 L18,22 L22,14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="42" y="27" fontFamily="'DM Sans', sans-serif" fontWeight="800" fontSize="15" fill="currentColor" letterSpacing="0.05em">ALEC</text>
    </svg>
  );
}

const servicesData = [
  {
    num: "01",
    title: "Guest Research & Bookings",
    desc: "CIA-level research on each guest to craft questions optimized for strong hooks and memorable one-liners.",
    image: "/service_research.png",
  },
  {
    num: "02",
    title: "Post Production",
    desc: "Editing, audio mastering, color grading, copy, coordinating with the guest’s team, and more.",
    image: "/service_production.png",
  },
  {
    num: "03",
    title: "Episode Packaging",
    desc: "Animation studio produces trailers/intros to optimize viewer retention in the first 60 seconds, and test anywhere from 16 to 20 thumbnail and title options per episode.",
    image: "/service_packaging.png",
  },
  {
    num: "04",
    title: "Publishing & Distribution",
    desc: "Short-form content, hyper-targeted ads, guest media kits, and influencer promotions.",
    image: "/service_distribution.png",
  },
  {
    num: "05",
    title: "Post Publishing",
    desc: "Making sure the client posts you everywhere and giving them a sheet about this and this.",
    image: "/service_post_publishing.png",
  },
];

export default function PodcastingPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const sectionTopRef = useRef<number>(0);
  const sectionHeightRef = useRef<number>(0);

  // Measure section bounds once on mount and on resize
  useEffect(() => {
    const measure = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        sectionTopRef.current = rect.top + window.scrollY;
        sectionHeightRef.current = rect.height;
      }
    };

    measure();
    const timer = setTimeout(measure, 200); // allow layout settling

    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Performance-optimized scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const sectionTop = sectionTopRef.current;
      const sectionHeight = sectionHeightRef.current;
      const viewportHeight = window.innerHeight;

      if (!sectionTop || !sectionHeight) return;

      const scrollableRange = sectionHeight - viewportHeight;
      if (scrollableRange <= 0) return;

      const scrolled = window.scrollY - sectionTop;
      let progress = scrolled / scrollableRange;
      progress = Math.max(0, Math.min(1, progress));

      const index = Math.min(4, Math.floor(progress * 5.01));
      setActiveIndex(index);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Smooth scroll page directly to index interval on menu click
  const handleItemClick = (index: number) => {
    const sectionTop = sectionTopRef.current;
    const sectionHeight = sectionHeightRef.current;
    const viewportHeight = window.innerHeight;

    if (!sectionTop || !sectionHeight) return;

    const scrollableRange = sectionHeight - viewportHeight;
    const targetScroll = sectionTop + (index / 4.8) * scrollableRange + 10;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  };

  return (
    <ThemeProvider>
      <div className="page-glow" style={{ minHeight: "100vh", position: "relative" }}>
        <Navbar />

        {/* Hero Section (Section 1) */}
        <section
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "9rem 1.5rem 6rem",
            zIndex: 2,
          }}
        >
          {/* Subtle background radial glows
          <div
            style={{
              position: "absolute",
              top: "35%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "600px",
              height: "400px",
              background: "radial-gradient(ellipse at center, var(--glow) 0%, transparent 70%)",
              pointerEvents: "none",
              zIndex: -1,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "500px",
              height: "500px",
              background: "radial-gradient(circle, var(--purple-glow) 0%, transparent 65%)",
              pointerEvents: "none",
              zIndex: -1,
            }}
          /> */}

          {/* 01 Badge */}
          <span
            className="service-num"
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "var(--accent)",
              display: "inline-block",
              marginTop: "6rem",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            01
          </span>

          {/* Main heading */}
          <h1
            className="font-ethereal"
            style={{
              color: "white",
              fontSize: "clamp(3rem, 9vw, 5.5rem)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "0.04em",
              marginBottom: "1.5rem",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            Podcasting
          </h1>

          {/* Subheading */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(0.7rem, 2.5vw, 0.9rem)",
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              maxWidth: "650px",
              margin: "0 auto 3.5rem",
              textAlign: "center",
            }}
          >
            Great guests deserve great distribution. End-to-end production that matches the caliber of your conversations.
          </p>

          {/* Centered Logos */}
          <div
            style={{
              width: "100%",
              maxWidth: "800px",
              borderTop: "1px solid var(--border)",
              paddingTop: "2.5rem",
            }}
          >
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.68rem",
                fontWeight: 600,
                color: "var(--text-secondary)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "1.8rem",
              }}
            >
              Proven Track Record With
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: "2.5rem 3.5rem",
                color: "var(--text-primary)",
              }}
            >
              <AmpLogo />
              <IvcLogo />
              <WilbeLogo />
              <SergeLogo />
              <AlecLogo />
            </div>
          </div>
        </section>

        {/* Video Grid Section (Section 2) */}
        <section
          style={{
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            padding: "6rem 0",
            position: "relative",
            background: "rgba(3, 3, 3, 0.2)",
          }}
        >
          <VideoGrid />
        </section>

        {/* Animated Services Section (Section 3) */}
        <section
          ref={sectionRef}
          className="services-scroll-section"
          style={{
            position: "relative",
          }}
        >
          {/* Sticky Container holds the layout centered in viewport */}
          <div className="services-sticky-wrapper">

            {/* Header stays locked in place */}
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "var(--accent)",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  display: "block",
                  marginBottom: "0.4rem",
                }}
              >
                complete service
              </span>
              <h2
                className="font-ethereal"
                style={{
                  fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                }}
              >
                What We Offer
              </h2>
            </div>

            {/* Interactive Dual-Column Scroll Layout */}
            <div className="services-scroll-layout"
              style={
                {
                  marginTop: "10rem",
                }
              }>

              {/* Left Side: Tight menu styled like a scrollbar */}
              <div className="services-list-column">

                {/* Vertical Scrollbar progress line */}
                <div className="services-scrollbar-track">
                  <div
                    className="services-scrollbar-thumb"
                    style={{
                      transform: `translateY(${activeIndex * 100}%)`,
                    }}
                  />
                </div>

                {servicesData.map((svc, i) => {
                  const isActive = activeIndex === i;
                  return (
                    <div
                      key={svc.num}
                      onClick={() => handleItemClick(i)}
                      className={`service-scroll-item ${isActive ? "active" : ""}`}
                    >
                      <div className="service-scroll-num">{svc.num}</div>
                      <div className="service-scroll-content">
                        <h3 className="service-scroll-title">{svc.title}</h3>

                        {/* Subheading accordion reveal - ONLY visible when active */}
                        <div
                          className="service-scroll-desc-accordion"
                          style={{
                            maxHeight: isActive ? "140px" : "0px",
                            opacity: isActive ? 1 : 0,
                            marginTop: isActive ? "0.4rem" : "0px",
                          }}
                        >
                          <p className="service-scroll-desc">{svc.desc}</p>
                        </div>
                      </div>

                      {/* Mobile Inline Image */}
                      <div className="service-mobile-image-wrapper">
                        <Image
                          src={svc.image}
                          alt={svc.title}
                          width={600}
                          height={380}
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                            borderRadius: "14px",
                            border: "1px solid var(--border)",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Side: Sticky Dynamic Card */}
              <div className="services-sticky-card-container">
                <div className="services-sticky-card">
                  {servicesData.map((svc, i) => {
                    const isActive = activeIndex === i;
                    return (
                      <div
                        key={svc.num}
                        style={{
                          position: "absolute",
                          inset: 0,
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? "scale(1)" : "scale(1.05)",
                          transition: "opacity 0.6s ease-in-out, transform 0.6s ease-in-out",
                          zIndex: isActive ? 2 : 1,
                        }}
                      >
                        <Image
                          src={svc.image}
                          alt={svc.title}
                          fill
                          priority={i === 0}
                          sizes="(max-width: 1024px) 100vw, 500px"
                          style={{
                            objectFit: "cover",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </section>

        <Footer />
      </div>

      {/* Styled interactive elements custom layout stylesheet */}
      <style>{`
        /* Desktop Scrolling Track */
        .services-scroll-section {
          height: 350vh;
        }

        .services-sticky-wrapper {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 6rem 2.5rem 3rem;
          overflow: hidden;
        }

        /* Dual Column Layout */
        .services-scroll-layout {
          display: flex;
          gap: 5rem;
          width: 100%;
          max-width: 1050px;
          align-items: center;
          margin-top: 1rem;
        }

        /* Left Column: Tight Vertical Scrollbar Menu */
        .services-list-column {
          flex: 1.1;
          display: flex;
          flex-direction: column;
          gap: 0.6rem; /* Tight list spacing */
          position: relative;
          padding-left: 2rem;
        }

        /* Scroller indicator track */
        .services-scrollbar-track {
          position: absolute;
          left: 0px;
          top: 8px;
          bottom: 8px;
          width: 2px;
          background-color: var(--border);
          border-radius: 99px;
          z-index: 0;
        }

        .services-scrollbar-thumb {
          position: absolute;
          left: 0;
          top: 0;
          height: 20%; /* 5 items, each represents 20% */
          width: 2px;
          background-color: #a855f7; /* Purple progress bar */
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.7);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
        }

        /* Service Text Block Item */
        .service-scroll-item {
          display: flex;
          gap: 1.25rem;
          opacity: 0.35;
          transform: scale(0.95);
          transform-origin: left center;
          cursor: pointer;
          padding: 0.5rem 0;
          transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Active styling: Larger text and Purple tint */
        .service-scroll-item.active {
          opacity: 1;
          transform: scale(1.02);
        }

        .service-scroll-num {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-secondary);
          margin-top: 0.25rem;
          transition: color 0.35s ease;
        }

        .service-scroll-item.active .service-scroll-num {
          color: #c084fc; /* Lavender accent number */
        }

        .service-scroll-title {
          font-family: 'ethereal', Georgia, serif;
          font-size: 1.3rem; /* Stable font size */
          font-weight: 600;
          line-height: 1.2;
          color: var(--text-secondary);
          transform: scale(1);
          transform-origin: left center;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), color 0.35s ease;
        }

        .service-scroll-item.active .service-scroll-title {
          color: #f3e8ff; /* Active title color */
          transform: scale(1.05); /* GPU Accelerated size scaling */
        }

        /* Accordion Description Reveal */
        .service-scroll-desc-accordion {
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
        }

        .service-scroll-desc {
          font-family: 'helvetica neue', sans-serif;
          font-size: 0.75rem;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.72);
          max-width: 440px;
          margin: 0;
        }

        /* Right Column Sticky Card */
        .services-sticky-card-container {
          flex: 0.9;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .services-sticky-card {
          width: 100%;
          aspect-ratio: 16/10;
          max-width: 480px;
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          background: var(--bg-card);
          border: 1px solid var(--border);
          box-shadow: 0 0 5px rgba(254, 254, 254, 0.1), 0 30px 60px rgba(0, 0, 0, 0.5);
        }

        /* Responsive Mobile Layout */
        .service-mobile-image-wrapper {
          display: none;
          margin-top: 1.25rem;
          width: 100%;
        }

        @media (max-width: 1024px) {
          .services-scroll-section {
            height: auto !important;
          }

          .services-sticky-wrapper {
            position: relative;
            height: auto !important;
            top: auto;
            overflow: visible;
            padding: 4rem 1.25rem 2rem;
          }

          .services-sticky-card-container {
            display: none !important;
          }

          .services-scrollbar-track {
            display: none !important;
          }

          .services-scroll-layout {
            flex-direction: column;
            gap: 2.5rem;
            margin-top: 2rem;
          }

          .services-list-column {
            padding-left: 0;
            gap: 2.5rem;
          }

          .service-scroll-item {
            opacity: 1 !important;
            transform: none !important;
            padding: 0;
            flex-direction: column;
            gap: 0.5rem;
            border-left: 2px solid #a855f7;
            padding-left: 1.25rem;
          }

          .service-scroll-title {
            color: #f3e8ff !important;
            font-size: 1.35rem !important;
          }

          .service-scroll-num {
            color: #c084fc !important;
          }

          .service-scroll-desc-accordion {
            max-height: none !important;
            opacity: 1 !important;
            margin-top: 0.5rem !important;
          }

          .service-mobile-image-wrapper {
            display: block;
          }
        }
      `}</style>
    </ThemeProvider>
  );
}
