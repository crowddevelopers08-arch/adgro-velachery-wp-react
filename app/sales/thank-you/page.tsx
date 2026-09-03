import type { Metadata } from 'next';
import Script from 'next/script';
import IconSprite from '@/components/sales/icon-sprite';
import { SALES_CONTACT } from '@/components/sales/constants';
import { icon } from '@/components/sales/classnames';

export const metadata: Metadata = {
  title: "Thank You | Advanced GroHair Velachery",
  description: 'Your request has been received. Our Velachery specialist will call you back within 24 hours.',
};

export default function SalesThankYouPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen flex items-center justify-center px-4 py-10">
      <IconSprite />

      <Script
        id="oaiq-lead-created"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if (window.oaiq) {
              oaiq("measure", "lead_created", { type: "customer_action" });
            }
          `,
        }}
      />

      <div className="w-full max-w-[520px] bg-white rounded-3xl border border-[#E8E8E8] shadow-[0_24px_48px_-20px_rgba(0,0,0,0.22)] p-[clamp(28px,5vw,44px)] text-center">
        <a href="/sales" className="inline-flex items-center gap-2.5 no-underline mb-6">
          <img src="/ambatur-logo.jpg" alt="Advanced GroHair Velachery logo" className="h-10 w-auto" />
        </a>

        <div className="w-16 h-16 rounded-full bg-[#FDF2F2] flex items-center justify-center mx-auto mb-5">
          <svg className={`${icon} w-8 h-8 text-[#DC2626]`}>
            <use href="#sales-i-check" />
          </svg>
        </div>

        <h1 className="text-[clamp(22px,3vw,28px)] font-extrabold text-[#111111] tracking-[-0.01em] leading-[1.2]">
          Thank You — We&rsquo;ve Got It
        </h1>
        <p className="text-[#6B6B6B] text-[15px] mt-3 leading-[1.6]">
          A specialist from our Velachery center will call you back within 24 hours to walk you
          through your free hair analysis.
        </p>

        <div className="flex items-center gap-2.5 my-6 text-xs text-[#6B6B6B] tracking-[0.08em] uppercase">
          <span className="flex-1 h-px bg-[#E8E8E8]" />
          In a hurry?
          <span className="flex-1 h-px bg-[#E8E8E8]" />
        </div>

        <a
          href={`tel:${SALES_CONTACT.phoneTel}`}
          className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 rounded-full bg-[#DC2626] text-white no-underline font-bold text-[15.5px] hover:bg-[#B91C1C] transition-colors"
        >
          <svg className={`${icon} w-[18px] h-[18px]`}>
            <use href="#sales-i-phone" />
          </svg>
          Call {SALES_CONTACT.phoneDisplay} Now
        </a>

        <a
          href="/sales"
          className="inline-block mt-4 text-[13.5px] font-semibold text-[#6B6B6B] hover:text-[#DC2626] no-underline"
        >
          ← Back to the page
        </a>
      </div>
    </div>
  );
}
