"use client";

import ThankTopBar from "@/components/thanknavbar";
import { useEffect } from "react";

// Add type declaration for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export default function SimpleThankYouPage() {
  useEffect(() => {
    // Track conversion when component mounts
    const trackConversion = () => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-17773968064/9VdWCPnnzdsbEMD1pJtC',
          'value': 1.0,
          'currency': 'INR'
        });
      }
    };

    trackConversion();
    
    const intervalId = setInterval(() => {
      if (typeof window !== 'undefined' && window.gtag) {
        trackConversion();
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap");
      `}</style>

      <ThankTopBar />

      <section
        className="w-full min-h-[80vh] flex items-center justify-center bg-gray-50 py-8"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-4xl text-green-600">✓</span>
            </div>
          </div>

          {/* Main Content */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You for Reaching Out
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            We've received your inquiry and will get back to you within 24 hours.
          </p>

          {/* Contact Info - Simplified */}
          <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
            <p className="text-gray-700 mb-2 font-medium">
              Need immediate assistance?
            </p>
            <a
              href="tel:+918390856789"
              className="text-xl font-bold text-[#e72528]"
            >
              +91 8390856789
            </a>
          </div>

          {/* Back Home Button */}
          <a
            href="/"
            className="inline-block bg-[#e72528] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#d12223] transition-colors"
          >
            Back to Home
          </a>

          {/* Signature */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600">AdGro Hair Velachery Team</p>
          </div>
        </div>
      </section>
    </>
  );
}