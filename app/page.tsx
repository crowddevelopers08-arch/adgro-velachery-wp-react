
import Creative from "@/components/creative";
import BeforeAfterSliderdrag from "@/components/drag";
import FAQ from "@/components/faq";
import ContactFooterReplica from "@/components/footer";
import AdvertisementBanner from "@/components/hairtrans";
import GrohairTopBar from "@/components/header";
import AdGloHeroReplica from "@/components/hero-section";
import GloskinHighlightSection from "@/components/logoslider";
import HairTreatmentsGrid from "@/components/results-section";
import TestimonialCard from "@/components/review";
import HairConsultationCardExact from "@/components/skinpopup";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* <RedTopAnnouncementBar /> */}
      <GrohairTopBar />

      <section id="hero">
        <AdGloHeroReplica />
      </section>
    <HairTreatmentsGrid />
   <Creative />

      <HairConsultationCardExact />
    
      {/* <section id="why">
        <ImageCarouselGrid />
      </section> */}

    <AdvertisementBanner />
    <TestimonialCard />
      <GloskinHighlightSection />

<BeforeAfterSliderdrag />
      <section id="faq">
        <FAQ />
      </section>

        {/* <AppointmentFormnew /> */}

      <ContactFooterReplica />
    </main>
  );
}
