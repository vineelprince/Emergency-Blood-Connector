import AnnouncementBar from "../../components/AnnouncementBar";

import HeroSection from "../../components/home/HeroSection";
import BloodSearchSection from "../../components/home/BloodSearchSection";
import StatsSection from "../../components/home/StatsSection";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import HowItWorks from "../../components/home/HowItWorks";
import EmergencyFeed from "../../components/home/EmergencyFeed";
import PartnerSection from "../../components/home/PartnerSection";
import EmergencyCTA from "../../components/home/EmergencyCTA";
import FeaturedDonors from "../../components/home/FeaturedDonors";
import Footer from "../../components/home/Footer";

function HomePage() {
  return (
    <>
      <AnnouncementBar />

      <HeroSection />

      <BloodSearchSection />

      <StatsSection />

      <WhyChooseUs />

      <HowItWorks />

      <FeaturedDonors />

      <EmergencyFeed />

      <PartnerSection />

      <EmergencyCTA />

      <Footer />
    </>
  );
}

export default HomePage;