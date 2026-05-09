import Navbar from "../components/layout/Navbars";
import Footer from "../components/footer/Footer";

import PageHero from "../components/ui/PageHero";

import FAQAccordion from "../components/faq/FAQAccordion";
import FAQCTA from "../components/faq/FAQCTA";

import faqHero from "../assets/about-hero.jpg";

const FAQPage = () => {
  return (
    <div className="bg-[#F5F5F5] min-h-screen overflow-hidden">
      <Navbar />

      <PageHero
        badge="FAQ"

        title="
          Frequently Asked
          Questions
        "

        description="
          Everything you need to know about reporting,
          tracking, and improving infrastructure
          with NationAura.
        "

        image={faqHero}
      />

      <FAQAccordion />

      <FAQCTA />

      <Footer />
    </div>
  );
};

export default FAQPage;