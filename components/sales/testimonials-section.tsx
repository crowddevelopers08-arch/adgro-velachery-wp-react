'use client';

import Reveal from './reveal';
import { container, section, eyebrow, h2, lede } from './classnames';
import { useEffect, useRef, useState } from 'react';

const VIDEOS = [
  'zFfyU2elucI',
  '4vTG4oHMzzA',
  '97RecofOJ3s',
  'n8g9kLw_RSw',
  'zXlTOuc_fwY',
];

// Google-style star rating
function GoogleStars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-0.5 text-[#FBBC04] mb-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
      <span className="text-sm font-medium text-[#1A1A1A] ml-1">{rating}.0</span>
    </div>
  );
}

// Google-style review card
function GoogleReviewCard({ 
  name, 
  review, 
  date, 
  rating = 5,
  avatar
}: { 
  name: string; 
  review: string; 
  date: string; 
  rating?: number;
  avatar?: string;
}) {
  return (
    <div className="bg-white border border-[#DADCE0] rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow w-[320px] flex-shrink-0">
      <div className="flex items-start gap-3 mb-2.5">
        {avatar ? (
          <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#1A73E8] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
            {name.charAt(0)}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-[15px] text-[#1A1A1A] truncate">{name}</span>
            <svg className="w-4 h-4 text-[#1A73E8] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <GoogleStars rating={rating} />
        </div>
      </div>
      <p className="text-[14px] text-[#3C4043] leading-[1.5] line-clamp-3 mb-2">{review}</p>
      <span className="text-[12px] text-[#5F6368]">{date}</span>
    </div>
  );
}

// Infinite Marquee Component with proper seamless loop
function InfiniteMarquee({ 
  children, 
  direction = 'left', 
  speed = 0.5,
  className = '',
  gap = 16
}: { 
  children: React.ReactNode; 
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
  gap?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef<number>();
  const positionRef = useRef(0);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    // Calculate the total width of the content
    const contentWidth = content.scrollWidth / 2;
    let running = true;

    const animate = (timestamp: number) => {
      if (!running) return;

      if (!isHovered) {
        if (lastTimeRef.current === 0) {
          lastTimeRef.current = timestamp;
        }
        const delta = (timestamp - lastTimeRef.current) / 16;
        lastTimeRef.current = timestamp;

        const speedFactor = direction === 'left' ? -speed : speed;
        positionRef.current += speedFactor * delta;

        // Wrap around when reaching the end
        if (Math.abs(positionRef.current) >= contentWidth) {
          positionRef.current = 0;
        }
        if (positionRef.current > 0) {
          positionRef.current = -contentWidth;
        }

        container.style.transform = `translateX(${positionRef.current}px)`;
        container.style.willChange = 'transform';
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      running = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [direction, speed, isHovered]);

  return (
    <div 
      className={`overflow-hidden relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        ref={containerRef} 
        className="flex will-change-transform" 
        style={{ gap: `${gap}px` }}
      >
        <div ref={contentRef} className="flex" style={{ gap: `${gap}px` }}>
          {children}
          {children}
          {children}
        </div>
      </div>
    </div>
  );
}

// Video Carousel with Infinite Marquee
function VideoCarousel() {
  return (
    <div className="relative py-4">
      {/* Left shadow */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      
      {/* Right shadow */}
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      <InfiniteMarquee direction="left" speed={0.4} gap={24}>
        {VIDEOS.map((id) => (
          <div
            key={id}
            className="flex-shrink-0 w-[180px] sm:w-[200px] min-[1100px]:w-[220px] rounded-2xl overflow-hidden bg-black shadow-[0_8px_20px_-12px_rgba(0,0,0,0.18)]"
          >
            <iframe
              src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
              title="Patient testimonial video"
              className="w-full aspect-[9/16] border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ))}
      </InfiniteMarquee>
    </div>
  );
}

// Dummy reviews data
const ALL_REVIEWS = [
  {
    name: 'Priya Srinivasan',
    review: 'After struggling with hair fall for 3 years, I finally saw real results within 2 months. The doctors are incredibly knowledgeable and the staff makes you feel completely at ease. Best decision I ever made!',
    date: '2 weeks ago',
    rating: 5,
  },
  {
    name: 'Rahul Krishnan',
    review: "I was skeptical at first, but the transformation has been remarkable. The treatment plan was personalized and the follow-ups were thorough. It's been 6 months and my confidence has completely changed.",
    date: '1 month ago',
    rating: 5,
  },
  {
    name: 'Meera Menon',
    review: "I've visited multiple clinics before but this one stands out. The personalized approach and attention to detail made all the difference. Visible results in 2 months — beyond my expectations.",
    date: '1 week ago',
    rating: 5,
  },
  {
    name: 'Suresh Prabhu',
    review: 'Finally a clinic that delivers on its promises. The treatment was painless and the results are natural-looking. The entire team is supportive and keeps you motivated throughout the journey.',
    date: '3 months ago',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className={`${section} bg-white`} id="reviews">
      <div className={container}>
        <span className={eyebrow}>In Their Own Words</span>
        <h2 className={h2}>Hear From Patients Who Trusted Us With Their Hair</h2>
        <p className={`${lede} mb-9`}>
          Unscripted stories from real patients at our clinics — because hearing it from someone
          who&rsquo;s already been through it matters more than anything we can say.
        </p>

        {/* Video Carousel - Infinite Marquee */}
        <div className="mb-11">
          <VideoCarousel />
        </div>

        {/* Reviews - Row 1: Moving Right */}
        <div className="relative py-3">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <InfiniteMarquee direction="right" speed={0.3} gap={16}>
            {ALL_REVIEWS.map((review, i) => (
              <GoogleReviewCard key={`row1-${i}-${review.name}`} {...review} />
            ))}
          </InfiniteMarquee>
        </div>

        {/* Reviews - Row 2: Moving Left */}
        <div className="relative py-3">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <InfiniteMarquee direction="left" speed={0.3} gap={16}>
            {ALL_REVIEWS.map((review, i) => (
              <GoogleReviewCard key={`row2-${i}-${review.name}`} {...review} />
            ))}
          </InfiniteMarquee>
        </div>
      </div>
    </section>
  );
}