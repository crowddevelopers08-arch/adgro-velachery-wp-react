"use client";
import { Calendar, PhoneCall } from "lucide-react";
import React from "react";

const Footer = () => {
  const ICON_SIZE = 18;
  return (
    <footer className="w-full bg-black text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-16 max-[470px]:pt-6">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-[470px]:gap-6 items-start">

          {/* LEFT – BRAND */}
          <div>
            <img
              src="/logo2.png"
              alt="Advanced Grohair"
              className="h-12 mb-4"
            />
            <p className="text-gray-400 max-w-md leading-relaxed">
              Our experienced professionals and experts recommend the best
              treatment that matches your needs and assist you in achieving
              the desired results that you have always longed for.
            </p>
          </div>

          {/* CENTER – MAP */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-[360px] h-[260px] sm:h-[280px] rounded-xl overflow-hidden border border-white/10">
              <iframe
                title="Adgro Hair Velachery Location"
                src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d15546.07212338405!2d80.1540219!3d13.06632165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3a525dc933691317%3A0xa1bc4b988911d47d!2sAdvanced%20GroHair%20%26%20GloSkin%20-%20Velachery%2C%20Second%20Floor%20Block%20No.20%2C%20Sankaran%20Avenue%2C%20Plot%20No.31%2C%20Pandian%20St%2C%20Indira%20Gandhi%20Nagar%2C%20Velachery%2C%20Chennai%2C%20Tamil%20Nadu%20600042!3m2!1d12.990296299999999!2d80.2187733!5e0!3m2!1sen!2sin!4v1771316656827!5m2!1sen!2sin"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* RIGHT – CONTACT */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Contact</h3>

            <ul className="space-y-4 text-gray-300">
              <li className="font-medium text-white">
                KAVITHA RAVIKUMAR
              </li>
              <li className="uppercase text-sm tracking-wide">
                SAI HEALTH AND BEAUTY VENTURES
              </li>
              <li className="text-sm leading-relaxed">
                2nd Floor, 31, Sai Niddhi, Padian Street,
                Velachery, Chennai, Tamil Nadu – 600042
              </li>
              <li>
                <a
                  href="mailto:customercare@adgrohairvelachery.in"
                  className="hover:text-[#e82625] transition"
                >
                  customercare@adgrohairvelachery.in
                </a>
              </li>
              <li>
                <a
                  href="tel:+918390856789"
                  className="hover:text-[#e82625] transition"
                >
                  +91 8390856789
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 mt-14 max-[470px]:mt-6 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

          {/* COPYRIGHT */}
          <p className="text-sm text-gray-400 text-center md:text-left">
            © 2023 Adgro Hair Velachery. All rights reserved. Powered by{" "}
            <span className="text-[#e82625] font-medium">Crowd Developers</span>
          </p>

          {/* LINKS */}
          <a
            href="/privacy-policy"
            className="text-sm text-[#e82625] hover:underline"
          >
            Privacy & Policy
          </a>

        </div>

      </div>

               <div className="fixed bottom-0 left-0 right-0 z-50 flex sm:hidden">
          <a
            href="tel:+917409256789"
            className="flex-1 flex items-center justify-center gap-2 bg-[#ea2424] text-white py-3 px-4 font-medium hover:bg-[#ea2424]/90 transition-colors"
          >
            <PhoneCall size={ICON_SIZE} className="shrink-0" />
            <span>Call Now</span>
          </a>

          <a
            href="#form"
            className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 px-4 font-medium hover:bg-gray-900 transition-colors"
          >
            <Calendar size={ICON_SIZE} className="shrink-0" />
            <span>Book Now</span>
          </a>
        </div>
    </footer>
  );
};

export default Footer;
