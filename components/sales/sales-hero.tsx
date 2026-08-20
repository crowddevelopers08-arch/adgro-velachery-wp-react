'use client';

import { useState, type FormEvent } from 'react';
import { SALES_CONTACT, SALES_FORM_NAME } from './constants';
import {
  containerFull,
  icon,
  btnBase,
  btnPrimary,
  btnBlock,
  fieldLabel,
  fieldInput,
} from './classnames';

const CONCERNS = [
  'Hair Loss',
  'Alopecia Areata',
  'Dandruff',
  'Baldness',
  'Hair Thinning',
  'Receding Hairline',
  'Genetic Hair Loss',
];

export default function SalesHero() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [concern, setConcern] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !concern) return;
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/sales-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          procedure: concern,
          consent: true,
          source: 'Adgro Hair Velachery Sales Page — Hero Form',
          formName: SALES_FORM_NAME,
          pageUrl: window.location.href,
          userAgent: window.navigator.userAgent,
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please call us directly instead.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="relative max-[470px]:pt-6 overflow-hidden bg-gradient-to-b from-white to-[#FAFAFA] pt-[clamp(60px,2.5vw,28px)] pb-[clamp(28px,4.5vw,56px)]" id="sales-hero">
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 w-[560px] h-[560px] rounded-full pointer-events-none blur-[10px] bg-[radial-gradient(circle,rgba(220,38,38,.16)_0%,rgba(220,38,38,.10)_55%,transparent_75%)]"
      />

      <div
        className={`${containerFull} relative z-10 grid gap-10 grid-cols-1 items-start min-[1000px]:grid-cols-[1fr_.95fr] min-[1000px]:gap-10 min-[1400px]:grid-cols-[.95fr_1fr_.85fr] min-[1400px]:gap-8`}
      >
        <div>
          <nav className="flex flex-wrap items-center gap-2 text-[13px] text-[#6B6B6B] mb-4" aria-label="Breadcrumb">
            <a href="/" className="no-underline text-[#6B6B6B] hover:text-[#DC2626]">
              Home
            </a>
            <span aria-hidden="true" className="text-[#DC2626]">
              &gt;
            </span>
            <span className="text-[#1A1A1A] font-semibold">Velachery, Chennai</span>
          </nav>

          <h1 className="text-[#111111] text-[clamp(26px,3.6vw,38px)] leading-[1.12] max-w-[560px] font-extrabold tracking-[-0.01em]">
            Chennai&rsquo;s Most <em className="not-italic font-extrabold text-[#DC2626]">Trusted</em> Name in Hair
            Restoration
          </h1>

          <div className="flex items-center gap-2.5 mt-4">
            <span className="text-[#DC2626] font-bold text-[15px]">4.9 Average Rating</span>
            <div className="flex gap-0.5">
              {[0, 1, 2, 3].map((i) => (
                <svg key={i} className="w-5 h-5 fill-current stroke-none text-[#F5B400]">
                  <use href="#sales-i-star" />
                </svg>
              ))}
              <span className="relative inline-block w-5 h-5">
                <svg className="absolute inset-0 w-5 h-5 fill-current stroke-none text-[#E8E8E8]">
                  <use href="#sales-i-star" />
                </svg>
                <span className="absolute inset-0 overflow-hidden" style={{ width: '98%' }}>
                  <svg className="w-5 h-5 fill-current stroke-none text-[#F5B400]">
                    <use href="#sales-i-star" />
                  </svg>
                </span>
              </span>
            </div>
          </div>

          <p className="text-[#6B6B6B] text-[15px] max-w-[480px] mt-4 leading-[1.5]">
            60+ clinics nationwide. 2,000+ documented transformations. Board-certified doctors and FDA-approved
            technology — all under one roof in Velachery.
          </p>

          <div className="flex items-start gap-2 mt-5 text-[13px] text-[#6B6B6B]">
            <svg className={`${icon} w-4 h-4 text-[#2B2B2B] shrink-0 mt-0.5`}>
              <use href="#sales-i-pin" />
            </svg>
            <span>{SALES_CONTACT.addressShort}</span>
          </div>
          <a
            href={SALES_CONTACT.mapsQuery}
            target="_blank"
            rel="noopener"
            className="inline-block text-[#DC2626] font-semibold underline mt-2 ml-6"
          >
            Get Directions
          </a>

          <div className="flex flex-wrap gap-3 mt-7">
            <a
              href={`tel:${SALES_CONTACT.phoneTel}`}
              className={`${btnBase} bg-[#111111] text-white border-[#111111] hover:bg-black text-sm px-5 py-2.5`}
            >
              <svg className={icon}>
                <use href="#sales-i-phone" />
              </svg>
              Call Now {SALES_CONTACT.phoneDisplay}
            </a>
            <a href="#hero-form" className={`${btnBase} ${btnPrimary} text-sm px-5 py-2.5`}>
              <svg className={icon}>
                <use href="#sales-i-calendar" />
              </svg>
              Book Free Consultation
            </a>
          </div>
        </div>

        <div className="bg-white text-[#1A1A1A] rounded-3xl p-[clamp(20px,2.5vw,28px)] shadow-[0_24px_48px_-20px_rgba(0,0,0,0.22)] border border-[#E8E8E8] max-w-[540px] mx-auto w-full" id="hero-form">
          {!submitted ? (
            <form onSubmit={onSubmit}>
              <div className="mb-3.5">
                <h3 className="text-[20px] font-extrabold text-[#111111]">Get Your Free Hair Analysis</h3>
                <p className="text-[#6B6B6B] text-[13.5px] mt-1">
                  No cost. No commitment. Our specialist calls you back within 24 hours.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="mb-2.5">
                  <label htmlFor="qf-name" className={fieldLabel}>
                    Full name
                  </label>
                  <input
                    id="qf-name"
                    type="text"
                    placeholder="Your name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={fieldInput}
                  />
                </div>
                <div className="mb-2.5">
                  <label htmlFor="qf-phone" className={fieldLabel}>
                    Phone number
                  </label>
                  <input
                    id="qf-phone"
                    type="tel"
                    placeholder="+91 "
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={fieldInput}
                  />
                </div>
              </div>

              <div className="mb-2.5">
                <label htmlFor="qf-concern" className={fieldLabel}>
                  Your concern
                </label>
                <select
                  id="qf-concern"
                  required
                  value={concern}
                  onChange={(e) => setConcern(e.target.value)}
                  className={fieldInput}
                >
                  <option value="" disabled>
                    Select your concern
                  </option>
                  {CONCERNS.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`${btnBase} ${btnPrimary} ${btnBlock}`}
              >
                {submitting ? 'Sending…' : 'Get My Free Consultation'}
              </button>
              {error && <p className="text-[13px] text-[#B3261E] mt-2">{error}</p>}

              <div className="flex items-center gap-2.5 my-3 text-xs text-[#6B6B6B] tracking-[0.08em] uppercase">
                <span className="flex-1 h-px bg-[#E8E8E8]" />
                or
                <span className="flex-1 h-px bg-[#E8E8E8]" />
              </div>

              <a
                href={`tel:${SALES_CONTACT.phoneTel}`}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full border-[1.5px] border-[#111111] text-[#111111] no-underline font-bold text-[15px]"
              >
                <svg className={`${icon} w-[17px] h-[17px]`}>
                  <use href="#sales-i-phone" />
                </svg>
                Call {SALES_CONTACT.phoneDisplay}
              </a>

              <p className="flex items-center gap-2 text-[12.5px] text-[#6B6B6B] mt-2.5">
                <svg className={`${icon} w-3.5 h-3.5 text-[#DC2626]`}>
                  <use href="#sales-i-shield" />
                </svg>
                Your information stays private and is never shared.
              </p>
            </form>
          ) : (
            <div className="text-center px-2 py-5">
              <svg className={`${icon} w-10 h-10 text-[#DC2626] mx-auto mb-2.5`}>
                <use href="#sales-i-check" />
              </svg>
              <h4 className="text-lg font-extrabold text-[#111111] mb-1.5">Thank you — we&rsquo;ve got it.</h4>
              <p className="text-[#6B6B6B] text-sm">
                A specialist from our Velachery center will call you back within 24 hours. In a hurry?{' '}
                <a href={`tel:${SALES_CONTACT.phoneTel}`} className="text-[#DC2626] font-semibold">
                  Call {SALES_CONTACT.phoneDisplay} now
                </a>
                .
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <img
              src="/n1.jpg"
              alt="Real patient before and after result at Advanced GroHair Velachery"
              className="w-full h-full aspect-square object-cover rounded-2xl border border-[#E8E8E8] shadow-[0_8px_20px_-12px_rgba(0,0,0,0.18)]"
            />
            <img
              src="/n2.jpg"
              alt="Real patient before and after hair transplant result at Advanced GroHair Velachery"
              className="w-full h-full aspect-square object-cover rounded-2xl border border-[#E8E8E8] shadow-[0_8px_20px_-12px_rgba(0,0,0,0.18)]"
            />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-[0_8px_20px_-12px_rgba(0,0,0,0.18)] border border-[#E8E8E8] min-h-[320px] min-[1400px]:min-h-[280px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d15546.07212338405!2d80.1540219!3d13.06632165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3a525dc933691317%3A0xa1bc4b988911d47d!2sAdvanced%20GroHair%20%26%20GloSkin%20-%20Velachery%2C%20Second%20Floor%20Block%20No.20%2C%20Sankaran%20Avenue%2C%20Plot%20No.31%2C%20Pandian%20St%2C%20Indira%20Gandhi%20Nagar%2C%20Velachery%2C%20Chennai%2C%20Tamil%20Nadu%20600042!3m2!1d12.990296299999999!2d80.2187733!5e0!3m2!1sen!2sin!4v1771316656827!5m2!1sen!2sin"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Advanced GroHair Velachery location map"
              className="w-full h-full min-h-[320px] min-[1400px]:min-h-[280px] border-0 block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
