'use client';

import { useState, type FormEvent } from 'react';
import styles from './sales.module.css';
import { SALES_CONTACT, SALES_FORM_NAME } from './constants';

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
    <section className={`${styles.section} ${styles.sectionPaper}`} id="lead-form">
      <div className={styles.container}>
        <div style={{ textAlign: 'center', maxWidth: 640, marginInline: 'auto', marginBottom: 36 }}>
          <span className={styles.eyebrow} style={{ justifyContent: 'center' }}>
            Free Hair Analysis
          </span>
          <h2 className={styles.h2}>Tell Us Your Concern — We&rsquo;ll Call You Back Within 24 Hours</h2>
          <p className={styles.lede} style={{ marginInline: 'auto' }}>
            No commitment. No cost. Just an honest assessment from a specialist at our Velachery
            center.
          </p>
        </div>

        <div className={styles.leadFormCard} style={{ maxWidth: 900, marginInline: 'auto' }}>
          {!submitted ? (
            <form onSubmit={onSubmit}>
              <div className={styles.formGrid}>
                <div>
                  <div className={styles.field}>
                    <label htmlFor="lf-concern">What are your concerns?</label>
                    <select
                      id="lf-concern"
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

                  <div className={styles.field}>
                    <label>Select your hair loss stage</label>
                    <div className={styles.stageSelect}>
                      {STAGES.map((s) => (
                        <label className={styles.stageOpt} key={s.value}>
                          <input
                            type="radio"
                            name="stage"
                            value={s.value}
                            checked={stage === s.value}
                            onChange={() => setStage(s.value)}
                          />
                          <figure className={stage === s.value ? styles.stageOptChecked : ''}>
                            <img src={s.src} alt={`Hair loss ${s.label}`} />
                          </figure>
                          <span>{s.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label>Are you able to visit our Velachery center?</label>
                    <div className={styles.radioRow}>
                      <div className={styles.radioPill}>
                        <input
                          type="radio"
                          id="visit-yes"
                          name="visit"
                          checked={visit === 'yes'}
                          onChange={() => setVisit('yes')}
                        />
                        <label
                          htmlFor="visit-yes"
                          className={`${styles.radioPillLabel} ${visit === 'yes' ? styles.radioPillLabelChecked : ''}`}
                        >
                          Yes
                        </label>
                      </div>
                      <div className={styles.radioPill}>
                        <input
                          type="radio"
                          id="visit-no"
                          name="visit"
                          checked={visit === 'no'}
                          onChange={() => setVisit('no')}
                        />
                        <label
                          htmlFor="visit-no"
                          className={`${styles.radioPillLabel} ${visit === 'no' ? styles.radioPillLabelChecked : ''}`}
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className={styles.twoCol}>
                    <div className={styles.field}>
                      <label htmlFor="lf-name">Full name</label>
                      <input
                        id="lf-name"
                        type="text"
                        placeholder="Your name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="lf-phone">Phone number</label>
                      <input
                        id="lf-phone"
                        type="tel"
                        placeholder="+91 "
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="lf-email">Email (optional)</label>
                    <input
                      id="lf-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock} ${styles.btnLg}`}
                    style={{ marginTop: 8 }}
                  >
                    {submitting ? 'Sending…' : 'Get My Free Consultation'}
                  </button>
                  {error && <p className={styles.formError}>{error}</p>}
                  <p className={styles.formNote}>
                    <svg className={styles.icon}>
                      <use href="#sales-i-clock" />
                    </svg>{' '}
                    We&rsquo;ll call you back within 24 hours — or call us now at{' '}
                    <a href={`tel:${SALES_CONTACT.phoneTel}`} style={{ fontWeight: 700, color: 'var(--brass-text)' }}>
                      {SALES_CONTACT.phoneDisplay}
                    </a>
                    .
                  </p>
                </div>
              </div>
            </form>
          ) : (
            <div className={`${styles.formSuccess} ${styles.formSuccessVisible}`}>
              <svg className={styles.icon}>
                <use href="#sales-i-check" />
              </svg>
              <h4>Thank you — your request is in.</h4>
              <p>
                A specialist from our Velachery center will call you back within 24 hours to walk
                through your free hair analysis. Need to speak now?{' '}
                <a href={`tel:${SALES_CONTACT.phoneTel}`} style={{ color: 'var(--brass-text)', fontWeight: 700 }}>
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
