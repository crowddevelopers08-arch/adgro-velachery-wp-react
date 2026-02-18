"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BeforeAfterSection = () => {
  const [activeOverlay, setActiveOverlay] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const combinedImages = [
    {
      id: 1,
      image: "/Slide-1.png",
      title: "Male Pattern Hair Loss",
      description: "6 months after PRP + QR 678 treatment",
      beforeLabel: "Before Treatment",
      afterLabel: "After 6 Months"
    },
    {
      id: 2,
      image: "/Slide-2.png",
      title: "Female Hair Thinning",
      description: "4 months after GFC therapy",
      beforeLabel: "Before Treatment",
      afterLabel: "After 4 Months"
    },
    {
      id: 3,
      image: "/Slide-3.png",
      title: "Traction Alopecia",
      description: "8 weeks after laser therapy",
      beforeLabel: "Before Treatment",
      afterLabel: "After 8 Weeks"
    },
    // {
    //   id: 4,
    //   image: "/before-after-4.jpg",
    //   title: "Hair Density Improvement",
    //   description: "5 months after combined treatment",
    //   beforeLabel: "Before Treatment",
    //   afterLabel: "After 5 Months"
    // }
  ];

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Carousel navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % combinedImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + combinedImages.length) % combinedImages.length);
  };

  // Auto-rotate carousel on mobile
  useEffect(() => {
    if (!isMobile || isHovering) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isMobile, currentSlide, isHovering]);

  // Handle form open/close
  const handleOpenForm = () => {
    setShowForm(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseForm = () => {
    setShowForm(false);
    document.body.style.overflow = 'auto';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(232, 38, 37, 0.3)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const arrowVariants = {
    hover: {
      x: -3,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.5
      }
    }
  };

  const carouselButtonVariants = {
    hover: {
      scale: 1.1,
      backgroundColor: "rgba(255, 255, 255, 1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    tap: {
      scale: 0.9
    }
  };

  return (
    <>
      {/* Form Modal Overlay */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCloseForm}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <ConsultationForm onClose={handleCloseForm} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full bg-white py-10 max-[470px]:py-6 md:py-10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12 max-[470px]:mb-0"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#101828] mb-3 md:mb-4"
            >
             Patient Results
            </motion.h2>
            {/* <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm sm:text-base md:text-lg text-[#6b7280] max-w-3xl mx-auto px-2"
            >
              See how ISMO's advanced hair treatments helped our clients reduce hair thinning and improve hair density.
            </motion.p> */}
          </motion.div>

          {/* Desktop Grid (4 columns) - INCREASED IMAGE HEIGHT */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12"
          >
            {combinedImages.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                custom={index}
                className="bg-[#fff7f1] rounded-lg overflow-hidden shadow-lg group"
                onMouseEnter={() => {
                  setActiveOverlay(item.id);
                  setIsHovering(true);
                }}
                onMouseLeave={() => {
                  setActiveOverlay(null);
                  setIsHovering(false);
                }}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                {/* Combined Image Container with Increased Height */}
                <div className="relative h-64 lg:h-82 overflow-hidden rounded-t-lg">
                  {/* Combined Before/After Image */}
                  <motion.img
                    variants={imageVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true }}
                    src={item.image}
                    alt={`Before/After - ${item.title}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Hover Overlay Effect */}
                  <AnimatePresence>
                    {activeOverlay === item.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-r from-[#e82625]/30 via-transparent to-[#e82625]/30"
                      >
                        {/* Center Arrow Indicator */}
                        {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <motion.div
                            animate={{ rotate: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-xl"
                          >
                            <svg className="w-5 h-5 text-[#e82625]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                            </svg>
                          </motion.div>
                        </div> */}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Carousel - INCREASED IMAGE HEIGHT */}
          <div className="md:hidden relative mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative h-96 overflow-hidden rounded-lg"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Carousel Container */}
              <div 
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {combinedImages.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="w-full flex-shrink-0 h-full"
                  >
                    <div className="relative h-full w-full overflow-hidden">
                      {/* Combined Image */}
                      <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        src={item.image}
                        alt={`Before/After - ${item.title}`}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Center Divider */}
                      {/* <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-white/80">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        >
                          <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg">
                            <svg className="w-4 h-4 text-[#e82625]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                            </svg>
                          </div>
                        </motion.div>
                      </div> */}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Carousel Navigation Buttons - Larger */}
              <motion.button
                variants={carouselButtonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 text-[#e82625] w-10 h-10 flex items-center justify-center rounded-full shadow-lg"
                aria-label="Previous image"
              >
                <motion.div variants={arrowVariants} whileHover="hover">
                  <ChevronLeft className="w-6 h-6" />
                </motion.div>
              </motion.button>
              
              <motion.button
                variants={carouselButtonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 text-[#e82625] w-10 h-10 flex items-center justify-center rounded-full shadow-lg"
                aria-label="Next image"
              >
                <motion.div variants={arrowVariants} whileHover="hover">
                  <ChevronRight className="w-6 h-6" />
                </motion.div>
              </motion.button>

              {/* Carousel Indicators */}
              {/* <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {combinedImages.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full ${
                      currentSlide === index ? 'bg-[#e82625]' : 'bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    animate={{
                      width: currentSlide === index ? 20 : 10,
                      height: currentSlide === index ? 10 : 10,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                  />
                ))}
              </div> */}
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            {/* <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-sm sm:text-base md:text-lg text-[#6b7280] mb-4 md:mb-6 max-w-3xl mx-auto px-2"
            >
              Want similar results? Book your hair diagnosis session with ISMO experts today.
            </motion.p> */}
            <a href="#form">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="bg-[#e82625] cursor-pointer text-white px-10 sm:px-12 py-3.5 sm:py-4 text-sm sm:text-base md:text-lg font-medium hover:bg-[#d01d1c] transition-all duration-300 rounded-full shadow-[0_10px_25px_rgba(232,38,37,0.25)] relative overflow-hidden"
            >
              <motion.span
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
              <span className="relative">BOOK CONSULTATION</span>
            </motion.button>
            </a>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default BeforeAfterSection;