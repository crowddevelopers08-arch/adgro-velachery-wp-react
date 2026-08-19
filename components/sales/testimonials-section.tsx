import styles from './sales.module.css';
import Reveal from './reveal';

const VIDEOS = [
  '/videos.mp4',
  '/videos1.mp4',
  '/videos2.mp4',
  '/videos3.mp4',
  '/videos4.mp4',
];

function Stars() {
  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg className={`${styles.icon} ${styles.iconFill}`} key={i}>
          <use href="#sales-i-star" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className={`${styles.section} ${styles.sectionPaper}`} id="reviews">
      <div className={styles.container}>
        <span className={styles.eyebrow}>In Their Own Words</span>
        <h2 className={styles.h2}>Hear From Patients Who Trusted Us With Their Hair</h2>
        <p className={styles.lede} style={{ marginBottom: 36 }}>
          Unscripted stories from real patients at our clinics — because hearing it from someone
          who&rsquo;s already been through it matters more than anything we can say.
        </p>

        <div className={styles.videoGrid}>
          {VIDEOS.map((src, i) => (
            <Reveal key={src} delay={i * 60}>
              <div className={styles.videoCard}>
                <video controls preload="metadata" src={src} />
              </div>
            </Reveal>
          ))}
        </div>

        <div className={styles.reviewGrid}>
          <Reveal>
            <div className={styles.reviewCard}>
              <Stars />
              <p>
                Results started showing by my second session. Four months on, my hair fall has
                slowed right down — and the doctor&rsquo;s follow-through made all the difference.
              </p>
              <div className={styles.reviewWho}>
                <img
                  src="/unnamed.png"
                  alt="Archana Pandian"
                />
                <div>
                  <strong>Archana Pandian</strong>
                  <span>Velachery Patient</span>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className={styles.reviewCard}>
              <Stars />
              <p>[Add another real, consented patient testimonial — specific results and timelines work best.]</p>
              <div className={styles.reviewWho}>
                <span className={styles.reviewWhoPh}>Photo</span>
                <div>
                  <strong>[Patient Name]</strong>
                  <span>[Locality], Chennai</span>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className={styles.reviewCard}>
              <Stars />
              <p>[Add a third real, consented patient testimonial here.]</p>
              <div className={styles.reviewWho}>
                <span className={styles.reviewWhoPh}>Photo</span>
                <div>
                  <strong>[Patient Name]</strong>
                  <span>[Locality], Chennai</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
