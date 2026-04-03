import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import RugCard from "@/components/RugCard";
import heroImage from "@/assets/hero-rug.jpg";

const featuredRugs = [
  { name: "Psychedelic Wave", price: 1250, image: heroImage },
  { name: "Neon Vortex", price: 980, image: heroImage },
  { name: "Cosmic Swirl", price: 1480, image: heroImage },
];

const Home = () => {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={heroImage}
            alt="Premium custom rug"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
          >
            Art Beneath <br />
            <span className="text-gradient-psychedelic">Your Feet</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Hand-crafted luxury rugs that transform your space into a gallery.
            Every piece is a statement.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/gallery">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-lg bg-gradient-psychedelic text-accent-foreground font-body font-semibold uppercase tracking-wider text-sm glow-pink"
              >
                Shop Rugs
              </motion.button>
            </Link>
            <Link to="/booking">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-lg border border-primary/50 text-primary font-body font-semibold uppercase tracking-wider text-sm hover:bg-primary/10 transition-colors"
              >
                Book a Custom Rug
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <div className="w-1 h-3 rounded-full bg-primary animate-glow-pulse" />
          </div>
        </motion.div>
      </section>

      {/* Brand intro */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl font-bold mb-6"
          >
            Where <span className="text-primary">Craft</span> Meets Vision
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-body text-muted-foreground text-lg leading-relaxed"
          >
            Each LuxeRugs piece is a collaboration between you and our artisans.
            From bold psychedelic patterns to minimalist statements — we weave your imagination into reality.
          </motion.p>
        </div>
      </section>

      {/* Featured */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Featured <span className="text-gradient-psychedelic">Collection</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {featuredRugs.map((rug, i) => (
              <RugCard key={rug.name} {...rug} index={i} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/gallery">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-lg border border-border text-foreground font-body text-sm uppercase tracking-wider hover:border-primary/50 hover:text-primary transition-colors"
              >
                View Full Gallery →
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;
