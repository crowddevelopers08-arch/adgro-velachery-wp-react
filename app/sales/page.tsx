import IconSprite from '@/components/sales/icon-sprite';
import SmoothScroll from '@/components/sales/smooth-scroll';
import SalesHeader from '@/components/sales/sales-header';
import SalesHero from '@/components/sales/sales-hero';
import TrustSeals from '@/components/sales/trust-seals';
import ConditionsGrid from '@/components/sales/conditions-grid';
import CallBanner from '@/components/sales/call-banner';
import WhyTrustUs from '@/components/sales/why-trust-us';
import LocationSection from '@/components/sales/location-section';
import ResultsGallery from '@/components/sales/results-gallery';
import TestimonialsSection from '@/components/sales/testimonials-section';
import ProcessSteps from '@/components/sales/process-steps';
import LeadFormDetailed from '@/components/sales/lead-form-detailed';
import FaqSection from '@/components/sales/faq-section';
import FinalCta from '@/components/sales/final-cta';
import SalesFooter from '@/components/sales/sales-footer';
import StickyCallBar from '@/components/sales/sticky-call-bar';
import CallbackPopup from '@/components/sales/callback-popup';

export default function SalesPage() {
  return (
    <div className="bg-[#FAFAFA] leading-relaxed [&_*]:box-border">
      <IconSprite />
      <SmoothScroll />
      <SalesHeader />

      <main id="top">
        <SalesHero />
        <TrustSeals />
        <ConditionsGrid />
        <WhyTrustUs />
        
        <ResultsGallery />
        <TestimonialsSection />
        <ProcessSteps />
        <CallBanner
          heading="Ready to start your hair recovery?"
          copy="Skip the form — speak to a Velachery specialist right now."
        />
        <LeadFormDetailed />
        <FaqSection />
        <LocationSection />
        <FinalCta />
      </main>

      <SalesFooter />
      <StickyCallBar />
      <CallbackPopup />
    </div>
  );
}
