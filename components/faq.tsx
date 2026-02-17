"use client";
import React, { useState } from "react";

const faqs = [
  {
    question: "What is oxygen laser therapy, and how does it work?",
    answer:
      "Oxygen laser therapy, also known as low-level laser therapy (LLLT), uses specific wavelengths of light to stimulate hair follicles, improve blood circulation, and encourage natural hair growth.",
  },
  {
    question: "Is oxygen laser therapy safe and effective?",
    answer:
      "Yes, oxygen laser therapy is generally safe and clinically proven to support hair growth, especially when included as part of a comprehensive hair restoration treatment plan.",
  },
  {
    question: "What is a cosmetic hair system, and how does it differ from traditional wigs?",
    answer:
      "A cosmetic hair system is a customized hairpiece designed to blend seamlessly with your natural hair. Unlike traditional wigs, it offers a more natural look, better comfort, and secure fit.",
  },
  {
    question: "How long does a cosmetic hair system last, and how is it maintained?",
    answer:
      "The lifespan of a cosmetic hair system depends on its quality, usage, and maintenance. With proper care, a high-quality system can last from several months to over a year.",
  },
  {
    question: "What is mesotherapy, and how does it help with hair loss?",
    answer:
      "Mesotherapy involves injecting a blend of vitamins, minerals, and nutrients directly into the scalp to nourish hair follicles, improve circulation, and stimulate hair growth.",
  },
  {
    question: "Are there any side effects associated with mesotherapy for hair loss?",
    answer:
      "Mesotherapy is generally safe, but some individuals may experience mild side effects such as temporary redness, swelling, or discomfort at the injection site, which usually subsides within a few days.",
  },
  {
    question: "What is a hair transplant, and how does it work?",
    answer:
      "A hair transplant involves relocating healthy hair follicles from donor areas of the scalp to areas experiencing hair loss, commonly using FUT or FUE techniques.",
  },
  {
    question: "What factors should be considered before undergoing a hair transplant?",
    answer:
      "Important factors include the extent of hair loss, availability of donor hair, expected results, recovery time, and potential risks associated with the procedure.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#f5f5f3] py-10 max-[470px]:py-6 sm:py-10 md:py-10">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-8">

        {/* TITLE */}
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-outfit text-black mb-10 sm:mb-8 max-[470px]:mb-4 md:mb-8">
          Frequently Asked Questions
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
