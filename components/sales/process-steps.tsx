import styles from './sales.module.css';

const STEPS = [
  {
    n: '01',
    title: 'Free Consultation & Scalp Analysis',
    copy: 'Sit with a specialist for an honest, no-cost diagnosis of your scalp and hair — no sales pitch, just an assessment.',
  },
  {
    n: '02',
    title: 'Your Personalised Plan',
    copy: 'We build a treatment plan around your hair loss stage, goals and budget. Every plan is different, because every patient is.',
  },
  {
    n: '03',
    title: 'Treatment by Certified Specialists',
    copy: 'Your treatment is carried out by board-certified doctors using FDA-approved equipment, in a clinical setting built for safety.',
  },
  {
    n: '04',
    title: 'Ongoing Follow-Up',
    copy: "The relationship doesn't end at the door. Our 24/7 support line and scheduled follow-ups track your progress after treatment.",
  },
];

export default function ProcessSteps() {
  return (
    <section className={`${styles.sectionTight} ${styles.sectionCanvas}`}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>How It Works</span>
        <h2 className={styles.h2}>Your Path to Fuller Hair, in Four Clear Steps</h2>
        <div className={styles.processGrid} style={{ marginTop: 36 }}>
          {STEPS.map((step, i) => (
            <div
              className={`${styles.processStep} ${i === STEPS.length - 1 ? styles.processStepLast : ''}`}
              key={step.n}
            >
              <span className={styles.processNum}>{step.n}</span>
              <div>
                <h4>{step.title}</h4>
                <p>{step.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
