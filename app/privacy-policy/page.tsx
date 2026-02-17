"use client";

import ThankTopBar from "@/components/thanknavbar";
import React from "react";

export default function SimplePrivacyPolicyPage() {
  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap");
      `}</style>

      <ThankTopBar />

      <section
        className="w-full bg-white py-10 sm:py-8 max-[470px]:py-6"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center pt-6 max-[470px]:pt-0 mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <div className="h-1 w-16 bg-[#e82625] mx-auto rounded-full"></div>
          </div>

          {/* Introduction */}
          <div className="mb-8">
            <p className="text-gray-600 text-lg">
              This Privacy Policy describes how Sai Health and Beauty Ventures (collectively "Company", "we", "our", "us") collects, uses, shares, protects or otherwise processes your information/personal data through our website adgrohairvelachery.in (hereinafter referred to as the "Platform").
            </p>
            <p className="text-gray-600 text-lg mt-4">
              By visiting this Platform or availing any services, you agree to be bound by this Privacy Policy, our Terms of Use, and applicable laws of India. If you do not agree, please do not use our Platform.
            </p>
          </div>

          <div className="space-y-8">
            {/* Section 1 - Collection of Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Collection of Information
              </h2>
              <p className="text-gray-600 mb-3">
                We collect personal data such as your name, date of birth, address, phone number, email, and any identity proof details when you sign up or use our services. Sensitive data like bank/payment details or biometric data may be collected with your consent as required by law.
              </p>
              <p className="text-gray-600 mb-3">
                We may also collect behavioral data and preferences on an aggregate basis. Third-party platforms you use may have their own privacy policies and we recommend reviewing them before sharing personal data.
              </p>
              <p className="text-gray-600">
                We never ask for confidential financial data like PINs or passwords. If you receive such requests, please report them to law enforcement immediately.
              </p>
            </div>

            {/* Section 2 - Usage of Personal Data */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Usage of Personal Data
              </h2>
              <p className="text-gray-600 mb-3">
                Your personal data is used to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Provide services and fulfill orders</li>
                <li>Enhance your experience</li>
                <li>Resolve disputes and troubleshoot issues</li>
                <li>Notify you of offers, updates, and products</li>
                <li>Conduct research, surveys and detect fraud</li>
              </ul>
              <p className="text-gray-600 mt-3">
                You may opt out of marketing communications at any time.
              </p>
            </div>

            {/* Section 3 - Sharing of Data */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Sharing of Data
              </h2>
              <p className="text-gray-600 mb-3">
                We may share your personal data with:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Our affiliates, partners, and group companies</li>
                <li>Third-party service providers, logistics partners, and payment systems</li>
                <li>Government agencies or law enforcement when legally obligated</li>
              </ul>
              <p className="text-gray-600 mt-3">
                Sharing is done to provide services, fulfill legal requirements, enforce policies, and prevent fraud.
              </p>
            </div>

            {/* Section 4 - Security Precautions */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Security Precautions
              </h2>
              <p className="text-gray-600">
                We implement industry-standard security practices to protect your data. While we secure transmissions with encryption and secure servers, data transfer over the internet can never be 100% secure. You are responsible for safeguarding your login credentials.
              </p>
            </div>

            {/* Section 5 - Data Deletion and Retention */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Data Deletion and Retention
              </h2>
              <p className="text-gray-600">
                You may delete your account through your profile or contact us for assistance. We may delay deletion if services, claims, or legal reasons are pending. Post-deletion, anonymized data may be retained for analytics or fraud prevention.
              </p>
            </div>

            {/* Section 6 - Your Rights */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Your Rights
              </h2>
              <p className="text-gray-600">
                You can access, rectify, or update your data via the Platform. To withdraw consent, contact our grievance officer as detailed below. Withdrawal will not be retrospective and may affect your access to services.
              </p>
            </div>

            {/* Section 7 - Consent */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Consent
              </h2>
              <p className="text-gray-600">
                By using our Platform or sharing your data, you consent to the practices described in this Privacy Policy, including communications via SMS, email, or call for service and marketing purposes. You may revoke consent by writing to our Grievance Officer.
              </p>
            </div>

            {/* Section 8 - Changes to Privacy Policy */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Changes to Privacy Policy
              </h2>
              <p className="text-gray-600">
                We may update this Privacy Policy periodically. Please review it regularly. We may notify you of significant changes as required by law.
              </p>
            </div>

            {/* Section 9 - Contact Us */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. Contact Us
              </h2>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 border-l-4" style={{ borderLeftColor: "#e82625" }}>
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Company Name:</span> Sai Health and Beauty Ventures
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Website:</span> adgrohairvelachery.in
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Email:</span> customercare@adgrohairvelachery.in
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Phone:</span> 1800 412 3605
                  </p>
                </div>
              </div>

              <div className="mt-6 p-6 rounded-lg border" style={{ 
                background: "linear-gradient(to right, rgba(232,38,37,0.1), rgba(232,38,37,0.05))",
                borderColor: "rgba(232,38,37,0.2)"
              }}>
                <p className="text-center text-gray-700 text-lg">
                  <span className="font-bold" style={{ color: "#e82625" }}>
                    Sai Health and Beauty Ventures:
                  </span>{" "}
                  Committed to protecting your privacy while helping you achieve healthier, fuller hair.
                </p>
              </div>
            </div>
          </div>
          
          {/* Decorative element */}
          <div className="mt-12 text-center">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} Sai Health and Beauty Ventures. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}