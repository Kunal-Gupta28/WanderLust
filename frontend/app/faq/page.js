"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

const faqs = [
  // General & Philosophy
  {
    category: "General & Philosophy",
    q: "What makes WanderLust different from other booking platforms?",
    a: "WanderLust is an curated collection of handpicked, design-led, and environmentally conscious stays. Unlike mass platforms with millions of generic listings, every stay on WanderLust is personally reviewed for architectural intent, local host integration, natural solitude, and unhurried comfort."
  },
  {
    category: "General & Philosophy",
    q: "What does 'Slow Travel' mean at WanderLust?",
    a: "Slow Travel is an intentional way of exploring where you prioritize depth over breadth. Instead of checking off 5 cities in a week, we encourage staying 3+ nights in a single location, supporting neighborhood bakeries, learning local customs, and leaving room for unscripted discovery."
  },
  {
    category: "General & Philosophy",
    q: "Do I need an account to browse or book a stay?",
    a: "You can freely browse our full collection and search stays without an account. However, creating a free account allows you to save favorite stays, message hosts directly, receive curated seasonal collections, and manage active reservations."
  },
  {
    category: "General & Philosophy",
    q: "How can I try out WanderLust without registering?",
    a: "We offer a 1-Click Demo Login on our sign-in page! You can explore the full user experience instantly with zero sign-up friction."
  },

  // Booking & Reservations
  {
    category: "Booking & Reservations",
    q: "How does the reservation request process work?",
    a: "When you request a stay, the host receives your trip dates and message. Most hosts respond within 12 to 24 hours. Your payment method is authorized upon request but only charged once the host approves your reservation."
  },
  {
    category: "Booking & Reservations",
    q: "What is your cancellation and refund policy?",
    a: "We offer flexible cancellation policies set by each host: Flexible (full refund up to 48 hours before check-in), Moderate (full refund up to 7 days before check-in), and Restorative (full refund up to 14 days before check-in). Detailed policy rules are clearly displayed on every listing page before booking."
  },
  {
    category: "Booking & Reservations",
    q: "Can I extend my stay or change my travel dates?",
    a: "Yes! You can request date changes directly from your account reservation tab. If the host has available dates around your trip, they can accept the modification seamlessly."
  },
  {
    category: "Booking & Reservations",
    q: "Are long-term stays or remote work sabbaticals supported?",
    a: "Absolutely. Many of our hosts offer weekly (10-15%) and monthly (20-35%) discounts for guests planning extended creative retreats or remote work sabbaticals."
  },

  // Stays & Amenities
  {
    category: "Stays & Amenities",
    q: "Are high-speed WiFi and remote workspace available?",
    a: "Yes. Stays equipped for remote work are tagged with dedicated work desks, ergonomic seating, and verified high-speed fiber or satellite WiFi speed tests."
  },
  {
    category: "Stays & Amenities",
    q: "Are pets allowed at WanderLust stays?",
    a: "Many of our mountain cabins, rural farmsteads, and coastal homes warmly welcome pets. Look for the 'Pet Friendly' badge on listing detail cards or filter search results by pet accessibility."
  },
  {
    category: "Stays & Amenities",
    q: "What kitchen appliances and essentials are provided?",
    a: "Every home in our collection includes a fully equipped kitchen with cookware, local coffee/tea supplies, oil, spices, and fresh linen. Specific appliances (espresso machine, woodfire oven, blender) are listed under amenities."
  },
  {
    category: "Stays & Amenities",
    q: "How do self check-in and key pickup work?",
    a: "Most hosts offer seamless self check-in via secure keyless door codes or lockboxes. Complete check-in instructions, parking directions, and host contact info are sent to your email 48 hours before arrival."
  },

  // Hosting & Curation
  {
    category: "Hosting & Curation",
    q: "How does WanderLust select and curate listings?",
    a: "Our curation committee evaluates every application across four criteria: Architectural Intent (design quality & natural light), Environmental Stewardship (sustainable energy/waste management), Local Integration (neighborhood connection), and Restful Comfort."
  },
  {
    category: "Hosting & Curation",
    q: "How do I apply to list my property on WanderLust?",
    a: "Head to our Contact page or click 'Host a Stay' in the footer. Submit photos, location details, and a short note about your space. Our team will review your application within 5 business days."
  },
  {
    category: "Hosting & Curation",
    q: "What fees does WanderLust charge hosts?",
    a: "We maintain a transparent, host-first model: a flat 3% host service fee per reservation to cover secure payment gateway processing, platform upkeep, and host liability protection."
  },
  {
    category: "Hosting & Curation",
    q: "What support is provided to independent hosts?",
    a: "Hosts receive professional photography guidance, pricing insights, dedicated 24/7 host support, and direct promotion across WanderLust editorial collections."
  },

  // Payments, Refunds & Insurance
  {
    category: "Payments, Refunds & Insurance",
    q: "Which payment methods are accepted?",
    a: "We accept all major credit/debit cards (Visa, MasterCard, American Express), Apple Pay, Google Pay, and regional net banking methods."
  },
  {
    category: "Payments, Refunds & Insurance",
    q: "Are there any hidden fees at checkout?",
    a: "Never. We believe in total pricing transparency. The price you see includes room rate, cleaning fee, and applicable taxes. Zero surprise service markup at checkout."
  },
  {
    category: "Payments, Refunds & Insurance",
    q: "How are security deposits handled?",
    a: "Certain luxury properties hold a temporary security authorization on your card 24 hours prior to check-in. The hold is automatically released within 3 days post checkout after inspection."
  },
  {
    category: "Payments, Refunds & Insurance",
    q: "Is guest protection or travel insurance included?",
    a: "Every verified WanderLust booking includes $10,000 in emergency medical coverage and property damage protection. Optional trip interruption insurance can be added with one click during booking."
  },

  // Safety & Community
  {
    category: "Safety & Community Guidelines",
    q: "How does WanderLust verify hosts and guests?",
    a: "All users complete identity verification using government-issued ID checks and secure phone verification. Reviews are 100% authentic and can only be written after a completed stay."
  },
  {
    category: "Safety & Community Guidelines",
    q: "What should I do if an emergency arises during my stay?",
    a: "Hosts provide 24/7 local emergency contacts in the welcome guide. Additionally, our dedicated WanderLust Safety Team is reachable round-the-clock via our emergency hotline."
  },
  {
    category: "Safety & Community Guidelines",
    q: "What are the community noise and quiet hours rules?",
    a: "To honor local neighbors and wildlife, all WanderLust stays enforce standard quiet hours between 10:00 PM and 7:00 AM. Parties or large unannounced gatherings are strictly prohibited."
  }
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("General & Philosophy");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const revealRefs = useRef([]);

  const categories = [
    "All Categories",
    "General & Philosophy",
    "Booking & Reservations",
    "Stays & Amenities",
    "Hosting & Curation",
    "Payments, Refunds & Insurance",
    "Safety & Community Guidelines"
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (searchQuery.trim()) return matchesSearch;
    if (activeCategory === "All Categories") return true;
    return faq.category === activeCategory;
  });

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

  return (
    <div className="bg-paper min-h-screen text-ink font-sans selection:bg-moss selection:text-paper pt-16">
      <Navbar />

      {/* Hero & Search Header */}
      <section className="px-[clamp(1.25rem,4vw,4.5rem)] pt-20 pb-16 max-w-4xl mx-auto text-center">
        <span ref={addToRefs} className="text-xs font-bold tracking-[.18em] text-clay uppercase block mb-3 opacity-0 translate-y-8 transition-all duration-700 ease-out">
          Help Center & Knowledge Base
        </span>
        <h1 
          ref={addToRefs}
          className="font-display text-[clamp(2.8rem,5.5vw,5.5rem)] font-bold leading-[.92] tracking-[-.05em] mb-6 text-ink opacity-0 translate-y-8 transition-all duration-1000 ease-out"
        >
          Frequently Asked Questions
        </h1>
        <p 
          ref={addToRefs}
          className="text-lg text-ink/75 max-w-xl mx-auto mb-10 opacity-0 translate-y-8 transition-all duration-1000 delay-100 ease-out"
        >
          Everything you need to know about our curated stays, slow travel ethos, host partnerships, and guest protection.
        </p>

        {/* Live Search Input */}
        <div ref={addToRefs} className="relative max-w-2xl mx-auto opacity-0 translate-y-8 transition-all duration-1000 delay-200 ease-out">
          <input 
            type="text" 
            placeholder="Search questions (e.g. cancellation, WiFi, pets, hosting)..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setOpenIndex(null);
            }}
            className="w-full py-4.5 pl-13 pr-12 bg-white rounded-2xl shadow-sm border border-ink/15 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/20 text-base text-ink placeholder:text-ink/40 transition-all"
          />
          <svg className="absolute left-4.5 top-1/2 -translate-y-1/2 w-5 h-5 text-clay pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-ink/40 hover:text-ink transition bg-sand/40 px-2 py-1 rounded-md"
            >
              Clear
            </button>
          )}
        </div>
      </section>

      {/* Category Tabs */}
      <section className="px-[clamp(1.25rem,4vw,4.5rem)] pb-12 max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-2.5">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => { 
                setActiveCategory(cat); 
                setSearchQuery("");
                setOpenIndex(null); 
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                activeCategory === cat && !searchQuery
                  ? "bg-ink text-paper shadow-md scale-105"
                  : "bg-sand/40 text-ink/70 hover:bg-sand hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="px-[clamp(1.25rem,4vw,4.5rem)] pb-28 max-w-4xl mx-auto min-h-[450px]">
        {searchQuery && (
          <p className="text-xs font-bold text-moss uppercase tracking-wider mb-6 text-center">
            Showing {filteredFaqs.length} results for "{searchQuery}"
          </p>
        )}

        {filteredFaqs.length === 0 ? (
          <div className="text-center py-20 bg-sand/20 rounded-3xl border border-ink/10">
            <h3 className="font-display text-2xl font-bold text-ink mb-2">No matching questions found</h3>
            <p className="text-ink/60 text-sm max-w-md mx-auto mb-6">
              We couldn't find any FAQs matching "{searchQuery}". Have a specific question?
            </p>
            <button 
              onClick={() => { setSearchQuery(""); setActiveCategory("All Categories"); }}
              className="text-xs font-bold text-clay underline underline-offset-4 hover:text-ink transition"
            >
              Show all FAQs
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div 
                  key={idx} 
                  className={`bg-white rounded-2xl border transition-all duration-300 ${
                    isOpen ? "border-clay shadow-md" : "border-ink/10 hover:border-ink/25 shadow-sm"
                  }`}
                >
                  <button 
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-6 flex justify-between items-center text-left focus:outline-none group"
                  >
                    <span className="font-display text-lg font-bold text-ink group-hover:text-clay transition-colors pr-6">
                      {faq.q}
                    </span>
                    <span className={`flex-shrink-0 grid place-items-center w-8 h-8 rounded-full bg-sand/40 text-ink transition-transform duration-300 ${isOpen ? "rotate-180 bg-clay text-white" : "group-hover:bg-sand"}`}>
                      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[2.5]">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>

                  <div 
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pt-2 border-t border-ink/10 text-ink/75 leading-relaxed text-sm md:text-base">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Still Have Questions CTA */}
      <section className="px-[clamp(1.25rem,4vw,4.5rem)] py-20 bg-moss text-paper text-center border-t border-ink/10">
        <div className="max-w-2xl mx-auto">
          <span className="text-xs font-bold tracking-[.18em] text-sand uppercase block mb-2">Can't find your answer?</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Our Concierge Team is Here</h2>
          <p className="text-paper/75 text-base mb-8 max-w-lg mx-auto">
            Whether you're planning a retreat, inquiring about a property, or applying to host, we're always happy to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/contact" 
              className="inline-block px-8 py-3.5 bg-clay text-paper rounded-full font-bold text-sm hover:bg-[#9e442b] transition-colors shadow-md"
            >
              Get in Touch
            </Link>
            <Link 
              href="/explore" 
              className="inline-block px-8 py-3.5 border border-paper/40 text-paper rounded-full font-bold text-sm hover:bg-paper hover:text-ink transition-colors"
            >
              Browse Stays
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
