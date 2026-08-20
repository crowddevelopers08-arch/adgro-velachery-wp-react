/**
 * Shared Tailwind utility-class strings for the sales page.
 * Not a stylesheet — just TS constants to avoid retyping long, repeated
 * arbitrary-value class combos (buttons, icons, section spacing) across
 * every component. All actual styling is inline Tailwind classes.
 */

export const container = 'max-w-[1180px] mx-auto px-5 sm:px-8';
export const containerFull = 'w-full mx-auto px-5 sm:px-16';
export const section = 'py-10 sm:py-14 lg:py-20';
export const sectionTight = 'py-8 sm:py-10 lg:py-14';

export const btnBase =
  'inline-flex items-center justify-center gap-2 font-bold text-[15.5px] px-6 py-3.5 rounded-full border-[1.5px] border-transparent no-underline whitespace-nowrap transition-transform duration-150 hover:-translate-y-0.5';
export const btnPrimary =
  'bg-[#DC2626] text-white border-[#DC2626] hover:bg-[#B91C1C] hover:border-[#B91C1C] hover:shadow-[0_8px_20px_-12px_rgba(0,0,0,0.18)]';
export const btnOutline =
  'bg-[#111111] text-white border-[#111111] hover:bg-black hover:border-black';
export const btnOnDark =
  'bg-white text-[#111111] border-white hover:bg-transparent hover:text-white hover:border-white';
export const btnBlock = 'w-full';
export const btnLg = 'px-[30px] py-4 text-[16.5px]';

export const icon = 'w-[1em] h-[1em] stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round] shrink-0';
export const iconFill = 'fill-current stroke-none';

export const eyebrow =
  'inline-flex items-center gap-2 text-[12.5px] tracking-[0.14em] uppercase text-[#2B2B2B] font-semibold mb-3.5 before:content-[\'\'] before:w-[18px] before:h-[1.5px] before:bg-current before:inline-block';
export const h2 = 'text-[clamp(28px,4vw,42px)] leading-[1.15] font-extrabold text-[#111111] tracking-[-0.01em]';
export const lede = 'text-[17px] text-[#6B6B6B] max-w-[640px] mt-4';

export const card =
  'bg-white border border-[#E8E8E8] rounded-2xl shadow-[0_8px_20px_-12px_rgba(0,0,0,0.18)]';

export const field = 'mb-3.5';
export const fieldLabel = 'block text-[12.5px] font-semibold text-[#1A1A1A] mb-1.5';
export const fieldInput =
  'w-full px-3.5 py-3 rounded-[10px] border-[1.5px] border-[#E8E8E8] bg-white text-[15px] text-[#1A1A1A] focus:border-[#DC2626] focus:outline-none';
