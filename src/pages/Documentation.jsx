import Navbar from "../components/layout/Nav";
import Footer from "../components/footer/Footer";

import PageHero from "../components/ui/PageHero";

import DocumentationOverview from "../components/documentation/DocumentationOverview";
import DocumentationSteps from "../components/documentation/DocumentationSteps";
import DocumentationSecurity from "../components/documentation/DocumentationSecurity";
import DocumentationFAQ from "../components/documentation/DocumentationFAQ";
import DocumentationCTA from "../components/documentation/DocumentationCTA";

import docsHero from "../assets/about-hero.jpg";

const DocumentationPage = () => {
  return (
    <div className="bg-[#F5F5F5] min-h-screen overflow-hidden">
      <Navbar />

      <PageHero
        badge="Documentation"
        title="NationAura Documentation Center"
        description="Learn how NationAura helps citizens report, track, and improve infrastructure issues across Nigeria using technology, transparency, and civic collaboration."
        image={docsHero}
      />

      <DocumentationOverview />
      <DocumentationSteps />
      <DocumentationSecurity />
      <DocumentationFAQ />
      <DocumentationCTA />

      <Footer />
    </div>
  );
};

export default DocumentationPage;