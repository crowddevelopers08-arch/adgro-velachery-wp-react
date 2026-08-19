import styles from './sales.module.css';

const CHECKS = [
  'Board-certified doctors & trichologists',
  'FDA-approved equipment, every clinic',
  'No-cost EMI — transparent pricing',
  '24/7 patient support line',
  '2,000+ documented transformations',
  '60+ clinics across India',
];

export default function WhyTrustUs() {
  return (
    <section className={`${styles.sectionTight} ${styles.sectionCanvas}`} id="why-trust-us">
      <div className={`${styles.container} ${styles.whyGrid}`}>
        <div className={styles.whyCopy}>
          <span className={styles.eyebrow}>Why Chennai Chooses Us</span>
          <h2 className={styles.h2}>
            Not Just a Hair Clinic — a Team Accountable to Your Results
          </h2>
          <p>
            There&rsquo;s no shortage of hair clinics in Chennai. What actually sets Advanced
            GroHair Velachery apart is simple: we&rsquo;re measured by your outcome, not by how
            many sessions we can sell you.
          </p>
          <p>
            Across 60+ clinics and 2,000+ documented transformations nationwide, our Velachery
            team holds the same standard everywhere — board-certified doctors, FDA-approved
            equipment, transparent no-cost EMI, and a support line that&rsquo;s open 24 hours a
            day, because hair loss doesn&rsquo;t keep business hours.
          </p>
          <ul className={styles.checkList}>
            {CHECKS.map((c) => (
              <li key={c}>
                <svg className={styles.icon}>
                  <use href="#sales-i-check" />
                </svg>
                {c}
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 28 }}>
            <a href="#lead-form" className={`${styles.btn} ${styles.btnOutline}`}>
              Book Free Consultation →
            </a>
          </div>
        </div>
        <div className={styles.whyMedia}>
          <img
            src="/hair-loss-treatment.jpg"
            alt="Advanced GroHair specialist team"
          />
        </div>
      </div>
    </section>
  );
}
