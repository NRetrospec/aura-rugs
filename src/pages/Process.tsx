import { motion } from "framer-motion";
import { Palette, Ruler, Clock, Truck, ShieldCheck, MessageCircle } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { useBgVideo } from "@/hooks/useBgVideo";

const steps = [
  { icon: MessageCircle, title: "Consultation",  desc: "Share your vision — colors, patterns, dimensions. We'll help refine it." },
  { icon: Palette,       title: "Design Mockup", desc: "Our team creates a digital mockup for your approval before production." },
  { icon: Ruler,         title: "Crafting",      desc: "Master artisans hand-tuft your rug using premium materials." },
  { icon: Clock,         title: "Production",    desc: "Allow 4–8 weeks for standard orders. Rush options available." },
  { icon: ShieldCheck,   title: "Quality Check", desc: "Every rug passes rigorous inspection before shipping." },
  { icon: Truck,         title: "Delivery",      desc: "Carefully packaged and shipped to your door worldwide." },
];

const policies = [
  { title: "Timeline",      text: "Standard production takes 4–8 weeks. Rush orders (2–3 weeks) carry a 30% surcharge." },
  { title: "Revisions",     text: "Up to 2 free design revisions included. Additional revisions at $50 each." },
  { title: "Refunds",       text: "Custom orders are non-refundable once production begins. Premade rugs returnable within 14 days." },
  { title: "Design Limits", text: "Maximum 8 colors per rug. Photographic reproductions require consultation." },
  { title: "Shipping",      text: "Free shipping on orders over $1,000. International rates calculated at checkout." },
];

const Process = () => {
  const bgVideo = useBgVideo();
  return (
    <PageTransition>
      <section className="relative min-h-screen">
        {/* Video fixed to viewport — stays in place while content scrolls */}
        <div className="fixed inset-0 -z-10">
          <video
            src={bgVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-background/25" />
        </div>

        {/* Scrollable content */}
        <div className="relative z-10 px-6 pt-8 pb-28">
          <div className="max-w-3xl mx-auto">

            {/* Header */}
            <div className="text-center mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="font-display text-4xl md:text-5xl font-bold mb-2"
              >
                Our <span className="text-gradient-psychedelic">Process</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="font-body text-muted-foreground text-base"
              >
                From concept to carpet — here's how the magic happens.
              </motion.p>
            </div>

            {/* Steps */}
            <div className="relative mb-12">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent" />
              <div className="space-y-5">
                {steps.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.08, duration: 0.45 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="relative z-10 w-12 h-12 shrink-0 rounded-xl bg-card border border-border flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="pt-1">
                      <h3 className="font-display text-lg font-semibold leading-tight">
                        <span className="text-muted-foreground mr-2 font-body text-sm">0{i + 1}</span>
                        {step.title}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground leading-snug mt-0.5">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-display text-2xl font-bold text-center mb-5"
            >
              Rules & <span className="text-secondary">Policies</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {policies.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  className="p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <h4 className="font-display text-base font-semibold text-foreground mb-1">{p.title}</h4>
                  <p className="font-body text-sm text-muted-foreground leading-snug">{p.text}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Process;
