"use client";

import { useState, useRef, useEffect } from "react";
import { VolumeX, Volume2 } from "lucide-react";

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  description: string;
  playbackId: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "The Alec Podcast: Distribution Strategy",
    category: "Podcast Production",
    description: "End-to-end production, audio engineering, and visual branding for a top-tier business podcast.",
    playbackId: "bRuimaL9uqONhLs8fsNz6Hwq8p7ahOjZij93Aemj00Dw",
  },
  {
    id: 2,
    title: "Serge Media: High-Retention Reels",
    category: "Short-Form Clipping",
    description: "Viral editing strategy converting long-form episodes into multi-million view shorts.",
    playbackId: "MNbpVaSG2fQAGZoCBmWsCZ3JnZROC52EN65FhSK23Pk",
  },
  {
    id: 3,
    title: "AMP Brand Film: Defining New Media",
    category: "Brand Launch Video",
    description: "Cinematic launch video combining high-impact motion design and storytelling.",
    playbackId: "FcPcd7E6zCECLytU56cM027fLw3cGL0101qo2nMvy1X6JU",
  },
  {
    id: 4,
    title: "Andy's Insights: Omni-Channel Funnel",
    category: "Distribution Strategy",
    description: "Cross-platform clipping and SEO distribution framework yielding 200% subscriber growth.",
    playbackId: "GGoM00oB2yrdqRht00Khy2Vh6Z8XAxqoUSU3mwyM7lEWc",
  },
  {
    id: 5,
    title: "Ankit Talk: Interactive Creator Funnels",
    category: "Creator Optimization",
    description: "Audience retention engineering and high-CTR thumbnail styling for YouTube.",
    playbackId: "cukmdCLuVN02SE6kKVv27qJvqLiDh00B28mcgq00i6iccs",
  },
];

