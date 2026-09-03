'use client';

import { useEffect, useState } from 'react';
import { SALES_CONTACT } from './constants';
import { icon } from './classnames';

const mobileBarLink =
  'flex flex-col items-center justify-center gap-[3px] pt-2.5 px-1 pb-3 text-[11.5px] font-semibold no-underline text-[#1A1A1A] border-r border-[#E8E8E8]';

/** Sticky mobile CTA bar + floating call/WhatsApp buttons — visible once the hero scrolls out of view. */
export default function StickyCallBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('sales-hero');
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes salesPulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(220,38,38,.45); }
          50% { box-shadow: 0 0 0 8px rgba(220,38,38,0); }
        }
        .sales-float-call { animation: salesPulseGlow 2.4s ease-in-out infinite; }
      `}</style>

      <div
        className={`fixed left-0 right-0 bottom-0 z-[70] grid grid-cols-[1.2fr_.9fr_.9fr_.9fr] bg-white border-t border-[#E8E8E8] shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.3)] transition-transform duration-[250ms] min-[900px]:hidden ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <a href={`tel:${SALES_CONTACT.phoneTel}`} className={`${mobileBarLink} bg-[#DC2626] !text-white`}>
          <svg className={`${icon} w-[19px] h-[19px]`}>
            <use href="#sales-i-phone" />
          </svg>
          Call Now
        </a>
        <a href={`https://wa.me/${SALES_CONTACT.phoneWa}`} target="_blank" rel="noopener" className={mobileBarLink}>
          <svg className={`${icon} w-[19px] h-[19px]`}>
            <use href="#sales-i-wa" />
          </svg>
          WhatsApp
        </a>
        <a href={SALES_CONTACT.mapsQuery} target="_blank" rel="noopener" className={mobileBarLink}>
          <svg className={`${icon} w-[19px] h-[19px]`}>
            <use href="#sales-i-pin" />
          </svg>
          Directions
        </a>
        <a href="#lead-form" className={`${mobileBarLink} border-r-0`}>
          <svg className={`${icon} w-[19px] h-[19px]`}>
            <use href="#sales-i-calendar" />
          </svg>
          Book Free
        </a>
      </div>

      <div className="fixed right-5 bottom-[88px] min-[900px]:bottom-7 z-[65] flex flex-col gap-3">
        <a
          href={`tel:${SALES_CONTACT.phoneTel}`}
          className="sales-float-call w-[52px] h-[52px] rounded-full text-white flex items-center justify-center shadow-[0_24px_48px_-20px_rgba(0,0,0,0.22)] no-underline bg-[#B91C1C]"
          aria-label="Call now"
        >
          <svg className={`${icon} w-6 h-6`}>
            <use href="#sales-i-phone" />
          </svg>
        </a>
        <a
          href={`https://wa.me/${SALES_CONTACT.phoneWa}`}
          target="_blank"
          rel="noopener"
          className="w-[52px] h-[52px] rounded-full text-white flex items-center justify-center shadow-[0_24px_48px_-20px_rgba(0,0,0,0.22)] no-underline bg-[#3FA271]"
          aria-label="Chat on WhatsApp"
        >
          <svg className={`${icon} w-6 h-6`}>
            <use href="#sales-i-wa" />
          </svg>
        </a>
      </div>
    </>
  );
}
