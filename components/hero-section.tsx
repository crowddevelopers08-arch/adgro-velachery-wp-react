"use client";
import React, { useState, useEffect } from "react";

const IVFHeroExact = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Array of images for the carousel
  const carouselImages = [
    {
      src: "/Slide-1.png",
      alt: "Happy Family"
    },
    {
      src: "/Slide-2.png", // Replace with your actual image path
      alt: "Happy Patient 2"
    },
    {
      src: "/Slide-3.png", // Replace with your actual image path
      alt: "Happy Patient 3"
    },
    {
      src: "/Slide-2.png", // Replace with your actual image path
      alt: "Happy Patient 4"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, [carouselImages.length]);

  // Manual navigation functions
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  return (
   <section className="w-full py-20 max-[470px]:py-4 bg-gradient-to-r from-[#f9fafb] to-[#fef2f2] flex items-center">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[100px] items-center py-8 max-[470px]:py-4 md:py-0">

        {/* LEFT CONTENT - Desktop */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          {/* Heading */}
      <h1 className="relative text-[32px] sm:text-[36px] md:text-[40px] lg:text-[44px] leading-[1.2] lg:leading-[1.15] font-extrabold mb-4 lg:mb-6">
  <span className="relative z-10 bg-gradient-to-r from-[#1f2430] to-[#e82625] bg-clip-text text-transparent inline-block max-w-full">
    Unlock Remarkable Hair
    <br className="hidden sm:block" />
    Results and Turn Heads
    <br className="hidden sm:block" />
    Like Never Before
  </span>
</h1>

          {/* Description */}
     <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-2 lg:mb-4 max-w-[560px] mx-auto lg:mx-0">
  <span className="bg-[#e82625]/10 text-[#e82625] px-4 py-1.5 rounded-full text-[16px] sm:text-[18px] font-medium">
    Natural Hairline
  </span>
  <span className="bg-[#e82625]/10 text-[#e82625] px-4 py-1.5 rounded-full text-[16px] sm:text-[18px] font-medium">
    Proven Solutions
  </span>
  <span className="bg-[#e82625]/10 text-[#e82625] px-4 py-1.5 rounded-full text-[16px] sm:text-[18px] font-medium">
    0% EMI
  </span>
</div>
          {/* Small Image below paragraph - Responsive for all screens */}
          <div className="flex justify-center lg:justify-start mb-4 lg:mb-6 max-[470px]:mb-6">
            <div className="overflow-hidden rounded-[16px] w-full max-[470px]:h-22 max-w-[350px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[400px] h-[70px] sm:h-[80px] md:h-[90px] lg:h-[100px]">
              <img
                src="/add.png"
                alt="Additional Information"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* RIGHT IMAGE BLOCK - Mobile Only (between para and stats) */}
   {/* RIGHT IMAGE BLOCK - Mobile Only (between para and stats) */}
<div className="lg:hidden order-1 relative flex justify-center max-[470px]:mb-4 mb-8">
  {/* Carousel Container for Mobile */}
  <div className="relative w-full max-w-[450px] sm:max-w-[520px]">
    {/* Images - Increased height for mobile */}
    <div className="overflow-hidden rounded-[20px] w-full h-[320px] sm:h-[350px] md:h-[380px]">
      {carouselImages.map((image, index) => (
        <div
          key={index}
          className={`w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? "block" : "hidden"
          }`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>

    {/* Navigation Dots */}
    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
      {carouselImages.map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`w-2 h-2 rounded-full transition-all ${
            index === currentSlide
              ? "w-4 bg-[#e82625]"
              : "bg-white/70 hover:bg-white"
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>

    {/* Navigation Arrows (Optional for mobile) */}
    <button
      onClick={goToPrevious}
      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
      aria-label="Previous image"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#e82625]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      onClick={goToNext}
      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
      aria-label="Next image"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#e82625]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</div>

          {/* Stats */}
          <div className="relative">
            {/* Top horizontal line - hidden on mobile, shown on sm and above */}
            <div className="hidden sm:block absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d1d5db] to-transparent"></div>
            
 <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 sm:gap-6 py-1 sm:py-1 mb-4 lg:mb-4 max-[470px]:mb-3">
  <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
    <div className="relative inline-flex items-center justify-center mb-1">
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-[#e82625] border-t-gray-200 animate-spin-slow"></div>
      <p className="absolute text-[18px] sm:text-[20px] font-bold text-[#e82625]">90%</p>
    </div>
    <p className="text-[12px] sm:text-[13px] md:text-[14px] text-[#6b7280] font-medium leading-tight">
      Healthy Hair Growth
    </p>
  </div>
  <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
    <div className="relative inline-flex items-center justify-center mb-1">
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-[#e82625] border-t-gray-200 animate-spin-slow"></div>
      <p className="absolute text-[18px] sm:text-[20px] font-bold text-[#e82625]">96%</p>
    </div>
    <p className="text-[12px] sm:text-[13px] md:text-[14px] text-[#6b7280] font-medium leading-tight">
      Decrease in Dandruff
    </p>
  </div>
  <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
    <div className="relative inline-flex items-center justify-center mb-1">
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-[#e82625] border-t-gray-200 animate-spin-slow"></div>
      <p className="absolute text-[18px] sm:text-[20px] font-bold text-[#e82625]">93%</p>
    </div>
    <p className="text-[12px] sm:text-[13px] md:text-[14px] text-[#6b7280] font-medium leading-tight">
      Decrease in Hair Fall
    </p>
  </div>
</div>

<style jsx>{`
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 3s linear infinite;
  }
`}</style>
            
            {/* Bottom horizontal line - hidden on mobile, shown on sm and above */}
            <div className="hidden sm:block absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d1d5db] to-transparent"></div>
          </div>
          
          {/* CTA Buttons with Anchor Tags */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-10 justify-center lg:justify-start">
            <a 
              href="#form" 
              className="w-full max-w-[280px] xs:max-w-[300px] sm:w-auto sm:max-w-none"
            >
              <button className="w-full cursor-pointer bg-[#e82625] text-white text-[15px] sm:text-[16px] font-semibold px-8 sm:px-10 py-3 sm:py-[15px] rounded-full shadow-[0_10px_30px_rgba(232,38,37,0.35)] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                Book a Consultation
                <span className="text-lg">↗</span>
              </button>
            </a>
            <a 
              href="tel:+918390856789" 
              className="w-full max-w-[280px] xs:max-w-[300px] sm:w-auto sm:max-w-none"
            >
              <button className="w-full cursor-pointer bg-[#e82625] text-white text-[15px] sm:text-[16px] font-semibold px-8 sm:px-10 py-3 sm:py-[15px] rounded-full shadow-[0_10px_30px_rgba(232,38,37,0.35)] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                Get Started Today!
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </button>
            </a>
          </div>
        </div>

        {/* RIGHT IMAGE BLOCK - Desktop Only with Carousel */}
        <div className="hidden lg:flex order-1 lg:order-2 relative justify-center lg:justify-end">
          {/* Carousel Container for Desktop */}
          <div className="relative w-full max-w-[650px]">
            {/* Images */}
            <div className="overflow-hidden rounded-[28px] w-full h-[450px]">
              {carouselImages.map((image, index) => (
                <div
                  key={index}
                  className={`w-full h-full transition-opacity duration-500 ${
                    index === currentSlide ? "block" : "hidden"
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            {/* <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? "w-6 bg-[#e82625]"
                      : "bg-white/70 hover:bg-white"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div> */}

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e82625]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e82625]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default IVFHeroExact;