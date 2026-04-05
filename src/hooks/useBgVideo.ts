import { useState, useEffect } from "react";

const MOBILE_SRC  = "/introvids/moblieintro2.MP4";
const DESKTOP_SRC = "/introvids/Intro2.MP4";
const MQ = "(max-width: 767px)";

/**
 * Returns the correct background video src for the current viewport.
 * Reactively updates if the viewport crosses the mobile breakpoint.
 * Mobile  (≤767px) → moblieintro2.MP4
 * Desktop (≥768px) → Intro2.MP4
 */
export const useBgVideo = () => {
  const [src, setSrc] = useState<string>(() =>
    window.matchMedia(MQ).matches ? MOBILE_SRC : DESKTOP_SRC
  );

  useEffect(() => {
    const mq = window.matchMedia(MQ);
    const handler = (e: MediaQueryListEvent) =>
      setSrc(e.matches ? MOBILE_SRC : DESKTOP_SRC);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return src;
};
