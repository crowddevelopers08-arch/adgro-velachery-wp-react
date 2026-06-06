"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CONCERN_OPTIONS = [
  "Hair Loss",
  "Alopecia Areata",
  "Dandruff",
  "Baldness",
  "Hair Thinning Treatment",
  "Receding Hair Solutions",
  "Genetic Hair Loss",
];

const HAIR_LOSS_STAGE_OPTIONS = [
  { id: "stage-1", label: "Stage 1", imageSrc: "/st1.jpeg" },
  { id: "stage-2", label: "Stage 2", imageSrc: "/st2.jpeg" },
  { id: "stage-3", label: "Stage 3", imageSrc: "/st3.jpeg" },
  { id: "stage-4", label: "Stage 4", imageSrc: "/st4.jpeg" },
  { id: "stage-5", label: "Stage 5", imageSrc: "/st5.jpeg" },
];

interface FormData {
  name: string;
  phone: string;
  email: string;
  concerns: string[];
  hairLossStage: string;
  willingToVisit: string;
}

interface FormFieldsProps {
  isMobile: boolean;
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleConcernToggle: (concern: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

const FormFields = ({
  isMobile,
  formData,
  handleInputChange,
  handleConcernToggle,
  handleSubmit,
  isSubmitting,
}: FormFieldsProps) => (
  <form onSubmit={handleSubmit} noValidate className={isMobile ? "space-y-3" : "space-y-4"}>
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleInputChange}
      placeholder="Your Full Name"
      className="w-full bg-transparent border-b border-gray-600 focus:outline-none py-2 px-2 text-sm"
      disabled={isSubmitting}
    />
    <input
      type="tel"
      name="phone"
      value={formData.phone}
      onChange={handleInputChange}
      placeholder="Valid 10 Digit Phone No."
      className="w-full bg-transparent border-b border-gray-600 focus:outline-none py-2 px-2 text-sm"
      disabled={isSubmitting}
    />
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleInputChange}
      placeholder="Example@gmail.com"
      className="w-full bg-transparent border-b border-gray-600 focus:outline-none py-2 px-2 text-sm"
      disabled={isSubmitting}
    />

    <div className="pt-1">
      <p className="text-xs text-gray-400 mb-2">What Are Your Concerns</p>
      <div className="flex flex-wrap gap-2">
        {CONCERN_OPTIONS.map((concern, index) => (
          <label key={index} className="flex items-center gap-1 bg-[#2c2c2c] px-3 py-1.5 rounded-full text-xs cursor-pointer hover:bg-[#3c3c3c] transition">
            <input
              type="checkbox"
              checked={formData.concerns.includes(concern)}
              onChange={() => handleConcernToggle(concern)}
              className="h-3 w-3 accent-[#e82625]"
              disabled={isSubmitting}
            />
            <span>{concern}</span>
          </label>
        ))}
      </div>
    </div>

    <div className="pt-1">
      <p className="text-xs text-gray-400 mb-2">Select Your Hair Loss Stage</p>
      <div className="grid grid-cols-5 gap-2">
        {HAIR_LOSS_STAGE_OPTIONS.map((stage) => (
          <label
            key={stage.id}
            className={`cursor-pointer overflow-hidden rounded-xl border transition ${
              formData.hairLossStage === stage.label
                ? "border-[#e82625] ring-2 ring-[#e82625]/40"
                : "border-gray-700 hover:border-gray-500"
            } bg-[#2c2c2c] ${isSubmitting ? "opacity-60 pointer-events-none" : ""}`}
          >
            <input
              type="radio"
              name="hairLossStage"
              value={stage.label}
              checked={formData.hairLossStage === stage.label}
              onChange={handleInputChange}
              className="sr-only"
              disabled={isSubmitting}
            />
            <div className="relative mx-auto h-14 w-14 bg-white">
              <Image src={stage.imageSrc} alt={stage.label} fill sizes="56px" className="object-cover" />
            </div>
            <div className="py-1 text-center text-[10px] text-white font-medium">{stage.label}</div>
          </label>
        ))}
      </div>
    </div>

    <div className="pt-1">
      <p className="text-xs text-gray-400 mb-2">Are you willing to visit Adgro Velachery?</p>
      <div className="flex gap-3">
        {["yes", "no"].map((option) => (
          <label key={option} className="flex items-center gap-2 bg-[#2c2c2c] px-3 py-2 rounded-full text-sm cursor-pointer hover:bg-[#3c3c3c] transition">
            <input
              type="radio"
              name="willingToVisit"
              value={option}
              checked={formData.willingToVisit === option}
              onChange={handleInputChange}
              className="h-4 w-4 accent-[#e82625]"
              disabled={isSubmitting}
            />
            <span>{option === "yes" ? "Yes" : "No"}</span>
          </label>
        ))}
      </div>
    </div>

    <button
      type="submit"
      disabled={isSubmitting}
      className="mt-3 w-full bg-[#e82625] hover:bg-[#c41e1d] transition text-white py-3.5 px-8 rounded-[10px] text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSubmitting ? "Sending..." : "Get My Free Consultation"}
    </button>
  </form>
);

