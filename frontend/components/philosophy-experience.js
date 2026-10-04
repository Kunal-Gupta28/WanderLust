"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Footer from "./footer";
import Navbar from "./navbar";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none stroke-[1.75]">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none stroke-[1.75]">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.8 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none stroke-[1.75]">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function FeatherIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none stroke-[1.75]">
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L3 13.5V21h7.5z" />
      <line x1="16" y1="8" x2="2" y2="22" />
      <line x1="17.5" y1="15" x2="9" y2="15" />
    </svg>
  );
}

const principles = [
  {
    title: "Notice more",
    subtitle: "The art of paying attention",
    copy: "Travel changes when you look beyond the landmark. We make space for detours, conversations, and details that do not fit on a packed itinerary.",
    Icon: SunIcon
  },
  {
    title: "Move gently",
    subtitle: "Respecting ecosystems & communities",
    copy: "Every stay belongs to a neighbourhood, a landscape, and someone’s daily life. We choose care over convenience when those things are in tension.",
    Icon: ShieldIcon
  },
  {
    title: "Return differently",
    subtitle: "Carrying home a new perspective",
    copy: "A journey does not end when the train pulls in. The places that matter keep unfolding inside you long after you have come home.",
    Icon: HeartIcon
  },
];

const pillars = [
  {
    id: "mornings",
    label: "Slow Mornings",
    headline: "Unrushed breakfasts over sunrise balconies.",
    description: "We filter out stays surrounded by highway noise or concrete rush. A WanderLust stay prioritizes natural light, fresh air, and morning quietude.",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85",
    tag: "Restoration"
  },
  {
    id: "architecture",
    label: "Tactile Architecture",
    headline: "Hand-hewn timber, stone courtyards, local earth.",
    description: "Structure shapes emotion. We select homes constructed with regional craft, organic textures, and spatial harmony that ground you in place.",
    image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=1200&q=85",
    tag: "Craftsmanship"
  },
  {
    id: "community",
    label: "Neighborhood Roots",
    headline: "Owned by locals who know the baker and the baker's dog.",
    description: "Instead of corporate hospitality chains, we connect you with hosts who live nearby, share insider trails, and support local bakeries.",
    image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=85",
    tag: "Connection"
  },
  {
    id: "solitude",
    label: "Spacious Routes",
    headline: "Leaving half your day unplanned by design.",
    description: "The best travel stories happen when plans dissolve. Our stays serve as serene anchors so you can wander without a tight clock.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
    tag: "Freedom"
  }
];

const chapters = [
  {
    title: "Before you go",
    copy: "A good trip starts with a feeling, not a checklist. A room with morning light. A village where nothing hurries. A route that leaves enough room to get lost.",
    image: "photo-1464822759023-fed622ff2c3b"
  },
  {
    title: "While you're there",
    copy: "Let the destination set the pace. Buy bread from the nearby bakery. Learn a street by walking it twice. Keep one afternoon completely open.",
    image: "photo-1473116763249-2faaef81ccda"
  },
  {
    title: "When you return",
    copy: "Bring back more than photographs: a recipe, a new morning ritual, a subtle shift in how you navigate ordinary days.",
    image: "photo-1500534623283-312aade485b7"
  }
];

const commitments = [
  {
    title: "Ecological Stewardship",
    text: "We partner exclusively with properties that respect their environment—minimizing waste, honoring local water tables, and preserving natural habitats."
  },
  {
    title: "Local Economic Retention",
    text: "Tourism should enrich communities, not extract from them. We prioritize locally owned stays so your booking fees stay in the neighborhood."
  },
  {
    title: "Unscripted Authenticity",
    text: "No staged cultural shows. We guide you toward genuine interactions and quiet, authentic moments that reflect the true spirit of a location."
  },
  {
    title: "Responsible Overtourism Relief",
    text: "We actively champion off-peak seasons and lesser-known regional gems to alleviate strain on popular destinations and spread economic benefit."
  }
];

const fieldNotes = [
  {
    title: "Three Days of Stillness in Manali",
    author: "Claire V.",
    quote: "I stopped checking my watch on the second morning. The pine air and sound of the stream replaced my notification chimes.",
    location: "Himachal Pradesh"
  },
  {
    title: "The Rhythm of Coastal Varkala",
    author: "Arjun K.",
    quote: "Our host handed us fresh bananas from his garden and walked us to a cliff path unknown to tourists. That morning changed how I travel.",
    location: "Kerala Coast"
  }
];

