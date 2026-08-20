import { SALES_CONTACT } from './constants';
import { container, section, eyebrow, h2, lede, btnBase, btnOutline, btnPrimary, icon } from './classnames';

export default function LocationSection() {
  return (
    <section className={`${section} bg-[#FAFAFA]`} id="locate">
      <div className={container}>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-7">
          <div className="max-w-[600px]">
            <span className={eyebrow}>Visit Us in Velachery</span>
            <h2 className={h2}>One of South Chennai&rsquo;s Most Accessible Hair Clinics</h2>
            <p className={lede}>
              Searching for a hair clinic near you in Velachery or South Chennai? Our center brings
              consultation, scalp diagnostics and complete treatment under one roof.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a href={SALES_CONTACT.mapsQuery} target="_blank" rel="noopener" className={`${btnBase} ${btnOutline}`}>
              Get Directions
            </a>
            <a href={`tel:${SALES_CONTACT.phoneTel}`} className={`${btnBase} ${btnPrimary}`}>
              <svg className={icon}>
                <use href="#sales-i-phone" />
              </svg>
              Call Now
            </a>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-[#E8E8E8] bg-white shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)]">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#E8E8E8]">
            <div className="flex items-center gap-3 px-5 py-4">
              <svg className={`${icon} w-[18px] h-[18px] text-[#DC2626] shrink-0`}>
                <use href="#sales-i-pin" />
              </svg>
              <div className="min-w-0">
                <strong className="block text-[13px] text-[#6B6B6B] font-medium">Address</strong>
                <span className="block text-[14px] text-[#1A1A1A] font-medium truncate">{SALES_CONTACT.addressShort}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-4">
              <svg className={`${icon} w-[18px] h-[18px] text-[#DC2626] shrink-0`}>
                <use href="#sales-i-phone" />
              </svg>
              <div className="min-w-0">
                <strong className="block text-[13px] text-[#6B6B6B] font-medium">Call</strong>
                <span className="block text-[14px] text-[#1A1A1A] font-medium">{SALES_CONTACT.phoneDisplay}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-4">
              <svg className={`${icon} w-[18px] h-[18px] text-[#DC2626] shrink-0`}>
                <use href="#sales-i-mail" />
              </svg>
              <div className="min-w-0">
                <strong className="block text-[13px] text-[#6B6B6B] font-medium">Email</strong>
                <span className="block text-[14px] text-[#1A1A1A] font-medium truncate">{SALES_CONTACT.email}</span>
              </div>
            </div>
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d15546.07212338405!2d80.1540219!3d13.06632165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3a525dc933691317%3A0xa1bc4b988911d47d!2sAdvanced%20GroHair%20%26%20GloSkin%20-%20Velachery%2C%20Second%20Floor%20Block%20No.20%2C%20Sankaran%20Avenue%2C%20Plot%20No.31%2C%20Pandian%20St%2C%20Indira%20Gandhi%20Nagar%2C%20Velachery%2C%20Chennai%2C%20Tamil%20Nadu%20600042!3m2!1d12.990296299999999!2d80.2187733!5e0!3m2!1sen!2sin!4v1771316656827!5m2!1sen!2sin"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Advanced GroHair Velachery location map"
            className="w-full h-[220px] sm:h-[260px] border-0 block"
          />
        </div>
      </div>
    </section>
  );
}
