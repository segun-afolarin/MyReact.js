import Navbar from "../components/layout/Navbar";
import Footer from "../components/footer/Footer";

import PageHero from "../components/ui/PageHero";

import PolicyGrid from "../components/policy/PolicyGrid";
import PolicyFlow from "../components/policy/PolicyFlow";
import PolicyLegal from "../components/policy/PolicyLegal";
import PolicyContact from "../components/policy/PolicyContact";

import policyHero from "../assets/about-hero.jpg";

const PolicyPage = () => {
  return (
    <div className="bg-[#F5F5F5] min-h-screen overflow-hidden">
      <Navbar />

      <PageHero
        badge="NationAura Policies"

        title="
          Secure, Transparent &
          Responsible Civic Reporting
        "

        description="
          NationAura is committed to secure
          infrastructure reporting, civic transparency,
          and responsible community participation
          across Nigeria.
        "

        image={policyHero}
      />

      <PolicyGrid />

      <PolicyFlow />

      <PolicyLegal />

      <PolicyContact />

      <Footer />
    </div>
  );
};

export default PolicyPage;