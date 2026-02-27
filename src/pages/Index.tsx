import HeroSection from "@/components/wedding/HeroSection";
import CoupleSection from "@/components/wedding/CoupleSection";
import WeddingDetails from "@/components/wedding/WeddingDetails";
import EventSchedule from "@/components/wedding/EventSchedule";
import PhotoGallery from "@/components/wedding/PhotoGallery";
import RSVPSection from "@/components/wedding/RSVPSection";
import WeddingFooter from "@/components/wedding/WeddingFooter";
import FloralDecorations from "@/components/wedding/FloralDecorations";

const Index = () => {
  return (
    <div className="relative overflow-hidden">
      <FloralDecorations />
      <HeroSection />
      <CoupleSection />
      <WeddingDetails />
      <EventSchedule />
      <PhotoGallery />
      <RSVPSection />
      <WeddingFooter />
    </div>
  );
};

export default Index;
