import type { Metadata } from 'next';
import Script from 'next/script';
import { branding } from '@/components/chatbot/bot-config';
import { SALES_CONTACT } from '@/components/sales/constants';

export const metadata: Metadata = {
  title: 'Thank You | Advanced GroHair Velachery',
  description: 'Thanks for chatting with us. Our Velachery team will contact you shortly.',
  robots: { index: false, follow: false },
};

export default function ChatbotThankYouPage() {
  return (
    <>
      {/* Meta Pixel conversion. The pixel itself is loaded via GTM, which can arrive after
          this script runs, so wait for fbq (up to ~10s) and fire the event only once. */}
      <Script
        id="meta-submit-application"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              var tries = 0;
              (function track() {
                if (window.__chatbotSubmitTracked) return;
                if (typeof window.fbq === 'function') {
                  window.__chatbotSubmitTracked = true;
                  fbq('track', 'SubmitApplication');
                } else if (tries++ < 20) {
                  setTimeout(track, 500);
                }
              })();
            })();
          `,
        }}
      />

      {/* same flat colour fill as the chatbot page */}
      <div className="fixed inset-0 z-0 h-full w-full bg-[#fceaea]" />

      <div className="relative z-[2] flex min-h-dvh w-full items-center justify-center px-4 py-10">
        <div className="w-full max-w-[520px] rounded-3xl bg-white p-[clamp(28px,5vw,44px)] text-center shadow-lg">
          <img src={branding.logo} alt={`${branding.title} logo`} className="mx-auto mb-6 h-12 w-auto" />

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#fdf2f2]">
            <svg
              viewBox="0 0 24 24"
              className="h-8 w-8 text-[#dc2626]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>

          <h1 className="text-[clamp(22px,3vw,28px)] leading-[1.2] font-extrabold tracking-[-0.01em] text-[#180109]">
            Thank You for Chatting With Us
          </h1>
          <p className="mt-3 text-[15px] leading-[1.6] text-[#455a64]">
            We&rsquo;ve received your details. Our team at the Velachery clinic will contact you
            shortly to help you with your consultation.
          </p>

          <div className="my-6 flex items-center gap-2.5 text-xs tracking-[0.08em] text-[#6b6b6b] uppercase">
            <span className="h-px flex-1 bg-[#e8e8e8]" />
            In a hurry?
            <span className="h-px flex-1 bg-[#e8e8e8]" />
          </div>

          <a
            href={`tel:${SALES_CONTACT.phoneTel}`}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#dc2626] py-3.5 text-[15.5px] font-bold text-white no-underline transition-colors hover:bg-[#b91c1c]"
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
              <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
            </svg>
            Call {SALES_CONTACT.phoneDisplay} Now
          </a>

          <a
            href="/chatbot"
            className="mt-4 inline-block text-[13.5px] font-semibold text-[#6b6b6b] no-underline hover:text-[#dc2626]"
          >
            ← Back to the chat
          </a>
        </div>
      </div>
    </>
  );
}