const RequestCallbackSection = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    concerns: [],
    hairLossStage: "",
    willingToVisit: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConcernToggle = (concern: string) => {
    setFormData((prev) => ({
      ...prev,
      concerns: prev.concerns.includes(concern)
        ? prev.concerns.filter((c) => c !== concern)
        : [...prev.concerns, concern],
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setSubmitStatus({ type: "error", message: "Please enter your name" });
      return false;
    }
    if (!formData.phone.trim()) {
      setSubmitStatus({ type: "error", message: "Please enter your phone number" });
      return false;
    }
    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      setSubmitStatus({ type: "error", message: "Please enter a valid 10-digit phone number" });
      return false;
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setSubmitStatus({ type: "error", message: "Please enter a valid email address" });
      return false;
    }
    if (!formData.hairLossStage) {
      setSubmitStatus({ type: "error", message: "Please select your hair loss stage" });
      return false;
    }
    if (!formData.willingToVisit) {
      setSubmitStatus({ type: "error", message: "Please answer whether you are willing to visit Adgro Velachery" });
      return false;
    }
    if (formData.willingToVisit !== "yes") {
      setSubmitStatus({ type: "error", message: "Form submission is available only for users willing to visit Adgro Velachery" });
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ type: null, message: "" });
    if (!validateForm()) return;
    setShowConfirm(true);
  };

  const handleConfirmedSubmit = async () => {
    setShowConfirm(false);
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const leadData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        procedure: formData.concerns.join(", "),
        concerns: formData.concerns,
        hairLossStage: formData.hairLossStage,
        willingToVisit: formData.willingToVisit === "yes",
        source: "Adgro Hair Velachery Website",
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
        userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "",
      };

      const response = await fetch("/api/contact-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/thank-you");
      } else {
        throw new Error(data.details || data.error || "Failed to submit form");
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
      setIsSubmitting(false);
    }
  };

  const sharedFormProps = {
    formData,
    handleInputChange,
    handleConcernToggle,
    handleSubmit,
    isSubmitting,
  };

  return (
    <React.Fragment>
      {/* Confirmation popup */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-[420px] w-full p-8 flex flex-col items-center text-center gap-5">
            <div className="w-16 h-16 rounded-full bg-[#fff0f0] flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 4C9.37 4 4 9.37 4 16C4 22.63 9.37 28 16 28C22.63 28 28 22.63 28 16C28 9.37 22.63 4 16 4Z" stroke="#e82625" strokeWidth="2" fill="none" />
                <path d="M16 10V17" stroke="#e82625" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="16" cy="21.5" r="1.5" fill="#e82625" />
              </svg>
            </div>
            <h3 className="text-[18px] font-extrabold text-[#202020]">Ready to take the first step?</h3>
            <p className="text-gray-500 text-[14px] leading-relaxed">
              Our team will call you back within{" "}
              <span className="font-semibold text-[#202020]">24 hours</span>{" "}
              to confirm your free consultation. Shall we proceed?
            </p>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-bold text-[14px] hover:bg-gray-50 transition-colors"
              >
                No, Go Back
              </button>
              <button
                onClick={handleConfirmedSubmit}
                className="flex-1 py-3 rounded-xl bg-[#e82625] hover:bg-[#c41e1d] text-white font-bold text-[14px] transition-colors shadow-lg"
              >
                Yes, Book Now
              </button>
            </div>
          </div>
        </div>
      )}

      <section id="form" className="w-full scroll-mt-24 bg-white py-8 md:py-12 lg:py-40">
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 flex justify-center">
          <div className="relative w-full lg:w-[1280px]">

            {/* MOBILE FORM */}
            <div className="block lg:hidden w-full mb-6">
              <div className="bg-[#1c1c1c] text-white rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-1">
                  Get Your Free Hair Analysis - No Commitment, No Cost.
                </h3>
                <p className="text-xs opacity-70 mb-4">
                  Tell us about your concern and we will call you back within 24 hours.
                </p>
                {submitStatus.type && (
                  <div className={`mb-4 p-3 rounded-lg text-sm ${submitStatus.type === "success" ? "bg-green-500/20 text-green-200" : "bg-red-500/20 text-red-200"}`}>
                    {submitStatus.message}
                  </div>
                )}
                <FormFields isMobile={true} {...sharedFormProps} />
              </div>
            </div>

            {/* RED TESTIMONIAL PANEL */}
            <div className="w-full lg:h-[400px] bg-[#e82625] rounded-2xl flex flex-col lg:flex-row items-center justify-center lg:justify-end px-6 md:px-10 lg:px-16 py-10 lg:py-0">
              <div className="w-full lg:max-w-[480px] text-white">
                <h3 className="text-xl sm:text-2xl md:text-[26px] font-bold mb-4 text-center lg:text-left">
                  Hear From Our Happy Patients
                </h3>
                <p className="text-sm sm:text-[15px] leading-relaxed mb-6 text-center lg:text-left opacity-95">
                  I started seeing results within the first two sessions. Four months in, my hair fall has reduced drastically. The doctor was warm, patient, and genuinely cared about my progress.
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <img src="/unnamed.png" alt="Archana Pandian" className="w-12 h-12 rounded-full object-cover" />
                  <p className="font-semibold text-[15px]">Archana Pandian, Velachery Patient</p>
                </div>
              </div>
            </div>

            {/* DESKTOP FORM — absolute over red panel */}
            <div className="hidden lg:block lg:absolute top-[-168px] left-8 xl:left-14 w-full lg:max-w-[520px]">
              <div className="bg-[#1c1c1c] text-white rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-1">
                  Get Your Free Hair Analysis - No Commitment, No Cost.
                </h3>
                <p className="text-sm opacity-70 mb-4">
                  Tell us about your concern and we will call you back within 24 hours.
                </p>
                {submitStatus.type && (
                  <div className={`mb-4 p-3 rounded-lg text-sm ${submitStatus.type === "success" ? "bg-green-500/20 text-green-200" : "bg-red-500/20 text-red-200"}`}>
                    {submitStatus.message}
                  </div>
                )}
                <FormFields isMobile={false} {...sharedFormProps} />
              </div>
            </div>

          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default RequestCallbackSection;
