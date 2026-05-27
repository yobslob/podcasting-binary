"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    bgAnalytics?: {
      track: (eventName: string, eventData?: Record<string, any>) => void;
      getEvents: () => any[];
      clearEvents: () => void;
    };
  }
}

export function AnalyticsTracker() {
  useEffect(() => {
    // Suppress browser console warnings from external SDKs or preload speculator engines
    const originalWarn = console.warn;
    console.warn = (...args) => {
      if (
        args[0] &&
        typeof args[0] === "string" &&
        (args[0].includes("Datadog Browser SDK") ||
         args[0].includes("No storage available for session") ||
         args[0].includes("was preloaded using link preload") ||
         args[0].includes("preloaded using link preload"))
      ) {
        return;
      }
      originalWarn.apply(console, args);
    };

    const initStorage = () => {
      localStorage.setItem("bg_cookie_consent", "all");
      if (!localStorage.getItem("bg_analytics_events")) {
        localStorage.setItem("bg_analytics_events", JSON.stringify([]));
      }
      if (!localStorage.getItem("bg_analytics_session")) {
        localStorage.setItem(
          "bg_analytics_session",
          JSON.stringify({
            startTime: Date.now(),
            duration: 0,
            pageViews: 0,
          })
        );
      }
    };
    initStorage();

    const logEvent = (name: string, data: Record<string, any> = {}) => {
      try {
        const events = JSON.parse(localStorage.getItem("bg_analytics_events") || "[]");
        events.push({
          id: Math.random().toString(36).substring(2, 9),
          timestamp: new Date().toISOString(),
          name,
          data,
        });
        if (events.length > 200) events.shift();
        localStorage.setItem("bg_analytics_events", JSON.stringify(events));
        window.dispatchEvent(new CustomEvent("bg_analytics_update"));
      } catch (e) {
        console.error("Failed to write to analytics log", e);
      }
    };

    window.bgAnalytics = {
      track: (name, data) => logEvent(name, data),
      getEvents: () => JSON.parse(localStorage.getItem("bg_analytics_events") || "[]"),
      clearEvents: () => {
        localStorage.setItem("bg_analytics_events", JSON.stringify([]));
        window.dispatchEvent(new CustomEvent("bg_analytics_update"));
      },
    };

    const currentPath = window.location.pathname;
    const referrer = document.referrer || "Direct";
    logEvent("Page View", { path: currentPath, referrer });

    const session = JSON.parse(localStorage.getItem("bg_analytics_session") || "{}");
    session.pageViews = (session.pageViews || 0) + 1;
    localStorage.setItem("bg_analytics_session", JSON.stringify(session));

    const durationInterval = setInterval(() => {
      const sess = JSON.parse(localStorage.getItem("bg_analytics_session") || "{}");
      if (sess.startTime) {
        sess.duration = Math.round((Date.now() - sess.startTime) / 1000);
        localStorage.setItem("bg_analytics_session", JSON.stringify(sess));
        window.dispatchEvent(new CustomEvent("bg_analytics_update"));
      }
    }, 5000);

    const milestonesTracked = {
      "25": false,
      "50": false,
      "75": false,
      "100": false,
    };

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const scrollPercentage = Math.round((window.scrollY / scrollHeight) * 100);

      Object.keys(milestonesTracked).forEach((key) => {
        const threshold = parseInt(key);
        const milestoneKey = key as keyof typeof milestonesTracked;
        if (scrollPercentage >= threshold && !milestonesTracked[milestoneKey]) {
          milestonesTracked[milestoneKey] = true;
          logEvent("Scroll Depth", { depth: `${threshold}%` });
        }
      });
    };

    let scrollTimeout: NodeJS.Timeout;
    const throttledScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          handleScroll();
          scrollTimeout = null as any;
        }, 300);
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      let current: HTMLElement | null = target;
      let clickable: HTMLElement | null = null;
      
      while (current && current !== document.body) {
        if (
          current.tagName === "A" ||
          current.tagName === "BUTTON" ||
          current.getAttribute("data-analytics-id")
        ) {
          clickable = current;
          break;
        }
        current = current.parentElement;
      }

      if (clickable) {
        const analyticsId = clickable.getAttribute("data-analytics-id");
        const text = clickable.innerText?.trim().substring(0, 50) || "";
        const href = clickable.getAttribute("href") || "";
        const tag = clickable.tagName;

        logEvent("CTA Click", {
          id: analyticsId || `generic_${tag.toLowerCase()}`,
          text: text || clickable.getAttribute("aria-label") || "unlabeled",
          destination: href || "none",
          element: tag.toLowerCase(),
        });
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      clearInterval(durationInterval);
      window.removeEventListener("scroll", throttledScroll);
      window.removeEventListener("click", handleClick);
      console.warn = originalWarn;
    };
  }, []);

  return null;
}
