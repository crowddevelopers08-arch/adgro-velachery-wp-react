import styles from './sales.module.css';
import Reveal from './reveal';

const CONDITIONS = [
  {
    title: 'Alopecia Areata',
    copy: 'Sudden, patchy hair loss usually has an identifiable trigger. We diagnose the cause first, then build a plan to get regrowth started.',
    path: <circle cx="12" cy="12" r="8" strokeDasharray="3 4" />,
  },
  {
    title: 'Receding Hairline',
    copy: "A hairline that's moving back doesn't have to keep moving. We restore hairlines designed to suit your face — not a generic template.",
    path: <path d="M4 15c4-6 12-6 16 0" />,
  },
  {
    title: 'Genetic Hair Loss',
    copy: "A family history of baldness isn't the end of the story. We target the underlying cause with clinically guided treatment, not guesswork.",
    path: (
      <>
        <path d="M6 4c4 3 8 3 12 8-4-3-8-3-12-8z" />
        <path d="M6 20c4-3 8-3 12-8-4 3-8 3-12 8z" />
      </>
    ),
  },
  {
    title: 'Hair Thinning',
    copy: "Thinning responds best to early treatment. The sooner it's diagnosed, the more options — and hair — you get to keep.",
    path: (
      <>
        <line x1="8" y1="6" x2="8" y2="18" />
        <line x1="12" y1="9" x2="12" y2="18" />
        <line x1="16" y1="12" x2="16" y2="18" />
      </>
    ),
  },
  {
    title: 'Baldness',
    copy: "Whether you're at an early stage or further along, we build a restoration path suited to where you actually are today.",
    path: <ellipse cx="12" cy="12" rx="7" ry="9" />,
  },
  {
    title: 'Dandruff & Scalp Issues',
    copy: 'Healthy hair starts at the scalp. We treat dandruff, seborrheic dermatitis and scalp inflammation at the source — not just the flakes.',
    path: (
      <>
        <circle cx="9" cy="9" r="1.6" />
        <circle cx="15" cy="8" r="1.2" />
        <circle cx="12" cy="14" r="1.4" />
        <circle cx="16" cy="16" r="1" />
      </>
    ),
  },
];

export default function ConditionsGrid() {
  return (
    <section className={`${styles.section} ${styles.sectionPaper}`} id="conditions">
      <div className={styles.container}>
        <div className={styles.headRow}>
          <div>
            <span className={styles.eyebrow}>We Diagnose Before We Treat</span>
            <h2 className={styles.h2}>
              Hair Fall Doesn&rsquo;t Wait — <br />
              Neither Should Your Answers
            </h2>
            <p className={styles.lede}>
              Whatever stage you&rsquo;re at — the first thin patch or years of gradual recession —
              the earlier it&rsquo;s diagnosed correctly, the more options you have. Our Velachery
              specialists start every case with a proper diagnosis, not a sales pitch.
            </p>
          </div>
        </div>
        <div className={styles.condGrid}>
          {CONDITIONS.map((cond, i) => (
            <Reveal key={cond.title} delay={i * 60}>
              <div className={styles.condCard}>
                <span className={styles.condCardIcon}>
                  <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    {cond.path}
                  </svg>
                </span>
                <h4>{cond.title}</h4>
                <p>{cond.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
