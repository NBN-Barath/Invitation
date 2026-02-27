import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react";

const WeddingDetails = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const details = [
    { icon: Calendar, label: "Date", value: "Saturday, 15th March 2026" },
    { icon: Clock, label: "Time", value: "10:00 AM onwards" },
    { icon: MapPin, label: "Venue", value: "The Grand Palace Hall" },
  ];

  return (
    <section className="wedding-section bg-background" ref={ref}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-serif-elegant text-base tracking-[0.3em] uppercase text-muted-foreground mb-2">
            Join Us At
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-2">
            Wedding Details
          </h2>
          <div className="gold-divider" />
        </motion.div>

        {/* Invitation Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 wedding-card p-8 md:p-12 relative overflow-hidden"
        >
          {/* Decorative corner borders */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-primary/40 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-primary/40 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-primary/40 rounded-br-lg" />

          <p className="font-serif-elegant text-lg text-muted-foreground italic mb-6">
            With the blessings of our families, we invite you to share in our joy
          </p>

          <div className="space-y-6">
            {details.map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
                className="flex items-center justify-center gap-3"
              >
                <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-sans text-sm text-muted-foreground uppercase tracking-wider">{label}:</span>
                <span className="font-serif-elegant text-lg text-foreground">{value}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="font-sans text-sm text-muted-foreground">
              123 Wedding Avenue, Jubilee Hills, Hyderabad, Telangana 500033
            </p>
          </div>

          <motion.a
            href="https://maps.google.com/?q=Jubilee+Hills+Hyderabad"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-sans text-sm tracking-wider uppercase hover:bg-gold-dark transition-colors"
          >
            <MapPin className="w-4 h-4" />
            View on Google Maps
            <ExternalLink className="w-3 h-3" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default WeddingDetails;
