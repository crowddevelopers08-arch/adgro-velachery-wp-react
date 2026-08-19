import React from "react";

const LegacySection = () => {
  return (
    <section className="w-full relative overflow-hidden">
      {/* Fixed Background Image */}
      <div 
        className="absolute inset-0 bg-fixed bg-center bg-cover bg-no-repeat z-0"
        style={{
          backgroundImage: "url('/header-image.png')", // Replace with your background image path
        }}
      />
      
      {/* Dark Overlay with gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/70 z-10" />
      
      {/* Content */}
      <div className="relative z-20 w-full bg-transparent py-8 md:py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">

          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight md:leading-snug mb-3 md:mb-4">
              No Matter How You Lost Them, <br className="hidden sm:block" />
              We Will Bring Your Hair Back
            </h2>

      <div className="bg-black/40 backdrop-blur-sm p-4 md:p-5 rounded-lg mb-4 md:mb-6 border-l-4 border-[#e82625] shadow-lg">
              <p className="text-gray-100 text-xs sm:text-sm md:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
                Right here in Velachery, Advanced Grohair offers proven hair loss
                solutions to help you regain your confidence. No matter the cause,
                our experienced trichologists have the expertise to bring your hair
                back.
                <br /><br />
                We don't believe in a one-size-fits-all approach. Our trichologists
                analyze your hair and scalp to create a customized treatment plan
                designed to achieve your desired hair goals. All with flexible
                financing options and FDA-approved treatments.
                <br /><br />
                Advanced Grohair hair rejuvenation solutions are powered by years of
                research and cutting-edge technology, ensuring you see the results
                you desire.
              </p>
            </div>

            {/* CTA */}
            <a href="#form">
            <button 
              className="bg-[#e82625] cursor-pointer hover:bg-[#c41e1d] transition text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 rounded-md text-xs sm:text-sm md:text-base font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Book a Consultation
            </button>
            </a>
          </div>

          {/* RIGHT VIDEO - Wistia Embed with natural height */}
          <div className="w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px]">
              {/* Video Container with subtle border effect */}
              <div className="absolute -inset-1 rounded-lg blur opacity-40 group-hover:opacity-60 transition duration-300"></div>
              <div className="relative rounded-lg overflow-hidden shadow-2xl border-2 border-white/20">
                {/* Wistia Embed - Natural video height */}
                <iframe 
                  src="https://fast.wistia.net/embed/iframe/kzx65cjm9t?seo=true&videoFoam=true" 
                  title="AdGrohair Clinic - Hair Regrowth Forever Video" 
                  allow="autoplay; fullscreen" 
                  allowtransparency="true" 
                  frameBorder="0" 
                  scrolling="no" 
                  className="wistia_embed w-full" 
                  name="wistia_embed" 
                  msallowfullscreen 
                  width="480" 
                  height="270"
                  style={{ aspectRatio: '16/9', display: 'block' }}
                />
              </div>
              
              {/* Optional: Video caption for mobile */}
              <p className="text-white/90 text-xs text-center mt-2 lg:hidden">
                Watch our success stories
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Wistia Script - Load once at component level */}
      <script 
        src="https://fast.wistia.net/assets/external/E-v1.js" 
        async
      />
    </section>
  );
};

export default LegacySection;