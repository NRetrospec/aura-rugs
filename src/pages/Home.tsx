import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import heroImage from "@/assets/hero-rug.jpg";

// Module-level flag: persists across React Router navigation, resets on full page reload
let sessionIntro1Done = false;

const allRugs = [
  { name: "Psychedelic Wave", price: 1250, image: heroImage },
  { name: "Neon Vortex",      price: 980,  image: heroImage },
  { name: "Cosmic Swirl",     price: 1480, image: heroImage },
  { name: "Midnight Aurora",  price: 1120, image: heroImage },
  { name: "Electric Garden",  price: 890,  image: heroImage },
  { name: "Crystal Maze",     price: 1650, image: heroImage },
  { name: "Velvet Storm",     price: 1300, image: heroImage },
  { name: "Prism Flow",       price: 1050, image: heroImage },
  { name: "Solar Flare",      price: 1780, image: heroImage },
  { name: "Amber Drift",      price: 1190, image: heroImage },
  { name: "Neon Lattice",     price: 1420, image: heroImage },
  { name: "Ember Flow",       price: 960,  image: heroImage },
];

const CARDS_PER_PAGE = 6;
const totalPages = Math.ceil(allRugs.length / CARDS_PER_PAGE);

const CompactCard = ({ name, price, image }: { name: string; price: number; image: string }) => (
  <div className="group bg-card/90 border border-border/60 rounded-lg overflow-hidden hover:border-primary/40 hover:glow-pink transition-all duration-300 cursor-pointer">
    <div className="aspect-video overflow-hidden">
      <img
        src={image}
        alt={name}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
    </div>
    <div className="p-2 lg:p-3">
      <h3 className="font-display text-xs lg:text-sm font-semibold text-foreground mb-0.5 truncate">{name}</h3>
      <p className="font-body text-primary font-medium text-xs lg:text-sm">${price.toLocaleString()}</p>
      <button className="mt-1.5 w-full py-1.5 rounded-md bg-gradient-psychedelic text-accent-foreground font-body font-semibold text-xs uppercase tracking-wide">
        Buy Now
      </button>
    </div>
  </div>
);

const Home = () => {
  const video1Ref = useRef<HTMLVideoElement>(null); // plays intro1
  const video2Ref = useRef<HTMLVideoElement>(null); // preloads + plays intro2
  // Ref-based guard prevents double-transition regardless of closure staleness
  const transitionedRef = useRef(sessionIntro1Done);

  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [isIntro2Active, setIsIntro2Active] = useState(sessionIntro1Done);
  const [showGallery, setShowGallery] = useState(sessionIntro1Done);
  const [currentPage, setCurrentPage] = useState(0);

  // Keep isMobile in sync if the window is resized
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const intro1Src = isMobile ? "/introvids/moblieintro1.MP4" : "/introvids/Intro1.MP4";
  const intro2Src = isMobile ? "/introvids/moblieintro2.MP4" : "/introvids/Intro2.MP4";

  // Safari/iOS autoplay hardening — targets whichever video is currently active
  useEffect(() => {
    const v = isIntro2Active ? video2Ref.current : video1Ref.current;
    if (!v) return;

    const play = () => v.play().catch(() => {});
    play();
    v.addEventListener("canplay", play);

    const onVisibility = () => {
      if (document.visibilityState === "visible") play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      v.removeEventListener("canplay", play);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [isIntro2Active]);

  /**
   * Crossfade from intro1 → intro2.
   * Called either from onTimeUpdate (~0.5 s early, Plan A overlap)
   * or from onEnded (fallback if timeupdate was late).
   */
  const doTransition = () => {
    if (transitionedRef.current) return;
    transitionedRef.current = true;
    sessionIntro1Done = true;

    // Start video2 playing before flipping opacity so there's no black frame
    video2Ref.current?.play().catch(() => {});
    setIsIntro2Active(true);
    setTimeout(() => setShowGallery(true), 400);
  };

  // Plan A: begin crossfade 0.5 s before intro1 finishes
  const handleTimeUpdate = () => {
    const v = video1Ref.current;
    if (!v || transitionedRef.current) return;
    if (!isFinite(v.duration) || v.duration === 0) return;

    const timeLeft = v.duration - v.currentTime;
    if (timeLeft <= 0.5) doTransition();
  };

  // Plan B fallback: onEnded fires if timeupdate missed the window
  const handleVideoEnded = () => doTransition();

  const visibleRugs = allRugs.slice(
    currentPage * CARDS_PER_PAGE,
    (currentPage + 1) * CARDS_PER_PAGE
  );

  const nextPage = () => setCurrentPage((p) => (p + 1) % totalPages);
  const prevPage = () => setCurrentPage((p) => (p - 1 + totalPages) % totalPages);

  return (
    <PageTransition>
      <section className="h-screen overflow-hidden relative bg-background">
        {/*
          Two videos stacked. video2 is always mounted (preload="auto") so the
          browser buffers it while intro1 plays. Opacity crossfade hides the swap.
        */}

        {/* Intro 1 — fades out when transition fires */}
        <video
          ref={video1Ref}
          src={intro1Src}
          autoPlay
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
            isIntro2Active ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />

        {/* Intro 2 — preloads silently, fades in when transition fires */}
        <video
          ref={video2Ref}
          src={intro2Src}
          muted
          playsInline
          preload="auto"
          loop
          disablePictureInPicture
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
            isIntro2Active ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />

        <div className="absolute inset-0 bg-background/20" />

        {/* Layout: empty left (video shows through) + gallery on right */}
        <div className="relative z-10 h-full flex">
          <div className="hidden lg:block lg:flex-1" />

          {/* Gallery panel — overlaid on top of the looping video */}
          <AnimatePresence>
            {showGallery && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full lg:w-[66%] h-full flex flex-col pt-60 lg:pt-44 pb-5 px-4 lg:px-8"
              >
                {/* Cards — page swap animation */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.28 }}
                    className="grid grid-cols-3 gap-3 lg:gap-5"
                  >
                    {visibleRugs.map((rug, i) => (
                      <motion.div
                        key={rug.name}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.35 }}
                      >
                        <CompactCard {...rug} />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Arrow navigation */}
                <div className="flex items-center justify-center gap-5 pt-4">
                  <motion.button
                    onClick={prevPage}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </motion.button>

                  <div className="flex gap-2 items-center">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === currentPage
                            ? "w-5 bg-primary"
                            : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/70"
                        }`}
                      />
                    ))}
                  </div>

                  <motion.button
                    onClick={nextPage}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                  >
                    <ChevronRight size={16} />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;
