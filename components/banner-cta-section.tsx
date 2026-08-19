"use client";
import React, { useEffect, useState } from "react";

const desktopBanners = ["/banners.png", "/banners1.png"];
const mobileBanners = ["/banner-mobile.png", "/mobile-banner1.png", "/mobile-banner3.png",];

const BannerCtaSection = () => {
  const [currentDesktopSlide, setCurrentDesktopSlide] = useState(0);
  const [currentMobileSlide, setCurrentMobileSlide] = useState(0);
  const currentDesktopBanner = desktopBanners[currentDesktopSlide];
  const currentMobileBanner = mobileBanners[currentMobileSlide];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentDesktopSlide((slide) => (slide + 1) % desktopBanners.length);
      setCurrentMobileSlide((slide) => (slide + 1) % mobileBanners.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-white py-0 md:py-0">

      {/* Mobile-specific media queries */}
      <style>{`
        /* 320px — small phones (iPhone SE 1st gen) */
        @media (max-width: 320px) {
          .mobile-btn-primary { width: 130px !important; height: 38px !important; font-size: 10px !important; }
          .mobile-btn-secondary { width: 115px !important; height: 38px !important; font-size: 10px !important; }
          .mobile-btn-row { bottom: 14px !important; gap: 8px !important; }
        }

        /* 375px — standard phones (iPhone 12/13/14) */
        @media (min-width: 321px) and (max-width: 376px) {
          .mobile-btn-primary { width: 148px !important; height: 42px !important; font-size: 11px !important; }
          .mobile-btn-secondary { width: 130px !important; height: 42px !important; font-size: 11px !important; }
          .mobile-btn-row { bottom: 18px !important; gap: 10px !important; }
        }

        /* 430px — large phones (iPhone 14/15 Pro Max) */
        @media (min-width: 376px) and (max-width: 767px) {
          .mobile-btn-primary { width: 165px !important; height: 46px !important; font-size: 13px !important; }
          .mobile-btn-secondary { width: 145px !important; height: 46px !important; font-size: 13px !important; }
          .mobile-btn-row { bottom: 22px !important; gap: 12px !important; }
        }
      `}</style>

      <div className="max-w-[1500px] mx-auto px-0 sm:px-6 lg:px-0">

        {/* ── MOBILE: banner carousel ── */}
        <div className="mobile-banner md:hidden relative aspect-[941/1672] w-full overflow-hidden rounded-2xl bg-white">
          <img
            key={currentMobileBanner}
            src={currentMobileBanner}
            alt="Adgro Hair Clinic Banner"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          {/* Buttons only on slide 0 */}
          <div
            className={`mobile-btn-row absolute left-0 right-0 flex justify-center px-4 transition-opacity duration-300 ${
              currentMobileSlide === 0 ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            style={{ bottom: "20px" }}>
            <a href="#form">
              <button
                className="mobile-btn-primary flex items-center justify-center rounded-[10px] bg-[#e82625] hover:bg-[#c41e1d] transition-colors duration-200 text-white font-bold shadow-2xl"
              >
                Book Free Consultation
              </button>
            </a>
            <a href="tel:+918390856789">
              <button
                className="mobile-btn-secondary flex items-center justify-center gap-1 rounded-[10px] bg-white hover:bg-gray-50 transition-colors duration-200 font-bold shadow-2xl"
                style={{ color: "#e82625" }}
              >
                <svg width="15" height="15" viewBox="0 0 22 22" fill="none">
                  <path d="M4.5 2C4.5 2 2.5 2 2 4C1.5 6 2 10 6 14C10 18 14 18.5 16 18C18 17.5 18 15.5 18 15.5L14.5 12.5L12.5 14.5C12.5 14.5 9.5 13 7.5 11C5.5 9 4 6 4 6L6 4L4.5 2Z"
                    stroke="#e82625" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                Call Us Now
              </button>
            </a>
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
            {mobileBanners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentMobileSlide(i)}
                className={`rounded-full transition-all duration-300 ${
                  currentMobileSlide === i
                    ? "w-4 h-2 bg-[#e82625]"
                    : "w-2 h-2 bg-white opacity-70"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── TABLET: banner carousel ── */}
        <div className="hidden md:block lg:hidden relative w-full overflow-hidden rounded-2xl bg-white">
          <div className="relative aspect-[1448/1086] w-full">
            <img
              key={currentDesktopBanner}
              src={currentDesktopBanner}
              alt="Adgro Hair Clinic Banner"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
          <div
            className={`absolute bottom-[1.5%] left-0 right-0 flex justify-center gap-4 px-6 transition-opacity duration-300 ${
              currentDesktopSlide === 0 ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <a href="#form">
              <button
                className="flex h-[48px] w-[230px] items-center justify-center rounded-[10px] bg-[#e82625] text-[14px] font-bold text-white shadow-2xl transition-colors duration-200 hover:bg-[#c41e1d]"
              >
                Book Free Consultation
              </button>
            </a>
            <a href="tel:+918390856789">
              <button
                className="flex h-[48px] w-[210px] items-center justify-center gap-1 rounded-[10px] bg-white text-[14px] font-bold shadow-2xl transition-colors duration-200 hover:bg-gray-50"
                style={{ color: "#e82625" }}
              >
                <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                  <path d="M4.5 2C4.5 2 2.5 2 2 4C1.5 6 2 10 6 14C10 18 14 18.5 16 18C18 17.5 18 15.5 18 15.5L14.5 12.5L12.5 14.5C12.5 14.5 9.5 13 7.5 11C5.5 9 4 6 4 6L6 4L4.5 2Z"
                    stroke="#e82625" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                Call Us Now
              </button>
            </a>
          </div>
        </div>

        {/* ── DESKTOP: banner carousel ── */}
        <div className="hidden lg:block relative w-full rounded-2xl overflow-hidden" style={{ height: "580px" }}>
          <img
            key={currentDesktopBanner}
            src={currentDesktopBanner}
            alt="Adgro Hair Clinic Banner"
            className="absolute inset-0  w-full object-cover object-center"
          />
          <div
            className={`absolute bottom-10 left-120 right-0 flex justify-center gap-6 transition-opacity duration-300 ${
              currentDesktopSlide === 0 ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <a href="#form">
              <button className="flex items-center justify-center rounded-[10px] bg-[#e82625] hover:bg-[#c41e1d] transition-colors duration-200 text-white font-bold text-[14px] shadow-2xl"
                style={{ width: "230px", height: "50px" }}>
                Book Free Consultation
              </button>
            </a>
            <a href="tel:+918390856789">
              <button className="flex items-center justify-center gap-1 rounded-[10px] bg-white hover:bg-gray-50 transition-colors duration-200 font-bold text-[14px] shadow-2xl"
                style={{ width: "230px", height: "50px", color: "#e82625" }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M4.5 2C4.5 2 2.5 2 2 4C1.5 6 2 10 6 14C10 18 14 18.5 16 18C18 17.5 18 15.5 18 15.5L14.5 12.5L12.5 14.5C12.5 14.5 9.5 13 7.5 11C5.5 9 4 6 4 6L6 4L4.5 2Z"
                    stroke="#e82625" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                Call Us Now
              </button>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BannerCtaSection;