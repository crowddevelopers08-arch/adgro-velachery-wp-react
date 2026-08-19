'use client';

import { useEffect, useState, type FormEvent } from 'react';
import styles from './sales.module.css';
import { SALES_CONTACT, SALES_FORM_NAME } from './constants';

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
  const [submitted, setSubmitted] = useState(false);

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
      setSubmitted(true);
    } catch {
      // Network hiccup — leave the popup open so the visitor can retry or just call.
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={`${styles.popupOverlay} ${open ? styles.popupOverlayVisible : ''}`} onClick={dismiss}>
      <div className={styles.popupCard} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.popupClose} onClick={dismiss} aria-label="Close">
          <svg className={styles.icon}>
            <use href="#sales-i-close" />
          </svg>
        </button>

        {!submitted ? (
          <>
            <div className={styles.popupEyebrow}>
              <svg className={styles.icon}>
                <use href="#sales-i-phone" />
              </svg>
              <span>Get a Call Back</span>
            </div>
            <h3>Don&rsquo;t want to fill a long form?</h3>
            <p>Leave your number — our Velachery specialist calls you back within 24 hours.</p>
            <form onSubmit={onSubmit}>
              <div className={styles.popupRow}>
                <div className={styles.field}>
                  <input
                    type="text"
                    placeholder="Your name"
                    aria-label="Your name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    aria-label="Phone number"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`}
                style={{ marginTop: 4 }}
              >
                {submitting ? 'Sending…' : 'Request a Call Back'}
              </button>
              <div className={styles.formOr}>or</div>
              <a href={`tel:${SALES_CONTACT.phoneTel}`} className={styles.formCallBtn}>
                <svg className={styles.icon}>
                  <use href="#sales-i-phone" />
                </svg>
                Call {SALES_CONTACT.phoneDisplay}
              </a>
            </form>
          </>
        ) : (
          <div className={`${styles.formSuccess} ${styles.formSuccessVisible}`}>
            <svg className={styles.icon}>
              <use href="#sales-i-check" />
            </svg>
            <h4>Got it — thank you!</h4>
            <p>We&rsquo;ll call {name.split(' ')[0]} back within 24 hours.</p>
          </div>
        )}
      </div>
    </div>
  );
}
