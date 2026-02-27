import heroFloral from "@/assets/hero-floral.png";

const FloralDecorations = () => {
  return (
    <>
      <div className="floating-floral top-0 left-0 w-40 md:w-56 -rotate-12 opacity-10">
        <img src={heroFloral} alt="" className="w-full" />
      </div>
      <div className="floating-floral bottom-0 right-0 w-40 md:w-56 rotate-180 opacity-10">
        <img src={heroFloral} alt="" className="w-full" />
      </div>
    </>
  );
};

export default FloralDecorations;
