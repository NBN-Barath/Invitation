import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";
import heroFloral from "@/assets/hero-floral.png";

const HeroSection = () => {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("https://cdn.pixabay.com/audio/2022/01/18/audio_d0ef98b5a0.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsMuted(!isMuted);
  };

  const scrollToInvitation = () => {
    document.getElementById("couple")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background floral image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroFloral}
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gold-light opacity-40"
          animate={{
            y: [0, -40, 0],
            x: [0, 15, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.8,
          }}
          style={{
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
        />
      ))}

      {/* Music toggle */}
      <button
        onClick={toggleMute}
        className="fixed top-6 right-6 z-50 w-11 h-11 rounded-full bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center text-primary hover:bg-card transition-colors"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif-elegant text-lg md:text-xl tracking-[0.3em] uppercase text-muted-foreground mb-6"
        >
          You're Invited to Celebrate Love
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium gold-text-gradient leading-tight">
            Ravi
          </h1>
          <p className="font-serif-elegant text-2xl md:text-3xl text-muted-foreground my-3 italic">&amp;</p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium gold-text-gradient leading-tight">
            Karishma
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8"
        >
          <div className="gold-divider" />
          <p className="font-serif-elegant text-xl md:text-2xl text-foreground mt-4 tracking-wider">
            Friday, 29th May 2025
          </p>
          <p className="font-sans text-sm text-muted-foreground mt-2 tracking-widest uppercase">
            Save the Date
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          onClick={scrollToInvitation}
          className="mt-12 inline-flex flex-col items-center gap-2 text-primary hover:text-gold-dark transition-colors cursor-pointer group"
        >
          <span className="font-serif-elegant text-base tracking-widest uppercase">View Invitation</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
