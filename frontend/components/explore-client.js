"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect, useRef } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import { API_URL, fallbackListings } from "../lib/api";

function Mark() { return <span className="font-display text-[clamp(1.45rem,2.2vw,2rem)] leading-none tracking-[-.06em]">Wander<span className="text-clay">Lust</span></span>; }
function Arrow() { return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.8]"><path d="M5 12h13M13 6l6 6-6 6" /></svg>; }
function Pin() { return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.7]"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>; }

function useIntersectionObserver() {
  const containerRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });
    
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll('.section-reveal');
      elements.forEach(el => observer.observe(el));
    }
    return () => observer.disconnect();
  }, []);
  return containerRef;
}

function AnimatedCounter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);
  
  return <span ref={ref} className="stat-count">{count}{suffix}</span>;
}

export default function ExploreClient({ initialData, initialActive = "All" }) {
  const [query, setQuery] = useState("");
  const listings = initialData?.listings || fallbackListings;
  const featuredStays = listings.slice(0, 4);
  const containerRef = useIntersectionObserver();

  async function search(event) {
    event.preventDefault();
    if (!query.trim()) return;
    window.location.href = `/explore?q=${encodeURIComponent(query)}`;
  }

  return <main ref={containerRef} className="overflow-hidden bg-paper">
    <Navbar transparent={true} />

    {/* Hero Section */}
    <section className="relative min-h-[min(49rem,100svh)] bg-ink px-[clamp(1.25rem,4vw,4.5rem)] pb-10 pt-32 text-white">
      <Image className="hero-photo absolute inset-0 h-full w-full object-cover opacity-75" src="https://images.unsplash.com/photo-1518022525094-218670c9b745?auto=format&fit=crop&w=2200&q=90" alt="Warmly lit mountain cabin in a forest" fill priority sizes="100vw" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,22,16,.78)_0%,rgba(12,22,16,.35)_56%,rgba(12,22,16,.15)_100%)]" />
      <div className="relative mx-auto flex min-h-[calc(min(49rem,100svh)-10rem)] max-w-[90rem] flex-col justify-end pb-[clamp(7rem,13vh,11rem)]">
        <div className="hero-copy max-w-3xl">
          <p className="mb-5 text-sm font-semibold tracking-[.14em] text-sand uppercase">For the places that stay with you</p>
          <h1 className="font-display text-[clamp(3.6rem,8.4vw,8.5rem)] leading-[.84] tracking-[-.065em] text-balance">Take the <em className="font-normal text-sand">long way</em> there.</h1>
          <p className="mt-7 max-w-lg text-[clamp(1rem,1.35vw,1.2rem)] leading-relaxed text-white/78">Thoughtfully chosen stays for people who travel to feel somewhere new.</p>
        </div>
      </div>
      <div className="scroll-hint absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[.62rem] font-bold tracking-[.18em] text-white/70 uppercase sm:flex">
        <span>Discover</span><span className="h-8 w-px bg-white/60" />
      </div>
    </section>

    {/* Search Bar */}
    <section className="relative z-10 mx-auto -mt-12 w-[min(94%,72rem)]">
      <form onSubmit={search} className="floating-search grid rounded-2xl bg-white p-3 border border-ink/10 shadow-[0_1.5rem_4rem_rgba(23,34,29,.18)] sm:grid-cols-[1fr_auto] items-center gap-2">
        <label className="flex min-w-0 items-center gap-4 px-4 py-2 cursor-text">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-sand/40 text-clay shrink-0">
            <Pin />
          </span>
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <span className="block text-[.68rem] font-bold tracking-[.14em] text-moss uppercase leading-tight mb-1">Where to?</span>
            <input 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              className="w-full bg-transparent text-sm sm:text-base font-medium text-ink outline-none placeholder:text-ink/35 leading-normal" 
              placeholder="Search cities, countries, or stays" 
            />
          </div>
        </label>
        <button className="flex items-center justify-center gap-2 rounded-xl bg-clay px-7 py-4 text-sm font-bold text-white transition hover:bg-[#9e442b] shrink-0 shadow-md" type="submit">
          Find a stay <Arrow />
        </button>
      </form>
    </section>

    {/* Stats Bar */}
    <section className="mx-auto max-w-[90rem] px-[clamp(1.25rem,4vw,4.5rem)] py-16">
      <div className="section-reveal grid grid-cols-2 gap-8 divide-x divide-ink/10 border-y border-ink/10 py-10 md:grid-cols-4">
        <div className="flex flex-col items-center text-center">
          <span className="font-display text-4xl text-clay"><AnimatedCounter end={200} suffix="+" /></span>
          <span className="mt-2 text-sm font-semibold tracking-wide text-ink/70 uppercase">Stays</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <span className="font-display text-4xl text-clay"><AnimatedCounter end={50} suffix="+" /></span>
          <span className="mt-2 text-sm font-semibold tracking-wide text-ink/70 uppercase">Cities</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <span className="font-display text-4xl text-clay"><AnimatedCounter end={12} /></span>
          <span className="mt-2 text-sm font-semibold tracking-wide text-ink/70 uppercase">Countries</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <span className="font-display text-4xl text-clay"><AnimatedCounter end={5} suffix="-star" /></span>
          <span className="mt-2 text-sm font-semibold tracking-wide text-ink/70 uppercase">Avg Rating</span>
        </div>
      </div>
    </section>

    {/* Featured Stays */}
    <section className="mx-auto max-w-[90rem] px-[clamp(1.25rem,4vw,4.5rem)] py-16">
      <div className="section-reveal mb-12 flex flex-wrap items-end justify-between gap-5">
        <h2 className="font-display text-[clamp(2.75rem,5vw,4.5rem)] leading-[1] tracking-[-.04em]">Featured <em className="font-normal text-clay">stays</em></h2>
        <Link href="/explore" className="group flex items-center gap-2 text-sm font-bold transition hover:text-clay">View all stays <span className="transition-transform group-hover:translate-x-1"><Arrow /></span></Link>
      </div>
      <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {featuredStays.map((stay, index) => (
          <article key={stay.id} className="section-reveal group" style={{ "--order": index }}>
            <Link href={`/listings/${stay.id}`} className="block">
              <div className="image-zoom relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand">
                <Image src={stay.image?.url || fallbackListings[0].image.url} alt={stay.title} fill sizes="(max-width: 640px) 94vw, (max-width: 1024px) 46vw, 23vw" className="object-cover" />
                <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1.5 text-xs font-bold text-ink backdrop-blur-sm">{stay.category}</span>
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-bold tracking-[-.02em]">{stay.title}</h3>
                <p className="mt-1 text-sm text-ink/60">{stay.location}, {stay.country}</p>
                <p className="mt-3 text-sm font-bold">₹{Number(stay.price).toLocaleString("en-IN")} <span className="font-normal text-ink/55">/ night</span></p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>

    {/* How It Works */}
    <section className="bg-sand px-[clamp(1.25rem,4vw,4.5rem)] py-24">
      <div className="mx-auto max-w-[90rem]">
        <div className="section-reveal mb-16 text-center">
          <h2 className="font-display text-[clamp(2.5rem,4vw,4rem)] leading-[1] tracking-[-.04em]">How it <em className="font-normal text-clay">works</em></h2>
          <p className="mx-auto mt-4 max-w-lg text-ink/70">Your journey to the perfect stay, simplified into three easy steps.</p>
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          {[
            { step: "01", title: "Browse", desc: "Discover our curated collection of unique properties around the world, tailored to your travel style." },
            { step: "02", title: "Book", desc: "Secure your dream stay with our seamless and safe booking process, instantly confirmed." },
            { step: "03", title: "Wander", desc: "Pack your bags and experience the magic of a stay that feels just like home, but better." }
          ].map((item, index) => (
            <div key={item.step} className="section-reveal relative rounded-3xl bg-white p-10 text-center shadow-sm" style={{ "--order": index }}>
              <span className="absolute -top-6 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-moss font-display text-lg text-white">{item.step}</span>
              <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Destinations Highlight */}
    <section className="mx-auto max-w-[90rem] px-[clamp(1.25rem,4vw,4.5rem)] py-24">
      <div className="section-reveal mb-12 text-center">
        <h2 className="font-display text-[clamp(2.75rem,5vw,4.5rem)] leading-[1] tracking-[-.04em]">Trending <em className="font-normal text-clay">destinations</em></h2>
        <p className="mx-auto mt-4 max-w-lg text-ink/70">Find yourself in the world's most captivating corners.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2">
        {[
          { name: "Kyoto, Japan", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800", span: "col-span-2 row-span-2 aspect-square md:aspect-auto" },
          { name: "Tuscany, Italy", img: "https://images.unsplash.com/photo-1516483638261-f408892285e6?q=80&w=800", span: "col-span-1 row-span-1 aspect-square" },
          { name: "Bali, Indonesia", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800", span: "col-span-1 row-span-1 aspect-square" },
          { name: "Santorini, Greece", img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800", span: "col-span-2 row-span-1 aspect-[2/1]" }
        ].map((dest, i) => (
          <div key={dest.name} className={`section-reveal destination-card relative group ${dest.span}`} style={{ "--order": i }}>
            <Image src={dest.img} alt={dest.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent transition-opacity group-hover:opacity-90" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="font-display text-2xl drop-shadow-md">{dest.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Testimonials */}
    <section className="bg-moss px-[clamp(1.25rem,4vw,4.5rem)] py-24 text-[#f5f0e5]">
      <div className="mx-auto max-w-[90rem]">
        <div className="section-reveal mb-16 text-center">
          <h2 className="font-display text-[clamp(2.5rem,4vw,4rem)] leading-[1] tracking-[-.04em]">Stories from <em className="font-normal text-sand">travelers</em></h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { name: "Elena R.", loc: "Stayed in Tuscany", quote: "The villa was breathtaking. WanderLust made the entire booking process effortless, allowing us to just focus on the rolling hills." },
            { name: "Marcus T.", loc: "Stayed in Kyoto", quote: "Finding a traditional machiya that felt authentic but had modern comforts was a dream. Unforgettable experience." },
            { name: "Sarah & James", loc: "Stayed in Santorini", quote: "We trusted WanderLust for our honeymoon and they delivered beyond our wildest expectations. The cliffside view will stay with us forever." }
          ].map((test, i) => (
            <div key={test.name} className="section-reveal flex flex-col justify-between rounded-3xl bg-[#36493d] p-8" style={{ "--order": i }}>
              <div>
                <div className="mb-4 flex text-sand">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="h-5 w-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-lg leading-relaxed text-[#f5f0e5]/90">"{test.quote}"</p>
              </div>
              <div className="mt-8">
                <p className="font-bold">{test.name}</p>
                <p className="text-sm text-[#f5f0e5]/60">{test.loc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Newsletter / CTA */}
    <section className="mx-auto max-w-[90rem] px-[clamp(1.25rem,4vw,4.5rem)] py-24 text-center">
      <div className="section-reveal mx-auto max-w-2xl rounded-3xl bg-[#ede9df] p-12">
        <h2 className="font-display text-[clamp(2rem,3vw,3rem)] leading-[1] tracking-[-.04em]">Join the <em className="font-normal text-clay">WanderLust</em> community</h2>
        <p className="mx-auto mt-4 max-w-md text-ink/70">Sign up for our newsletter to discover new destinations, insider travel tips, and exclusive stays.</p>
        <form className="mt-8 flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Your email address" className="flex-1 rounded-xl border border-ink/10 bg-white px-5 py-3.5 outline-none focus:border-clay" required />
          <button type="submit" className="rounded-xl bg-clay px-8 py-3.5 font-bold text-white transition hover:bg-[#9e442b]">Subscribe</button>
        </form>
      </div>
    </section>

    <Footer />
  </main>;
}
