import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Check } from "lucide-react";
import { toast } from "sonner";

const RSVPSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    guests: "1",
    attending: true,
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    setSubmitted(true);
    toast.success("Thank you for your RSVP! We look forward to celebrating with you.");
  };

  return (
    <section className="wedding-section bg-cream-dark/50" ref={ref}>
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-serif-elegant text-base tracking-[0.3em] uppercase text-muted-foreground mb-2">
            Will You Join Us?
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-2">
            RSVP
          </h2>
          <div className="gold-divider" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10"
        >
          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="wedding-card p-10 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-2">Thank You!</h3>
              <p className="font-sans text-muted-foreground">
                Your response has been recorded. We can't wait to celebrate with you!
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="wedding-card p-8 md:p-10 text-left space-y-6">
              <div>
                <label className="block font-sans text-sm text-muted-foreground mb-2 tracking-wider uppercase">
                  Your Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block font-sans text-sm text-muted-foreground mb-2 tracking-wider uppercase">
                  Number of Guests
                </label>
                <select
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border font-sans text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-sans text-sm text-muted-foreground mb-3 tracking-wider uppercase">
                  Will you attend?
                </label>
                <div className="flex gap-3">
                  {[true, false].map((val) => (
                    <button
                      key={String(val)}
                      type="button"
                      onClick={() => setForm({ ...form, attending: val })}
                      className={`flex-1 py-3 rounded-lg font-sans text-sm tracking-wider uppercase border transition-all ${
                        form.attending === val
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-muted-foreground border-border hover:border-primary/40"
                      }`}
                    >
                      {val ? "Joyfully Accept" : "Regretfully Decline"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-sans text-sm text-muted-foreground mb-2 tracking-wider uppercase">
                  Message for the Couple
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow resize-none"
                  placeholder="Write your wishes..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-sans text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-gold-dark transition-colors"
              >
                <Send className="w-4 h-4" />
                Send RSVP
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default RSVPSection;
