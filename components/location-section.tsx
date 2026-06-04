"use client";
import React from "react";

const paragraphs = [
  "Advanced GroHair is one of Chennai's leading hair and skin clinics, with a dedicated center in Velachery serving patients across South Chennai. If you've been searching for a \"hair transplant clinic near me\" or a \"trichologist near me\" — your search ends here.",
  "Our Velachery clinic offers everything from a first-time hair fall consultation to full hair transplant surgery, all under one roof. We also offer advanced scalp analysis, PRP therapy, laser hair regrowth, and cosmetic hair systems — tailored to your budget and lifestyle.",
  "We don't believe in a one-size-fits-all approach. Every patient gets a personalised treatment plan, flexible financing, and a care team that actually follows through.",
];

const LocationSection = () => {
  return (
    <section className="w-full relative overflow-hidden py-16 md:py-14">

      {/* Background image */}
      <img
        src="/hair-loss-treatment.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ zIndex: 0 }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.58)", zIndex: 1 }}
      />

      {/* Content */}
      <div className="relative max-w-[1100px] mx-auto px-4 sm:px-6 flex flex-col items-center gap-12" style={{ zIndex: 2 }}>

        {/* ── TOP: badge + headline ── */}
        <div className="flex flex-col items-center text-center gap-5 max-w-[800px]">

          {/* Location pill */}
          <span className="inline-flex items-center gap-2 text-[#e82625] text-[12px] font-bold px-5 py-2 rounded-full uppercase tracking-widest"
            style={{ background: "rgba(232,38,37,0.15)", border: "1px solid rgba(232,38,37,0.35)" }}>
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
              <path d="M6 0C3.24 0 1 2.24 1 5C1 8.5 6 14 6 14C6 14 11 8.5 11 5C11 2.24 8.76 0 6 0Z" fill="#e82625" />
              <circle cx="6" cy="5" r="1.8" fill="#0a0a0a" />
            </svg>
            Velachery, South Chennai
          </span>

          {/* Headline */}
          <h2 className="text-[26px] sm:text-[32px] md:text-[38px] font-extrabold text-white leading-tight">
            Looking for a Hair Clinic Near You in Velachery?{" "}
            <span className="text-[#e82625]">We're Closer Than You Think.</span>
          </h2>

          {/* Red divider */}
          <div className="w-16 h-[3px] rounded-full bg-[#e82625]" />
        </div>

        {/* ── 3 paragraph cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
          {paragraphs.map((text, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 rounded-2xl px-6 py-7 transition-colors duration-300"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.20)",
              }}
            >
              <div className="w-10 h-[3px] rounded-full bg-[#e82625]" />
              <span className="text-[28px] font-extrabold leading-none" style={{ color: "rgba(232,38,37,0.55)" }}>
                0{i + 1}
              </span>
              <p className="text-[13px] sm:text-[14px] leading-[1.85]" style={{ color: "rgba(255,255,255,0.90)" }}>
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <a href="#form">
          <button className="bg-[#e82625] hover:bg-[#c41e1d] transition-colors duration-200 text-white font-bold px-10 py-4 rounded-md text-[15px] shadow-xl tracking-wide">
            Book Free Consultation →
          </button>
        </a>

      </div>
    </section>
  );
};

export default LocationSection;
