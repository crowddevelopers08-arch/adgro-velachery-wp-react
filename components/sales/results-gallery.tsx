import styles from './sales.module.css';
import Reveal from './reveal';

const RESULTS = [
  {
    src: '/Slide-1.png',
    alt: 'Before and after result — male pattern hair loss',
    tag: 'Male Pattern Hair Loss',
  },
  {
    src: '/Slide-2.png',
    alt: 'Before and after result — female hair thinning',
    tag: 'Female Hair Thinning',
  },
  {
    src: '/Slide-3.png',
    alt: 'Before and after result — traction alopecia',
    tag: 'Traction Alopecia',
  },
];

const TAGS = ['DHI Hair Transplant', 'GFC / Growth Therapy', 'Oxygen Laser Therapy', 'Cosmetic Hair Systems'];

export default function ResultsGallery() {
  return (
    <section className={`${styles.sectionTight} ${styles.sectionCanvas}`} id="results">
      <div className={styles.container}>
        <span className={styles.eyebrow}>See the Difference</span>
        <h2 className={styles.h2}>Patient Results From Our Velachery Center</h2>
        <p className={styles.lede}>
          Every case below started with a proper diagnosis, followed by a plan built for that
          patient&rsquo;s stage, goals and scalp condition — spanning hair transplant surgery,
          growth therapy, laser treatment and cosmetic hair systems.
        </p>
        <div className={styles.tagRow}>
          {TAGS.map((t) => (
            <span className={styles.tag} key={t}>
              {t}
            </span>
          ))}
        </div>
        <div className={styles.resultsGrid}>
          {RESULTS.map((r, i) => (
            <Reveal key={r.tag} delay={i * 80}>
              <div className={styles.resultCard}>
                <img src={r.src} alt={r.alt} />
                <div className={styles.resultCardCap}>
                  <span>Case Study</span>
                  <p>{r.tag}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className={styles.disclaimer}>
          <svg className={styles.icon}>
            <use href="#sales-i-shield" />
          </svg>
          <span>
            Results shown are of actual patients, published with consent. Individual results vary
            based on hair loss stage, scalp condition and treatment plan — your specialist will
            set realistic expectations at consultation.
          </span>
        </div>
      </div>
    </section>
  );
}
