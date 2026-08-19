import styles from './sales.module.css';
import { SALES_CONTACT } from './constants';

export default function LocationSection() {
  return (
    <section className={`${styles.section} ${styles.sectionPaper}`} id="locate">
      <div className={`${styles.container} ${styles.locateGrid}`}>
        <div>
          <span className={styles.eyebrow}>Visit Us in Velachery</span>
          <h2 className={styles.h2}>One of South Chennai&rsquo;s Most Accessible Hair Clinics</h2>
          <p className={styles.lede}>
            Searching for a hair clinic near you in Velachery or South Chennai? Our center brings
            consultation, scalp diagnostics and complete treatment under one roof — with a team
            that stays in touch long after your visit.
          </p>

          <div className={styles.locateCard} style={{ marginTop: 28 }}>
            <div className={styles.locateRow}>
              <svg className={styles.icon}>
                <use href="#sales-i-pin" />
              </svg>
              <div>
                <strong>Advanced GroHair Velachery</strong>
                <span>{SALES_CONTACT.addressFull}</span>
              </div>
            </div>
            <div className={styles.locateRow}>
              <svg className={styles.icon}>
                <use href="#sales-i-phone" />
              </svg>
              <div>
                <strong>Call the clinic</strong>
                <span>{SALES_CONTACT.phoneDisplay}</span>
              </div>
            </div>
            <div className={`${styles.locateRow} ${styles.locateRowLast}`}>
              <svg className={styles.icon}>
                <use href="#sales-i-mail" />
              </svg>
              <div>
                <strong>Email</strong>
                <span>{SALES_CONTACT.email}</span>
              </div>
            </div>
            <div className={styles.locateCtas}>
              <a href={SALES_CONTACT.mapsQuery} target="_blank" rel="noopener" className={`${styles.btn} ${styles.btnOutline}`}>
                Get Directions
              </a>
              <a href={`tel:${SALES_CONTACT.phoneTel}`} className={`${styles.btn} ${styles.btnPrimary}`}>
                <svg className={styles.icon}>
                  <use href="#sales-i-phone" />
                </svg>
                Call Now
              </a>
            </div>
          </div>
        </div>

        <div className={styles.mapFrame}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d15546.07212338405!2d80.1540219!3d13.06632165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3a525dc933691317%3A0xa1bc4b988911d47d!2sAdvanced%20GroHair%20%26%20GloSkin%20-%20Velachery%2C%20Second%20Floor%20Block%20No.20%2C%20Sankaran%20Avenue%2C%20Plot%20No.31%2C%20Pandian%20St%2C%20Indira%20Gandhi%20Nagar%2C%20Velachery%2C%20Chennai%2C%20Tamil%20Nadu%20600042!3m2!1d12.990296299999999!2d80.2187733!5e0!3m2!1sen!2sin!4v1771316656827!5m2!1sen!2sin"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Advanced GroHair Velachery location map"
          />
        </div>
      </div>
    </section>
  );
}
