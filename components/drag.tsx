"use client";

import React, { useState } from "react";

const CONCERN_OPTIONS = [
  "Hair Loss",
  "Alopecia Areata",
  "Dandruff",
  "Baldness",
  "Hair Thinning Treatment",
  "Receding Hair Solutions",
  "Genetic Hair Loss"
];

const RequestCallbackSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    concerns: [] as string[],
    city: "", // PIN code
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConcernToggle = (concern: string) => {
    setFormData(prev => ({
      ...prev,
      concerns: prev.concerns.includes(concern)
        ? prev.concerns.filter(c => c !== concern)
        : [...prev.concerns, concern]
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please enter your name' });
      return false;
    }
    if (!formData.phone.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please enter your phone number' });
      return false;
    }
    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid 10-digit phone number' });
      return false;
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid email address' });
      return false;
    }
    if (formData.city && !/^\d{6}$/.test(formData.city)) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid 6-digit PIN code' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Prepare data for API
      const leadData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        procedure: formData.concerns.join(', '), // Store concerns as procedure
        city: formData.city || undefined,
        concerns: formData.concerns, // Store individual concerns
        source: 'Request Callback Section',
        pageUrl: typeof window !== 'undefined' ? window.location.href : '',
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
      };

      const response = await fetch('/api/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! We will call you back shortly.'
        });
        // Reset form
        setFormData({
          name: "",
          phone: "",
          email: "",
          concerns: [],
          city: "",
        });
      } else {
        throw new Error(data.error || 'Failed to submit form');
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-white py-8 md:py-12 lg:py-36">
      <div className="relative max-w-[1500px] mx-auto px-4 sm:px-6 flex justify-center">
        
        {/* CONTAINER FOR BOTH ELEMENTS */}
        <div className="relative w-full lg:w-[1300px]">
          
          <section id="form">
          {/* FORM CARD - Mobile First (shown first) */}
          <div className="block lg:hidden w-full max-w-full mx-auto px-0 mb-6">
            <div className="bg-[#1c1c1c] text-white rounded-xl shadow-2xl p-6 sm:p-8">
              <p className="text-xs sm:text-sm opacity-70 mb-1">We are always ready</p>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-4">
                Request a call back
              </h3>

              {submitStatus.type && (
                <div className={`mb-4 p-3 rounded-lg text-sm ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-500/20 text-green-200' 
                    : 'bg-red-500/20 text-red-200'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Full Name"
                  className="w-full bg-transparent border-b border-gray-600 focus:outline-none py-2 text-sm sm:text-base px-2"
                  disabled={isSubmitting}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Valid 10 Digit Phone No."
                  className="w-full bg-transparent border-b border-gray-600 focus:outline-none py-2 text-sm sm:text-base px-2"
                  disabled={isSubmitting}
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Example@gmail.com"
                  className="w-full bg-transparent border-b border-gray-600 focus:outline-none py-2 text-sm sm:text-base px-2"
                  disabled={isSubmitting}
                />
                
                {/* Concerns Label */}
                <div className="pt-1">
                  <p className="text-xs sm:text-sm text-gray-400 mb-2">What Are Your Concerns</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {CONCERN_OPTIONS.map((concern, index) => (
                      <label key={index} className="flex items-center space-x-1 bg-[#2c2c2c] px-2 py-1.5 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer hover:bg-[#3c3c3c] transition">
                        <input
                          type="checkbox"
                          checked={formData.concerns.includes(concern)}
                          onChange={() => handleConcernToggle(concern)}
                          className="form-checkbox h-3 w-3 sm:h-4 sm:w-4 text-red-600 bg-transparent border-gray-500 rounded"
                          disabled={isSubmitting}
                        />
                        <span>{concern}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Type 6 Digit Your Pincode Here"
                  maxLength={6}
                  pattern="[0-9]{6}"
                  className="w-full bg-transparent border-b border-gray-600 focus:outline-none py-2 text-sm sm:text-base px-2 mt-2"
                  disabled={isSubmitting}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 sm:mt-3 bg-[#e53935] hover:bg-[#d32f2f] transition text-white py-3 sm:py-4 px-6 sm:px-8 rounded-full text-sm sm:text-base font-semibold w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
          </section>
          {/* RED BACKGROUND PANEL */}
          <div className="w-full min-h-[450px] sm:min-h-[420px] md:min-h-[400px] lg:h-[380px] max-[470px]:min-h-[0px] bg-gradient-to-r from-[#e82625] to-[#e82625] rounded-xl relative flex flex-col lg:flex-row items-center justify-center lg:justify-end px-4 sm:px-6 md:px-8 lg:px-16 py-8 lg:py-0">
            
            {/* TESTIMONIAL CARD */}
            <div className="w-full lg:max-w-lg text-white relative p-4 sm:p-5 max-[470px]:p-0 md:p-6">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4 pl-0 sm:pl-2 md:pl-4 tracking-wide text-center lg:text-left">
                Hear From Our Happy Patients
              </h3>
              
              <span className="absolute top-10 sm:top-12 md:top-18 left-2 sm:left-4 md:left-6 text-6xl sm:text-7xl opacity-30">“</span>

              <p className="text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 pl-0 sm:pl-2 md:pl-4 pt-6 sm:pt-8 text-center lg:text-left">
                I've been taking treatment for hair here for the last 4 months. I was facing sudden hair fall issue and I should say this that I'm really satisfied with the results. I could see lot of improvement in the first two sessions itself. A special shoutout to My doctor who is such a sweet soul.
              </p>

              <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 pl-0 sm:pl-2 md:pl-4">
                <img
                  src="/unnamed.png"
                  alt="Archana Pandian"
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-base sm:text-lg">Archana Pandian</p>
                </div>
              </div>
            </div>
          </div>

          {/* FORM CARD - Desktop version (absolute positioned) */}
          <div className="hidden lg:block lg:absolute top-[-90px] left-6 xl:left-16 w-full lg:w-auto max-w-full lg:max-w-xl mx-auto mt-6 lg:mt-0">
            <div className="bg-[#1c1c1c] text-white rounded-xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">
                Request a call back
              </h3>

              {submitStatus.type && (
                <div className={`mb-4 p-3 rounded-lg text-sm ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-500/20 text-green-200' 
                    : 'bg-red-500/20 text-red-200'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Full Name"
                  className="w-full bg-transparent border-b border-gray-600 focus:outline-none py-2 text-base px-2"
                  disabled={isSubmitting}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Valid 10 Digit Phone No."
                  className="w-full bg-transparent border-b border-gray-600 focus:outline-none py-2 text-base px-2"
                  disabled={isSubmitting}
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Example@gmail.com"
                  className="w-full bg-transparent border-b border-gray-600 focus:outline-none py-2 text-base px-2"
                  disabled={isSubmitting}
                />
                
                <div className="pt-1">
                  <p className="text-sm text-gray-400 mb-2">What Are Your Concerns</p>
                  <div className="flex flex-wrap gap-2">
                    {CONCERN_OPTIONS.map((concern, index) => (
                      <label key={index} className="flex items-center space-x-1 bg-[#2c2c2c] px-3 py-2 rounded-full text-sm cursor-pointer hover:bg-[#3c3c3c] transition">
                        <input
                          type="checkbox"
                          checked={formData.concerns.includes(concern)}
                          onChange={() => handleConcernToggle(concern)}
                          className="form-checkbox h-4 w-4 text-red-600 bg-transparent border-gray-500 rounded"
                          disabled={isSubmitting}
                        />
                        <span>{concern}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Type 6 Digit Your Pincode Here"
                  maxLength={6}
                  pattern="[0-9]{6}"
                  className="w-full bg-transparent border-b border-gray-600 focus:outline-none py-2 text-base px-2 mt-2"
                  disabled={isSubmitting}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-3 bg-[#e82625] hover:bg-[#e82625] transition text-white py-4 px-8 rounded-full text-base font-semibold w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default RequestCallbackSection;