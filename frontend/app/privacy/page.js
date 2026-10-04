"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

export default function PrivacyPage() {
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
    { id: "information-collect", title: "1. Information We Collect" },
    { id: "how-we-use", title: "2. How We Use Your Data" },
    { id: "cookies", title: "3. Cookies & Tracking" },
    { id: "data-sharing", title: "4. Data Sharing & Security" },
    { id: "rights", title: "5. Your Rights & Choices" },
    { id: "contact", title: "6. Contacting Our Data Officer" },
  ];

  return (
    <div className="bg-paper min-h-screen text-ink font-sans selection:bg-moss selection:text-paper pt-16">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-16 relative">
        {/* Sidebar TOC */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-32">
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-ink/50 mb-4">Contents</h4>
            <ul className="space-y-3">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-ink/70 hover:text-moss text-sm transition-colors">
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
              Privacy Policy
            </h1>
            <p ref={addToRefs} className="text-xl text-ink/70 mb-2 opacity-0 translate-y-4 transition-all duration-700 delay-100 ease-out">
              How we handle and protect your personal information.
            </p>
            <p ref={addToRefs} className="text-ink/40 text-sm opacity-0 translate-y-4 transition-all duration-700 delay-150 ease-out">
              Last updated: October 4, 2026
            </p>
          </header>

          <div className="space-y-16 prose prose-lg prose-ink max-w-none">
            <section id="information-collect" ref={addToRefs} className="opacity-0 translate-y-4 transition-all duration-700 ease-out scroll-mt-32">
              <h2 className="font-display text-3xl font-bold mb-4 text-moss">1. Information We Collect</h2>
              <p className="leading-relaxed text-ink/80 mb-4">
                We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us.
              </p>
              <p className="leading-relaxed text-ink/80">
                This may include: name, email, phone number, postal address, profile picture, payment method, and other information you choose to provide.
              </p>
            </section>

            <section id="how-we-use" ref={addToRefs} className="opacity-0 translate-y-4 transition-all duration-700 ease-out scroll-mt-32">
              <h2 className="font-display text-3xl font-bold mb-4 text-moss">2. How We Use Your Data</h2>
              <p className="leading-relaxed text-ink/80 mb-4">
                We use the information we collect to provide, maintain, and improve our services. For example, to facilitate payments, send receipts, provide products and services you request (and send related information), develop new features, and provide customer support.
              </p>
            </section>

            <section id="cookies" ref={addToRefs} className="opacity-0 translate-y-4 transition-all duration-700 ease-out scroll-mt-32">
              <h2 className="font-display text-3xl font-bold mb-4 text-moss">3. Cookies & Tracking</h2>
              <p className="leading-relaxed text-ink/80 mb-4">
                We use cookies, web beacons, and similar tracking technologies to collect information about your interactions with our website. This helps us personalize your experience and analyze usage trends.
              </p>
            </section>

            <section id="data-sharing" ref={addToRefs} className="opacity-0 translate-y-4 transition-all duration-700 ease-out scroll-mt-32">
              <h2 className="font-display text-3xl font-bold mb-4 text-moss">4. Data Sharing & Security</h2>
              <p className="leading-relaxed text-ink/80 mb-4">
                We do not sell your personal data. We may share your information with trusted third-party service providers (like payment processors) only as necessary to provide our services. We implement robust security measures to protect your data from unauthorized access.
              </p>
            </section>

            <section id="rights" ref={addToRefs} className="opacity-0 translate-y-4 transition-all duration-700 ease-out scroll-mt-32">
              <h2 className="font-display text-3xl font-bold mb-4 text-moss">5. Your Rights & Choices</h2>
              <p className="leading-relaxed text-ink/80 mb-4">
                Depending on your location, you may have the right to access, correct, delete, or restrict the use of your personal data. You can manage most of your information directly through your account settings.
              </p>
            </section>

            <section id="contact" ref={addToRefs} className="opacity-0 translate-y-4 transition-all duration-700 ease-out scroll-mt-32">
              <h2 className="font-display text-3xl font-bold mb-4 text-moss">6. Contacting Our Data Officer</h2>
              <p className="leading-relaxed text-ink/80 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact our Data Protection Officer at:
                <br />
                <a href="mailto:privacy@wanderlust.com" className="text-clay font-medium hover:underline mt-2 inline-block">privacy@wanderlust.com</a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
