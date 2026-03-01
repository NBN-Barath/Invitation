import HeroSection from "@/components/wedding/HeroSection";
import WeddingDetails from "@/components/wedding/WeddingDetails";
import EventSchedule from "@/components/wedding/EventSchedule";
import WeddingFooter from "@/components/wedding/WeddingFooter";
import FloralDecorations from "@/components/wedding/FloralDecorations";

const Index = () => {
  return (
    <div className="relative overflow-hidden">
      <FloralDecorations />
      <HeroSection />
      <WeddingDetails />
      <EventSchedule />
      <WeddingFooter />
    </div>
  );
};

export default Index;
