'use client';

import { useEffect, useState } from 'react';
import styles from './sales.module.css';
import { SALES_CONTACT } from './constants';

/** Sticky mobile CTA bar + floating call/WhatsApp buttons — visible once the hero scrolls out of view. */
export default function StickyCallBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('sales-hero');
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className={`${styles.mobileBar} ${visible ? styles.mobileBarVisible : ''}`}>
        <a href={`tel:${SALES_CONTACT.phoneTel}`} className={styles.mobileBarCall}>
          <svg className={styles.icon}>
            <use href="#sales-i-phone" />
          </svg>
          Call Now
        </a>
        <a href={`https://wa.me/${SALES_CONTACT.phoneWa}`} target="_blank" rel="noopener">
          <svg className={styles.icon}>
            <use href="#sales-i-wa" />
          </svg>
          WhatsApp
        </a>
        <a href={SALES_CONTACT.mapsQuery} target="_blank" rel="noopener">
          <svg className={styles.icon}>
            <use href="#sales-i-pin" />
          </svg>
          Directions
        </a>
        <a href="#lead-form">
          <svg className={styles.icon}>
            <use href="#sales-i-calendar" />
          </svg>
          Book Free
        </a>
      </div>

      <div className={styles.floatStack}>
        <a href={`tel:${SALES_CONTACT.phoneTel}`} className={`${styles.floatBtn} ${styles.floatBtnCall}`} aria-label="Call now">
          <svg className={styles.icon}>
            <use href="#sales-i-phone" />
          </svg>
        </a>
        <a
          href={`https://wa.me/${SALES_CONTACT.phoneWa}`}
          target="_blank"
          rel="noopener"
          className={`${styles.floatBtn} ${styles.floatBtnWa}`}
          aria-label="Chat on WhatsApp"
        >
          <svg className={styles.icon}>
            <use href="#sales-i-wa" />
          </svg>
        </a>
      </div>
    </>
  );
}
