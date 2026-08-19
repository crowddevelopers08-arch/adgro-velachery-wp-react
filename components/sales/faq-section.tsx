'use client';

import { useState } from 'react';
import styles from './sales.module.css';
import { SALES_CONTACT } from './constants';

const FAQS = [
  {
    q: 'How much does a hair transplant cost in Chennai?',
    a: "Cost depends on the number of grafts, the technique used and the stage of hair loss being treated. Most Chennai clinics, including ours, price by graft count. The only way to get an accurate number is a free scalp analysis — book one and we'll walk you through a transparent quote, plus EMI options with no hidden costs.",
  },
  {
    q: 'Will the results look natural?',
    a: "Natural results come down to hairline design and the specialist doing the work, not just the equipment used. Our board-certified doctors design every hairline around your face shape, hair density and growth pattern before treatment begins, and we'll show you the plan before you commit to anything.",
  },
  {
    q: 'Is a hair transplant permanent?',
    a: "Transplanted hair is taken from a donor zone that's naturally resistant to hair loss, so it typically continues to grow for life. That said, hair loss in untreated areas can still continue — your specialist will explain what to expect for your specific case during consultation.",
  },
  {
    q: 'What non-surgical treatments do you offer at the Velachery clinic?',
    a: 'Alongside hair transplant surgery, we offer GFC (Growth Factor Concentrate) therapy, oxygen laser therapy, medical hair-fall treatment, scalp therapy for dandruff and scalp conditions, and cosmetic hair systems for immediate coverage — all recommended only after a proper diagnosis.',
  },
  {
    q: "How do I know which stage of hair loss I'm at?",
    a: 'Most people underestimate or overestimate their own stage. A free scalp analysis at our Velachery center — or over a call — gives you an honest, specialist-assessed answer instead of a guess from the mirror.',
  },
  {
    q: 'Do you offer consultations for patients outside Velachery?',
    a: "Yes. Advanced GroHair operates 60+ clinics across India, and our Velachery team also takes phone consultations for patients who can't visit in person. Call us or fill in the form and we'll work out what suits you.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={`${styles.sectionTight} ${styles.sectionCanvas}`} id="faq">
      <div className={styles.container} style={{ maxWidth: 820 }}>
        <span className={styles.eyebrow}>Common Questions</span>
        <h2 className={styles.h2}>Questions Chennai Patients Ask Us Every Day</h2>

        <div className={styles.faqList} style={{ marginTop: 32 }}>
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`} key={item.q}>
                <button
                  type="button"
                  className={styles.faqQ}
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  {item.q}
                  <svg className={styles.icon}>
                    <use href="#sales-i-chevron" />
                  </svg>
                </button>
                <div className={styles.faqA} style={{ maxHeight: isOpen ? 400 : 0 }}>
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.faqFoot}>
          <span style={{ color: 'var(--text-muted)', fontSize: 14.5 }}>Still have questions?</span>
          <a href={`tel:${SALES_CONTACT.phoneTel}`} className={`${styles.btn} ${styles.btnOutline}`}>
            Call Us Now
          </a>
        </div>
      </div>
    </section>
  );
}
