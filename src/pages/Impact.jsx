import Navbar from "../components/layout/Navbars";
import Footer from "../components/footer/Footer";

import PageHero from "../components/ui/PageHero";

import CommunityGoals from "../components/community/CommunityGoals";
import CommunityStats from "../components/community/CommunityStats";
import CommunityCTA from "../components/community/CommunityCTA";

import communityHero from "../assets/about-hero.jpg";

const CommunityImpact = () => {
  return (
    <div className="bg-[#F5F5F5] min-h-screen overflow-hidden">
      <Navbar />

      <PageHero
        badge="Community Impact"
        title="
          Creating Real Change
          Across Communities
        "
        description="
          NationAura empowers citizens, communities,
          and organizations to improve infrastructure
          transparency, strengthen accountability,
          and drive meaningful action across Nigeria.
        "
        image={communityHero}
      />

      <CommunityGoals />

      <CommunityStats />

      <CommunityCTA />

      <Footer />
    </div>
  );
};

export default CommunityImpact;