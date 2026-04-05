import { motion } from "framer-motion";
import { useState } from "react";
import PageTransition from "@/components/PageTransition";
import RugCard from "@/components/RugCard";
import heroImage from "@/assets/hero-rug.jpg";
import { useBgVideo } from "@/hooks/useBgVideo";

const allRugs = [
  { name: "Psychedelic Wave", price: 1250, image: heroImage, category: "abstract" },
  { name: "Neon Vortex", price: 980, image: heroImage, category: "abstract" },
  { name: "Cosmic Swirl", price: 1480, image: heroImage, category: "geometric" },
  { name: "Midnight Aurora", price: 1120, image: heroImage, category: "abstract" },
  { name: "Electric Garden", price: 890, image: heroImage, category: "organic" },
  { name: "Crystal Maze", price: 1650, image: heroImage, category: "geometric" },
  { name: "Velvet Storm", price: 1300, image: heroImage, category: "abstract" },
  { name: "Prism Flow", price: 1050, image: heroImage, category: "organic" },
  { name: "Solar Flare", price: 1780, image: heroImage, category: "geometric" },
];

const categories = ["all", "abstract", "geometric", "organic"];

const Gallery = () => {
  const bgVideo = useBgVideo();
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? allRugs
    : allRugs.filter((r) => r.category === activeCategory);

  return (
    <PageTransition>
      <section className="relative min-h-screen overflow-hidden">
        {/* Video Background */}
        <video
          src={bgVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-background/25" />

        <div className="relative z-10 min-h-screen pt-32 pb-20 px-6">
          <div className="container mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl md:text-6xl font-bold text-center mb-4"
            >
              The <span className="text-gradient-psychedelic">Gallery</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-body text-muted-foreground text-center mb-12 max-w-xl mx-auto"
            >
              Each rug is a one-of-a-kind masterpiece. Find the piece that speaks to your space.
            </motion.p>

            {/* Filters */}
            <div className="flex justify-center gap-3 mb-16 flex-wrap">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full font-body text-sm uppercase tracking-wider border transition-all duration-300 ${
                    activeCategory === cat
                      ? "border-primary bg-primary/10 text-primary glow-pink"
                      : "border-border text-muted-foreground hover:border-muted-foreground"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            {/* Isometric grid */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
              style={{ perspective: "1200px" }}
            >
              {filtered.map((rug, i) => (
                <div
                  key={rug.name}
                  style={{
                    transform: `rotateY(${i % 2 === 0 ? 3 : -3}deg) rotateX(2deg)`,
                  }}
                >
                  <RugCard {...rug} index={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Gallery;
