import styles from './sales.module.css';
import { SALES_CONTACT } from './constants';

export default function SalesFooter() {
  return (
    <footer className={styles.siteFooter}>
      <div className={`${styles.container} ${styles.footerGrid}`}>
        <div className={styles.footerBrand}>
          <img
            src="/logo2.png"
            alt="Advanced GroHair Velachery logo"
          />
          <p>
            Board-certified hair restoration, trusted across 60+ clinics in India. Individual
            results may vary — all treatment recommendations follow a specialist consultation.
          </p>
        </div>
        <div className={styles.footerCol}>
          <h5>Explore</h5>
          <a href="#why-trust-us">Why Trust Us</a>
          <a href="#results">Patient Results</a>
          <a href="#reviews">Reviews</a>
          <a href="#faq">FAQs</a>
          <a href="#locate">Locate Us</a>
        </div>
        <div className={styles.footerCol}>
          <h5>Contact</h5>
          <span>{SALES_CONTACT.addressShort}</span>
          <a href={`tel:${SALES_CONTACT.phoneTel}`}>{SALES_CONTACT.phoneDisplay}</a>
          <a href={`mailto:${SALES_CONTACT.email}`}>{SALES_CONTACT.email}</a>
        </div>
      </div>
      <div className={`${styles.container} ${styles.footerBottom}`}>
        <span>© {new Date().getFullYear()} Advanced GroHair Velachery. All rights reserved.</span>
        <a href={SALES_CONTACT.privacyPolicyUrl} target="_blank" rel="noopener">
          Privacy &amp; Policy
        </a>
      </div>
    </footer>
  );
}
