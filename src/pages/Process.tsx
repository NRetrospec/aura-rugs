import { motion } from "framer-motion";
import { Palette, Ruler, Clock, Truck, ShieldCheck, MessageCircle } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const steps = [
  { icon: MessageCircle, title: "Consultation", desc: "Share your vision — colors, patterns, dimensions. We'll help refine it." },
  { icon: Palette, title: "Design Mockup", desc: "Our team creates a digital mockup for your approval before production." },
  { icon: Ruler, title: "Crafting", desc: "Master artisans hand-tuft your rug using premium materials." },
  { icon: Clock, title: "Production", desc: "Allow 4–8 weeks for standard orders. Rush options available." },
  { icon: ShieldCheck, title: "Quality Check", desc: "Every rug passes rigorous inspection before shipping." },
  { icon: Truck, title: "Delivery", desc: "Carefully packaged and shipped to your door worldwide." },
];

const policies = [
  { title: "Timeline", text: "Standard production takes 4–8 weeks. Rush orders (2–3 weeks) carry a 30% surcharge." },
  { title: "Revisions", text: "Up to 2 free design revisions included. Additional revisions at $50 each." },
  { title: "Refunds", text: "Custom orders are non-refundable once production begins. Premade rugs may be returned within 14 days." },
  { title: "Design Limits", text: "Maximum 8 colors per rug. Photographic reproductions require consultation." },
  { title: "Shipping", text: "Free shipping on orders over $1,000. International rates calculated at checkout." },
];

const Process = () => {
  return (
    <PageTransition>
      <section className="pt-32 pb-20 px-6 min-h-screen">
        <div className="container mx-auto max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl font-bold text-center mb-4"
          >
            Our <span className="text-gradient-psychedelic">Process</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-body text-muted-foreground text-center mb-20 max-w-xl mx-auto"
          >
            From concept to carpet — here's how the magic happens.
          </motion.p>

          {/* Steps */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent hidden md:block" />

            <div className="space-y-12">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex gap-6 items-start"
                >
                  <div className="relative z-10 w-16 h-16 shrink-0 rounded-xl bg-card border border-border flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-1">
                      <span className="text-muted-foreground mr-2 font-body text-sm">0{i + 1}</span>
                      {step.title}
                    </h3>
                    <p className="font-body text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Policies */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-28"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">
              Rules & <span className="text-secondary">Policies</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {policies.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <h4 className="font-display text-lg font-semibold text-foreground mb-2">{p.title}</h4>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Process;
