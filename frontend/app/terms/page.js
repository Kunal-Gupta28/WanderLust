"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

export default function TermsPage() {
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-4");
          }
        });
      },
      { threshold: 0.05 }
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

  const sections = [
    { id: "acceptance", title: "1. Acceptance of Terms" },
    { id: "guest-responsibilities", title: "2. Guest Responsibilities" },
    { id: "host-agreements", title: "3. Host Agreements" },
    { id: "cancellations", title: "4. Cancellations & Refunds" },
    { id: "intellectual-property", title: "5. Intellectual Property" },
    { id: "liability", title: "6. Limitation of Liability" },
  ];

  return (
    <div className="bg-paper min-h-screen text-ink font-sans selection:bg-clay selection:text-paper pt-16">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-16 relative">
        {/* Sidebar TOC */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-32">
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-ink/50 mb-4">Contents</h4>
            <ul className="space-y-3">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-ink/70 hover:text-clay text-sm transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1">
          <header className="mb-16">
            <h1 ref={addToRefs} className="font-display text-5xl font-bold mb-4 opacity-0 translate-y-4 transition-all duration-700 ease-out">
              Terms of Service
            </h1>
            <p ref={addToRefs} className="text-ink/50 opacity-0 translate-y-4 transition-all duration-700 delay-100 ease-out">
              Last updated: October 4, 2026
            </p>
          </header>

          <div className="space-y-16 prose prose-lg prose-ink max-w-none">
            <section id="acceptance" ref={addToRefs} className="opacity-0 translate-y-4 transition-all duration-700 ease-out scroll-mt-32">
              <h2 className="font-display text-3xl font-bold mb-4 text-moss">1. Acceptance of Terms</h2>
              <p className="leading-relaxed text-ink/80 mb-4">
                By accessing or using the WanderLust platform, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.
              </p>
              <p className="leading-relaxed text-ink/80">
                These terms apply to all visitors, users, guests, hosts, and others who access or use the platform.
              </p>
            </section>

            <section id="guest-responsibilities" ref={addToRefs} className="opacity-0 translate-y-4 transition-all duration-700 ease-out scroll-mt-32">
              <h2 className="font-display text-3xl font-bold mb-4 text-moss">2. Guest Responsibilities</h2>
              <p className="leading-relaxed text-ink/80 mb-4">
                As a guest, you agree to treat the accommodations, the host, and the surrounding community with respect. You are responsible for leaving the property in the condition it was when you arrived.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-ink/80">
                <li>Adhere strictly to house rules provided by the host.</li>
                <li>Do not bring undeclared guests or pets.</li>
                <li>Report any damages immediately to the host and WanderLust support.</li>
              </ul>
            </section>

            <section id="host-agreements" ref={addToRefs} className="opacity-0 translate-y-4 transition-all duration-700 ease-out scroll-mt-32">
              <h2 className="font-display text-3xl font-bold mb-4 text-moss">3. Host Agreements</h2>
              <p className="leading-relaxed text-ink/80 mb-4">
                Hosts are expected to provide clean, safe, and accurate representations of their properties. WanderLust reserves the right to suspend host accounts that consistently receive poor reviews or violate safety standards.
              </p>
            </section>

            <section id="cancellations" ref={addToRefs} className="opacity-0 translate-y-4 transition-all duration-700 ease-out scroll-mt-32">
              <h2 className="font-display text-3xl font-bold mb-4 text-moss">4. Cancellations & Refunds</h2>
              <p className="leading-relaxed text-ink/80 mb-4">
                Cancellation policies are determined by the individual host and clearly displayed on the listing page before booking. WanderLust service fees are generally non-refundable unless the cancellation happens within 48 hours of booking and is at least 14 days prior to check-in.
              </p>
            </section>

            <section id="intellectual-property" ref={addToRefs} className="opacity-0 translate-y-4 transition-all duration-700 ease-out scroll-mt-32">
              <h2 className="font-display text-3xl font-bold mb-4 text-moss">5. Intellectual Property</h2>
              <p className="leading-relaxed text-ink/80 mb-4">
                The Service and its original content, features, and functionality are and will remain the exclusive property of WanderLust and its licensors. The Service is protected by copyright, trademark, and other laws.
              </p>
            </section>

            <section id="liability" ref={addToRefs} className="opacity-0 translate-y-4 transition-all duration-700 ease-out scroll-mt-32">
              <h2 className="font-display text-3xl font-bold mb-4 text-moss">6. Limitation of Liability</h2>
              <p className="leading-relaxed text-ink/80 mb-4">
                In no event shall WanderLust, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
