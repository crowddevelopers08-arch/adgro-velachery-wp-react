"use client";
import React from "react";

const features = [
  {
    id: 1,
    title: "Alopecia Areata",
    text: "Patchy hair loss that shows up suddenly? We diagnose the trigger and design treatments that get your hair growing again.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14" xmlns="http://www.w3.org/2000/svg">
        {/* Person body */}
        <circle cx="22" cy="16" r="8" stroke="#e82625" strokeWidth="2.5" fill="none" />
        <path d="M8 44c0-8 6-14 14-14h2" stroke="#e82625" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Bar chart with arrow */}
        <rect x="32" y="38" width="5" height="10" rx="1" fill="#e82625" />
        <rect x="40" y="32" width="5" height="16" rx="1" fill="#e82625" />
        <rect x="48" y="26" width="5" height="22" rx="1" fill="#e82625" />
        {/* Arrow up */}
        <path d="M50 18 L56 12 L62 18" stroke="#e82625" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <line x1="56" y1="12" x2="56" y2="26" stroke="#e82625" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Receding Hairline",
    text: "Stop the retreat. Our hair transplant surgeons in Chennai restore your hairline with techniques that look completely natural.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14" xmlns="http://www.w3.org/2000/svg">
        {/* Magnifying glass */}
        <circle cx="26" cy="26" r="16" stroke="#e82625" strokeWidth="2.5" fill="none" />
        <line x1="38" y1="38" x2="54" y2="54" stroke="#e82625" strokeWidth="3" strokeLinecap="round" />
        {/* Gear / settings inside */}
        <circle cx="26" cy="26" r="5" stroke="#e82625" strokeWidth="2" fill="none" />
        <path d="M26 18v2M26 32v2M18 26h2M32 26h2M20.34 20.34l1.42 1.42M32.24 32.24l1.42 1.42M20.34 31.66l1.42-1.42M32.24 19.76l1.42-1.42" stroke="#e82625" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Genetic Hair Loss",
    text: "Family history of baldness? We go after the root cause — not just the symptoms — with clinically proven treatments.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14" xmlns="http://www.w3.org/2000/svg">
        {/* Circle */}
        <circle cx="32" cy="32" r="26" stroke="#e82625" strokeWidth="2.5" fill="none" />
        {/* FDA text */}
        <text x="32" y="28" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#e82625" fontFamily="Arial, sans-serif">FDA</text>
        <text x="32" y="40" textAnchor="middle" fontSize="6.5" fill="#e82625" fontFamily="Arial, sans-serif">APPROVED</text>
      </svg>
    ),
  },
  {
    id: 4,
    title: "Hair Thinning",
    text: "Thinning hair doesn't have to mean losing hope. Early intervention at our hair care clinic gives you a serious head start.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14" xmlns="http://www.w3.org/2000/svg">
        {/* Face outline */}
        <path d="M32 8 C18 8 12 20 12 30 C12 44 20 54 32 56 C44 54 52 44 52 30 C52 20 46 8 32 8Z" stroke="#e82625" strokeWidth="2.5" fill="none" />
        {/* Hair lines */}
        <path d="M22 14 C22 10 28 8 32 8 C36 8 42 10 42 14" stroke="#e82625" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Sparkle */}
        <path d="M48 10 L50 6 L52 10 L56 12 L52 14 L50 18 L48 14 L44 12Z" stroke="#e82625" strokeWidth="1.5" fill="#e82625" opacity="0.7" />
        {/* Eye */}
        <circle cx="26" cy="32" r="2" fill="#e82625" />
        <circle cx="38" cy="32" r="2" fill="#e82625" />
        {/* Smile */}
        <path d="M26 40 Q32 46 38 40" stroke="#e82625" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Baldness",
    text: "From Norwood scale 3 to advanced baldness — our FUE and DHI transplants are built to restore, not just manage.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14" xmlns="http://www.w3.org/2000/svg">
        {/* Coin */}
        <circle cx="32" cy="20" r="14" stroke="#e82625" strokeWidth="2.5" fill="none" />
        <text x="32" y="25" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#e82625" fontFamily="Arial, sans-serif">$</text>
        {/* Hand */}
        <path d="M10 44 C10 40 14 37 18 37 L28 37 C30 37 32 38 32 40" stroke="#e82625" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M32 40 L46 40 C50 40 54 43 54 47 C54 47 40 54 24 50 L10 46" stroke="#e82625" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M32 40 C32 38 34 36 36 36 L40 36 C42 36 44 38 44 40" stroke="#e82625" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M44 40 C44 38 46 36 48 36 C50 36 52 38 52 40" stroke="#e82625" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Dandruff & Scalp Issues",
    text: "Scalp health drives hair health. Our trichologists treat dandruff, seborrheic dermatitis, and scalp inflammation at the source.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14" xmlns="http://www.w3.org/2000/svg">
        {/* Hearts above people */}
        <path d="M20 10 C20 8 18 6 16 8 C14 6 12 8 12 10 C12 13 16 16 16 16 C16 16 20 13 20 10Z" fill="#e82625" />
        <path d="M36 8 C36 6 34 4 32 6 C30 4 28 6 28 8 C28 11 32 14 32 14 C32 14 36 11 36 8Z" fill="#e82625" />
        <path d="M52 10 C52 8 50 6 48 8 C46 6 44 8 44 10 C44 13 48 16 48 16 C48 16 52 13 52 10Z" fill="#e82625" />
        {/* People - left */}
        <circle cx="16" cy="28" r="5" stroke="#e82625" strokeWidth="2" fill="none" />
        <path d="M8 46 C8 40 12 36 16 36 C20 36 24 40 24 46" stroke="#e82625" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* People - center */}
        <circle cx="32" cy="26" r="5.5" stroke="#e82625" strokeWidth="2.5" fill="none" />
        <path d="M22 46 C22 39 27 34 32 34 C37 34 42 39 42 46" stroke="#e82625" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* People - right */}
        <circle cx="48" cy="28" r="5" stroke="#e82625" strokeWidth="2" fill="none" />
        <path d="M40 46 C40 40 44 36 48 36 C52 36 56 40 56 46" stroke="#e82625" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
];

