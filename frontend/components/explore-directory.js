"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import { categories, fallbackListings } from "../lib/api";

const slug = (value) => value.toLowerCase().replaceAll(" ", "-");

export default function ExploreDirectory({ initialData, initialActive = "All" }) {
  const [active, setActive] = useState(initialActive);
  const [query, setQuery] = useState("");
  const listings = initialData.listings || fallbackListings;
  
  const visible = useMemo(() => listings.filter((stay) => 
    (active === "All" || stay.category === active) && 
    `${stay.title} ${stay.location} ${stay.country}`.toLowerCase().includes(query.toLowerCase())
  ), [active, listings, query]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    
    document.querySelectorAll('.animate-on-scroll, .listing-reveal').forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, [visible, active]);

  return (
    <main className="min-h-[100svh] flex flex-col bg-paper text-ink pt-16">
      <Navbar />

      <section className="bg-gradient-to-b from-[#ede9df]/50 to-transparent">
        <div className="mx-auto max-w-[90rem] px-[clamp(1.25rem,4vw,4.5rem)] pb-10 pt-[clamp(3rem,7vw,7rem)] animate-on-scroll [opacity:0] [&.is-visible]:animate-[rise-in_1s_ease-out_forwards]">
          <p className="text-sm font-bold tracking-[.14em] text-clay uppercase">The WanderLust collection</p>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-8">
            <h1 className="max-w-4xl font-display text-[clamp(3.6rem,7vw,7.5rem)] leading-[.84] tracking-[-.07em]">
              Find a place with <em className="font-normal text-clay">a point of view.</em>
            </h1>
            <p className="max-w-sm text-lg leading-relaxed text-ink/62">
              Browse characterful stays, chosen for their sense of place—not simply their location.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-y border-ink/12 py-5 animate-on-scroll [opacity:0] [&.is-visible]:animate-[rise-in_1s_ease-out_0.2s_forwards]">
            <p className="text-sm text-ink/55 transition-all duration-300">
              <span className="font-bold text-ink">{visible.length}</span> places to linger
            </p>
            <label className="group flex w-full max-w-md items-center border-b border-ink/25 pb-2 text-sm font-bold transition-colors focus-within:border-clay sm:w-80">
              Search
              <input 
                value={query} 
                onChange={(event) => setQuery(event.target.value)} 
                className="ml-3 min-w-0 flex-1 bg-transparent text-base font-medium outline-none placeholder:text-ink/40 group-focus-within:text-clay" 
                placeholder="Try Manali or a category" 
              />
            </label>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[90rem] flex-1 px-[clamp(1.25rem,4vw,4.5rem)] pb-[clamp(5rem,10vw,10rem)]">
        <div className="-mx-1 mb-10 flex gap-2 overflow-x-auto px-1 pb-3 [scrollbar-width:none]">
          {categories.map((category, idx) => (
            <Link 
              key={category} 
              href={category === "All" ? "/explore" : `/explore/${slug(category)}`} 
              onClick={() => setActive(category)} 
              className={`animate-on-scroll shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition [opacity:0] [&.is-visible]:animate-[rise-in_0.6s_ease-out_forwards] ${active === category ? "bg-ink text-white" : "bg-[#ede9df] hover:bg-sand"}`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {category}
            </Link>
          ))}
        </div>

        {visible.length ? (
          <div className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((stay, index) => (
              <article key={stay.id} className="listing-reveal group" style={{ "--order": index }}>
                <Link href={`/listings/${stay.id}`}>
                  <div className="image-zoom relative aspect-[1.05/1] overflow-hidden rounded-2xl bg-sand">
                    <Image 
                      src={stay.image?.url || fallbackListings[0].image.url} 
                      alt={stay.title} 
                      fill 
                      sizes="(max-width: 640px) 94vw, (max-width: 1024px) 46vw, 30vw" 
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1.5 text-xs font-bold backdrop-blur-sm">
                      {stay.category}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-4 pt-4">
                    <div>
                      <h2 className="flex items-center gap-2 text-base font-bold tracking-[-.02em] transition-colors group-hover:text-clay">
                        {stay.title}
                        <span className="-translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                          →
                        </span>
                      </h2>
                      <p className="mt-1 text-sm text-ink/58">{stay.location}, {stay.country}</p>
                    </div>
                    <p className="shrink-0 text-sm font-bold">
                      ₹{Number(stay.price).toLocaleString("en-IN")}
                      <span className="font-normal text-ink/55"> / night</span>
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="animate-on-scroll py-20 text-center [opacity:0] [&.is-visible]:animate-[rise-in_0.8s_ease-out_forwards]">
            <p className="font-display text-4xl">No place matches that search.</p>
            <button 
              onClick={() => { setQuery(""); setActive("All"); }} 
              className="mt-5 text-sm font-bold text-clay underline underline-offset-4 transition-colors hover:text-ink"
            >
              Show the full collection
            </button>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
