"use client";
import React, { useState } from "react";

const faqs = [
  {
    question: "How much does a hair transplant cost in Chennai?",
    answer:
      "Hair transplant costs in Chennai vary based on the number of grafts needed and the technique used (FUE or DHI). At Advanced GroHair, we offer transparent pricing with no-cost EMI options — so you know exactly what you're paying for before you begin. Book a free consultation to get a personalised estimate.",
  },
  {
    question: "What's the difference between FUE and DHI hair transplant?",
    answer:
      "FUE involves extracting individual hair follicles and implanting them in thinning areas. DHI uses a specialised implanter pen for more precise placement and denser results. Our surgeons will recommend the right technique based on your hair loss pattern and donor availability.",
  },
  {
    question: "Is a hair transplant permanent?",
    answer:
      "Yes — hair transplanted using your own follicles is genetically resistant to the hormone that causes baldness, making the results permanent. You can style, cut, and wash it just like your natural hair.",
  },
  {
    question: "What non-surgical treatments do you offer at the Velachery hair clinic?",
    answer:
      "We offer Advanced GelPRP, oxygen laser therapy, mesotherapy, Regen Pro 9, and cosmetic hair systems — all non-surgical options for patients who want to improve hair density without going under the knife.",
  },
  {
    question: "How do I know which stage of hair loss I'm at?",
    answer:
      "Hair loss is graded on the Norwood scale (for men) and Ludwig scale (for women). During your free consultation, our trichologist will assess your stage and explain which treatments are most effective at that point.",
  },
  {
    question: "Do you offer consultations for patients outside Velachery?",
    answer:
      "Absolutely. While our Velachery clinic serves South Chennai, we have 60+ clinics across India. We also offer initial consultations over call so you can understand your options before visiting in person.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#f5f5f3] py-10 max-[470px]:py-6 sm:py-10 md:py-10 lg:mt-8">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-8">

        {/* TITLE */}
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-outfit text-black mb-10 sm:mb-8 max-[470px]:mb-4 md:mb-8">
          Questions We Hear Every Day — Answered Honestly
        </h2>

        {/* FAQ LIST */}
        <div className="divide-y divide-[#e82625]/30">
          {faqs.map((item, index) => (
            <div key={index} className="py-4 sm:py-5 md:py-6">
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-start justify-between gap-4 text-left"
              >
                <span className="text-base sm:text-lg font-outfit text-black leading-relaxed max-w-[90%]">
                  {item.question}
                </span>
                <span className="text-2xl sm:text-3xl font-light text-[#e82625] leading-none">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <p className="mt-4 text-sm sm:text-base text-black/70 leading-relaxed max-w-full sm:max-w-[85%]">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* FOOTER CTA */}
        <div className="text-center mt-10 max-[470px]:mt-6 sm:mt-10 md:mt-10">
          <p className="text-lg sm:text-xl font-outfit text-black mb-2">
            Still have questions?
          </p>
          <a
            href="tel:+918390856789"
            className="text-lg sm:text-xl font-outfit underline underline-offset-4 text-[#e82625]"
          >
            Contact us
          </a>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