const WhyChooseSection = () => {
  return (
    <section className="w-full bg-white py-12 md:py-16 overflow-hidden">

      {/* Marquee keyframe */}
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 18s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-gray-900 text-center mb-4 leading-snug">
          We Treat Every Hair Problem — Not Just the Obvious Ones
        </h2>

        {/* Subtext */}
        <p className="text-gray-500 text-sm sm:text-[15px] text-center max-w-[720px] mx-auto mb-10 max-sm:mb-5 leading-relaxed">
          Whether you're noticing early thinning or dealing with complete baldness, our Velachery hair clinic has a targeted solution for every stage.
        </p>
      </div>

      {/* ── MOBILE: auto-scrolling single row ── */}
      <div className="md:hidden overflow-hidden">
        <div className="marquee-track gap-4 px-4">
          {[...features, ...features].map((feature, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[220px] bg-[#fff5f5] border border-[#fdd] rounded-xl p-5 flex flex-col items-center text-center gap-3 mx-2"
            >
              <div className="flex items-center justify-center scale-75">
                {feature.icon}
              </div>
              <p className="text-[#e82625] text-[13px] font-bold leading-snug">
                {feature.title}
              </p>
              <p className="text-[#202020] text-[11px] leading-snug">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── DESKTOP: existing 4+2 grid ── */}
      <div className="hidden md:block max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-4 gap-5">
            {features.slice(0, 4).map((feature) => (
              <div
                key={feature.id}
                className="bg-[#fff5f5] border border-[#fdd] rounded-xl p-6 flex flex-col items-center text-center gap-3"
              >
                <div className="flex items-center justify-center">{feature.icon}</div>
                <p className="text-[#e82625] text-[15px] font-bold leading-snug">{feature.title}</p>
                <p className="text-[#202020] text-sm leading-snug">{feature.text}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-5">
            {features.slice(4, 6).map((feature) => (
              <div
                key={feature.id}
                className="bg-[#fff5f5] border border-[#fdd] rounded-xl p-6 flex flex-col items-center text-center gap-3 w-full max-w-[300px]"
              >
                <div className="flex items-center justify-center">{feature.icon}</div>
                <p className="text-[#e82625] text-[15px] font-bold leading-snug">{feature.title}</p>
                <p className="text-[#202020] text-sm leading-snug">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default WhyChooseSection;
