"use client";
import React, { useState, useEffect, useRef } from "react";

const cards = [
  {
    tag: "Hair Loss",
    title: "Notice thinning, shedding, or bald spots? Our tailored solutions address your needs and revive your hair’s health",
    image: "/Frame-2-1.png",
  },
  {
    tag: "Baldness",
    title: "Regain a full head of hair and boost your confidence with advanced restoration techniques",
    image: "/Frame-3-1.png",
  },
  {
    tag: "Hair Thinning",
    title: "Find effective treatments for patchy hair loss due to Alopecia Areata, promoting healthy hair growth.",
    image: "/Frame-4-1.png",
  },
  {
    tag: "Alopecia Areata",
    title: "Discover treatments for patchy hair loss from Alopecia Areata, promoting healthy growth and restoring",
    image: "/Frame-5.png",
  },
  {
    tag: "Receding Hairline",
    title: "Halt the progression of a receding hairline and reclaim your youthful look with personalized solutions",
    image: "/Frame-6.png",
  },
  {
    tag: "Genetic Hair Loss",
    title: "Combat hereditary hair loss patterns with personalized treatments, targeting the root cause",
    image: "/Frame-7.png",
  },
];

const CLONES = 3;
const extendedCards = [
  ...cards.slice(-CLONES),
  ...cards,
  ...cards.slice(0, CLONES),
];

const DonationCards = () => {
  const [index, setIndex] = useState(CLONES);
  const [cardsPerView, setCardsPerView] = useState(2);
  const trackRef = useRef(null);
  const total = cards.length;

  // ✅ Detect screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1); // mobile
      } else {
        setCardsPerView(2); // tablet & desktop
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const next = () => setIndex((prev) => prev + 1);
  const prev = () => setIndex((prev) => prev - 1);

  // seamless loop
  useEffect(() => {
    if (!trackRef.current) return;

    if (index === total + CLONES) {
      setTimeout(() => {
        trackRef.current.style.transition = "none";
        setIndex(CLONES);
      }, 500);
    }

    if (index === 0) {
      setTimeout(() => {
        trackRef.current.style.transition = "none";
        setIndex(total);
      }, 500);
    }
  }, [index, total]);

  useEffect(() => {
    if (!trackRef.current) return;
    trackRef.current.style.transition = "transform 0.5s ease";
  }, [index]);

  return (
    <section className="w-full bg-white py-10 md:py-10 max-[470px]:py-6">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-8 sm:mb-8 max-[470px]:mb-6 md:mb-8 text-gray-900 text-center lg:text-center">
           We Tackle Your Toughest Hair Concerns
          </h2>

        {/* CAROUSEL */}
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex"
            style={{
              transform: `translateX(-${index * (100 / cardsPerView)}%)`,
            }}
          >
            {extendedCards.map((card, i) => (
              <div
                key={i}
                className="w-full md:w-1/2 flex-shrink-0 px-2 sm:px-3 md:px-4"
              >
                <div className="bg-gradient-to-br from-[#1b1b1b] to-[#111] rounded-xl p-4 sm:p-5 md:p-6 flex flex-col sm:flex-row justify-between items-center text-white h-full gap-4 sm:gap-6">

                  {/* TEXT */}
                  <div className="w-full sm:max-w-[55%] text-center sm:text-left">
                    <p className="text-[#e82625] text-[26px] sm:text-[26px] font-bold mb-2">
                      {card.tag}
                    </p>

                    {/* MOBILE IMAGE */}
                    <img
                      src={card.image}
                      alt={card.tag}
                      className="block sm:hidden mx-auto my-4 w-[200px] h-[200px] object-cover rounded-lg"
                    />

                    <h3 className="text-base sm:text-lg md:text-[20px] font-semibold mb-4 leading-snug">
                      {card.title}
                    </h3>
                    <a href="#form">

                    <button className="bg-[#e82625] cursor-pointer transition text-sm sm:text-base px-4 sm:px-5 py-2 rounded-md">
                      Book a Consultation →
                    </button>

                    </a>
                  </div>

                  {/* DESKTOP IMAGE */}
                  <img
                    src={card.image}
                    alt={card.tag}
                    className="hidden sm:block w-[180px] md:w-[200px] h-[180px] md:h-[200px] object-cover rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="flex justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
          <button onClick={prev} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-200">←</button>
          <button onClick={next} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-200">→</button>
        </div>

      </div>
    </section>
  );
};

export default DonationCards;
