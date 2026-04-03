import { motion } from "framer-motion";
import { useState } from "react";
import PageTransition from "@/components/PageTransition";

const Booking = () => {
  const [form, setForm] = useState({
    name: "", email: "", size: "", description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const sizes = ["3×5 ft", "5×7 ft", "6×9 ft", "8×10 ft", "Custom"];

  return (
    <PageTransition>
      <section className="pt-32 pb-20 px-6 min-h-screen">
        <div className="container mx-auto max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl font-bold text-center mb-4"
          >
            Book a <span className="text-gradient-psychedelic">Custom Rug</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-body text-muted-foreground text-center mb-12"
          >
            Tell us your vision and we'll bring it to life.
          </motion.p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-psychedelic mx-auto mb-6 flex items-center justify-center text-3xl">
                ✓
              </div>
              <h2 className="font-display text-3xl font-bold mb-3">Request Submitted!</h2>
              <p className="text-muted-foreground font-body">We'll be in touch within 24 hours.</p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {[
                { label: "Name", key: "name", type: "text", placeholder: "Your full name" },
                { label: "Email", key: "email", type: "email", placeholder: "you@example.com" },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="block font-body text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                    {label}
                  </label>
                  <input
                    type={type}
                    required
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground font-body placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
              ))}

              <div>
                <label className="block font-body text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                  Rug Size
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm({ ...form, size: s })}
                      className={`py-2 px-3 rounded-md border font-body text-sm transition-all ${
                        form.size === s
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-muted-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-body text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                  Design Description
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Describe your dream rug — colors, patterns, vibe..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground font-body placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block font-body text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                  Reference Images (optional)
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <p className="text-muted-foreground font-body text-sm">
                    Drag & drop or click to upload
                  </p>
                  <input type="file" multiple accept="image/*" className="hidden" />
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-lg bg-gradient-psychedelic text-accent-foreground font-body font-semibold uppercase tracking-wider glow-pink"
              >
                Submit Request
              </motion.button>
            </motion.form>
          )}
        </div>
      </section>
    </PageTransition>
  );
};

export default Booking;
