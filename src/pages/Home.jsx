import { useEffect } from "react";
import api from "../api/axios";
import Navbar from "../components/navbar/Navbar";
import HeroSection from "../components/hero/HeroSection";
import FeaturesSection from "../components/sections/FeaturesSection";
import CommunityReportsSection from "../components/sections/CommunityReportsSection";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import Footer from "../components/footer/Footer";
import StatsSection from "../components/sections/StatsSection";

const Home = () => {
  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await api.get('/test');
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching test data:', error);
      }
    };

    fetchTestData();
  }, []);

  return (
    <div className="bg-white overflow-hidden">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <CommunityReportsSection />
      <HowItWorksSection />
      <Footer />
    </div>
  );
};

export default Home;