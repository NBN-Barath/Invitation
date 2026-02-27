import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Sun, UtensilsCrossed, Heart } from "lucide-react";

const events = [
  {
    icon: Sparkles,
    title: "Reception",
    time: "10:00 AM – 11:30 AM",
    description: "Welcome guests with refreshments and music",
  },
  {
    icon: Heart,
    title: "Muhurtham",
    time: "11:45 AM – 1:00 PM",
    description: "The sacred wedding ceremony",
  },
  {
    icon: Sun,
    title: "Celebrations",
    time: "1:00 PM – 3:00 PM",
    description: "Post-wedding rituals and photo session",
  },
  {
    icon: UtensilsCrossed,
    title: "Grand Dinner",
    time: "7:00 PM – 10:00 PM",
    description: "A lavish feast to celebrate together",
  },
];

const EventSchedule = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="wedding-section bg-cream-dark/50" ref={ref}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-serif-elegant text-base tracking-[0.3em] uppercase text-muted-foreground mb-2">
            The Celebration
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-2">
            Event Schedule
          </h2>
          <div className="gold-divider" />
        </motion.div>

        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          {events.map(({ icon: Icon, title, time, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="wedding-card p-6 md:p-8 text-center group hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl text-foreground mb-1">{title}</h3>
              <p className="font-sans text-sm font-semibold text-primary tracking-wider">{time}</p>
              <p className="font-sans text-sm text-muted-foreground mt-2">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventSchedule;
