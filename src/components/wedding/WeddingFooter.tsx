import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Share2 } from "lucide-react";
import { toast } from "sonner";

const WeddingFooter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const shareWhatsApp = () => {
    const text = encodeURIComponent("You're invited to Ravi & Karishma's wedding! 💍✨\n\nDate: 29th May 2025\nVenue: Sree Rajaganapathi Mahaal\n\nView the invitation: " + window.location.href);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const shareGeneric = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Wedding Invitation — Ravi & Karishma",
        text: "You're invited to celebrate the wedding of Ravi & Karishma!",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <footer className="py-16 px-4 bg-background text-center" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-lg mx-auto"
      >
        <Heart className="w-6 h-6 text-primary mx-auto mb-4 animate-gentle-pulse" />
        <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-3">
          We look forward to celebrating with you!
        </h3>
        <p className="font-serif-elegant text-lg text-muted-foreground italic">
          Ravi & Karishma
        </p>

        <div className="gold-divider mt-6" />

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={shareWhatsApp}
            className="px-5 py-2.5 rounded-full border border-border bg-card text-foreground font-sans text-xs tracking-wider uppercase hover:border-primary/40 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </button>
          <button
            onClick={shareGeneric}
            className="px-5 py-2.5 rounded-full border border-border bg-card text-foreground font-sans text-xs tracking-wider uppercase hover:border-primary/40 transition-colors flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>

        <p className="mt-8 font-sans text-xs text-muted-foreground tracking-wider">
          Made with love ♥
        </p>
      </motion.div>
    </footer>
  );
};

export default WeddingFooter;
