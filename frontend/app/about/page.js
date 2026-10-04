"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none stroke-[1.5]">
      <path d="M11 20A9 9 0 0 0 20 11V3h-8a9 9 0 0 0-9 9 5 5 0 0 0 5 5h3z" />
      <path d="M11 20v-9" />
    </svg>
  );
}

function HammerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none stroke-[1.5]">
      <path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9" />
      <path d="M17.64 15 22 10.64" />
      <path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25V7.5L16.2 5.03c-.42-.42-1.07-.56-1.63-.35L12 5.75l-4-4L6.25 3.5l4 4-1.07 2.57c-.2.56-.07 1.2.35 1.63l2.47 2.53h.71c.85 0 1.65.33 2.25.93l1.25 1.25" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none stroke-[1.5]">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20z" />
      <path d="M2 12h20" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none stroke-[1.5]">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4M3 5h4M19 17v4M17 19h4" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none stroke-[1.75]">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.8 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none stroke-[1.75]">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function HeartHandshakeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none stroke-[1.75]">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

export default function AboutPage() {
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
      { threshold: 0.12 }
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

      {/* Hero Section */}
      <section className="px-[clamp(1.25rem,4vw,4.5rem)] pt-20 pb-28 max-w-[90rem] mx-auto text-center">
        <p ref={addToRefs} className="text-xs font-bold tracking-[.18em] text-clay uppercase mb-4 opacity-0 translate-y-8 transition-all duration-700 ease-out">
          About WanderLust
        </p>
        <h1 
          ref={addToRefs}
          className="font-display text-[clamp(3.5rem,7vw,7.5rem)] leading-[.88] tracking-[-.06em] text-ink max-w-5xl mx-auto mb-8 opacity-0 translate-y-8 transition-all duration-1000 ease-out"
        >
          Redefining how curious people <em className="font-normal text-clay">experience stays.</em>
        </h1>
        <p 
          ref={addToRefs}
          className="text-lg md:text-2xl text-ink/75 max-w-3xl mx-auto leading-relaxed opacity-0 translate-y-8 transition-all duration-1000 delay-150 ease-out"
        >
          We believe travel should be unhurried, deeply tactile, and rooted in a genuine sense of place. WanderLust is your sanctuary for thoughtful, character-rich retreats.
        </p>
      </section>

      {/* Hero Visual Image Banner */}
      <section className="px-[clamp(1.25rem,4vw,4.5rem)] pb-24 max-w-[90rem] mx-auto">
        <div ref={addToRefs} className="relative h-[clamp(24rem,50vh,38rem)] w-full rounded-3xl overflow-hidden shadow-2xl opacity-0 translate-y-8 transition-all duration-1000 ease-out">
          <Image 
            src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=90&w=2000" 
            alt="Warm A-frame cabin in pine forest"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent flex items-end p-8 md:p-14">
            <p className="text-paper text-sm md:text-lg max-w-xl font-display italic">
              "We don't collect locations on a map; we curate memory-rich sanctuaries where time moves a little slower."
            </p>
          </div>
        </div>
      </section>

      {/* Our Story & Manifesto */}
      <section className="px-[clamp(1.25rem,4vw,4.5rem)] py-24 bg-sand/30 border-y border-ink/10">
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={addToRefs} className="opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <span className="text-xs font-bold tracking-[.14em] text-moss uppercase">The Origin Story</span>
            <h2 className="font-display text-4xl md:text-6xl tracking-[-.05em] font-bold mt-2 mb-8 text-ink">
              Born from a quiet rebellion against transactional travel.
            </h2>
            <p className="text-ink/80 text-lg leading-relaxed mb-6">
              In 2021, we set out with a simple question: Why has travel become an exercise in box-checking? Algorithms were serving up identical, mass-produced listings while authentic, soul-stirring stays remained hidden.
            </p>
            <p className="text-ink/80 text-lg leading-relaxed mb-8">
              WanderLust began as an intimate directory of 12 timber cabins tucked away in the Himalayas. Today, it has evolved into a global community of mindful wanderers and independent hosts who honor architectural character, regional heritage, and natural solitude.
            </p>
            <div className="border-l-2 border-clay pl-6 py-2">
              <p className="font-display text-xl text-ink italic">
                "Every stay in our collection has a soul, a voice, and a host who cares deeply about the land beneath it."
              </p>
            </div>
          </div>
          <div ref={addToRefs} className="relative h-[550px] w-full rounded-2xl overflow-hidden shadow-xl opacity-0 translate-y-8 transition-all duration-1000 delay-200 ease-out">
            <Image 
              src="https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&q=85&w=1200" 
              alt="Architectural cabin interior"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-[clamp(1.25rem,4vw,4.5rem)] py-28 max-w-[90rem] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { number: "250+", label: "Handpicked Stays", desc: "Curated with strict quality & aesthetic criteria" },
            { number: "45+", label: "Unique Regions", desc: "From coastal coves to Himalayan ridges" },
            { number: "18k+", label: "Mindful Travelers", desc: "Seeking deeper, unhurried journeys" },
            { number: "99%", label: "Host Satisfaction", desc: "Direct support & fair partnership" }
          ].map((stat, i) => (
            <div 
              key={i} 
              ref={addToRefs}
              className="bg-paper p-8 rounded-2xl border border-ink/10 shadow-sm hover:shadow-md hover:border-clay/40 transition-all duration-300 opacity-0 translate-y-8 ease-out"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="font-display text-5xl font-bold text-clay mb-2">{stat.number}</div>
              <div className="text-ink font-bold text-base mb-1">{stat.label}</div>
              <p className="text-ink/60 text-xs leading-relaxed">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values Section with SVG Icons */}
      <section className="px-[clamp(1.25rem,4vw,4.5rem)] py-28 bg-moss text-paper">
        <div className="max-w-[90rem] mx-auto">
          <div ref={addToRefs} className="text-center max-w-2xl mx-auto mb-20 opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <span className="text-xs font-bold tracking-[.18em] text-sand uppercase">Guiding Principles</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-[-.05em] mt-3 mb-4">Our Core Values</h2>
            <p className="text-paper/75 text-base md:text-lg">
              These four pillars anchor every stay we list, every feature we build, and every partnership we cultivate.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "Authenticity", 
                desc: "Real spaces with genuine character, regional materials, and stories rooted in local heritage.", 
                Icon: LeafIcon 
              },
              { 
                title: "Craft & Detail", 
                desc: "Meticulous design attention—from hand-carved beams to morning light in quiet reading nooks.", 
                Icon: HammerIcon 
              },
              { 
                title: "Stewardship", 
                desc: "Honoring nature and local communities with low-impact footprints and sustainable hosting.", 
                Icon: GlobeIcon 
              },
              { 
                title: "Wonder", 
                desc: "Fostering awe, childlike curiosity, and restorative stillness in every travel experience.", 
                Icon: SparklesIcon 
              }
            ].map((value, i) => (
              <div 
                key={i} 
                ref={addToRefs}
                className="bg-paper/5 p-8 rounded-2xl border border-paper/10 hover:border-paper/30 transition-all duration-300 opacity-0 translate-y-8 ease-out group"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-sand mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.Icon />
                </div>
                <h3 className="font-display text-2xl font-bold mb-3 text-paper">{value.title}</h3>
                <p className="text-paper/70 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Curate Section */}
      <section className="px-[clamp(1.25rem,4vw,4.5rem)] py-28 max-w-[90rem] mx-auto">
        <div ref={addToRefs} className="text-center max-w-2xl mx-auto mb-20 opacity-0 translate-y-8 transition-all duration-1000 ease-out">
          <span className="text-xs font-bold tracking-[.18em] text-clay uppercase">Quality & Care</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-[-.05em] text-ink mt-3">How We Select Every Stay</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              step: "01",
              title: "Architectural Intent",
              desc: "We look for homes built with intent—whether a restored stone fort or a modern glass dome designed around the night sky.",
              Icon: CompassIcon
            },
            {
              step: "02",
              title: "Community Harmony",
              desc: "We partner with local hosts who actively support their surrounding neighborhoods, bakeries, and artisans.",
              Icon: HeartHandshakeIcon
            },
            {
              step: "03",
              title: "Verified Restfulness",
              desc: "Every listing undergoes an inspection for tranquil surroundings, comfortable bedding, and natural illumination.",
              Icon: ShieldCheckIcon
            }
          ].map((item, i) => (
            <div 
              key={i} 
              ref={addToRefs}
              className="relative p-8 rounded-2xl bg-sand/20 border border-ink/10 opacity-0 translate-y-8 transition-all duration-1000 ease-out"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-display text-3xl font-bold text-clay">{item.step}</span>
                <div className="text-moss">
                  <item.Icon />
                </div>
              </div>
              <h3 className="font-display text-2xl font-bold text-ink mb-3">{item.title}</h3>
              <p className="text-ink/75 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team & Curators Section */}
      <section className="px-[clamp(1.25rem,4vw,4.5rem)] py-28 bg-sand/20 border-t border-ink/10">
        <div className="max-w-[90rem] mx-auto">
          <div ref={addToRefs} className="text-center max-w-xl mx-auto mb-20 opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <span className="text-xs font-bold tracking-[.18em] text-clay uppercase">People Behind WanderLust</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ink tracking-[-.05em] mt-3">The Curators</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                name: "Elena Rostova", 
                role: "Co-Founder & CEO", 
                bio: "Architect & slow-travel advocate. Spends winters exploring mountain hamlets.",
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400" 
              },
              { 
                name: "Marcus Chen", 
                role: "Head of Curation", 
                bio: "Former travel writer with a passion for heritage restoration & sustainable stays.",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400" 
              },
              { 
                name: "Sarah Jenkins", 
                role: "Community Director", 
                bio: "Dedicated to empowering independent hosts and supporting local artisan economies.",
                img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=400" 
              }
            ].map((member, i) => (
              <div 
                key={i} 
                ref={addToRefs}
                className="bg-paper p-8 rounded-2xl border border-ink/10 shadow-sm text-center opacity-0 translate-y-8 transition-all duration-1000 ease-out hover:border-clay/40 transition-colors"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="relative w-36 h-36 mx-auto mb-6 rounded-full overflow-hidden border-4 border-sand shadow-inner">
                  <Image src={member.img} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="font-display text-2xl font-bold text-ink">{member.name}</h3>
                <p className="text-clay font-bold text-xs uppercase tracking-wider mt-1 mb-4">{member.role}</p>
                <p className="text-ink/70 text-xs leading-relaxed max-w-xs mx-auto">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-moss px-[clamp(1.25rem,4vw,4.5rem)] py-24 text-paper text-center">
        <div ref={addToRefs} className="max-w-4xl mx-auto opacity-0 translate-y-8 transition-all duration-1000 ease-out">
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] leading-[.9] tracking-[-.05em] mb-6">
            Ready to discover places <em className="font-normal text-sand">worth remembering?</em>
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link 
              href="/explore" 
              className="rounded-full bg-clay px-8 py-4 text-sm font-bold text-white transition hover:bg-[#9e442b]"
            >
              Explore Collection
            </Link>
            <Link 
              href="/contact" 
              className="rounded-full border border-paper/40 px-8 py-4 text-sm font-bold text-paper transition hover:bg-paper hover:text-ink"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
