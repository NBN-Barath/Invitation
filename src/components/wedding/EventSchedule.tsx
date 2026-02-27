import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Sparkles, Sun, UtensilsCrossed, Heart, Clock } from "lucide-react";

export interface ScheduleEvent {
  id: string;
  icon: string;
  title: string;
  time: string;
  description: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  Sun,
  UtensilsCrossed,
  Heart,
  Clock,
};

const EventSchedule = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [events, setEvents] = useState<ScheduleEvent[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("weddingEvents");
    if (stored) {
      setEvents(JSON.parse(stored));
    }
  }, []);

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

        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 wedding-card p-12 text-center"
          >
            <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-foreground mb-2">Coming Soon</h3>
            <p className="font-serif-elegant text-lg text-muted-foreground italic">
              The event schedule will be revealed soon...
            </p>
          </motion.div>
        ) : (
          <div className="mt-12 grid sm:grid-cols-2 gap-6">
            {events.map((event, i) => {
              const Icon = iconMap[event.icon] || Clock;
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                  className="wedding-card p-6 md:p-8 text-center group hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-1">{event.title}</h3>
                  <p className="font-sans text-sm font-semibold text-primary tracking-wider">{event.time}</p>
                  <p className="font-sans text-sm text-muted-foreground mt-2">{event.description}</p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventSchedule;
