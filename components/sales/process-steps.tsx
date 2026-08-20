import { Fragment } from 'react';
import { container, sectionTight, eyebrow, h2 } from './classnames';

const STEPS = [
  {
    n: '01',
    title: 'Free Consultation & Scalp Analysis',
    copy: 'Sit with a specialist for an honest, no-cost diagnosis of your scalp and hair — no sales pitch, just an assessment.',
  },
  {
    n: '02',
    title: 'Your Personalised Plan',
    copy: 'We build a treatment plan around your hair loss stage, goals and budget. Every plan is different, because every patient is.',
  },
  {
    n: '03',
    title: 'Treatment by Certified Specialists',
    copy: 'Your treatment is carried out by board-certified doctors using FDA-approved equipment, in a clinical setting built for safety.',
  },
  {
    n: '04',
    title: 'Ongoing Follow-Up',
    copy: "The relationship doesn't end at the door. Our 24/7 support line and scheduled follow-ups track your progress after treatment.",
  },
];

const numBase =
  'font-mono text-sm font-semibold text-[#2B2B2B] w-11 h-11 border-[1.5px] border-[#DC2626] rounded-full flex items-center justify-center shrink-0';
const numActive = 'bg-[#DC2626] text-white border-[#DC2626]';

export default function ProcessSteps() {
  return (
    <section className={`${sectionTight} bg-[#FAFAFA]`}>
      <div className={container}>
        <span className={eyebrow}>How It Works</span>
        <h2 className={h2}>Your Path to Fuller Hair, in Four Clear Steps</h2>

        {/* Connected step track — desktop only */}
        <div className="hidden min-[900px]:flex items-center mt-9">
          {STEPS.map((step, i) => (
            <Fragment key={step.n}>
              <span className={`${numBase} ${i === 0 ? numActive : ''}`}>{step.n}</span>
              {i < STEPS.length - 1 && (
                <span className="flex items-center flex-1 mx-1" aria-hidden="true">
                  <i className="flex-1 h-0 border-t-2 border-dotted border-[#E8E8E8]" />
                  <svg
                    className="w-4 h-4 text-[#DC2626] shrink-0 mx-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="7 4 15 12 7 20" />
                    <polyline points="13 4 21 12 13 20" />
                  </svg>
                  <i className="flex-1 h-0 border-t-2 border-dotted border-[#E8E8E8]" />
                </span>
              )}
            </Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 min-[900px]:grid-cols-4 gap-0 min-[900px]:gap-[22px] mt-9">
          {STEPS.map((step, i) => (
            <div
              className={`grid grid-cols-[auto_1fr] min-[900px]:grid-cols-1 gap-[18px] py-[26px] min-[900px]:py-0 border-t min-[900px]:border-t-0 border-[#E8E8E8] ${
                i === STEPS.length - 1 ? 'border-b min-[900px]:border-b-0' : ''
              }`}
              key={step.n}
            >
              <span className={`${numBase} min-[900px]:hidden`}>{step.n}</span>
              <div>
                <h4 className="text-lg mb-1.5 font-extrabold text-[#111111]">{step.title}</h4>
                <p className="text-[14.5px] text-[#6B6B6B] max-w-[520px]">{step.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
