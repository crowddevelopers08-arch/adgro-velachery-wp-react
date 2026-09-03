'use client';

import { useEffect, useState } from 'react';
import { SALES_CONTACT } from './constants';
import { container, icon } from './classnames';

const NAV_LINKS = [
  { href: '#top', label: 'Overview' },
  { href: '#why-trust-us', label: 'Why Trust Us' },
  { href: '#results', label: 'Results' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#faq', label: 'FAQs' },
  { href: '#locate', label: 'Locate Us' },
];

export default function SalesHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#top');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // "#top" maps to the full-page <main> wrapper, not a real section — skip it
    // so it doesn't dominate the "which section is closest to the top" comparison.
    const sections = NAV_LINKS.filter((l) => l.href !== '#top')
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const topMost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
          setActive(`#${topMost.target.id}`);
        }
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-[60] bg-white/[0.88] backdrop-blur-[10px] border-b border-[#E8E8E8] transition-shadow duration-200 ${
        scrolled ? 'shadow-[0_4px_20px_-10px_rgba(0,0,0,0.2)]' : ''
      }`}
    >
      <style>{`
        @keyframes salesPulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(220,38,38,.45); }
          50% { box-shadow: 0 0 0 8px rgba(220,38,38,0); }
        }
        .sales-call-chip { animation: salesPulseGlow 2.4s ease-in-out infinite; }
      `}</style>

      <div className={`${container} flex items-center gap-4 py-3`}>
        <a href="#top" className="flex items-center gap-2.5 no-underline shrink-0">
          <img src="/ambatur-logo.jpg" alt="Advanced GroHair Velachery logo" className="h-10 w-auto" />
        </a>

        {/* Pill-tab nav — inline with logo + call button on wide screens */}
        <nav
          className="hidden min-[1100px]:flex items-center justify-center gap-2 flex-1 overflow-x-auto"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`shrink-0 no-underline text-[13.5px] font-semibold px-4 py-2 rounded-full border-[1.5px] transition-colors duration-150 ${
                  isActive
                    ? 'bg-[#DC2626] border-[#DC2626] text-white'
                    : 'bg-white border-[#E8E8E8] text-[#1A1A1A] hover:border-[#DC2626]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5 ml-auto shrink-0">
          <a
            href={`tel:${SALES_CONTACT.phoneTel}`}
            className="sales-call-chip flex items-center gap-2 px-4 py-2.5 rounded-full border-[1.5px] border-[#DC2626] bg-[#DC2626] no-underline text-white font-bold text-sm"
          >
            <svg className={`${icon} w-4 h-4`}>
              <use href="#sales-i-phone" />
            </svg>
            <span>Call {SALES_CONTACT.phoneDisplay}</span>
          </a>
          <button
            type="button"
            className="min-[1100px]:hidden inline-flex border-[1.5px] border-[#111111] bg-transparent rounded-full p-[9px] text-[#111111]"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <svg className={`${icon} w-5 h-5`}>
              <use href={open ? '#sales-i-close' : '#sales-i-menu'} />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`min-[1100px]:hidden ${open ? 'flex' : 'hidden'} flex-col gap-0.5 bg-white border-b border-[#E8E8E8] px-5 sm:px-8 pt-2.5 pb-[18px]`}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="py-3 px-1 no-underline text-[#1A1A1A] font-medium border-b border-[#E8E8E8]"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#lead-form"
          onClick={() => setOpen(false)}
          className="py-3 px-1 no-underline text-[#1A1A1A] font-medium border-b border-[#E8E8E8]"
        >
          Book Free Consultation
        </a>
      </div>
    </header>
  );
}
