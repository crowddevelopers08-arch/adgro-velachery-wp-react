'use client';

import { useEffect, useState } from 'react';
import styles from './sales.module.css';
import { SALES_CONTACT } from './constants';

const NAV_LINKS = [
  { href: '#treatments', label: 'Treatments' },
  { href: '#why-trust-us', label: 'Why Trust Us' },
  { href: '#results', label: 'Results' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#faq', label: 'FAQs' },
  { href: '#locate', label: 'Locate Us' },
];

export default function SalesHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.siteHeader} ${scrolled ? styles.siteHeaderScrolled : ''}`}>
      <div className={`${styles.container} ${styles.headerRow}`}>
        <a href="#top" className={styles.brand}>
          <img
            src="/logo2.png"
            alt="Advanced GroHair Velachery logo"
          />
          <span className={styles.brandText}>
            <strong>Advanced GroHair</strong>
            <span>Velachery, Chennai</span>
          </span>
        </a>

        <nav className={styles.mainNav} aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.headerActions}>
          <a href={`tel:${SALES_CONTACT.phoneTel}`} className={styles.callChip}>
            <svg className={styles.icon}>
              <use href="#sales-i-phone" />
            </svg>
            <span>Call {SALES_CONTACT.phoneDisplay}</span>
          </a>
          <button
            type="button"
            className={styles.navToggle}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <svg className={styles.icon}>
              <use href={open ? '#sales-i-close' : '#sales-i-menu'} />
            </svg>
          </button>
        </div>
      </div>

      <div className={`${styles.mobileNav} ${open ? styles.mobileNavOpen : ''}`}>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href="#lead-form" onClick={() => setOpen(false)}>
          Book Free Consultation
        </a>
      </div>
    </header>
  );
}
