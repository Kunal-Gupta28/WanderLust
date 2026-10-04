"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

export default function CareersPage() {
  const revealRefs = useRef([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

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

  const openApply = (role) => {
    setSelectedRole(role);
    setShowModal(true);
  };

  const jobs = [
    { title: "Senior Frontend Engineer", type: "Full-time", location: "Remote" },
    { title: "Curator of Stays", type: "Full-time", location: "Hybrid - London" },
    { title: "Product Designer", type: "Full-time", location: "Remote" },
    { title: "Community Lead", type: "Part-time", location: "Remote" }
  ];

  return (
    <div className="bg-paper min-h-screen text-ink font-sans pt-16">
      <Navbar />

      {/* Hero */}
      <section className="px-6 py-24 md:py-32 max-w-4xl mx-auto text-center">
        <h1 ref={addToRefs} className="font-display text-5xl md:text-7xl font-bold text-ink mb-6 opacity-0 translate-y-8 transition-all duration-1000 ease-out">
          Build the future of thoughtful travel.
        </h1>
        <p ref={addToRefs} className="text-lg md:text-xl text-ink/70 opacity-0 translate-y-8 transition-all duration-1000 delay-200 ease-out">
          Join our global team in making mindful exploration accessible to everyone. We are remote-first, design-driven, and highly collaborative.
        </p>
      </section>

      {/* Culture Image */}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <div ref={addToRefs} className="relative h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden opacity-0 translate-y-8 transition-all duration-1000 ease-out">
          <Image 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" 
            alt="Team collaborating" 
            fill 
            className="object-cover"
          />
        </div>
      </section>

      {/* Perks */}
      <section className="px-6 py-24 bg-sand/30">
        <div className="max-w-6xl mx-auto">
          <h2 ref={addToRefs} className="font-display text-4xl font-bold text-center mb-16 opacity-0 translate-y-8 transition-all duration-1000 ease-out text-moss">Perks & Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Remote-first", desc: "Work from anywhere in the world. We value output over hours." },
              { title: "Travel Stipend", desc: "$2,000 annual allowance to experience WanderLust stays." },
              { title: "Wellness", desc: "Comprehensive health coverage and monthly wellness budget." },
              { title: "Learning", desc: "Dedicated allowance for courses, books, and conferences." }
            ].map((perk, i) => (
              <div 
                key={i} 
                ref={addToRefs}
                className="bg-paper p-8 rounded-2xl shadow-sm border border-ink/5 opacity-0 translate-y-8 transition-all duration-1000 ease-out"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <h3 className="font-display text-xl font-bold mb-3 text-ink">{perk.title}</h3>
                <p className="text-ink/70 text-sm leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="px-6 py-24 max-w-4xl mx-auto">
        <h2 ref={addToRefs} className="font-display text-4xl font-bold mb-12 text-ink opacity-0 translate-y-8 transition-all duration-1000 ease-out">Open Positions</h2>
        <div className="flex flex-col gap-4">
          {jobs.map((job, i) => (
            <div 
              key={i} 
              ref={addToRefs}
              className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-paper border border-ink/10 rounded-2xl hover:border-clay/50 transition-colors opacity-0 translate-y-8 duration-1000 ease-out"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div>
                <h3 className="font-display text-xl font-bold text-ink mb-1">{job.title}</h3>
                <div className="text-sm text-ink/60 flex gap-3">
                  <span>{job.type}</span>
                  <span>&bull;</span>
                  <span>{job.location}</span>
                </div>
              </div>
              <button 
                onClick={() => openApply(job.title)}
                className="mt-4 md:mt-0 px-6 py-3 bg-moss text-paper rounded-full text-sm font-medium hover:bg-moss/90 transition-colors"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm">
          <div className="bg-paper w-full max-w-lg p-8 rounded-3xl shadow-xl relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-ink/50 hover:text-ink transition p-1 rounded-full hover:bg-sand/40"
              aria-label="Close modal"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-[2]">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <h2 className="font-display text-2xl font-bold mb-2">Apply for {selectedRole}</h2>
            <p className="text-ink/60 text-sm mb-6">Fill out the form below and we'll get back to you.</p>
            <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
              <input type="text" placeholder="Full Name" required className="p-3 bg-sand/30 border border-ink/10 rounded-xl focus:outline-none focus:border-clay" />
              <input type="email" placeholder="Email Address" required className="p-3 bg-sand/30 border border-ink/10 rounded-xl focus:outline-none focus:border-clay" />
              <input type="url" placeholder="LinkedIn or Portfolio URL" className="p-3 bg-sand/30 border border-ink/10 rounded-xl focus:outline-none focus:border-clay" />
              <textarea placeholder="Why WanderLust?" rows={4} required className="p-3 bg-sand/30 border border-ink/10 rounded-xl focus:outline-none focus:border-clay resize-none"></textarea>
              <button type="submit" className="px-6 py-3 bg-clay text-paper rounded-xl font-medium mt-2 hover:bg-clay/90 transition-colors">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
