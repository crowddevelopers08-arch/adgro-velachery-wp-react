"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, ChevronLeft, ChevronRight, PhoneCall } from "lucide-react";

type HeroSlide = {
  id: number;
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
};

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    desktopSrc: "/banone.png",
    mobileSrc: "/mobbanone.png",
    alt: "Regen Pro 9 hair regrowth offer banner",
  },
  {
    id: 2,
    desktopSrc: "/bantwo.png",
    mobileSrc: "/mobbantwo.png",
    alt: "Cosmetic hair system offer banner",
  },
  {
    id: 3,
    desktopSrc: "/banthree.png",
    mobileSrc: "/mobbanthree.png",
    alt: "Advanced gel PRP offer banner",
  },
  {
    id: 4,
    desktopSrc: "/banfour.png",
    mobileSrc: "/mobbanfour.png",
    alt: "Hair transplant journey offer banner",
  },
];

export default function PromoHeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showCtaPopup, setShowCtaPopup] = useState(false);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setCurrentSlide((previousSlide) => (previousSlide + 1) % heroSlides.length);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [isPaused]);

  useEffect(() => {
    const popupDurationMs = 6000;

    const showPopup = () => {
      setShowCtaPopup(true);

      return window.setTimeout(() => {
        setShowCtaPopup(false);
      }, popupDurationMs);
    };

    let hideTimeoutId = window.setTimeout(() => {
      setShowCtaPopup(false);
    }, 0);

    const initialDelayId = window.setTimeout(() => {
      hideTimeoutId = showPopup();
    }, 3000);

    const repeatIntervalId = window.setInterval(() => {
      window.clearTimeout(hideTimeoutId);
      hideTimeoutId = showPopup();
    }, 15000);

    return () => {
      window.clearTimeout(initialDelayId);
      window.clearTimeout(hideTimeoutId);
      window.clearInterval(repeatIntervalId);
    };
  }, []);

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  const goToPrevious = () => {
    setCurrentSlide((previousSlide) =>
      previousSlide === 0 ? heroSlides.length - 1 : previousSlide - 1
    );
  };

  const goToNext = () => {
    setCurrentSlide((previousSlide) => (previousSlide + 1) % heroSlides.length);
  };

  return (
    <section className="w-full bg-white">
      <div
        className="relative mx-auto w-full max-w-screen-2xl overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {heroSlides.map((slide) => (
            <div key={slide.id} className="min-w-full">
              <div className="relative hidden md:block">
                <div className="relative aspect-[16/9] w-full lg:aspect-[1600/900]">
                  <Image
                    src={slide.desktopSrc}
                    alt={slide.alt}
                    fill
                    priority={slide.id === 1}
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="relative md:hidden">
                <div className="relative aspect-[9/16] w-full">
                  <Image
                    src={slide.mobileSrc}
                    alt={slide.alt}
                    fill
                    priority={slide.id === 1}
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={goToPrevious}
          className="absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#111111] shadow-lg transition hover:bg-white md:left-5 md:size-12"
          aria-label="Show previous hero slide"
        >
          <ChevronLeft className="size-5 md:size-6" />
        </button>

        <button
          type="button"
          onClick={goToNext}
          className="absolute right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#111111] shadow-lg transition hover:bg-white md:right-5 md:size-12"
          aria-label="Show next hero slide"
        >
          <ChevronRight className="size-5 md:size-6" />
        </button>

        <div
          className={`pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center px-4 transition-all duration-500 md:bottom-8 lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2 ${
            showCtaPopup
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0 lg:translate-y-4"
          }`}
          aria-hidden={!showCtaPopup}
        >
          <div className="pointer-events-auto flex w-full max-w-md flex-col gap-3 rounded-[28px] bg-white/92 p-3 shadow-2xl backdrop-blur-md sm:w-auto sm:flex-row sm:items-center sm:rounded-full sm:px-4 sm:py-3">
            <a
              href="#form"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ea2424] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d61f1f]"
            >
              <Calendar className="size-4" />
              <span>Book a Consultation</span>
            </a>

            <a
              href="tel:+918390856789"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#111111]/10 bg-[#111111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#222222]"
            >
              <PhoneCall className="size-4" />
              <span>Call Now</span>
            </a>
          </div>
        </div>

        {/* <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/20 px-3 py-2 backdrop-blur-sm md:bottom-6">
          {heroSlides.map((slide, slideIndex) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(slideIndex)}
              className={`h-2.5 rounded-full transition-all ${
                currentSlide === slideIndex
                  ? "w-8 bg-[#ea2424]"
                  : "w-2.5 bg-white/85"
              }`}
              aria-label={`Go to hero slide ${slideIndex + 1}`}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
}
