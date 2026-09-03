'use client';

import { useEffect, useRef, useState } from 'react';
import { containerFull, section, eyebrow, h2, lede } from './classnames';

const CONDITIONS = [
  {
    title: 'Alopecia Areata',
    image: '/Alopecia.png',
    points: ['Patchy hair loss diagnosis', 'Trigger identification', 'Personalised regrowth plan'],
  },
  {
    title: 'Receding Hairline',
    image: '/Receding.png',
    points: ['Face-suited hairline design', 'Stops further recession', 'Natural-looking restoration'],
  },
  {
    title: 'Genetic Hair Loss',
    image: '/Genetic.png',
    points: ['Family history assessment', 'Clinically guided treatment', 'Targeted root-cause therapy'],
  },
  {
    title: 'Hair Thinning',
    image: '/HairThinning.png',
    points: ['Early-stage treatment', 'Hair thinning diagnosis', 'Hair density preservation'],
  },
  {
    title: 'Baldness',
    image: '/Baldness.png',
    points: ['Stage-based assessment', 'Custom restoration path', 'Early & advanced stage care'],
  },
  {
    title: 'Dandruff & Scalp Issues',
    image: '/Dandruff.png',
    points: ['Dandruff treatment', 'Seborrheic dermatitis care', 'Scalp inflammation relief'],
  },
];

const ROW_1 = CONDITIONS.slice(0, 3);
const ROW_2 = CONDITIONS.slice(3, 6);

// Infinite marquee with a seamless loop — pauses on hover
function InfiniteMarquee({
  children,
  direction = 'left',
  speed = 0.4,
  gap = 20,
}: {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  speed?: number;
  gap?: number;
}) {
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
    positionRef.current = direction === 'right' ? -setWidth : 0;
    let running = true;

    const animate = (timestamp: number) => {
      if (!running) return;

      if (!isHovered) {
        if (lastTimeRef.current === 0) lastTimeRef.current = timestamp;
        const delta = (timestamp - lastTimeRef.current) / 16;
        lastTimeRef.current = timestamp;

        const step = direction === 'left' ? -speed : speed;
        positionRef.current += step * delta;

        if (direction === 'left' && Math.abs(positionRef.current) >= setWidth) {
          positionRef.current = 0;
        }
        if (direction === 'right' && positionRef.current >= 0) {
          positionRef.current = -setWidth;
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
  }, [direction, speed, isHovered]);

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left shadow */}
      <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-r from-[#FAFAFA] to-transparent z-30 pointer-events-none" />
      {/* Right shadow */}
      <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-l from-[#FAFAFA] to-transparent z-30 pointer-events-none" />

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

function ConditionCard({ cond }: { cond: (typeof CONDITIONS)[number] }) {
  return (
    <div className="group flex items-stretch w-[320px] sm:w-[360px] md:w-[380px] shrink-0 min-h-[230px] sm:min-h-[240px] overflow-hidden rounded-[16px] border border-[#DC2626]/25 bg-white transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
      {/* Text content */}
      <div className="flex-1 min-w-0 px-5 py-5 flex flex-col justify-center">
        <h3 className="mb-2 text-[18px] sm:text-[19px] font-extrabold leading-[1.15] tracking-[-0.01em] text-[#DC2626] uppercase">
          {cond.title}
        </h3>
        <ul className="mt-1.5 space-y-2">
          {cond.points.map((point) => (
            <li key={point} className="flex items-start gap-2 text-[13px] sm:text-[13.5px] font-medium leading-[1.35] text-[#475569]">
              <span className="mt-[4px] text-[10px] text-[#DC2626]">●</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Image panel — fully contained, nothing cropped */}
      <div className="relative w-[120px] sm:w-[140px] shrink-0 bg-[#FDF2F2] flex items-center justify-center p-3">
        <img
          src={cond.image}
          alt={cond.title}
          className="w-full h-auto max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute bottom-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-[0_4px_10px_rgba(0,0,0,0.15)] flex items-center justify-center">
          <svg
            className="w-3.5 h-3.5 text-[#DC2626]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default function ConditionsGrid() {
  return (
    <section className={`${section} bg-[#FAFAFA]`} id="conditions">
      <div className={containerFull}>
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
          <div className="lg:w-[400px] xl:w-[460px] shrink-0">
            <span className={eyebrow}>We Diagnose Before We Treat</span>
            <h2 className={h2}>
              Hair Fall Doesn&rsquo;t Wait <br />
              Neither Should Your Answers
            </h2>
            <p className={lede}>
              Whatever stage you&rsquo;re at — the first thin patch or years of gradual recession —
              the earlier it&rsquo;s diagnosed correctly, the more options you have. Our Velachery
              specialists start every case with a proper diagnosis, not a sales pitch.
            </p>
          </div>

          <div className="flex-1 min-w-0 flex flex-col gap-4">
            <InfiniteMarquee direction="left" speed={0.35} gap={16}>
              {ROW_1.map((cond) => (
                <ConditionCard key={cond.title} cond={cond} />
              ))}
            </InfiniteMarquee>
            <InfiniteMarquee direction="right" speed={0.35} gap={16}>
              {ROW_2.map((cond) => (
                <ConditionCard key={cond.title} cond={cond} />
              ))}
            </InfiniteMarquee>
          </div>
        </div>
      </div>
    </section>
  );
}
