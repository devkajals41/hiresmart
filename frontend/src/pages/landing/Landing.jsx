import Hero from "../../components/hero/Hero";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import CTASection from "./CTASection";
import FeatureSection from "./FeatureSection";
import JourneySection from "./JourneySection";

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