export default function PhilosophyExperience() {
  const root = useRef(null);
  const [activePillar, setActivePillar] = useState("mornings");
  const [viewMode, setViewMode] = useState("slow"); // 'slow' vs 'fast' toggle comparison

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        }),
      { threshold: 0.12 }
    );
    const nodes = root.current?.querySelectorAll("[data-reveal]") || [];
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const currentPillarData = pillars.find((p) => p.id === activePillar) || pillars[0];

  return (
    <main ref={root} className="min-h-[100svh] overflow-hidden bg-paper text-ink selection:bg-moss selection:text-paper pt-16">
      <Navbar />

      {/* Hero */}
      <section className="relative mx-auto grid min-h-[85svh] max-w-[90rem] gap-12 px-[clamp(1.25rem,4vw,4.5rem)] pb-[clamp(5rem,10vw,10rem)] pt-[clamp(4rem,8vw,8rem)] lg:grid-cols-[1.2fr_.8fr] lg:items-end">
        <div data-reveal className="philosophy-reveal">
          <span className="text-xs font-bold tracking-[.18em] text-clay uppercase block mb-4">
            The WanderLust Manifesto
          </span>
          <h1 className="max-w-4xl font-display text-[clamp(4.2rem,8.5vw,8.5rem)] leading-[.82] tracking-[-.075em]">
            Travel should make the world feel <em className="font-normal text-clay">larger.</em>
          </h1>
        </div>
        <div data-reveal className="philosophy-reveal philosophy-reveal-delay max-w-lg pb-3">
          <p className="text-xl leading-relaxed text-ink/80 font-display italic">
            "In an age of instant gratification and packed itineraries, we champion the quiet luxury of going slowly."
          </p>
          <p className="mt-6 text-base leading-relaxed text-ink/68">
            We seek out stays that let you feel a place—its rhythms, textures, morning light, and local community—rather than merely pass through it on a checklist.
          </p>
          <p className="mt-6 border-l-2 border-clay pl-5 text-sm leading-relaxed text-ink/60">
            WanderLust is a curated directory for the curious traveler: built around character, stewardship, and restorative stillness.
          </p>
        </div>
        <div className="philosophy-orbit" aria-hidden="true" />
      </section>

      {/* Principles Grid */}
      <section className="border-y border-ink/12 bg-[#eee8dc] px-[clamp(1.25rem,4vw,4.5rem)] py-[clamp(6rem,12vw,12rem)]">
        <div className="mx-auto max-w-[90rem]">
          <div data-reveal className="philosophy-reveal max-w-3xl mb-16">
            <span className="text-xs font-bold tracking-[.18em] text-moss uppercase">Core Philosophy</span>
            <h2 className="font-display text-[clamp(2.8rem,5vw,5.5rem)] leading-[.88] tracking-[-.06em] mt-3">
              Travel is not a race to see everything. It is a way of paying attention.
            </h2>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {principles.map(({ title, subtitle, copy, Icon }, idx) => (
              <div 
                key={title} 
                data-reveal 
                className="philosophy-reveal bg-paper/60 backdrop-blur-sm p-8 rounded-2xl border border-ink/10 shadow-sm transition hover:border-clay/50 hover:bg-paper"
                style={{ transitionDelay: `${idx * 120}ms` }}
              >
                <div className="text-clay mb-6">
                  <Icon />
                </div>
                <h3 className="font-display text-3xl tracking-[-.05em] text-ink mb-1">{title}</h3>
                <p className="text-xs font-bold uppercase tracking-wider text-moss mb-4">{subtitle}</p>
                <p className="text-sm leading-relaxed text-ink/75">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Pillars Explorer */}
      <section className="px-[clamp(1.25rem,4vw,4.5rem)] py-[clamp(7rem,12vw,12rem)] max-w-[90rem] mx-auto">
        <div data-reveal className="philosophy-reveal text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[.18em] text-clay uppercase">Interactive Perspective</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-[-.05em] text-ink mt-3">
            The 4 Pillars of a Restorative Stay
          </h2>
          <p className="text-ink/70 text-base md:text-lg mt-4">
            Click through our pillars to explore what makes a WanderLust stay distinctly memory-rich.
          </p>
        </div>

        {/* Pillar Tabs */}
        <div data-reveal className="philosophy-reveal flex flex-wrap justify-center gap-3 mb-12">
          {pillars.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePillar(p.id)}
              className={`px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase transition ${
                activePillar === p.id
                  ? "bg-ink text-paper shadow-md"
                  : "bg-sand/50 text-ink/70 hover:bg-sand"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Pillar Display Card */}
        <div data-reveal className="philosophy-reveal bg-sand/30 border border-ink/10 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 lg:p-12 shadow-xl">
          <div className="space-y-6">
            <span className="inline-block px-3.5 py-1 rounded-full bg-clay text-paper text-xs font-bold uppercase tracking-wider">
              {currentPillarData.tag}
            </span>
            <h3 className="font-display text-3xl md:text-5xl font-bold text-ink leading-tight">
              {currentPillarData.headline}
            </h3>
            <p className="text-ink/80 text-base md:text-lg leading-relaxed">
              {currentPillarData.description}
            </p>
            <div className="pt-4 border-t border-ink/10 flex items-center gap-4 text-xs font-bold text-moss uppercase tracking-wider">
              <FeatherIcon />
              <span>Hand-curated for mindful wanderers</span>
            </div>
          </div>
          <div className="relative h-[380px] w-full rounded-2xl overflow-hidden shadow-md">
            <Image
              src={currentPillarData.image}
              alt={currentPillarData.label}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Chapters Timeline */}
      <section className="relative mx-auto max-w-[90rem] px-[clamp(1.25rem,4vw,4.5rem)] py-[clamp(6rem,12vw,12rem)] border-t border-ink/10">
        <div className="philosophy-route" aria-hidden="true" />
        <div className="text-center max-w-xl mx-auto mb-20">
          <span className="text-xs font-bold tracking-[.18em] text-clay uppercase">The Journey Arc</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-[-.05em] text-ink mt-2">
            Three Phases of a Good Journey
          </h2>
        </div>

        <div className="space-y-[clamp(5rem,10vw,10rem)]">
          {chapters.map(({ title, copy, image }, index) => (
            <article
              key={title}
              data-reveal
              className={`philosophy-reveal relative grid gap-10 lg:grid-cols-2 lg:items-center ${
                index % 2 ? "lg:ml-[12%]" : "lg:mr-[12%]"
              }`}
            >
              <div className={index % 2 ? "lg:order-2" : ""}>
                <span className="font-display text-2xl font-bold text-clay">0{index + 1}.</span>
                <h3 className="font-display text-[clamp(2.8rem,5vw,5.5rem)] leading-[.88] tracking-[-.06em] mt-1">
                  {title}
                </h3>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/75">{copy}</p>
              </div>
              <div
                className={`relative aspect-[1.15/1] overflow-hidden rounded-2xl shadow-lg ${
                  index % 2 ? "lg:order-1" : ""
                }`}
              >
                <Image
                  src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=1400&q=85`}
                  alt={title}
                  fill
                  sizes="(max-width: 1024px) 92vw, 42vw"
                  className="object-cover transition duration-1000 hover:scale-105"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Comparison Slider / Toggle: Fast Travel vs Slow Travel */}
      <section className="bg-sand/40 border-y border-ink/10 px-[clamp(1.25rem,4vw,4.5rem)] py-[clamp(6rem,12vw,12rem)]">
        <div className="max-w-5xl mx-auto">
          <div data-reveal className="philosophy-reveal text-center mb-12">
            <span className="text-xs font-bold tracking-[.18em] text-moss uppercase">Perspective Shift</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-[-.05em] text-ink mt-2 mb-6">
              A Shift in How You Travel
            </h2>

            {/* Toggle Button */}
            <div className="inline-flex rounded-full bg-paper p-1.5 border border-ink/15 shadow-inner">
              <button
                onClick={() => setViewMode("slow")}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition ${
                  viewMode === "slow"
                    ? "bg-moss text-paper shadow-sm"
                    : "text-ink/60 hover:text-ink"
                }`}
              >
                WanderLust Way (Slow Travel)
              </button>
              <button
                onClick={() => setViewMode("fast")}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition ${
                  viewMode === "fast"
                    ? "bg-clay text-paper shadow-sm"
                    : "text-ink/60 hover:text-ink"
                }`}
              >
                Conventional Mass Tourism
              </button>
            </div>
          </div>

          <div data-reveal className="philosophy-reveal bg-paper p-8 md:p-12 rounded-3xl border border-ink/10 shadow-lg">
            {viewMode === "slow" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-display text-2xl font-bold text-moss mb-2">Unhurried Pace</h4>
                  <p className="text-sm leading-relaxed text-ink/75">Staying 3+ nights in one location, learning neighborhood bakeries, and sleeping without alarm clocks.</p>
                </div>
                <div>
                  <h4 className="font-display text-2xl font-bold text-moss mb-2">Tactile Solitude</h4>
                  <p className="text-sm leading-relaxed text-ink/75">Staying in homes built with natural wood, stone courtyards, and open stargazing decks.</p>
                </div>
                <div>
                  <h4 className="font-display text-2xl font-bold text-moss mb-2">Local Retention</h4>
                  <p className="text-sm leading-relaxed text-ink/75">Your money goes straight to independent hosts, regional artisans, and village markets.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-display text-2xl font-bold text-clay mb-2">Checklist Racing</h4>
                  <p className="text-sm leading-relaxed text-ink/75">Rushing between 5 cities in 6 days, taking quick photos, and leaving exhausted.</p>
                </div>
                <div>
                  <h4 className="font-display text-2xl font-bold text-clay mb-2">Generic Rooms</h4>
                  <p className="text-sm leading-relaxed text-ink/75">Uniform hotel chains with sealed windows, plastic amenities, and noise pollution.</p>
                </div>
                <div>
                  <h4 className="font-display text-2xl font-bold text-clay mb-2">Leakage Economy</h4>
                  <p className="text-sm leading-relaxed text-ink/75">80%+ of booking revenue leaves the host country to offshore corporate booking giants.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="bg-ink px-[clamp(1.25rem,4vw,4.5rem)] py-[clamp(6rem,12vw,12rem)] text-paper">
        <div className="mx-auto max-w-[90rem]">
          <div data-reveal className="philosophy-reveal text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-[.18em] text-sand uppercase">Ethical Standard</span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.8rem)] leading-none tracking-[-.05em] text-paper mt-2">
              Our Commitments to the World
            </h2>
            <p className="mt-4 text-base md:text-lg text-paper/70">
              How we travel matters just as much as where we go. Our platform is governed by four strict promises.
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {commitments.map((item, i) => (
              <div 
                key={item.title} 
                data-reveal 
                className="philosophy-reveal rounded-2xl border border-moss/40 bg-moss/20 p-8 transition hover:bg-moss/30 hover:border-sand/40"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <h3 className="font-display text-2xl tracking-[-.04em] text-clay mb-3">{item.title}</h3>
                <p className="text-sm leading-relaxed text-paper/75">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Field Notes / Quotes from Travelers */}
      <section className="px-[clamp(1.25rem,4vw,4.5rem)] py-28 max-w-[90rem] mx-auto">
        <div data-reveal className="philosophy-reveal text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[.18em] text-clay uppercase">Field Notes</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-[-.05em] text-ink mt-2">
            Stories from Mindful Travelers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fieldNotes.map((note, i) => (
            <div 
              key={i} 
              data-reveal 
              className="philosophy-reveal bg-sand/30 border border-ink/10 p-8 md:p-10 rounded-3xl"
            >
              <p className="font-display text-xl md:text-2xl text-ink leading-relaxed italic mb-6">
                "{note.quote}"
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-ink/10">
                <span className="font-bold text-ink text-sm">{note.author}</span>
                <span className="text-xs font-semibold text-clay uppercase tracking-wider">{note.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Founders Quote */}
      <section className="border-t border-ink/10 px-[clamp(1.25rem,4vw,4.5rem)] py-[clamp(7rem,12vw,12rem)]">
        <div data-reveal className="philosophy-reveal mx-auto max-w-4xl text-center">
          <blockquote className="font-display text-[clamp(2rem,3.8vw,3.5rem)] leading-[1.15] tracking-[-.04em] text-ink">
            "We started WanderLust because we were tired of generic spaces and rushed itineraries. We wanted to build a home for travellers who prefer a slow morning coffee on a strange balcony over a packed sightseeing tour."
          </blockquote>
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-clay shadow-md">
              <Image 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80" 
                alt="Founder" 
                width={56} 
                height={56} 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-left">
              <p className="font-bold text-ink text-base">Elena & Marcus</p>
              <p className="text-ink/60 text-xs uppercase tracking-wider font-semibold">Founders of WanderLust</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-footer CTA */}
      <section className="bg-moss px-[clamp(1.25rem,4vw,4.5rem)] py-[clamp(6rem,10vw,10rem)] text-[#f5f0e5] text-center">
        <div data-reveal className="philosophy-reveal mx-auto max-w-4xl">
          <h2 className="font-display text-[clamp(3rem,6vw,6rem)] leading-[.88] tracking-[-.06em] mb-6">
            Find a stay that gives you a reason to <em className="font-normal text-sand">stay awhile.</em>
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link href="/explore" className="rounded-full bg-clay px-8 py-4 text-sm font-bold text-white transition hover:bg-[#9e442b]">
              Explore Collection
            </Link>
            <Link href="/signup" className="rounded-full border border-paper/40 px-8 py-4 text-sm font-bold text-paper transition hover:bg-paper hover:text-ink">
              Create Account
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
