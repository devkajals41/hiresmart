import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/hero/Hero";
import FeatureSection from "./FeatureSection";
import JourneySection from "./JourneySection";
import CTASection from "./CTASection";
import Footer from "../../components/layout/Footer";

function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeatureSection />
      <JourneySection />
      <CTASection />
      <Footer />
    </>
  );
}

export default Landing;