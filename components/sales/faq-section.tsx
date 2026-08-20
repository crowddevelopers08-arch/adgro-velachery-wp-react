'use client';

import { useState } from 'react';
import { SALES_CONTACT } from './constants';
import { eyebrow, h2, icon, sectionTight } from './classnames';

const FAQS = [
  {
    q: 'How much does a hair transplant cost in Chennai?',
    a: "Cost depends on the number of grafts, the technique used and the stage of hair loss being treated. Most Chennai clinics, including ours, price by graft count. The only way to get an accurate number is a free scalp analysis — book one and we'll walk you through a transparent quote, plus EMI options with no hidden costs.",
  },
  {
    q: 'Will the results look natural?',
    a: "Natural results come down to hairline design and the specialist doing the work, not just the equipment used. Our board-certified doctors design every hairline around your face shape, hair density and growth pattern before treatment begins, and we'll show you the plan before you commit to anything.",
  },
  {
    q: 'Is a hair transplant permanent?',
    a: "Transplanted hair is taken from a donor zone that's naturally resistant to hair loss, so it typically continues to grow for life. That said, hair loss in untreated areas can still continue — your specialist will explain what to expect for your specific case during consultation.",
  },
  {
    q: 'What non-surgical treatments do you offer at the Velachery clinic?',
    a: 'Alongside hair transplant surgery, we offer GFC (Growth Factor Concentrate) therapy, oxygen laser therapy, medical hair-fall treatment, scalp therapy for dandruff and scalp conditions, and cosmetic hair systems for immediate coverage — all recommended only after a proper diagnosis.',
  },
  {
    q: "How do I know which stage of hair loss I'm at?",
    a: 'Most people underestimate or overestimate their own stage. A free scalp analysis at our Velachery center — or over a call — gives you an honest, specialist-assessed answer instead of a guess from the mirror.',
  },
  {
    q: 'Do you offer consultations for patients outside Velachery?',
    a: "Yes. Advanced GroHair operates 60+ clinics across India, and our Velachery team also takes phone consultations for patients who can't visit in person. Call us or fill in the form and we'll work out what suits you.",
  },
];

// Split FAQs into two columns
const leftColumnFAQs = FAQS.slice(0, 3);
const rightColumnFAQs = FAQS.slice(3, 6);

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const renderFAQItem = (item: typeof FAQS[0], index: number) => {
    // Use a unique key that combines column position and index
    const globalIndex = FAQS.indexOf(item);
    const isOpen = openIndex === globalIndex;

    return (
      <div className="border-b border-[#E8E8E8]" key={item.q}>
        <button
          type="button"
          className="w-full text-left bg-transparent border-0 py-[22px] px-1 flex justify-between items-center gap-4 text-[17.5px] text-[#111111] font-semibold cursor-pointer"
          aria-expanded={isOpen}
          onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
        >
          {item.q}
          <svg
            className={`${icon} w-5 h-5 text-[#2B2B2B] transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          >
            <use href="#sales-i-chevron" />
          </svg>
        </button>
        <div
          className="overflow-hidden transition-[max-height] duration-[250ms]"
          style={{ maxHeight: isOpen ? 400 : 0 }}
        >
          <p className="px-1 pb-[22px] text-[#6B6B6B] text-[15px] max-w-[680px] leading-[1.65]">{item.a}</p>
        </div>
      </div>
    );
  };

  return (
    <section className={`${sectionTight} bg-white`} id="faq">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <span className={eyebrow}>Common Questions</span>
        <h2 className={h2}>Questions Chennai Patients Ask Us Every Day</h2>

        {/* 2-column grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 border-t border-[#E8E8E8] mt-8">
          <div className="border-t md:border-t-0 border-[#E8E8E8]">
            {leftColumnFAQs.map((item, i) => renderFAQItem(item, i))}
          </div>
          <div className="border-t md:border-t-0 border-[#E8E8E8]">
            {rightColumnFAQs.map((item, i) => renderFAQItem(item, i + 3))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <span className="text-[#6B6B6B] text-[14.5px]">Still have questions?</span>
          <a 
            href={`tel:${SALES_CONTACT.phoneTel}`} 
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-[#1A1A1A] border border-[#1A1A1A] rounded-full hover:bg-[#333333] hover:border-[#333333] transition-all duration-200"
          >
            Call Us Now
          </a>
        </div>
      </div>
    </section>
  );
}