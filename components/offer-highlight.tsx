"use client";
import React, { useState } from "react";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  treatment: string;
  pinCode: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  treatment?: string;
  pinCode?: string;
}

export const AppointmentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    treatment: "",
    pinCode: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const treatments = [
    "Hair Transplant",
    "Skin Care",
    "Dental Care",
    "Eye Care",
    "Orthopedic",
    "General Checkup",
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    // Phone validation - exactly 10 digits
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10 digit phone number";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Treatment validation
    if (!formData.treatment) {
      newErrors.treatment = "Please select a treatment";
    }

    // PIN Code validation - exactly 6 digits
    const pinRegex = /^\d{6}$/;
    if (!formData.pinCode) {
      newErrors.pinCode = "PIN code is required";
    } else if (!pinRegex.test(formData.pinCode)) {
      newErrors.pinCode = "Please enter a valid 6-digit PIN code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", formData);
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        treatment: "",
        pinCode: "",
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-green-600 py-6 px-8">
          <h1 className="text-3xl font-bold text-white text-center tracking-tight">
            Regrow Your Happiness Now !
          </h1>
        </div>
        
        <div className="p-8">
          {submitSuccess && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              <p className="text-center font-medium">
                Appointment booked successfully! We'll contact you soon.
              </p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label 
                htmlFor="fullName" 
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200`}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label 
                htmlFor="phone" 
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Valid 10 Digit Phone No.
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter 10 digit mobile number"
                maxLength={10}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Example@gmail.com
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Treatment Selection */}
            <div>
              <label 
                htmlFor="treatment" 
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Choose your Treatment
              </label>
              <select
                id="treatment"
                name="treatment"
                value={formData.treatment}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.treatment ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 bg-white`}
              >
                <option value="">Select a treatment</option>
                {treatments.map((treatment) => (
                  <option key={treatment} value={treatment}>
                    {treatment}
                  </option>
                ))}
              </select>
              {errors.treatment && (
                <p className="mt-1 text-sm text-red-600">{errors.treatment}</p>
              )}
            </div>

            {/* PIN Code */}
            <div>
              <label 
                htmlFor="pinCode" 
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                6-Digit Pin Code
              </label>
              <input
                type="text"
                id="pinCode"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                placeholder="Enter 6-digit PIN code"
                maxLength={6}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.pinCode ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200`}
              />
              {errors.pinCode && (
                <p className="mt-1 text-sm text-red-600">{errors.pinCode}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-lg tracking-wide shadow-md hover:shadow-lg"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Booking...
                </span>
              ) : (
                "Book Your Appointment"
              )}
            </button>
          </form>

          {/* Trust indicators */}
          <p className="mt-6 text-xs text-center text-gray-500">
            By booking, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;