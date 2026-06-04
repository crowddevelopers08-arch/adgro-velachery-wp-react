"use client";
import React, { useState } from "react";

type Tab = "Skin" | "Hair" | "Body";

const tabData: Record<
  Tab,
  {
    description: string;
    highlight: string;
    treatments: { name: string; image: string }[];
  }
> = {
  Hair: {
    description:
      "We offer effective hair care treatments designed to address ",
    highlight: "hair thinning and hair loss.",
    treatments: [
      { name: "Hair Loss Treatment", image: "/hair-loss-stage-.jpg" },
      { name: "PRP Hair Treatment", image: "/GFC.jpg" },
      { name: "Hair Transplant Treatment", image: "/hairtransplant.jpg" },
    ],
  },
  Skin: {
    description:
      "We provide advanced skin care treatments designed to address ",
    highlight: "pigmentation, ageing, and acne.",
    treatments: [
      { name: "Pigmentation Treatment", image: "/pigmentation.jpg" },
      { name: "Laser Treatment", image: "/laser.jpg" },
      { name: "Yellow Peel Treatment", image: "/Yellow-Peel.jpg" },
    ],
  },
  Body: {
    description:
      "We deliver comprehensive body care treatments designed to address ",
    highlight: "hair removal, body contouring, and skin rejuvenation.",
    treatments: [
      { name: "Mesotherapy", image: "/Mesotherapy.png" },
      { name: "Oxygen Laser Therapy", image: "/Oxygen-Laser-Theraphy.png" },
      { name: "Hair Transplant Surgery", image: "/Hair-transplant-surger.jpg" },
    ],
  },
};

const TABS: Tab[] = ["Skin", "Hair", "Body"];

const OurTreatmentsSection = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Hair");
  const current = tabData[activeTab];

  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6">

        {/* ── Title ── */}
        <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-extrabold text-gray-900 text-center mb-7">
          Our Treatments
        </h2>

        {/* ── Tab bar ── */}
        <div className="flex justify-center mb-8">
          <div
            className="flex rounded-md overflow-hidden"
            style={{ border: "1.5px solid #d1d5db" }}
          >
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-10 sm:px-14 py-2.5 text-[15px] font-bold transition-colors duration-200 focus:outline-none
                  ${activeTab === tab
                    ? "bg-[#e82625] text-white"
                    : "bg-white text-gray-800 hover:bg-gray-50"
                  }`}
                style={{
                  borderRight: tab !== "Body" ? "1.5px solid #d1d5db" : "none",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ── Description ── */}
        <p className="text-center text-gray-700 text-sm sm:text-[15px] leading-relaxed max-w-[820px] mx-auto mb-10">
          {current.description}
          <span className="text-[#e82625] font-medium">{current.highlight}</span>
          {" "}Discover the power of expert care and proven techniques that provide safe,
          lasting results. Our dermatologists tailor treatments to meet your specific needs.
        </p>

        {/* ── Treatment cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 justify-items-center">
          {current.treatments.map((item) => (
            <div key={item.name} className="flex flex-col items-center gap-4">

              {/* Circle image */}
              <div className="relative">
                <div
                  className="rounded-full overflow-hidden flex items-center justify-center"
                  style={{
                    width: "260px",
                    height: "260px",
                    background: "#e8f8f8",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Arrow button — bottom center of circle */}
                <a href="#form">
                  <button
                    className="absolute left-1/2 -translate-x-1/2 bottom-3 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors duration-200"
                    style={{ background: "#e82625" }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 9H15M15 9L10 4M15 9L10 14"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </a>
              </div>

              {/* Label */}
              <p className="text-gray-900 text-[15px] font-medium text-center">
                {item.name}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurTreatmentsSection;
