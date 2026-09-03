import { SALES_CONTACT } from './constants';
import { container } from './classnames';

export default function CallBanner({
  heading = 'Prefer to talk it through?',
  copy = 'Call our Velachery specialist directly — no forms, no waiting.',
}: {
  heading?: string;
  copy?: string;
}) {
  return (
    <div className="py-[clamp(20px,3vw,32px)] bg-white">
      <div className={container}>
        <div className="bg-gradient-to-r from-[#B91C1C] to-[#DC2626] rounded-3xl p-[clamp(22px,4vw,32px)] flex flex-wrap items-center justify-between gap-5 text-white shadow-[0_8px_20px_-12px_rgba(0,0,0,0.18)]">
          <div>
            <strong className="block text-[clamp(19px,2.4vw,24px)] mb-1 font-extrabold">{heading}</strong>
            <span className="text-sm text-white/85">{copy}</span>
          </div>
          <a
            href={`tel:${SALES_CONTACT.phoneTel}`}
            className="inline-flex items-center gap-2.5 bg-[#111111] text-white px-[26px] py-[15px] rounded-full no-underline font-bold text-base whitespace-nowrap transition-transform duration-150 hover:-translate-y-0.5"
          >
            <svg className="w-[18px] h-[18px] stroke-current fill-none stroke-2" strokeLinecap="round" strokeLinejoin="round">
              <use href="#sales-i-phone" />
            </svg>
            Call {SALES_CONTACT.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
