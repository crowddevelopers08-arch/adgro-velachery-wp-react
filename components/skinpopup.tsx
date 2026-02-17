import React from "react";

const WhoWeAreSection = () => {
  return (
    <section className="w-full bg-gradient-to-r from-[#f9fafb] to-[#fef2f2] py-10 max-[470px]:py-6 md:py-10 lg:py-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">

        {/* LEFT IMAGE BLOCK */}
        <div className="relative w-full order-1 lg:order-1">
          
          {/* IMAGE */}
          <div className="w-full h-[250px] sm:h-[320px] md:h-[380px] lg:h-[450px] overflow-hidden rounded-[24px] sm:rounded-[28px] md:rounded-[32px] lg:rounded-[36px] shadow-xl">
            <img
              src="/Logo-Box.png"
              alt="Advanced Grohair Team"
              className="w-full h-full object-cover"
            />
          </div>

          {/* BADGE */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white rounded-full shadow-lg px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 flex flex-col items-center">
            <span className="text-base sm:text-lg md:text-xl font-extrabold" style={{ color: '#e82625' }}>2000+</span>
            <span className="text-[8px] sm:text-[9px] md:text-[10px] tracking-widest text-gray-500">
              TRANSFORMATIONS
            </span>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="order-2 lg:order-2">

          {/* SMALL LABEL */}
          <p className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 text-center lg:text-left" style={{ color: '#e82625' }}>
            Why Advanced Grohair?
          </p>

          {/* HEADING */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-4 sm:mb-5 md:mb-6 text-gray-900 text-center lg:text-left">
            We're at the forefront of hair <br className="hidden sm:block lg:block" />
            restoration, committed to <br className="hidden sm:block lg:block" />
            changing lives.
          </h2>

          {/* DESCRIPTION */}
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-7 md:mb-8 max-w-xl mx-auto lg:mx-0 text-center lg:text-left leading-relaxed">
            Don't settle for mere treatments; anticipate transformations. 
            We're not just about fixing hair loss; we're here to restore 
            your confidence and make your dream hair a reality.
          </p>

          {/* CHECKLIST */}
          <div className="flex justify-center lg:justify-start w-full">
<div className="grid grid-cols-2 sm:grid-cols-2 gap-x-3 md:gap-x-4 lg:gap-x-6 gap-y-3 sm:gap-y-4 mb-8 sm:mb-9 md:mb-10">
  <div className="flex items-start gap-1.5 sm:gap-2 justify-start lg:justify-start">
    <span className="text-sm sm:text-base md:text-lg flex-shrink-0 mt-0.5" style={{ color: '#e82625' }}>✔</span>
    <p className="text-xs sm:text-sm text-gray-700 font-medium leading-tight text-left">
      2000+ Hair Transformations
    </p>
  </div>

  <div className="flex items-start gap-1.5 sm:gap-2 justify-start lg:justify-start">
    <span className="text-sm sm:text-base md:text-lg flex-shrink-0 mt-0.5" style={{ color: '#e82625' }}>✔</span>
    <p className="text-xs sm:text-sm text-gray-700 font-medium leading-tight text-left">
      Board Certified Experts
    </p>
  </div>

  <div className="flex items-start gap-1.5 sm:gap-2 justify-start lg:justify-start">
    <span className="text-sm sm:text-base md:text-lg flex-shrink-0 mt-0.5" style={{ color: '#e82625' }}>✔</span>
    <p className="text-xs sm:text-sm text-gray-700 font-medium leading-tight text-left">
      FDA-Approved Equipment
    </p>
  </div>

  <div className="flex items-start gap-1.5 sm:gap-2 justify-start lg:justify-start">
    <span className="text-sm sm:text-base md:text-lg flex-shrink-0 mt-0.5" style={{ color: '#e82625' }}>✔</span>
    <p className="text-xs sm:text-sm text-gray-700 font-medium leading-tight text-left">
      24/7 Support
    </p>
  </div>

  <div className="flex items-start gap-1.5 sm:gap-2 justify-start lg:justify-start">
    <span className="text-sm sm:text-base md:text-lg flex-shrink-0 mt-0.5" style={{ color: '#e82625' }}>✔</span>
    <p className="text-xs sm:text-sm text-gray-700 font-medium leading-tight text-left">
      No Cost EMI
    </p>
  </div>

  <div className="flex items-start gap-1.5 sm:gap-2 justify-start lg:justify-start">
    <span className="text-sm sm:text-base md:text-lg flex-shrink-0 mt-0.5" style={{ color: '#e82625' }}>✔</span>
    <p className="text-xs sm:text-sm text-gray-700 font-medium leading-tight text-left">
      60+ Clinics Nationwide
    </p>
  </div>
</div>
</div>

          {/* CTA */}
          <div className="flex justify-center lg:justify-start">
            <a href="#form">
            <button 
              className="text-white cursor-pointer px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition hover:opacity-90 shadow-lg w-full sm:w-auto max-w-[250px] sm:max-w-none"
              style={{ backgroundColor: '#e82625' }}
            >
              Book a Consultation
            </button>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;