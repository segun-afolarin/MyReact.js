import Navbar from "../components/layout/Navbar";
import Footer from "../components/footer/Footer";

import PageHero from "../components/ui/PageHero";

import MissionGoals from "../components/mission/MissionGoals";
import MissionImpact from "../components/mission/MissionImpact";
import MissionCTA from "../components/mission/MissionCTA";

import missionHero from "../assets/about-hero.jpg";

const MissionPage = () => {
  return (
    <div className="bg-[#F5F5F5] min-h-screen overflow-hidden">
      <Navbar />

      <PageHero
        badge="Our Mission"

        title="
          Building A More
          Transparent Nigeria
        "

        description="
          NationAura empowers citizens to report,
          verify, and solve infrastructure challenges
          through technology, transparency,
          and community collaboration.
        "

        image={missionHero}
      />

      <MissionGoals />

      <MissionImpact />

      <MissionCTA />

      <Footer />
    </div>
  );
};

export default MissionPage;