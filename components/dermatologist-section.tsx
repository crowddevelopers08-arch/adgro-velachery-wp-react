"use client";
import React from "react";

const DermatologistSection = () => {
  return (
    <section
      className="w-full overflow-hidden py-4"
      style={{
        background:
          "linear-gradient(115deg, #fef2f2 0%, #fdf5f5 30%, #fafafa 60%, #f9fafb 100%)",
      }}
    >

      {/* ══════════ MOBILE LAYOUT (hidden on md+) ══════════ */}
      <div className="md:hidden flex flex-col px-5 py-6 gap-4">

        {/* 1. Heading */}
        <h2 className="text-[24px] font-extrabold text-[#202020] leading-tight text-center">
          FUE &amp; DHI Hair Transplant in Chennai —{" "}
          <span className="text-[#e82625]">Permanent. Natural. Yours.</span>
        </h2>

        {/* 2. Subheading */}
        <p className="text-[#e82625] text-[14px] font-semibold text-center">
          Leading Chain Of Hair Clinics in India
        </p>

        {/* 3. Image */}
        <div className="flex justify-center">
          <img
            src="https://res.cloudinary.com/cbqvdlot/image/upload/v1785397756/transparent_c7i4df.png"
            alt="Dermatologists team"
            className="w-auto object-contain"
            style={{ height: "clamp(200px, 60vw, 320px)", mixBlendMode: "multiply" }}
          />
        </div>

        {/* 4. Description */}
        <p className="text-gray-500 text-[13px] leading-[1.8] text-center">
          Stop spending on treatments that only delay the inevitable. A hair transplant at
          Advanced GroHair Velachery gives you a permanent solution — hair that grows from
          your own follicles, in a hairline designed just for you.
        </p>
        <p className="text-gray-500 text-[13px] leading-[1.8] text-center">
          Our surgeons use the latest FUE and DHI techniques, leaving no linear scars and
          requiring just 3–5 days of recovery time. Most patients return to work the
          following week.
        </p>

        {/* 5. Button */}
        <div className="flex justify-center pt-1">
          <a href="#form">
            <button className="bg-[#e82625] hover:bg-[#c41e1d] transition-colors duration-200 text-white font-semibold px-7 py-3 rounded-md text-[14px] shadow-lg">
              View All Doctors
            </button>
          </a>
        </div>

      </div>

      {/* ══════════ DESKTOP LAYOUT (hidden below md) ══════════ */}
      <div className="hidden md:flex flex-row items-stretch max-w-[1400px] mx-auto min-h-[500px]">

        {/* LEFT: image */}
        <div className="relative w-[52%] flex items-end justify-center min-h-[460px] lg:min-h-[520px] overflow-hidden">
          <div
            className="absolute rounded-full"
            style={{
              width: "480px", height: "480px",
              left: "50%", top: "50%",
              transform: "translate(-45%, -50%)",
              border: "32px solid #ccc5b6",
              opacity: 0.35, zIndex: 1,
            }}
          />
          <img
            src="https://res.cloudinary.com/cbqvdlot/image/upload/v1785397756/transparent_c7i4df.png"
            alt="Dermatologists team"
            className="relative z-10 w-auto object-contain object-bottom"
            style={{ height: "430px", maxHeight: "90%", mixBlendMode: "multiply" }}
          />
        </div>

        {/* RIGHT: text */}
        <div className="w-[48%] flex flex-col justify-center px-10 lg:px-14 text-left">
          <h2 className="text-[38px] lg:text-[42px] font-extrabold text-[#202020] leading-tight mb-3">
            FUE &amp; DHI Hair Transplant in Chennai —<br />Permanent. Natural. Yours.
          </h2>
          <p className="text-[#e82625] text-[17px] font-semibold mb-5">
            Leading Chain Of Hair Clinics in India
          </p>
          <p className="text-gray-500 text-[15px] leading-[1.8] mb-3 max-w-[500px]">
            Stop spending on treatments that only delay the inevitable. A hair transplant at
            Advanced GroHair Velachery gives you a permanent solution — hair that grows from
            your own follicles, in a hairline designed just for you.
          </p>
          <p className="text-gray-500 text-[15px] leading-[1.8] mb-8 max-w-[500px]">
            Our surgeons use the latest FUE (Follicular Unit Extraction) and DHI (Direct Hair
            Implantation) techniques, leaving no linear scars and requiring just 3–5 days of
            recovery time. Most patients return to work the following week.
          </p>
          <div>
            <a href="#form">
              <button className="bg-[#e82625] hover:bg-[#c41e1d] transition-colors duration-200 text-white font-semibold px-8 py-[13px] rounded-md text-[15px] tracking-wide shadow-lg">
                View All Doctors
              </button>
            </a>
          </div>
        </div>

      </div>

    </section>
  );
};

export default DermatologistSection;
