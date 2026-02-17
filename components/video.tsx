"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const images = [
  { src: "/Before-After-1amba.jpg", alt: "Before After 1" },
  { src: "/Before-After-2amba.jpg", alt: "Before After 2" },
  { src: "/Before-After-3amba.jpg", alt: "Before After 3" },
  { src: "/Before-After-4amba.jpg", alt: "Before After 4" },
  { src: "/Before-After-5amba.jpg", alt: "Before After 5" },
  { src: "/Before-After-6amba.jpg", alt: "Before After 6" },
];

const ImageGridCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Update visible items based on screen size - SIMPLIFIED
  useEffect(() => {
    const updateVisibleItems = () => {
      const width = window.innerWidth;
      if (width < 768) { // Mobile
        setVisibleItems(1);
      } else if (width < 1024) { // Tablet
        setVisibleItems(2);
      } else { // Desktop
        setVisibleItems(3);
      }
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide(); // Swipe left
    } else if (distance < -minSwipeDistance) {
      prevSlide(); // Swipe right
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Get images to display based on current index and visible items
  const getDisplayImages = () => {
    const displayImages = [];
    
    for (let i = 0; i < visibleItems; i++) {
      const index = (currentIndex + i) % images.length;
      displayImages.push(images[index]);
    }
    
    return displayImages;
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      <section 
        className="w-full px-4 sm:px-5 md:px-6 lg:px-8 py-6 sm:py-8 md:py-8 lg:py-8"
        style={{fontFamily: "'Outfit', sans-serif"}}
      >
        <div className="max-w-7xl mx-auto"style={{fontFamily: "'Outfit', sans-serif"}}>
          {/* Title */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#ea2424] mb-2 sm:mb-3">
             See What Our Clients Achieved!
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
              Witness the transformation with our proven hair treatments
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Carousel Wrapper */}
            <div 
              ref={carouselRef}
              className="relative overflow-hidden mx-auto"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="flex justify-center items-center gap-4 sm:gap-5 md:gap-6 lg:gap-8 transition-transform duration-500 ease-in-out">
                {getDisplayImages().map((image, index) => (
                  <div
                    key={`${image.src}-${index}`}
                    className={`
                      flex-shrink-0 transition-all duration-300
                      ${visibleItems === 1 ? 'w-full max-w-[300px] sm:max-w-[320px]' : ''}
                      ${visibleItems === 2 ? 'w-[calc(50%-12px)] sm:w-[calc(50%-16px)] max-w-[340px] md:max-w-[360px]' : ''}
                      ${visibleItems === 3 ? 'w-[calc(33.333%-16px)] max-w-[380px]' : ''}
                    `}
                  >
                    <div 
                      className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 mx-auto"
                      style={{
                        border: '3px solid #ea2424',
                        boxShadow: '0 4px 12px rgba(211, 49, 92, 0.15)',
                      }}
                    >
                      {/* MOBILE: Fixed aspect ratio container */}
                      <div className="relative w-full" style={{
                        aspectRatio: '4/3',
                        maxHeight: visibleItems === 1 ? '280px' : 
                                   visibleItems === 2 ? '300px' : '340px'
                      }}>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 300px, (max-width: 768px) 320px, (max-width: 1024px) 360px, 380px"
                        />
                      </div>
                      {/* Pink overlay on hover */}
                      <div className="absolute inset-0 bg-[#ea2424] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons - SIMPLIFIED for mobile */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
              <button
                onClick={prevSlide}
                className={`
                  relative pointer-events-auto
                  bg-[#ea2424]/90 hover:bg-[#ea2424] 
                  p-2 sm:p-3 
                  rounded-full shadow-lg transition-colors z-10
                  ${visibleItems === 1 ? '-left-2 sm:-left-4' : ''}
                  ${visibleItems === 2 ? 'sm:-left-6' : ''}
                  ${visibleItems === 3 ? 'md:-left-8 lg:-left-12' : ''}
                `}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>

              <button
                onClick={nextSlide}
                className={`
                  relative pointer-events-auto
                  bg-[#ea2424]/90 hover:bg-[#ea2424] 
                  p-2 sm:p-3 
                  rounded-full shadow-lg transition-colors z-10
                  ${visibleItems === 1 ? '-right-2 sm:-right-4' : ''}
                  ${visibleItems === 2 ? 'sm:-right-6' : ''}
                  ${visibleItems === 3 ? 'md:-right-8 lg:-right-12' : ''}
                `}
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
            </div>

            {/* Dots Indicator - SIMPLIFIED */}
            <div className="flex justify-center items-center mt-4 sm:mt-6 md:mt-8 space-x-2 sm:space-x-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`
                    w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 
                    ${index === currentIndex 
                      ? "bg-[#ea2424] scale-125" 
                      : "bg-gray-300 hover:bg-gray-400"
                    }
                  `}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ImageGridCarousel;