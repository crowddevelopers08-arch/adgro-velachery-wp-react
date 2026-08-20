import type { Metadata } from 'next';
import { plusJakartaSans } from '@/components/sales/fonts';
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

export const metadata: Metadata = {
  title: "Advanced GroHair Velachery | Chennai's Trusted Hair Restoration Clinic",
  description:
    'Board-certified doctors, FDA-approved technology and 2,000+ successful transformations across 60+ clinics in India. Book a free hair consultation at our Velachery, Chennai center.',
  openGraph: {
    title: "Advanced GroHair Velachery | Chennai's Trusted Hair Restoration Clinic",
    description:
      'Board-certified doctors, FDA-approved technology and 2,000+ documented transformations. Free consultation at our Velachery, Chennai center.',
    type: 'website',
  },
};

export default function SalesPage() {
  return (
    <div className={`${plusJakartaSans.className} bg-[#FAFAFA] text-[#1A1A1A] antialiased leading-relaxed [&_*]:box-border`}>
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
