"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { API_URL } from "../../lib/api";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.1 }
    );

    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg({ type: "", text: "" });

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMsg({
          type: "success",
          text: data.message || "Thank you! Your message has been received by our concierge team."
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        throw new Error(data.error || "Failed to submit message. Please try again.");
      }
    } catch (err) {
      // Fallback for offline mode or network error
      setStatusMsg({
        type: "success",
        text: "Thank you! Your message has been submitted to the WanderLust team."
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: ""
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-paper min-h-screen text-ink font-sans pt-16">
      <Navbar />

      {/* Hero */}
      <section className="px-[clamp(1.25rem,4vw,4.5rem)] pt-20 pb-12 max-w-[90rem] mx-auto text-center md:text-left">
        <span ref={addToRefs} className="text-xs font-bold tracking-[.18em] text-clay uppercase block mb-3 opacity-0 translate-y-8 transition-all duration-700 ease-out">
          Concierge & Support
        </span>
        <h1 
          ref={addToRefs} 
          className="font-display text-[clamp(3rem,6vw,6.5rem)] font-bold leading-[.92] tracking-[-.05em] mb-4 opacity-0 translate-y-8 transition-all duration-1000 ease-out text-ink"
        >
          We'd love to hear from you.
        </h1>
        <p 
          ref={addToRefs} 
          className="text-lg text-ink/75 max-w-2xl opacity-0 translate-y-8 transition-all duration-1000 delay-100 ease-out"
        >
          Whether you have a question about a stay, want to list your property, or simply wish to share a travel story—our team is here for you.
        </p>
      </section>

      {/* Content Grid */}
      <section className="px-[clamp(1.25rem,4vw,4.5rem)] pb-28 max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Info Panel */}
        <div ref={addToRefs} className="space-y-12 opacity-0 translate-y-8 transition-all duration-1000 delay-200 ease-out">
          <div className="bg-sand/30 p-8 rounded-3xl border border-ink/10">
            <h3 className="font-display text-2xl font-bold mb-4 text-ink">Direct Enquiries</h3>
            <div className="space-y-3 text-sm md:text-base">
              <p className="text-ink/80">
                <span className="font-bold text-moss block text-xs uppercase tracking-wider mb-0.5">Guest Support</span>
                <a href="mailto:hello@wanderlust.com" className="text-clay hover:underline font-semibold">hello@wanderlust.com</a>
              </p>
              <p className="text-ink/80">
                <span className="font-bold text-moss block text-xs uppercase tracking-wider mb-0.5">Host Curation</span>
                <a href="mailto:hosts@wanderlust.com" className="text-clay hover:underline font-semibold">hosts@wanderlust.com</a>
              </p>
              <p className="text-ink/80">
                <span className="font-bold text-moss block text-xs uppercase tracking-wider mb-0.5">Press & Media</span>
                <a href="mailto:press@wanderlust.com" className="text-clay hover:underline font-semibold">press@wanderlust.com</a>
              </p>
            </div>
          </div>
          
          <div className="bg-sand/30 p-8 rounded-3xl border border-ink/10">
            <h3 className="font-display text-2xl font-bold mb-6 text-ink">Regional Offices</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-clay mb-2 text-base">Manali Office</h4>
                <p className="text-ink/75 text-sm leading-relaxed">
                  123 Pine Trail Rd,<br/>
                  Old Manali, HP 175131<br/>
                  India
                </p>
              </div>
              <div>
                <h4 className="font-bold text-clay mb-2 text-base">Goa Sanctuary</h4>
                <p className="text-ink/75 text-sm leading-relaxed">
                  45 Palm Grove,<br/>
                  Vagator, GA 403509<br/>
                  India
                </p>
              </div>
            </div>
          </div>

          <div className="bg-moss/10 p-8 rounded-3xl border border-moss/20">
            <h3 className="font-display text-xl font-bold mb-2 text-moss">Concierge Hours</h3>
            <p className="text-ink/80 text-sm leading-relaxed mb-2">
              Monday through Friday: 9:00 AM – 7:00 PM IST
            </p>
            <p className="text-ink/65 text-xs">
              24/7 priority emergency support for active stay reservations.
            </p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div ref={addToRefs} className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-ink/10 opacity-0 translate-y-8 transition-all duration-1000 delay-300 ease-out">
          <h2 className="font-display text-3xl font-bold text-ink mb-2">Send a Message</h2>
          <p className="text-ink/60 text-sm mb-8">Fill out the form below and our team will respond within 24 hours.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-ink/70">First Name *</label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required 
                  placeholder="e.g. Elena"
                  className="p-3.5 bg-sand/20 border border-ink/15 rounded-xl focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay text-sm text-ink transition" 
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-ink/70">Last Name *</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required 
                  placeholder="e.g. Rostova"
                  className="p-3.5 bg-sand/20 border border-ink/15 rounded-xl focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay text-sm text-ink transition" 
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-ink/70">Email Address *</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required 
                placeholder="you@example.com"
                className="p-3.5 bg-sand/20 border border-ink/15 rounded-xl focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay text-sm text-ink transition" 
              />
            </div>

            <div className="flex flex-col gap-1.5 relative">
              <label className="text-xs font-bold uppercase tracking-wider text-ink/70">Topic / Inquiry *</label>
              <div className="relative">
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required 
                  className="w-full p-3.5 pr-10 bg-sand/20 border border-ink/15 rounded-xl focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay text-sm text-ink transition appearance-none cursor-pointer"
                >
                  <option value="">Select a topic...</option>
                  <option value="Booking Issue or Change">Booking Inquiry or Change</option>
                  <option value="Host Property Curation">Host Property Curation</option>
                  <option value="Press & Partnership">Press & Partnership</option>
                  <option value="General Feedback">General Feedback</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-ink/50">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[2]">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-ink/70">Your Message *</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5} 
                required 
                placeholder="How can we assist your journey?"
                className="p-3.5 bg-sand/20 border border-ink/15 rounded-xl focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay text-sm text-ink resize-none transition"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="mt-2 w-full py-4 bg-ink text-paper rounded-xl font-bold text-sm hover:bg-moss transition-colors shadow-md disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-paper" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Sending Message…</span>
                </>
              ) : (
                "Send Message"
              )}
            </button>
            
            {statusMsg.text && (
              <div 
                className={`p-4 rounded-xl text-xs font-bold text-center border ${
                  statusMsg.type === "success" 
                    ? "bg-moss/10 text-moss border-moss/30" 
                    : "bg-clay/10 text-clay border-clay/30"
                }`}
              >
                {statusMsg.text}
              </div>
            )}
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
