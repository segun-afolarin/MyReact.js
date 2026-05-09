import PageHero from "../components/ui/PageHero";

import AboutGrid from "../components/about/AboutGrid";

import WhyWeExist from "../components/about/WhyWeExist";

import GoalsSection from "../components/about/GoalsSection";

import ClosingSection from "../components/about/ClosingSection";

import heroImage from "../assets/about-hero.jpg";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/footer/Footer";

const AboutPage = () => {
  return (
    <div
      className="
        bg-[#F5F5F5]
        min-h-screen
        overflow-hidden
      "
    >
     <Navbar />
      {/* HERO */}
      <PageHero
        badge="About NationAura"

        title="
          Empowering Citizens
          To Build A Better Nigeria
        "

        description="
          NationAura is a modern civic-tech platform
          helping citizens report, track, and improve
          infrastructure issues across Nigeria through
          technology, transparency, and community action.
        "

        image={heroImage}
      />

      {/* ABOUT GRID */}
      <AboutGrid />

      {/* WHY WE EXIST */}
      <WhyWeExist />

      {/* GOALS */}
      <GoalsSection />

      {/* CLOSING CTA */}
      <ClosingSection />
      
      <Footer/>

    </div>
  );
};

export default AboutPage;