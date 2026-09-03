import { SALES_CONTACT } from './constants';
import { container } from './classnames';

const colHeading = 'text-xs tracking-[0.1em] uppercase text-[#F87171] mb-3.5 font-semibold';
const colLink = 'block text-sm text-[#CFCFCF] no-underline mb-2.5 hover:text-white';

export default function SalesFooter() {
  return (
    <footer className="bg-black text-[#CFCFCF] pt-10 sm:pt-12 lg:pt-14 pb-[110px] min-[900px]:pb-12">
      <div className={`${container} grid grid-cols-1 min-[700px]:grid-cols-[1.3fr_1fr_1fr] gap-9`}>
        <div>
          <img src="/ambatur-logo.jpg" alt="Advanced GroHair Velachery logo" className="h-[56px] mb-3.5" />
          <p className="text-[13.5px] text-[#A3A3A3] max-w-[280px] leading-[1.6]">
            Board-certified hair restoration, trusted across 60+ clinics in India. Individual
            results may vary — all treatment recommendations follow a specialist consultation.
          </p>
        </div>
        <div>
          <h5 className={colHeading}>Explore</h5>
          <a href="#why-trust-us" className={colLink}>
            Why Trust Us
          </a>
          <a href="#results" className={colLink}>
            Patient Results
          </a>
          <a href="#reviews" className={colLink}>
            Reviews
          </a>
          <a href="#faq" className={colLink}>
            FAQs
          </a>
          <a href="#locate" className={colLink}>
            Locate Us
          </a>
        </div>
        <div>
          <h5 className={colHeading}>Contact</h5>
          <span className={colLink}>{SALES_CONTACT.addressShort}</span>
          <a href={`tel:${SALES_CONTACT.phoneTel}`} className={colLink}>
            {SALES_CONTACT.phoneDisplay}
          </a>
          <a href={`mailto:${SALES_CONTACT.email}`} className={colLink}>
            {SALES_CONTACT.email}
          </a>
        </div>
      </div>
      <div className={`${container} mt-11 pt-6 border-t border-white/10 flex flex-wrap justify-between gap-3 text-[12.5px] text-[#9A9A9A]`}>
        <span>© {new Date().getFullYear()} Advanced GroHair Velachery. All rights reserved.</span>
        <a href={SALES_CONTACT.privacyPolicyUrl} target="_blank" rel="noopener" className="text-[#9A9A9A] underline">
          Privacy &amp; Policy
        </a>
      </div>
    </footer>
  );
}
