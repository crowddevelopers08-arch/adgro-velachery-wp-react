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

  // For mobile: 1 video per slide
  const videosPerSlideMobile = 1;
  const totalMobileSlides = videos.length;

  // For desktop: 3 videos per slide
  const videosPerSlideDesktop = 3;
  const totalDesktopSlides = Math.ceil(videos.length / videosPerSlideDesktop);

  const nextSlide = () => {
    pauseAllVideos();
    setCurrentSlide((prev) => (prev + 1) % totalMobileSlides);
  };

  const prevSlide = () => {
    pauseAllVideos();
    setCurrentSlide((prev) => (prev - 1 + totalMobileSlides) % totalMobileSlides);
  };

  const nextSlideDesktop = () => {
    pauseAllVideos();
    setCurrentSlide((prev) => (prev + 1) % totalDesktopSlides);
  };

  const prevSlideDesktop = () => {
    pauseAllVideos();
    setCurrentSlide((prev) => (prev - 1 + totalDesktopSlides) % totalDesktopSlides);
  };

  const goToSlide = (index: number) => {
    pauseAllVideos();
    setCurrentSlide(index);
  };

  // Create mobile slides array (1 video per slide)
  const mobileSlides = videos.map(video => [video]);

  // Create desktop slides array (3 videos per slide)
  const desktopSlides = [];
  for (let i = 0; i < totalDesktopSlides; i++) {
    desktopSlides.push(videos.slice(i * videosPerSlideDesktop, i * videosPerSlideDesktop + videosPerSlideDesktop));
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

        {/* ─── MOBILE CAROUSEL (< lg) — 1 video per slide ─── */}
        <div className="lg:hidden relative mb-8 sm:mb-10">
          <div className="relative w-full">
            <div className="overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl bg-black">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {mobileSlides.map((slideVideos, slideIndex) => (
                  <div
                    key={slideIndex}
                    className="min-w-full"
                  >
                    {slideVideos.map((video, videoIndex) => (
                      <div
                        key={video.id}
                        className="bg-white rounded-xl overflow-hidden"
                      >
                        <div className="relative w-full bg-black" style={{ height: '500px' }}>
                          <video
                            ref={(el) => {
                              const globalIndex = slideIndex;
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
                        
                        {/* Optional: Add video title/caption */}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Navigation Arrows */}
            {videos.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-[#e82625] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 z-20"
                  style={{ backgroundColor: '#f3eeed' }}
                  aria-label="Previous video"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-[#e82625] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 z-20"
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
        </div>

        {/* ─── DESKTOP CAROUSEL (lg+) — 3 videos per slide ─── */}
        <div className="hidden lg:block mb-10 lg:mb-12">
          <div className="relative">
            {/* Slides Wrapper */}
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {desktopSlides.map((slideVideos, slideIndex) => (
                  <div
                    key={slideIndex}
                    className="min-w-full grid grid-cols-3 gap-6 pb-[10px] xl:gap-8"
                  >
                    {slideVideos.map((video, videoIndex) => (
                      <div
                        key={video.id}
                        className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                      >
                        <div className="relative w-full bg-black" style={{ height: '600px' }}>
                          <video
                            ref={(el) => { 
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

            {/* Desktop Navigation Arrows */}
            {videos.length > 3 && (
              <>
                <button
                  onClick={prevSlideDesktop}
                  className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-[#e82625] transition-all duration-300 shadow-xl hover:scale-110 z-20"
                  style={{ backgroundColor: '#f3eeed' }}
                  aria-label="Previous"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlideDesktop}
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
      </div>
    </section>
  );
};

export default ClinicVideosResponsiveGrid;