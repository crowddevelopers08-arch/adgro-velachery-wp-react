import styles from './sales.module.css';
import { SALES_CONTACT } from './constants';

export default function FinalCta() {
  return (
    <section className={`${styles.section} ${styles.sectionInk} ${styles.finalCta}`}>
      <div className={styles.container}>
        <h2 className={styles.h2}>Your Hair Story Doesn&rsquo;t Have to End Here</h2>
        <p className={styles.lede}>
          Book a free consultation with a hair restoration team Chennai trusts — or call us
          directly. We&rsquo;re ready when you are.
        </p>
        <div className={styles.heroCtas}>
          <a href={`tel:${SALES_CONTACT.phoneTel}`} className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}>
            <svg className={styles.icon}>
              <use href="#sales-i-phone" />
            </svg>
            Call {SALES_CONTACT.phoneDisplay}
          </a>
          <a href="#lead-form" className={`${styles.btn} ${styles.btnOnDark} ${styles.btnLg}`}>
            Book Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
