
import BannerCtaSection from "@/components/banner-cta-section";
import TrustSection from "@/components/trust-section";
import LocationSection from "@/components/location-section";
import Creative from "@/components/creative";
import DermatologistSection from "@/components/dermatologist-section";
import OurTreatmentsSection from "@/components/our-treatments-section";
import BeforeAfterSliderdrag from "@/components/drag";
import FAQ from "@/components/faq";
import ContactFooterReplica from "@/components/footer";
import AdvertisementBanner from "@/components/hairtrans";
import GrohairTopBar from "@/components/header";
import AdGloHeroReplica from "@/components/hero-section";
import InstagramVideosSection from "@/components/instagram-videos-section";
import GloskinHighlightSection from "@/components/logoslider";
import PromoHeroSlider from "@/components/promo-hero-slider";
import HairTreatmentsGrid from "@/components/results-section";
import TestimonialCard from "@/components/review";
import HairConsultationCardExact from "@/components/skinpopup";
import WhyChooseSection from "@/components/why-choose-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* <RedTopAnnouncementBar /> */}
      <GrohairTopBar />

      <section id="hero">
<<<<<<< HEAD
        <BannerCtaSection />
=======
        <PromoHeroSlider />
      </section>
      <section id="hero-details">
        <AdGloHeroReplica />
>>>>>>> a32c72f20dd5fc7921db35bba6716cdba03670ee
      </section>
    {/* <HairTreatmentsGrid /> */}
    <WhyChooseSection />
   <DermatologistSection />
   {/* <OurTreatmentsSection /> */}
   <TrustSection />
   <LocationSection />

      {/* <HairConsultationCardExact /> */}
    
      {/* <section id="why">
        <ImageCarouselGrid />
      </section> */}

    <AdvertisementBanner />
    <TestimonialCard />
<<<<<<< HEAD
      {/* <GloskinHighlightSection /> */}
=======
    <InstagramVideosSection />
      <GloskinHighlightSection />
>>>>>>> a32c72f20dd5fc7921db35bba6716cdba03670ee

<BeforeAfterSliderdrag />
      <section id="faq">
        <FAQ />
      </section>

        {/* <AppointmentFormnew /> */}

      <ContactFooterReplica />
    </main>
  );
}
