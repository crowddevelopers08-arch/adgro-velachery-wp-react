"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Creative = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    {
      src: "/n2.jpg",
      alt: "Hair Transplant Results - Before and After - Case 1",
      technique: "Advanced Hair Transplant"
    },
    {
      src: "/n4.jpg",
      alt: "Hair Transplant Results - Before and After - Case 2",
      technique: "Advanced Hair Transplant"
    },
    {
      src: "/n1.jpg",
      alt: "Hair Transplant Results - Before and After - Case 3",
      technique: "Advanced Hair Transplant"
    },
        {
      src: "/n3.jpg",
      alt: "Hair Transplant Results - Before and After - Case 2",
      technique: "Advanced Hair Transplant"
    },
    {
      src: "/n5.jpg",
      alt: "Hair Transplant Results - Before and After - Case 3",
      technique: "Advanced Hair Transplant"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative my-20 mt-10 max-[470px]:my-6 w-full max-w-6xl max-[470px]:mt-0 mx-auto bg-white p-4 sm:p-5 md:p-6 rounded-lg md:rounded-xl overflow-hidden"
         style={{
           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), 0 -4px 20px rgba(0, 0, 0, 0.08), 4px 0 20px rgba(0, 0, 0, 0.08), -4px 0 20px rgba(0, 0, 0, 0.08)'
         }}>
      
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-10">
        
        {/* Left Section - Main Content */}
        <div className="flex-1 space-y-4 sm:space-y-5">
          
          <div className="mb-2 sm:mb-3">
            <div className="inline-block px-3 py-1 sm:px-4 sm:py-1 bg-[#e82625] rounded-full shadow-lg">
              <span className="text-white font-bold text-sm sm:text-base">✓ Permanent Solution</span>
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#202020] leading-tight">
            Hair Transplant
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-[#202020]/80 max-w-xl">
            Consider investing in a permanent, hassle-free solution with our hair transplantation procedure. Our advanced techniques ensure natural-looking results with minimal scarring and downtime.
          </p>
          
          <div className="flex flex-wrap gap-3 pt-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#e82625]/10 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#e82625]"></div>
              </div>
              <span className="text-[#202020] text-sm">FUE & DHI Techniques</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#e82625]/10 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#e82625]"></div>
              </div>
              <span className="text-[#202020] text-sm">No Linear Scar</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#e82625]/10 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#e82625]"></div>
              </div>
              <span className="text-[#202020] text-sm">3-5 Days Recovery</span>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="pt-4">
            <a href="#form">
              <button className="bg-[#e82625] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#c41e1d] transition-colors shadow-lg text-sm sm:text-base inline-flex items-center gap-2 group">
                <span>Book Consultation</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </a>
          </div>
        </div>
        
        {/* Right Section - Carousel with increased height */}
        <div className="flex-1 flex justify-center lg:justify-end items-center w-full max-w-md lg:max-w-lg">
          <div className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[450px]">
            {/* Image Carousel - Significantly increased heights */}
            <div className="relative w-full h-[320px] sm:h-[360px] md:h-[400px] lg:h-[440px]">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover rounded-lg shadow-2xl"
                    priority={index === 0}
                    sizes="(max-width: 470px) 320px, (max-width: 640px) 360px, (max-width: 768px) 400px, 450px"
                  />
                </div>
              ))}
            </div>
            
            {/* Dynamic Technique Badge - Adjusted position for larger image */}
            <div className="absolute -top-3 -right-3 bg-[#e82625] text-white text-xs sm:text-sm font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg transition-opacity duration-500">
              {images[currentImageIndex].technique}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Banner */}
      <div className="relative z-10 mt-6 sm:mt-8 pt-4 border-t border-[#202020]/10">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <p className="text-[#202020]/80 text-xs sm:text-sm font-medium">
            Adgro Ambattur | Chennai
          </p>
          <p className="text-[#202020]/80 text-xs sm:text-sm font-medium flex items-center gap-1">
            <span className="text-[#e82625]">✓</span> Free Consultation
          </p>
          <p className="text-[#202020]/80 text-xs sm:text-sm font-medium flex items-center gap-1">
            <span className="text-[#e82625]">✓</span> EMI Available
          </p>
        </div>
      </div>
      
      {/* Carousel Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'w-6 bg-[#e82625]' 
                : 'bg-[#202020]/20 hover:bg-[#202020]/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Creative;