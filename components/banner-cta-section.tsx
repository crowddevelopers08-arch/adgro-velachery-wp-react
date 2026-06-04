"use client";
import React from "react";

const BannerCtaSection = () => {
  return (
    <section className="w-full bg-white py-0 md:py-0">

      {/* Mobile-specific media queries */}
      <style>{`
        /* 320px — small phones (iPhone SE 1st gen) */
        @media (max-width: 320px) {
          .mobile-banner { height: 550px !important; }
          .mobile-btn-primary { width: 130px !important; height: 38px !important; font-size: 10px !important; }
          .mobile-btn-secondary { width: 115px !important; height: 38px !important; font-size: 10px !important; }
          .mobile-btn-row { bottom: 14px !important; gap: 8px !important; }
        }

        /* 375px — standard phones (iPhone 12/13/14) */
        @media (min-width: 321px) and (max-width: 376px) {
          .mobile-banner { height: 650px !important; }
          .mobile-btn-primary { width: 148px !important; height: 42px !important; font-size: 11px !important; }
          .mobile-btn-secondary { width: 130px !important; height: 42px !important; font-size: 11px !important; }
          .mobile-btn-row { bottom: 18px !important; gap: 10px !important; }
        }

        /* 430px — large phones (iPhone 14/15 Pro Max) */
        @media (min-width: 376px) and (max-width: 767px) {
          .mobile-banner { height: 700px !important; }
          .mobile-btn-primary { width: 165px !important; height: 46px !important; font-size: 13px !important; }
          .mobile-btn-secondary { width: 145px !important; height: 46px !important; font-size: 13px !important; }
          .mobile-btn-row { bottom: 22px !important; gap: 12px !important; }
        }
      `}</style>

      <div className="max-w-[1500px] mx-auto px-0 sm:px-6 lg:px-0">

        {/* ── MOBILE: banner-mobile.png ── */}
        <div className="mobile-banner md:hidden relative w-full rounded-2xl overflow-hidden">
          <img
            src="/banner-mobile.png"
            alt="Adgro Hair Clinic Banner"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="mobile-btn-row absolute left-0 right-0 flex justify-center px-4"
            style={{ bottom: "20px" }}>
            <a href="#form">
              <button
                className="mobile-btn-primary flex items-center justify-center rounded-[10px] bg-[#e82625] hover:bg-[#c41e1d] transition-colors duration-200 text-white font-bold shadow-2xl"
              >
                Book Free Consultation
              </button>
            </a>
            <a href="tel:+918000000000">
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
        </div>

        {/* ── DESKTOP: banners.png ── */}
        <div className="hidden md:block relative w-full rounded-2xl overflow-hidden" style={{ height: "580px" }}>
          <img
            src="/banners.png"
            alt="Adgro Hair Clinic Banner"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute bottom-15 left-120 right-0 flex justify-center gap-6">
            <a href="#form">
              <button className="flex items-center justify-center rounded-[10px] bg-[#e82625] hover:bg-[#c41e1d] transition-colors duration-200 text-white font-bold text-[14px] shadow-2xl"
                style={{ width: "230px", height: "50px" }}>
                Book Free Consultation
              </button>
            </a>
            <a href="tel:+918000000000">
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
