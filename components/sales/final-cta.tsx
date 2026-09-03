import { SALES_CONTACT } from './constants';
import { container, section, icon, btnBase, btnPrimary, btnOnDark, btnLg } from './classnames';

export default function FinalCta() {
  return (
    <section className={`${section} bg-gradient-to-br from-[#111111] to-black text-[#F2F2F2] text-center`}>
      <div className={container}>
        <h2 className="text-[clamp(28px,4vw,42px)] leading-[1.15] font-extrabold text-white tracking-[-0.01em] max-w-[640px] mx-auto">
          Your Hair Story Doesn&rsquo;t Have to End Here
        </h2>
        <p className="text-[17px] text-[#CFCFCF] max-w-[640px] mt-4 mx-auto">
          Book a free consultation with a hair restoration team Chennai trusts — or call us
          directly. We&rsquo;re ready when you are.
        </p>
        <div className="flex flex-wrap gap-3.5 justify-center mt-8">
          <a href={`tel:${SALES_CONTACT.phoneTel}`} className={`${btnBase} ${btnPrimary} ${btnLg}`}>
            <svg className={icon}>
              <use href="#sales-i-phone" />
            </svg>
            Call {SALES_CONTACT.phoneDisplay}
          </a>
          <a href="#lead-form" className={`${btnBase} ${btnOnDark} ${btnLg}`}>
            Book Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
