'use client';

import { useEffect, useRef, useState } from 'react';
import { container, sectionTight, eyebrow, h2, lede, icon } from './classnames';

const RESULTS = [
  { src: '/Slide-1.png', alt: 'Before and after result — male pattern hair loss' },
  { src: '/Slide-2.png', alt: 'Before and after result — female hair thinning' },
  { src: '/Slide-3.png', alt: 'Before and after result — traction alopecia' },
  { src: '/Before-After-1amba.jpg', alt: 'Before and after hair regrowth result, month 1 to month 6' },
  { src: '/Before-After-2amba.jpg', alt: 'Before and after hair regrowth result, month 1 to month 6' },
  { src: '/Before-After-3amba.jpg', alt: 'Before and after hair regrowth result, month 1 to month 6' },
  { src: '/Before-After-4amba.jpg', alt: 'Before and after hair regrowth result, month 1 to month 6' },
  { src: '/Before-After-5amba.jpg', alt: 'Before and after hair regrowth result, month 1 to month 6' },
  { src: '/Before-After-6amba.jpg', alt: 'Before and after hair regrowth result, month 1 to month 6' },
];

// Infinite marquee with a seamless loop — pauses on hover
function InfiniteMarquee({ children, speed = 0.4, gap = 20 }: { children: React.ReactNode; speed?: number; gap?: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef<number>();
  const positionRef = useRef(0);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    const set = setRef.current;
    if (!track || !set) return;

    const setWidth = set.scrollWidth;
    let running = true;

    const animate = (timestamp: number) => {
      if (!running) return;

      if (!isHovered) {
        if (lastTimeRef.current === 0) lastTimeRef.current = timestamp;
        const delta = (timestamp - lastTimeRef.current) / 16;
        lastTimeRef.current = timestamp;

        positionRef.current -= speed * delta;
        if (Math.abs(positionRef.current) >= setWidth) {
          positionRef.current = 0;
        }

        track.style.transform = `translateX(${positionRef.current}px)`;
        track.style.willChange = 'transform';
      } else {
        lastTimeRef.current = 0;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      running = false;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [speed, isHovered]);

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-[#FAFAFA] to-transparent z-30 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-[#FAFAFA] to-transparent z-30 pointer-events-none" />

      <div ref={trackRef} className="flex will-change-transform" style={{ gap: `${gap}px` }}>
        <div ref={setRef} className="flex" style={{ gap: `${gap}px` }}>
          {children}
        </div>
        <div className="flex" aria-hidden="true" style={{ gap: `${gap}px` }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ResultsGallery() {
  return (
    <section className={`${sectionTight} bg-[#FAFAFA]`} id="results">
      <div className={container}>
        <span className={eyebrow}>See the Difference</span>
        <h2 className={h2}>Patient Results From Our Velachery Center</h2>
        <p className={`${lede} mb-9`}>
          Every case below started with a proper diagnosis, followed by a plan built for that
          patient&rsquo;s stage, goals and scalp condition — spanning hair transplant surgery,
          growth therapy, laser treatment and cosmetic hair systems.
        </p>
      </div>

      <div className={`${container} py-2`}>
        <InfiniteMarquee speed={0.35} gap={20}>
          {RESULTS.map((r) => (
            <div
              key={r.src}
              className="w-[240px] sm:w-[280px] shrink-0 bg-white rounded-2xl overflow-hidden border border-[#E8E8E8] shadow-[0_8px_20px_-12px_rgba(0,0,0,0.18)]"
            >
              <img src={r.src} alt={r.alt} className="w-full aspect-square object-cover" />
            </div>
          ))}
        </InfiniteMarquee>
      </div>

      <div className={container}>
        <div className="flex gap-2.5 items-start mt-[30px] px-[18px] py-4 bg-[#FAFAFA] border border-dashed border-[#E8E8E8] rounded-[10px] text-[13px] text-[#6B6B6B]">
          <svg className={`${icon} w-4 h-4 mt-0.5 text-[#2B2B2B]`}>
            <use href="#sales-i-shield" />
          </svg>
          <span>
            Results shown are of actual patients, published with consent. Individual results vary
            based on hair loss stage, scalp condition and treatment plan — your specialist will
            set realistic expectations at consultation.
          </span>
        </div>
      </div>
    </section>
  );
}