function TimelineVideoCard({
  item,
  isActivated,
}: {
  item: PortfolioItem;
  isActivated: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [dims, setDims] = useState({ w: 500, h: 280 });
  const [isMuted, setIsMuted] = useState(true);
  const [supportsHls, setSupportsHls] = useState(false);

  // Detect browser native HLS support
  useEffect(() => {
    if (typeof window !== "undefined") {
      const video = document.createElement("video");
      const canPlay =
        video.canPlayType("application/x-mpegURL") ||
        video.canPlayType("application/vnd.apple.mpegurl");
      setSupportsHls(!!canPlay);
    }
  }, []);

  // Measure card dimensions for border length calculation
  useEffect(() => {
    const handleResize = () => {
      if (cardRef.current) {
        setDims({
          w: cardRef.current.offsetWidth,
          h: cardRef.current.offsetHeight,
        });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync play state with sequential delay
  useEffect(() => {
    if (videoRef.current) {
      if (isActivated) {
        // Start playing 180ms after activation to sync with the flow of border drawing
        const playTimer = setTimeout(() => {
          videoRef.current?.play().catch(() => { });
        }, 180);
        return () => clearTimeout(playTimer);
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActivated]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const { w, h } = dims;
  const pathLength = w + h;

  return (
    <div
      ref={cardRef}
      className={`timeline-card ${isActivated ? "active" : ""}`}
      style={{
        position: "relative",
        background: "rgba(10, 10, 10, 0.65)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: "24px",
        overflow: "hidden",
        width: "100%",
        display: "flex",
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: isActivated
          ? "0 0 35px rgba(168, 85, 247, 0.22), 0 15px 35px rgba(0, 0, 0, 0.6)"
          : "0 10px 30px rgba(0, 0, 0, 0.4)",
        borderColor: isActivated ? "rgba(168, 85, 247, 0.25)" : "rgba(255, 255, 255, 0.05)",
      }}
    >
      {/* Symmetrical Border Drawing SVG Overlay */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        {/* Upper Glow path: left center -> top-left -> top-right -> right center */}
        <path
          d={`M 0 ${h / 2} L 0 0 L ${w} 0 L ${w} ${h / 2}`}
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={pathLength}
          strokeDashoffset={isActivated ? 0 : pathLength}
          style={{
            // 180ms delay lets the connection branch fill first
            transition: "stroke-dashoffset 0.85s cubic-bezier(0.25, 1, 0.5, 1)",
            transitionDelay: isActivated ? "180ms" : "0ms",
            filter: "drop-shadow(0 0 3px rgba(168, 85, 247, 0.8))",
          }}
        />
        {/* Lower Glow path: left center -> bottom-left -> bottom-right -> right center */}
        <path
          d={`M 0 ${h / 2} L 0 ${h} L ${w} ${h} L ${w} ${h / 2}`}
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={pathLength}
          strokeDashoffset={isActivated ? 0 : pathLength}
          style={{
            transition: "stroke-dashoffset 0.85s cubic-bezier(0.25, 1, 0.5, 1)",
            transitionDelay: isActivated ? "180ms" : "0ms",
            filter: "drop-shadow(0 0 3px rgba(168, 85, 247, 0.8))",
          }}
        />
      </svg>

      {/* Video Container (Left side on desktop) */}
      <div className="timeline-video-container">
        <video
          ref={videoRef}
          poster={`https://image.mux.com/${item.playbackId}/thumbnail.jpg?time=2`}
          muted={isMuted}
          playsInline
          loop
          onError={(e) => {
            if (supportsHls) {
              console.warn("HLS stream load failure, falling back to MP4");
              setSupportsHls(false);
              const video = e.currentTarget;
              setTimeout(() => {
                video.load();
                if (isActivated) {
                  video.play().catch(() => {});
                }
              }, 100);
            }
          }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        >
          {supportsHls && (
            <source src={`https://stream.mux.com/${item.playbackId}.m3u8`} type="application/x-mpegURL" />
          )}
          <source src={`https://stream.mux.com/${item.playbackId}/medium.mp4`} type="video/mp4" />
        </video>

        {isActivated && (
          <button
            onClick={toggleMute}
            style={{
              position: "absolute",
              bottom: "0.75rem",
              right: "0.75rem",
              background: "rgba(0, 0, 0, 0.75)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "white",
              padding: "0.4rem",
              borderRadius: "50%",
              cursor: "pointer",
              zIndex: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.2s",
            }}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
          </button>
        )}
      </div>

      {/* Info Content (Right side on desktop) */}
      <div className="timeline-info-container">
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: 600,
            color: "var(--accent)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "0.5rem",
            display: "inline-block",
          }}
        >
          {item.category}
        </span>
        <h4
          className="font-garamond"
          style={{
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "#fff",
            lineHeight: 1.25,
            marginBottom: "0.6rem",
          }}
        >
          {item.title}
        </h4>
        <p
          style={{
            fontSize: "0.82rem",
            color: "var(--text-secondary)",
            lineHeight: 1.5,
          }}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}

export function VideoGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Lerp references for scrolling liquid physics
  const targetProgressRef = useRef(0);
  const [lineProgress, setLineProgress] = useState(0);

  const [cardCenters, setCardCenters] = useState<number[]>([]);
  const [containerHeight, setContainerHeight] = useState(0);

  // Measure card coordinates relative to the timeline container
  const measurePositions = () => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
      const centers = cardRefs.current.map((el) => {
        if (!el) return 0;
        return el.offsetTop + el.offsetHeight / 2;
      });
      setCardCenters(centers);
    }
  };

  useEffect(() => {
    const timer = setTimeout(measurePositions, 120);
    window.addEventListener("resize", measurePositions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measurePositions);
    };
  }, []);

  // RequestAnimationFrame loop for LERP scroll physics
  useEffect(() => {
    let animationFrameId: number;

    const updateProgress = () => {
      setLineProgress((prev) => {
        const target = targetProgressRef.current;
        const diff = target - prev;

        if (Math.abs(diff) < 0.2) {
          return target;
        }
        // Lerp step: 10% movement per frame creates a viscous liquid flow
        return prev + diff * 0.1;
      });

      animationFrameId = requestAnimationFrame(updateProgress);
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Scroll listener to update scroll progress targets
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const triggerY = window.innerHeight * 0.5; // screen center trigger line

      const localTriggerY = triggerY - rect.top;
      const progressInPx = Math.max(0, Math.min(rect.height, localTriggerY));
      targetProgressRef.current = progressInPx;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const firstCenter = cardCenters[0] || 0;
  const lastCenter = cardCenters[cardCenters.length - 1] || 0;

  return (
    <section className="timeline-section-wrapper">
      {/* Left aligned title area */}
      <div className="timeline-header-container">
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.72rem",
            fontWeight: 600,
            color: "var(--accent)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            display: "block",
            marginBottom: "0.4rem",
          }}
        >
          Selected work
        </span>
        <h2
          className="font-garamond"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 400,
            color: "#ffffff",
            marginBottom: "4rem",
          }}
        >
          Featured Productions
        </h2>
      </div>

      {/* Timeline Layout */}
      <div ref={containerRef} className="timeline-container">

        {/* Background Power line track */}
        {cardCenters.length > 0 && (
          <div
            className="timeline-powerline-track"
            style={{
              top: `${firstCenter}px`,
              bottom: `${containerHeight - lastCenter}px`,
            }}
          />
        )}

        {/* Filled glowing white scroller power line */}
        {cardCenters.length > 0 && (
          <div
            className="timeline-powerline-glow"
            style={{
              top: `${firstCenter}px`,
              height: `${Math.max(
                0,
                Math.min(lastCenter - firstCenter, lineProgress - firstCenter)
              )}px`,
            }}
          />
        )}

        {/* Connecting branch lines (direct absolute children of container) */}
        {cardCenters.map((cardCenterY, index) => {
          const excess = lineProgress - cardCenterY;
          // Smooth filling logic for branch lines
          const branchProgress = Math.min(1, Math.max(0, excess / 22));
          return (
            <div
              key={index}
              className="timeline-branch-line"
              style={{
                top: `${cardCenterY}px`,
              }}
            >
              <div
                className="timeline-branch-glow"
                style={{
                  width: `${branchProgress * 100}%`,
                }}
              />
            </div>
          );
        })}

        {/* Timeline Row Content Cards */}
        {portfolioItems.map((item, index) => {
          const cardCenterY = cardCenters[index] || 0;
          const excess = lineProgress - cardCenterY;
          const branchProgress = Math.min(1, Math.max(0, excess / 22));
          const isActivated = branchProgress === 1;

          return (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="timeline-row-item"
            >
              <div className="timeline-card-wrapper">
                <TimelineVideoCard item={item} isActivated={isActivated} />
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        /* Section setup & sizing */
        .timeline-section-wrapper {
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem 1.5rem 6rem;
        }

        .timeline-header-container {
          text-align: left;
          padding-left: 90px;
        }

        .timeline-container {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 7.5rem; /* Scroll padding between elements */
        }

        .timeline-row-item {
          display: flex;
          position: relative;
          padding-left: 90px;
        }

        /* Power line vertical track */
        .timeline-powerline-track {
          position: absolute;
          left: 30px;
          width: 2px;
          background: rgba(255, 255, 255, 0.05);
          z-index: 1;
        }

        /* Glow filling main vertical line */
        .timeline-powerline-glow {
          position: absolute;
          left: 30px;
          width: 2px;
          background: linear-gradient(to bottom, #a855f7 40%, #ffffff);
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.8), 0 0 15px #ffffff;
          z-index: 2;
        }

        /* Connecting horizontal circuit line - absolute container children */
        .timeline-branch-line {
          position: absolute;
          left: 30px;
          width: 60px; /* Bridge between timeline (30px) and card padding (90px) */
          height: 2px;
          background: rgba(255, 255, 255, 0.05);
          z-index: 1;
          transform: translateY(-50%);
        }

        .timeline-branch-glow {
          height: 100%;
          background: #a855f7;
          box-shadow: 0 0 8px rgba(168, 85, 247, 0.8);
          transition: width 0.18s ease-out;
        }

        .timeline-card-wrapper {
          flex: 1;
        }

        /* Desktop Card Splits */
        .timeline-video-container {
          width: 52%;
          position: relative;
          aspect-ratio: 16/10;
          overflow: hidden;
          background: #000;
        }

        .timeline-info-container {
          width: 48%;
          padding: 1.5rem 1.8rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* Responsive Mobile Handling */
        @media (max-width: 850px) {
          .timeline-header-container {
            padding-left: 55px;
          }

          .timeline-row-item {
            padding-left: 55px;
          }

          .timeline-powerline-track, .timeline-powerline-glow {
            left: 15px;
          }

          .timeline-branch-line {
            left: 15px;
            width: 40px;
          }
        }

        @media (max-width: 640px) {
          .timeline-card {
            flex-direction: column !important;
          }
          
          .timeline-video-container {
            width: 100% !important;
          }
          
          .timeline-info-container {
            width: 100% !important;
            padding: 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
}
