import Navbar from "../../components/layout/Navbar";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import JourneySection from "./JourneySection";
import TestimonialSection from "./TestimonialSection";
import CTASection from "./CTASection";
import Footer from "../../components/layout/Footer";

function Landing() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <JourneySection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </>
  );
}

export default Landing;