'use client';

import { useState, type FormEvent } from 'react';
import { SALES_CONTACT, SALES_FORM_NAME } from './constants';
import {
  container,
  section,
  eyebrow,
  h2,
  lede,
  icon,
  btnBase,
  btnPrimary,
  btnBlock,
  btnLg,
  field,
  fieldLabel,
  fieldInput,
} from './classnames';

const CONCERNS = [
  'Hair Loss',
  'Alopecia Areata',
  'Dandruff',
  'Baldness',
  'Hair Thinning Treatment',
  'Receding Hair Solutions',
  'Genetic Hair Loss',
];

const STAGES = [
  { value: '1', label: 'Stage 1', src: '/st1.jpeg' },
  { value: '2', label: 'Stage 2', src: '/st2.jpeg' },
  { value: '3', label: 'Stage 3', src: '/st3.jpeg' },
  { value: '4', label: 'Stage 4', src: '/st4.jpeg' },
  { value: '5', label: 'Stage 5', src: '/st5.jpeg' },
];

export default function LeadFormDetailed() {
  const [concern, setConcern] = useState('');
  const [stage, setStage] = useState('1');
  const [visit, setVisit] = useState<'yes' | 'no'>('yes');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!concern || !name.trim() || !phone.trim()) return;
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/sales-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          procedure: concern,
          hairLossStage: `Stage ${stage}`,
          willingToVisit: visit === 'yes',
          consent: true,
          source: 'Adgro Hair Velachery Sales Page — Detailed Form',
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
    <section className={`${section} bg-[#FAFAFA]`} id="lead-form">
      <div className={container}>
        <div className="text-center max-w-[640px] mx-auto mb-9">
          <span className={`${eyebrow} justify-center`}>Free Hair Analysis</span>
          <h2 className={h2}>Tell Us Your Concern We&rsquo;ll Call You Back Within 24 Hours</h2>
          <p className={`${lede} mx-auto`}>
            No commitment. No cost. Just an honest assessment from a specialist at our Velachery
            center.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-[clamp(24px,4vw,44px)] shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] border border-[#E8E8E8] max-w-[1100px] mx-auto">
          {!submitted ? (
            <form onSubmit={onSubmit}>
              <div className="grid grid-cols-1 min-[960px]:grid-cols-2 gap-7 min-[960px]:gap-10">
                <div>
                  <div className={field}>
                    <label htmlFor="lf-concern" className={fieldLabel}>
                      What are your concerns?
                    </label>
                    <select
                      id="lf-concern"
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

                  <div className={field}>
                    <label className={fieldLabel}>Select your hair loss stage</label>
                    <div className="grid grid-cols-5 gap-2.5">
                      {STAGES.map((s) => (
                        <label className="cursor-pointer text-center relative block" key={s.value}>
                          <input
                            type="radio"
                            name="stage"
                            value={s.value}
                            checked={stage === s.value}
                            onChange={() => setStage(s.value)}
                            className="absolute opacity-0 w-px h-px"
                          />
                          <figure
                            className={`relative m-0 border-[1.5px] rounded-xl overflow-hidden transition-colors duration-150 ${
                              stage === s.value ? 'border-[#DC2626]' : 'border-[#E8E8E8] hover:border-[#F3B4B4]'
                            }`}
                          >
                            <img
                              src={s.src}
                              alt={`Hair loss ${s.label}`}
                              className="w-full aspect-square object-cover"
                            />
                            {stage === s.value && (
                              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#DC2626] text-white flex items-center justify-center">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </span>
                            )}
                          </figure>
                          <span className={`block text-[11.5px] mt-1.5 font-semibold ${stage === s.value ? 'text-[#DC2626]' : 'text-[#6B6B6B]'}`}>
                            {s.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className={field}>
                    <label className={fieldLabel}>Are you able to visit our Velachery center?</label>
                    <div className="flex gap-3">
                      <div className="flex-1 relative">
                        <input
                          type="radio"
                          id="visit-yes"
                          name="visit"
                          checked={visit === 'yes'}
                          onChange={() => setVisit('yes')}
                          className="absolute opacity-0 w-px h-px"
                        />
                        <label
                          htmlFor="visit-yes"
                          className={`block text-center p-3 border-[1.5px] rounded-full text-[14.5px] font-semibold cursor-pointer transition-colors duration-150 ${
                            visit === 'yes'
                              ? 'border-[#DC2626] bg-[#DC2626] text-white'
                              : 'border-[#E8E8E8] text-[#6B6B6B] bg-white hover:border-[#DC2626]'
                          }`}
                        >
                          Yes
                        </label>
                      </div>
                      <div className="flex-1 relative">
                        <input
                          type="radio"
                          id="visit-no"
                          name="visit"
                          checked={visit === 'no'}
                          onChange={() => setVisit('no')}
                          className="absolute opacity-0 w-px h-px"
                        />
                        <label
                          htmlFor="visit-no"
                          className={`block text-center p-3 border-[1.5px] rounded-full text-[14.5px] font-semibold cursor-pointer transition-colors duration-150 ${
                            visit === 'no'
                              ? 'border-[#DC2626] bg-[#DC2626] text-white'
                              : 'border-[#E8E8E8] text-[#6B6B6B] bg-white hover:border-[#DC2626]'
                          }`}
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className={field}>
                      <label htmlFor="lf-name" className={fieldLabel}>
                        Full name
                      </label>
                      <input
                        id="lf-name"
                        type="text"
                        placeholder="Your name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={fieldInput}
                      />
                    </div>
                    <div className={field}>
                      <label htmlFor="lf-phone" className={fieldLabel}>
                        Phone number
                      </label>
                      <input
                        id="lf-phone"
                        type="tel"
                        placeholder="+91 "
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={fieldInput}
                      />
                    </div>
                  </div>
                  <div className={field}>
                    <label htmlFor="lf-email" className={fieldLabel}>
                      Email (optional)
                    </label>
                    <input
                      id="lf-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={fieldInput}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`${btnBase} ${btnPrimary} ${btnBlock} ${btnLg} mt-2`}
                  >
                    {submitting ? 'Sending…' : 'Get My Free Consultation'}
                  </button>
                  {error && <p className="text-[13px] text-[#B3261E] mt-2.5">{error}</p>}
                  <p className="flex items-center gap-2 text-[12.5px] text-[#6B6B6B] mt-3.5">
                    <svg className={`${icon} w-3.5 h-3.5 text-[#DC2626] shrink-0`}>
                      <use href="#sales-i-clock" />
                    </svg>
                    We&rsquo;ll call you back within 24 hours.
                  </p>
                  <a
                    href={`tel:${SALES_CONTACT.phoneTel}`}
                    className="inline-block text-[12.5px] font-semibold text-[#DC2626] mt-1"
                  >
                    Or call us now — {SALES_CONTACT.phoneDisplay}
                  </a>
                </div>
              </div>
            </form>
          ) : (
            <div className="text-center px-2 py-5">
              <svg className={`${icon} w-10 h-10 text-[#DC2626] mx-auto mb-2.5`}>
                <use href="#sales-i-check" />
              </svg>
              <h4 className="text-lg font-extrabold text-[#111111] mb-1.5">Thank you — your request is in.</h4>
              <p className="text-[#6B6B6B] text-sm">
                A specialist from our Velachery center will call you back within 24 hours to walk
                through your free hair analysis. Need to speak now?{' '}
                <a href={`tel:${SALES_CONTACT.phoneTel}`} className="text-[#DC2626] font-bold">
                  Call {SALES_CONTACT.phoneDisplay}
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
