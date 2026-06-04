"use client";
import React from "react";

const trustPoints = [
  { stat: "2000+", label: "Hair Transformations" },
  { stat: "✓", label: "Board-Certified Doctors" },
  { stat: "FDA", label: "Approved Equipment" },
  { stat: "24/7", label: "Patient Support" },
  { stat: "EMI", label: "No Hidden Costs" },
  { stat: "60+", label: "Clinics Pan-India" },
];

const TrustSection = () => {
  return (
    <section className="w-full bg-white py-14 md:py-20">

      {/* ══════════ MOBILE LAYOUT ══════════ */}
      <div className="md:hidden flex flex-col px-5 gap-5">

        {/* 1. Heading */}
        <h2 className="text-[22px] font-extrabold text-[#202020] leading-tight text-center">
          Not Just a Hair Clinic. A Center for Hair Restoration You Can Actually{" "}
          <span className="text-[#e82625]">Trust.</span>
        </h2>

        {/* 2. Subheading pill */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 bg-[#fff0f0] text-[#e82625] text-[11px] font-bold px-4 py-1.5 rounded-full border border-[#fdd] uppercase tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#e82625] inline-block" />
            Why Choose Us
          </span>
        </div>

        {/* 3. USP circles — 3 col grid */}
        <div className="grid grid-cols-3 gap-3">
          {trustPoints.map((point, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 text-center">
              <div
                className={`w-[72px] h-[72px] rounded-full flex items-center justify-center shadow-md ${
                  i % 2 === 0 ? "bg-[#e82625]" : "bg-white border-2 border-[#e82625]"
                }`}
              >
                <span className={`text-[13px] font-extrabold ${i % 2 === 0 ? "text-white" : "text-[#e82625]"}`}>
                  {point.stat}
                </span>
              </div>
              <p className="text-[10px] font-semibold text-[#202020] leading-tight w-[72px]">
                {point.label}
              </p>
            </div>
          ))}
        </div>

        {/* 4. Red divider */}
        <div className="w-12 h-1 rounded-full bg-[#e82625] mx-auto" />

        {/* 5. Description */}
        <p className="text-gray-500 text-[13px] leading-[1.8] text-center">
          There's no shortage of hair clinics in Chennai. What sets Advanced GroHair apart is
          simple: we measure our success by your results, not by the number of treatments we
          sell you.
        </p>
        <p className="text-gray-500 text-[13px] leading-[1.8] text-center">
          With over 2,000 transformations across 60+ clinics nationwide, our team of
          board-certified trichologists and hair transplant surgeons brings both expertise and
          empathy to every consultation. We use only FDA-approved equipment, offer no-cost EMI,
          and stay available 24/7 — because hair loss doesn't keep business hours.
        </p>

        {/* 6. Button */}
        <div className="flex justify-center pt-1">
          <a href="#form">
            <button className="bg-[#e82625] hover:bg-[#c41e1d] transition-colors duration-200 text-white font-bold px-7 py-3 rounded-md text-[14px] shadow-lg">
              Book Free Consultation →
            </button>
          </a>
        </div>

      </div>

      {/* ══════════ DESKTOP LAYOUT ══════════ */}
      <div className="hidden md:block max-w-[1200px] mx-auto px-6">
        <div className="flex flex-row gap-16 items-center">

          {/* LEFT: text content */}
          <div className="w-[52%] flex flex-col gap-5">

            <span className="inline-flex self-start items-center gap-2 bg-[#fff0f0] text-[#e82625] text-[12px] font-bold px-4 py-1.5 rounded-full border border-[#fdd] uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#e82625] inline-block" />
              Why Choose Us
            </span>

            <h2 className="text-[30px] lg:text-[34px] font-extrabold text-[#202020] leading-tight">
              Not Just a Hair Clinic. A Center for Hair Restoration You Can Actually{" "}
              <span className="text-[#e82625]">Trust.</span>
            </h2>

            <div className="w-14 h-1 rounded-full bg-[#e82625]" />

            <p className="text-gray-500 text-[15px] leading-[1.85]">
              There's no shortage of hair clinics in Chennai. What sets Advanced GroHair apart is
              simple: we measure our success by your results, not by the number of treatments we
              sell you.
            </p>
            <p className="text-gray-500 text-[15px] leading-[1.85]">
              With over 2,000 transformations across 60+ clinics nationwide, our team of
              board-certified trichologists and hair transplant surgeons brings both expertise and
              empathy to every consultation. We use only FDA-approved equipment, offer no-cost EMI,
              and stay available 24/7 — because hair loss doesn't keep business hours.
            </p>

            <div className="pt-2">
              <a href="#form">
                <button className="bg-[#e82625] hover:bg-[#c41e1d] transition-colors duration-200 text-white font-bold px-8 py-3.5 rounded-md text-[15px] shadow-lg">
                  Book Free Consultation →
                </button>
              </a>
            </div>
          </div>

          {/* RIGHT: scattered USP circles */}
          <div className="w-[48%]">
            <div className="relative w-full" style={{ height: "420px" }}>

              {/* TOP-LEFT */}
              <div className="absolute flex flex-col items-center gap-1 text-center" style={{ top: 10, left: 60 }}>
                <div className="w-[90px] h-[90px] rounded-full bg-white border-[2.5px] border-[#e82625] flex items-center justify-center shadow-md">
                  <span className="text-[16px] font-extrabold text-[#e82625]">{trustPoints[1].stat}</span>
                </div>
                <p className="text-[10px] font-semibold text-[#202020] w-[90px] leading-tight mt-1">{trustPoints[1].label}</p>
              </div>

              {/* TOP-RIGHT */}
              <div className="absolute flex flex-col items-center gap-1 text-center" style={{ top: 10, right: 70 }}>
                <div className="w-[90px] h-[90px] rounded-full bg-[#e82625] flex items-center justify-center shadow-lg">
                  <span className="text-[16px] font-extrabold text-white">{trustPoints[2].stat}</span>
                </div>
                <p className="text-[10px] font-semibold text-[#202020] w-[90px] leading-tight mt-1">{trustPoints[2].label}</p>
              </div>

              {/* CENTER (big) */}
              <div className="absolute flex flex-col items-center gap-1 text-center"
                style={{ top: "50%", left: "50%", transform: "translate(-50%, -54%)" }}>
                <div className="w-[115px] h-[115px] rounded-full bg-[#e82625] flex items-center justify-center shadow-2xl">
                  <span className="text-[20px] font-extrabold text-white">{trustPoints[0].stat}</span>
                </div>
                <p className="text-[11px] font-bold text-[#202020] w-[110px] leading-tight mt-1">{trustPoints[0].label}</p>
              </div>

              {/* LEFT-MID */}
              <div className="absolute flex flex-col items-center gap-1 text-center"
                style={{ top: "70%", left: 10, transform: "translateY(-50%)" }}>
                <div className="w-[90px] h-[90px] rounded-full bg-[#fff5f5] border-[2.5px] border-[#e82625] flex items-center justify-center shadow-md">
                  <span className="text-[16px] font-extrabold text-[#e82625]">{trustPoints[3].stat}</span>
                </div>
                <p className="text-[10px] font-semibold text-[#202020] w-[90px] leading-tight mt-1">{trustPoints[3].label}</p>
              </div>

              {/* RIGHT-MID */}
              <div className="absolute flex flex-col items-center gap-1 text-center"
                style={{ top: "50%", right: 10, transform: "translateY(-50%)" }}>
                <div className="w-[90px] h-[90px] rounded-full bg-white border-[2.5px] border-[#e82625] flex items-center justify-center shadow-md">
                  <span className="text-[16px] font-extrabold text-[#e82625]">{trustPoints[4].stat}</span>
                </div>
                <p className="text-[10px] font-semibold text-[#202020] w-[90px] leading-tight mt-1">{trustPoints[4].label}</p>
              </div>

              {/* BOTTOM-CENTER */}
              <div className="absolute flex flex-col items-center gap-1 text-center"
                style={{ bottom: -20, left: "60%", transform: "translateX(-50%)" }}>
                <div className="w-[90px] h-[90px] rounded-full bg-[#e82625] flex items-center justify-center shadow-lg">
                  <span className="text-[16px] font-extrabold text-white">{trustPoints[5].stat}</span>
                </div>
                <p className="text-[10px] font-semibold text-[#202020] w-[90px] leading-tight mt-1">{trustPoints[5].label}</p>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default TrustSection;
