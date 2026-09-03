'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { SALES_CONTACT, SALES_FORM_NAME } from './constants';
import { icon, btnBase, btnPrimary, btnBlock, fieldInput } from './classnames';

const DISMISS_KEY = 'sales-callback-popup-dismissed';
const DELAY_MS = 12000;

/**
 * Delayed "Get a Call Back" popup — mirrors the callback-popup pattern used on
 * Clove Dental's location pages. Shows once per session, closable, and doesn't
 * reappear once dismissed or submitted.
 */
export default function CallbackPopup() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY)) return;
    const timer = setTimeout(() => setOpen(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setOpen(false);
    sessionStorage.setItem(DISMISS_KEY, '1');
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitting(true);

    try {
      await fetch('/api/sales-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          consent: true,
          source: 'Adgro Hair Velachery Sales Page — Callback Popup',
          formName: SALES_FORM_NAME,
          pageUrl: window.location.href,
          userAgent: window.navigator.userAgent,
        }),
      });
      sessionStorage.setItem(DISMISS_KEY, '1');
      window.location.href = '/sales/thank-you';
    } catch {
      // Network hiccup — leave the popup open so the visitor can retry or just call.
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className={`fixed inset-0 z-[90] bg-black/55 flex items-end justify-center sm:items-center p-0 sm:p-5 transition-opacity duration-[250ms] ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={dismiss}
    >
      <div
        className={`relative w-full max-w-[420px] bg-white rounded-t-3xl sm:rounded-3xl px-6 pt-7 pb-6 shadow-[0_24px_48px_-20px_rgba(0,0,0,0.22)] transition-transform duration-[250ms] ${
          open ? 'translate-y-0' : 'translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-3.5 right-3.5 w-[30px] h-[30px] rounded-full border border-[#E8E8E8] bg-white flex items-center justify-center text-[#6B6B6B]"
          onClick={dismiss}
          aria-label="Close"
        >
          <svg className={`${icon} w-[15px] h-[15px]`}>
            <use href="#sales-i-close" />
          </svg>
        </button>

        <div className="flex items-center gap-2 mb-1.5">
              <svg className={`${icon} w-[18px] h-[18px] text-[#2B2B2B]`}>
                <use href="#sales-i-phone" />
              </svg>
              <span className="text-[11.5px] tracking-[0.1em] uppercase text-[#2B2B2B] font-semibold">
                Get a Call Back
              </span>
            </div>
            <h3 className="text-xl mb-1.5 font-extrabold text-[#111111]">Don&rsquo;t want to fill a long form?</h3>
            <p className="text-[#6B6B6B] text-sm mb-[18px]">
              Leave your number — our Velachery specialist calls you back within 24 hours.
            </p>
            <form onSubmit={onSubmit}>
              <div className="flex gap-2.5">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Your name"
                    aria-label="Your name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={fieldInput}
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="tel"
                    placeholder="Phone number"
                    aria-label="Phone number"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={fieldInput}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className={`${btnBase} ${btnPrimary} ${btnBlock} mt-1`}
              >
                {submitting ? 'Sending…' : 'Request a Call Back'}
              </button>

              <div className="flex items-center gap-2.5 my-4 text-xs text-[#6B6B6B] tracking-[0.08em] uppercase">
                <span className="flex-1 h-px bg-[#E8E8E8]" />
                or
                <span className="flex-1 h-px bg-[#E8E8E8]" />
              </div>

              <a
                href={`tel:${SALES_CONTACT.phoneTel}`}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full border-[1.5px] border-[#111111] text-[#111111] no-underline font-bold text-[15.5px]"
              >
                <svg className={icon}>
                  <use href="#sales-i-phone" />
                </svg>
                Call {SALES_CONTACT.phoneDisplay}
              </a>
            </form>
      </div>
    </div>
  );
}
