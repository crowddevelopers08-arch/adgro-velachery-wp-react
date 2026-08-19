import styles from './sales.module.css';
import { SALES_CONTACT } from './constants';

export default function CallBanner({
  heading = 'Prefer to talk it through?',
  copy = 'Call our Velachery specialist directly — no forms, no waiting.',
}: {
  heading?: string;
  copy?: string;
}) {
  return (
    <div className={styles.callBannerWrap}>
      <div className={styles.container}>
        <div className={styles.callBanner}>
          <div className={styles.callBannerCopy}>
            <strong>{heading}</strong>
            <span>{copy}</span>
          </div>
          <a href={`tel:${SALES_CONTACT.phoneTel}`} className={styles.callBannerBtn}>
            <svg className={styles.icon}>
              <use href="#sales-i-phone" />
            </svg>
            Call {SALES_CONTACT.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
