import styles from './sales.module.css';
import Reveal from './reveal';
import { SALES_CONTACT } from './constants';

const TREATMENTS = [
  {
    title: 'DHI Hair Transplant',
    copy: 'Direct hair implantation for natural density and a hairline designed around your face.',
    path: <path d="M12 3v18M6 8l6-5 6 5M6 16l6 5 6-5" />,
  },
  {
    title: 'GFC / Growth Therapy',
    copy: 'Growth Factor Concentrate therapy to strengthen existing hair and slow further loss.',
    path: <path d="M12 2v6m0 8v6M4.9 4.9l4.2 4.2m5.8 5.8 4.2 4.2M2 12h6m8 0h6M4.9 19.1l4.2-4.2m5.8-5.8 4.2-4.2" />,
  },
  {
    title: 'Oxygen Laser Therapy',
    copy: 'Low-level laser treatment that improves scalp circulation and supports regrowth.',
    path: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </>
    ),
  },
  {
    title: 'Cosmetic Hair Systems',
    copy: 'Non-surgical, immediate coverage for patients who want results without downtime.',
    path: <path d="M4 10c0-4 3.5-7 8-7s8 3 8 7-3 8-8 8-8-4-8-8z" />,
  },
];

export default function TreatmentsGrid() {
  return (
    <section className={`${styles.sectionTight} ${styles.sectionCanvas}`} id="treatments">
      <div className={styles.container}>
        <span className={styles.eyebrow}>What We Treat With</span>
        <h2 className={styles.h2}>Every Treatment Available Under One Roof</h2>
        <p className={styles.lede} style={{ marginBottom: 30 }}>
          Your specialist recommends the right combination after your free scalp analysis —
          exact pricing depends on your case, so we never quote a number without seeing you first.
        </p>
        <div className={styles.treatGrid}>
          {TREATMENTS.map((t, i) => (
            <Reveal key={t.title} delay={i * 60}>
              <div className={styles.treatCard}>
                <div className={styles.treatCardTop}>
                  <span className={styles.treatCardIcon}>
                    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      {t.path}
                    </svg>
                  </span>
                  <h4>{t.title}</h4>
                  <p>{t.copy}</p>
                </div>
                <div className={styles.treatCardFoot}>
                  <span>Pricing on consult</span>
                  <a href={`tel:${SALES_CONTACT.phoneTel}`}>
                    <svg className={styles.icon}>
                      <use href="#sales-i-phone" />
                    </svg>
                    Ask now
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
