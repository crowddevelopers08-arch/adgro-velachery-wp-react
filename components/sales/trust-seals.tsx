'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './sales.module.css';

type Seal = { count?: number; suffix?: string; staticText?: string; label: string };

const SEALS: Seal[] = [
  { count: 60, suffix: '+', label: 'Clinics Pan-India' },
  { count: 2000, suffix: '+', label: 'Successful Transformations' },
  { staticText: '100%', label: 'Board-Certified Doctors' },
  { staticText: 'FDA', label: 'Approved Equipment' },
  { staticText: '24/7', label: 'Patient Support Line' },
  { staticText: '0%', label: 'Cost EMI Available' },
];

function CountUpSeal({ seal }: { seal: Seal }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(seal.staticText ?? '0');
  const started = useRef(false);

  useEffect(() => {
    if (seal.staticText || !seal.count) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const target = seal.count as number;
          const duration = 1200;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target) + (seal.suffix ?? ''));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [seal]);

  return (
    <span className={styles.sealRing}>
      <span ref={ref} className={styles.sealNum}>
        {value}
      </span>
    </span>
  );
}

export default function TrustSeals() {
  return (
    <section className={styles.sealStrip}>
      <div className={styles.container}>
        <div className={styles.sealRow}>
          {SEALS.map((seal) => (
            <div className={styles.seal} key={seal.label}>
              <CountUpSeal seal={seal} />
              <span className={styles.sealLabel}>{seal.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
