import { useEffect, useRef } from "react";

interface Props {
  src: string;
  className?: string;
}

/**
 * Background video with Safari/iOS autoplay hardening:
 *  1. `autoPlay muted playsInline` — minimum required attributes for iOS/Safari
 *  2. Programmatic .play() on mount — Safari sometimes ignores the HTML attribute
 *  3. `canplay` listener — Safari fires this before it auto-starts; we re-trigger play
 *  4. `visibilitychange` listener — iOS pauses video when app is backgrounded;
 *     resumes as soon as the tab/app becomes visible again
 *  5. `disablePictureInPicture` — prevents macOS Safari PiP button interrupting BG video
 */
const BackgroundVideo = ({ src, className }: Props) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const play = () => v.play().catch(() => {});

    // Attempt immediately — covers Chrome, Firefox, Edge
    play();

    // Safari/iOS fires canplay before it honours autoPlay; piggyback on it
    v.addEventListener("canplay", play);

    // iOS Safari pauses all media when the user switches apps or locks screen;
    // resume the moment the page becomes visible again
    const onVisibility = () => {
      if (document.visibilityState === "visible") play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      v.removeEventListener("canplay", play);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [src]); // re-run when src changes so the new clip also plays on Safari

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      className={className}
    />
  );
};

export default BackgroundVideo;
