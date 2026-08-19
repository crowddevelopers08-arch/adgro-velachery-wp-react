'use client';

import { useState, type FormEvent } from 'react';
import styles from './sales.module.css';
import { SALES_CONTACT, SALES_FORM_NAME } from './constants';

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
    <section className={styles.hero} id="sales-hero">
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Velachery, Chennai — Hair Restoration Center</span>
          <div className={styles.ratingBadge}>
            <div className={styles.stars}>
              {Array.from({ length: 5 }).map((_, i) => (
                <svg className={`${styles.icon} ${styles.iconFill}`} key={i}>
                  <use href="#sales-i-star" />
                </svg>
              ))}
            </div>
            <span>Rated 5★ by our Velachery patients</span>
          </div>
          <h1>
            Chennai&rsquo;s Most <em className={styles.em}>Trusted</em> Name in Hair Restoration
          </h1>
          <p className={styles.lede}>
            60+ clinics nationwide. 2,000+ documented transformations. Board-certified doctors and
            FDA-approved technology — all under one roof in Velachery.
          </p>
          <div className={styles.heroCtas}>
            <a href={`tel:${SALES_CONTACT.phoneTel}`} className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}>
              <svg className={styles.icon}>
                <use href="#sales-i-phone" />
              </svg>
              Call {SALES_CONTACT.phoneDisplay} Now
            </a>
            <a href="#hero-form" className={`${styles.btn} ${styles.btnOnDark} ${styles.btnLg}`}>
              Book Free Consultation
            </a>
          </div>
          <div className={styles.heroTrustline}>
            <span className={styles.item}>
              <svg className={styles.icon}>
                <use href="#sales-i-shield" />
              </svg>{' '}
              Board-certified doctors
            </span>
            <span className={styles.item}>
              <svg className={styles.icon}>
                <use href="#sales-i-check" />
              </svg>{' '}
              FDA-approved equipment
            </span>
            <span className={styles.item}>
              <svg className={styles.icon}>
                <use href="#sales-i-clock" />
              </svg>{' '}
              24/7 patient support
            </span>
          </div>
        </div>

        <div className={styles.formCard} id="hero-form">
          {!submitted ? (
            <form onSubmit={onSubmit}>
              <div className={styles.formCardHead}>
                <h3>Get Your Free Hair Analysis</h3>
                <p>No cost. No commitment. Our specialist calls you back within 24 hours.</p>
              </div>
              <div className={styles.field}>
                <label htmlFor="qf-name">Full name</label>
                <input
                  id="qf-name"
                  type="text"
                  placeholder="Your name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="qf-phone">Phone number</label>
                <input
                  id="qf-phone"
                  type="tel"
                  placeholder="+91 "
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="qf-concern">Your concern</label>
                <select
                  id="qf-concern"
                  required
                  value={concern}
                  onChange={(e) => setConcern(e.target.value)}
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
                className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock} ${styles.btnLg}`}
              >
                {submitting ? 'Sending…' : 'Get My Free Consultation'}
              </button>
              {error && <p className={styles.formError}>{error}</p>}
              <div className={styles.formOr}>or</div>
              <a href={`tel:${SALES_CONTACT.phoneTel}`} className={styles.formCallBtn}>
                <svg className={styles.icon}>
                  <use href="#sales-i-phone" />
                </svg>
                Call {SALES_CONTACT.phoneDisplay}
              </a>
              <p className={styles.formNote}>
                <svg className={styles.icon}>
                  <use href="#sales-i-shield" />
                </svg>{' '}
                Your information stays private and is never shared.
              </p>
            </form>
          ) : (
            <div className={`${styles.formSuccess} ${styles.formSuccessVisible}`}>
              <svg className={styles.icon}>
                <use href="#sales-i-check" />
              </svg>
              <h4>Thank you — we&rsquo;ve got it.</h4>
              <p>
                A specialist from our Velachery center will call you back within 24 hours. In a
                hurry?{' '}
                <a href={`tel:${SALES_CONTACT.phoneTel}`} style={{ color: 'var(--brass-text)', fontWeight: 600 }}>
                  Call {SALES_CONTACT.phoneDisplay} now
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
