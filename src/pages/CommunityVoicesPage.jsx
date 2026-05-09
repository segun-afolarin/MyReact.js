import Navbar from "../components/layout/Nav";
import Footer from "../components/footer/Footer";

import PageHero from "../components/ui/PageHero";

import VoicesGrid from "../components/voices/VoicesGrid";
import VoicesStats from "../components/voices/VoicesStats";
import VoicesStory from "../components/voices/VoicesStory";
import VoicesCTA from "../components/voices/VoicesCTA";

import voicesHero from "../assets/about-hero.jpg";

const CommunityVoicesPage = () => {
  return (
    <div className="bg-[#F5F5F5] min-h-screen overflow-hidden">
      <Navbar />

      <PageHero
        badge="Community Voices"

        title="
          Real Stories.
          Real Communities.
          Real Impact.
        "

        description="
          Discover how citizens, communities,
          and organizations across Nigeria are
          using NationAura to improve transparency,
          accountability, and infrastructure reporting.
        "

        image={voicesHero}
      />

      <VoicesStats />

      <VoicesGrid />

      <VoicesStory />

      <VoicesCTA />

      <Footer />
    </div>
  );
};

export default CommunityVoicesPage;