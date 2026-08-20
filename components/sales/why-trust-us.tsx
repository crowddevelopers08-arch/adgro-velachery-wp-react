import { container, sectionTight, eyebrow, h2, btnBase, btnOutline } from './classnames';

const CHECKS = [
  'Board-Certified Doctors',
  'FDA-Approved Equipment',
  'No-Cost EMI',
  '24/7 Support Line',
  '2,000+ Transformations',
  '60+ Clinics Nationwide',
];

export default function WhyTrustUs() {
  return (
    <section className={`${sectionTight} bg-white`} id="why-trust-us">
      <div className={container}>
        <span className={eyebrow}>Why Chennai Chooses Us</span>
        <h2 className={h2}>Not Just a Hair Clinic a Team Accountable to Your Results</h2>
        <p className="text-[#6B6B6B] text-[15.5px] mt-3.5 leading-[1.65] max-w-[560px]">
          There&rsquo;s no shortage of hair clinics in Chennai. What sets us apart is simple
          we&rsquo;re measured by your outcome, not by how many sessions we can sell you, and we
          hold the same standard across every clinic, every time.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 min-[900px]:grid-cols-6 gap-2.5 mt-6">
          {CHECKS.map((c) => (
            <div
              key={c}
              className="flex items-center gap-2 px-3 py-2.5 rounded-[10px] border border-[#E8E8E8] bg-[#FAFAFA]"
            >
              <svg className="w-4 h-4 text-[#DC2626] stroke-current fill-none stroke-2 shrink-0" strokeLinecap="round" strokeLinejoin="round">
                <use href="#sales-i-check" />
              </svg>
              <span className="text-[13px] font-semibold text-[#1A1A1A] leading-[1.2]">{c}</span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <a href="#lead-form" className={`${btnBase} ${btnOutline}`}>
            Book Free Consultation →
          </a>
        </div>
      </div>
    </section>
  );
}
