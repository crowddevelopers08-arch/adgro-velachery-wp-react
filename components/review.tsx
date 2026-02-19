'use client'
 
import React, { useState, useRef } from 'react';
 
const ClinicVideosResponsiveGrid = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
 
  const handleCallNow = () => {
    window.location.href = 'tel:+1234567890';
  };
 
  const videos = [
    {
      id: 1,
      title: "Doctor Explaining Hair Loss Evaluation",
      videoUrl: "/one.mp4", // 🔁 Replace with your actual video path
      duration: "5:30"
    },
    {
      id: 2,
      title: "Regenera Activa Treatment Overview",
      videoUrl: "/two.mp4", // 🔁 Replace with your actual video path
      duration: "8:45"
    },
    {
      id: 3,
      title: "In-Clinic Hair Treatment Process",
      videoUrl: "/three.mp4", // 🔁 Replace with your actual video path
      duration: "6:15"
    },
    {
      id: 4,
      title: "Patient Consultation Experience",
      videoUrl: "/four.mp4", // 🔁 Replace with your actual video path
      duration: "4:45"
    },
    {
      id: 5,
      title: "Advanced Hair Restoration Techniques",
      videoUrl: "/five.mp4", // 🔁 Replace with your actual video path
      duration: "7:20"
    },
    {
      id: 6,
      title: "Post-Treatment Care Guidelines",
      videoUrl: "/six.mp4", // 🔁 Replace with your actual video path
      duration: "5:50"
    }
  ];
 
  const pauseAllVideos = () => {
    videoRefs.current.forEach((ref) => {
      if (ref) ref.pause();
    });
  };
 
  const nextSlide = () => {
    pauseAllVideos();
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(videos.length / 3));
  };
 
  const prevSlide = () => {
    pauseAllVideos();
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(videos.length / 3)) % Math.ceil(videos.length / 3));
  };
 
  const goToSlide = (index: number) => {
    pauseAllVideos();
    setCurrentSlide(index);
  };
 
  // Calculate number of slides needed (3 videos per slide)
  const totalSlides = Math.ceil(videos.length / 3);
  
  // Create slides array
  const slides = [];
  for (let i = 0; i < totalSlides; i++) {
    slides.push(videos.slice(i * 3, i * 3 + 3));
  }
 
  return (
    <section className="py-8 sm:py-10 md:py-10 lg:py-10 max-[470px]:py-6 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-7xl mx-auto">
 
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-5 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-bold text-gray-900 leading-tight mb-3 sm:mb-4">
            The Hair You Want, Made Real
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Results may vary for each individual
          </p>
        </div>
 
        {/* ─── MOBILE CAROUSEL (< lg) ─── */}
        <div className="lg:hidden relative mb-8 sm:mb-10">
          <div className="relative w-full">
            <div className="overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl bg-black">
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  className={`transition-all duration-700 ease-in-out ${
                    index === currentSlide
                      ? 'opacity-100 relative'
                      : 'opacity-0 absolute inset-0 pointer-events-none'
                  }`}
                >
                  {/* Video — Increased height for mobile */}
                  <div 
                    className="relative w-full bg-black" 
                    style={{ 
                      height: '650px' // Increased from 300px to 450px
                    }}
                  >
                    <video
                      ref={(el) => { videoRefs.current[index] = el; }}
                      src={video.videoUrl}
                      className="absolute inset-0 w-full h-full object-cover"
                      controls
                      preload="metadata"
                      playsInline
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              ))}
            </div>
          </div>
 
          {/* Prev / Next Arrows for Mobile */}
          {videos.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-4 top-[45%] -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-[#e82625] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 z-20"
                style={{ backgroundColor: '#f3eeed' }}
                aria-label="Previous video"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
 
              <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-4 top-[45%] -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-[#e82625] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 z-20"
                style={{ backgroundColor: '#f3eeed' }}
                aria-label="Next video"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
 
 
        </div>
 
        {/* ─── DESKTOP CAROUSEL (lg+) — 3 videos per row ─── */}
        <div className="hidden lg:block mb-10 lg:mb-12">
          <div className="relative">
            {/* Slides Wrapper */}
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {/* Map through slides array (each slide contains 3 videos) */}
                {slides.map((slideVideos, slideIndex) => (
                  <div
                    key={slideIndex}
                    className="min-w-full grid grid-cols-3 gap-6 xl:gap-8"
                  >
                    {slideVideos.map((video, videoIndex) => (
                      <div
                        key={video.id}
                        className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                      >
                        {/* Video — 600px height for desktop */}
                        <div className="relative w-full bg-black" style={{ height: '600px' }}>
                          <video
                            ref={(el) => { 
                              // Calculate proper index for videoRefs
                              const globalIndex = slideIndex * 3 + videoIndex + videos.length;
                              videoRefs.current[globalIndex] = el; 
                            }}
                            src={video.videoUrl}
                            className="absolute inset-0 w-full h-full object-cover"
                            controls
                            preload="metadata"
                            playsInline
                          >
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
 
            {/* Desktop Prev / Next Arrows (visible when more than 3 videos) */}
            {videos.length > 3 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-[#e82625] transition-all duration-300 shadow-xl hover:scale-110 z-20"
                  style={{ backgroundColor: '#f3eeed' }}
                  aria-label="Previous"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-[#e82625] transition-all duration-300 shadow-xl hover:scale-110 z-20"
                  style={{ backgroundColor: '#f3eeed' }}
                  aria-label="Next"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            
          </div>
        </div>
 
        {/* ─── CTAs (commented out as in original) ─── */}
        {/* <div className="flex sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6">
          <button
            className="group flex border border-black items-center justify-center gap-2 sm:gap-3 text-black font-bold px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 md:py-4 rounded-lg transition-all duration-300 hover:brightness-110 shadow-lg hover:shadow-xl hover:scale-105 text-sm sm:text-base md:text-lg w-full sm:w-auto max-w-xs sm:max-w-none"
            onClick={() => setIsBookingModalOpen(true)}
          >
            <span>Book Now</span>
          </button>
 
          <a
            href="tel:+919876543210"
            className="group flex items-center justify-center gap-2 sm:gap-3 text-white font-bold px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 md:py-4 rounded-lg transition-all duration-300 hover:brightness-110 shadow-lg hover:shadow-xl hover:scale-105 text-sm sm:text-base md:text-lg w-full sm:w-auto max-w-xs sm:max-w-none"
            style={{ backgroundColor: '#9B7057' }}
            onClick={handleCallNow}
          >
            <span>Call Now</span>
          </a>
        </div> */}
      </div>
    </section>
  );
};
 
export default ClinicVideosResponsiveGrid;