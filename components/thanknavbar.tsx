// components/GrohairTopBar.tsx
"use client";

import Image from "next/image";

type Props = {
  logoSrc?: string;
  phone?: string;   // "+91 7409256789"
  buttonText?: string; // "Call Now"
};

export default function ThankTopBar({
  logoSrc = "/ambatur-logo.jpg",
  phone = "+91 8390856789",
  buttonText = "Call Now",
}: Props) {
  const telHref = `tel:${phone.replace(/\s+/g, "")}`;

  const handleCallClick = () => {
    // onClick call
    window.location.href = telHref;
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      {/* Spacer - Adjusted for larger logo on desktop */}
      <div className="h-[70px] xs:h-[75px] sm:h-[80px] md:h-[85px] lg:h-[90px] xl:h-[95px] 2xl:h-[100px]" style={{fontFamily: "'Outfit', sans-serif"}}/>

      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white border-b border-gray-100">
        <div className="mx-auto w-full max-w-screen-2xl px-4 xs:px-5 sm:px-6 md:px-10 lg:px-20 xl:px-28 2xl:px-36">
          <div className="flex items-center justify-between py-3 xs:py-3.5 sm:py-4 md:py-4 lg:py-4.5 xl:py-5 2xl:py-5.5">
            {/* Left: Logo - Significantly larger on larger screens */}
            <div className="flex items-center">
              <div className="relative h-[55px] w-[180px] xs:h-[48px] xs:w-[170px] 
                                sm:h-[50px] sm:w-[180px] md:h-[55px] md:w-[200px] 
                                lg:h-[65px] lg:w-[250px] xl:h-[75px] xl:w-[300px] 
                                2xl:h-[85px] 2xl:w-[350px]">
                <Image
                  src={logoSrc}
                  alt="Advanced GloSkin"
                  fill
                  priority
                  sizes="(max-width: 640px) 180px, (max-width: 768px) 170px, (max-width: 1024px) 180px, (max-width: 1280px) 200px, (max-width: 1536px) 300px, 350px"
                  className="object-contain object-left"
                />
              </div>
            </div>

            {/* Right: Call Now button - Oval/Pill shape */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={handleCallClick}
                aria-label={`Call ${phone}`}
                className="
                  inline-flex items-center justify-center
                  text-white font-bold
                  whitespace-nowrap
                  transition-all duration-200
                  hover:scale-[1.03]
                  active:scale-[0.98]
                  hover:shadow-lg
                  px-6 py-2.5
                  xs:px-6 xs:py-2.5
                  sm:px-7 sm:py-3
                  md:px-6 md:py-2.5
                  lg:px-6 lg:py-2.5
                  xl:px-6 xl:py-2.5
                  2xl:px-7 2xl:py-3
                "
                style={{
                  backgroundColor: "#e72528",
                  borderRadius: "9999px", // This creates the oval/pill shape
                }}
              >
                {/* Phone icon - Reduced on desktop */}
                <svg
                  className="
                    w-4 h-4
                    xs:w-4 xs:h-4
                    sm:w-4.5 sm:h-4.5
                    md:w-4 md:h-4
                    lg:w-4 lg:h-4
                    xl:w-4 xl:h-4
                    2xl:w-4.5 2xl:h-4.5
                    mr-2 xs:mr-2 sm:mr-2.5 md:mr-2 lg:mr-2 xl:mr-2 2xl:mr-2.5
                  "
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6.6 10.8c1.6 3.1 3.5 5 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.9.6.6 0 1 .4 1 1V21c0 .6-.4 1-1 1C10.4 22 2 13.6 2 3c0-.6.4-1 1-1h4.2c.6 0 1 .4 1 1 0 1.4.2 2.7.6 3.9.1.4 0 .8-.3 1.1L6.6 10.8Z"
                    fill="currentColor"
                  />
                </svg>

                <span className="
                  text-sm xs:text-base sm:text-lg md:text-base lg:text-base xl:text-base 2xl:text-lg
                  font-semibold
                ">
                  {buttonText}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}