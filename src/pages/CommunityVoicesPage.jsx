import Nav from "../components/layout/Nav";
import Footer from "../components/footer/Footer";

import PageHero from "../components/ui/PageHero";

import VoicesGrid from "../components/Voices/VoicesGrid";
import VoicesStats from "../components/Voices/VoicesStats";
import VoicesStory from "../components/Voices/VoicesStory";
import VoicesCTA from "../components/Voices/VoicesCTA";

import voicesHero from "../assets/about-hero.jpg";

const CommunityVoicesPage = () => {
  return (
    <div className="bg-[#F5F5F5] min-h-screen overflow-hidden">
      <Nav />

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