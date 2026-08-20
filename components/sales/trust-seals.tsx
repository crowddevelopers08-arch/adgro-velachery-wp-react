'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { container } from './classnames';

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
    <span className="relative flex items-center justify-center w-[84px] h-[84px] min-[1000px]:w-24 min-[1000px]:h-24 rounded-full bg-[#FAFAFA] border-2 border-[rgba(220,38,38,.22)] shadow-[0_8px_20px_-12px_rgba(0,0,0,0.18)] shrink-0">
      <span ref={ref} className="font-mono font-extrabold text-[19px] text-[#111111]">
        {value}
      </span>
    </span>
  );
}

function Connector() {
  return (
    <div className="hidden min-[1000px]:flex items-center h-24 flex-1 min-w-[24px] mx-1" aria-hidden="true">
      <i className="flex-1 h-0 border-t-2 border-dotted border-[#D0D0D0]" />
      <svg
        className="w-4 h-4 text-[#DC2626] shrink-0 mx-1"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="7 4 15 12 7 20" />
        <polyline points="13 4 21 12 13 20" />
      </svg>
      <i className="flex-1 h-0 border-t-2 border-dotted border-[#D0D0D0]" />
    </div>
  );
}

export default function TrustSeals() {
  return (
    <section className="py-[clamp(22px,3.5vw,36px)] bg-white border-b border-[#E8E8E8]">
      <div className={container}>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-7 min-[1000px]:flex-nowrap min-[1000px]:justify-between min-[1000px]:gap-0">
          {SEALS.map((seal, i) => (
            <Fragment key={seal.label}>
              <div className="flex flex-col items-center text-center shrink-0 gap-3">
                <CountUpSeal seal={seal} />
                <span className="text-[12.5px] text-[#1A1A1A] font-medium max-w-[110px] leading-[1.35]">
                  {seal.label}
                </span>
              </div>
              {i < SEALS.length - 1 && <Connector />}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
