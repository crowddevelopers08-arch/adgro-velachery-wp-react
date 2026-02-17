import React from "react";

const testimonials = [
  {
    text: `I had always struggled with thinning hair, and it affected my confidence. After hearing about Adgro Hair Ambattur, I decided to take the plunge and try their hair transplant services. From the moment I walked into the clinic, I was impressed with the professionalism and care of the team. The procedure was smooth, and the results were life-changing! My hair looks fuller, and I feel more confident than ever. Thank you, Adgro Hair Ambattur, for helping me reclaim my confidence!`,
    name: "- S. R. Vishwa Rajan",
    image: "/Before-After-2amba.jpg",
  },
  {
    text: `I had tried every hair growth product out there with no success, and I was losing hope. Then I found Adgro Hair Ambattur and decided to give their hair transplant a chance. The staff made me feel at ease from the consultation to the procedure. The results have been amazing—my hair looks natural and thick again! I couldn't be happier with the transformation. Thanks to Adgro Hair Ambattur, I'm finally feeling like myself again!`,
    name: "- Adhil Ashik",
    image: "/Before-After-6amba.jpg",
  },
];

const TestimonialCard = () => {
  return (
    <div className="w-full max-w-8xl py-10 max-[470px]:py-6 mx-auto px-4 sm:px-6 lg:px-8">
      {/* HEADER SECTION */}
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[36px] font-semibold text-[#e82625] mb-2 sm:mb-3 md:mb-4 px-2 sm:px-4">
          Discover Why We’re the Trusted Choice of Many!
        </h2>
      </div>

      {/* TESTIMONIAL CARDS */}
      <div className="flex flex-col sm:flex-row justify-center items-stretch gap-4 sm:gap-6 lg:gap-8">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="w-full sm:w-[90%] md:w-[80%] lg:w-[calc(50%-1rem)] xl:w-[calc(50%-1.5rem)] max-w-2xl bg-white rounded-xl border border-gray-200 p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col sm:flex-row items-start gap-4 sm:gap-5 md:gap-6 shadow-sm hover:shadow-md transition-shadow duration-300 h-auto"
          >
            {/* LEFT CONTENT - full height flex column */}
            <div className="flex-1 order-2 sm:order-1 w-full flex flex-col h-full">
              <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed flex-1">
                {item.text}
              </p>

              {/* NAME - sticks to bottom */}
              <div className="mt-auto">
                <p className="mt-3 sm:mt-4 font-semibold text-gray-900 text-xs sm:text-sm md:text-base">
                  {item.name}
                </p>

                {/* STARS */}
                <div className="flex items-center gap-0.5 sm:gap-1 mt-1 sm:mt-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-orange-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE - responsive sizing */}
            <div className="flex-shrink-0 order-1 sm:order-2 mx-auto sm:mx-0 self-start sm:self-start">
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-36 sm:w-36 sm:h-40 md:w-40 md:h-44 lg:w-48 lg:h-56 xl:w-52 max-[470px]:w-[250px] xl:h-60 object-cover rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;