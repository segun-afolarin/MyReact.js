import Navbars from "../components/layout/Navbars";
import Footer from "../components/footer/Footer";

import PageHero from "../components/ui/PageHero";

import ContactForm from "../components/contact/ContactForm";
import ContactSupportCards from "../components/contact/ContactSupportCards";
import ContactTopics from "../components/contact/ContactTopics";
import ContactBottom from "../components/contact/ContactBottom";

import contactHero from "../assets/about-hero.jpg";

const ContactPage = () => {
  return (
    <div className="bg-[#F5F5F5] min-h-screen overflow-hidden">
      <Navbars />

      <PageHero
        badge="NationAura Support"
        title="
          Contact
          Support
        "
        description="
          We’re here to assist with platform support,
          infrastructure reporting, account issues,
          and technical guidance.
        "
        image={contactHero}
      />

      <section className="px-6 lg:px-12 py-20">
        <div
          className="
          max-w-7xl
          mx-auto
          grid
          grid-cols-1
          xl:grid-cols-[1.1fr_0.9fr]
          gap-8
          "
        >
          <ContactForm />

          <div className="space-y-8">
            <ContactSupportCards />

            <ContactTopics />
          </div>
        </div>
      </section>

      <ContactBottom />

      <Footer />
    </div>
  );
};

export default ContactPage;