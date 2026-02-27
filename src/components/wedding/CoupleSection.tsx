import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import brideImg from "@/assets/bride.png";
import groomImg from "@/assets/groom.png";

const CoupleSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="couple" className="wedding-section bg-cream-dark/50" ref={ref}>
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-serif-elegant text-base tracking-[0.3em] uppercase text-muted-foreground mb-2">
            The Happy Couple
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-2">
            About Us
          </h2>
          <div className="gold-divider" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 mt-14">
          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-gold-light/40 shadow-lg mb-6">
              <img src={brideImg} alt="Bride - Karishma" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-foreground">Karishma</h3>
            <p className="font-serif-elegant text-lg text-primary italic mt-1">The Bride</p>
            <p className="font-sans text-muted-foreground mt-3 max-w-xs leading-relaxed text-sm">
              A kind soul with a radiant smile, Karishma brings warmth and grace to everyone she meets. Her love for art and family makes her truly special.
            </p>
          </motion.div>

          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-gold-light/40 shadow-lg mb-6">
              <img src={groomImg} alt="Groom - Ravi" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-foreground">Ravi</h3>
            <p className="font-serif-elegant text-lg text-primary italic mt-1">The Groom</p>
            <p className="font-sans text-muted-foreground mt-3 max-w-xs leading-relaxed text-sm">
              A man of values and vision, Ravi's gentle heart and determination inspire all around him. His devotion to family is unmatched.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CoupleSection;
