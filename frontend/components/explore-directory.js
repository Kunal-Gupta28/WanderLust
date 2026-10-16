"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, useTransition, useMemo } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import ListingImage from "./listing-image";
import { categories, fallbackListings } from "../lib/api";
import { useInfiniteListingsQuery } from "../lib/queries";

const slug = (value) => value.toLowerCase().replaceAll(" ", "-");

export default function ExploreDirectory({
  initialData,
  initialActive = "All",
  initialQuery = "",
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [active, setActive] = useState(initialActive);
  const [query, setQuery] = useState(initialQuery);
  const limit = 12;

  const loadMoreTriggerRef = useRef(null);

  // Sync with URL params on mount or when URL changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      const urlQuery = sp.get("q");
      const urlCat = sp.get("category");

      if (urlQuery !== null && urlQuery !== query) setQuery(urlQuery);
      if (urlCat) {
        const match = categories.find((c) => c.toLowerCase() === urlCat.toLowerCase());
        if (match && match !== active) setActive(match);
      }
    }
  }, [searchParams]);

  // Use TanStack Query Infinite Query for Unlimited Scrolling
  const isInitialParams = active === initialActive && query === initialQuery;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteListingsQuery(
    { limit, category: active, q: query },
    isInitialParams ? initialData : undefined
  );

  // Flatten all pages into one continuous stream
  const allListings = useMemo(() => {
    if (!data?.pages || data.pages.length === 0) {
      return initialData?.listings || fallbackListings.slice(0, limit);
    }
    return data.pages.flatMap((page) => page.listings || []);
  }, [data?.pages, initialData?.listings]);

  const total = data?.pages?.[0]?.total ?? (initialData?.total || allListings.length);

  // IntersectionObserver for Unlimited Scrolling (prefetches 300px before bottom)
  useEffect(() => {
    const trigger = loadMoreTriggerRef.current;
    if (!trigger) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "300px",
      }
    );

    observer.observe(trigger);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Shallow URL sync
  const syncUrl = (newCategory, newQuery) => {
    startTransition(() => {
      const sp = new URLSearchParams();
      if (newQuery) sp.set("q", newQuery);

      let basePath = "/explore";
      if (newCategory && newCategory !== "All") {
        basePath = `/explore/${slug(newCategory)}`;
      }

      const queryString = sp.toString();
      const nextUrl = queryString ? `${basePath}?${queryString}` : basePath;
      router.replace(nextUrl, { scroll: false });
    });
  };

  const handleCategorySelect = (category) => {
    setActive(category);
    syncUrl(category, query);
  };

  const handleQueryChange = (val) => {
    setQuery(val);
    syncUrl(active, val);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-[100svh] flex flex-col bg-paper text-ink pt-16">
      <Navbar />

      <section className="bg-gradient-to-b from-[#ede9df]/50 to-transparent">
        <div className="mx-auto max-w-[90rem] px-[clamp(1.25rem,4vw,4.5rem)] pb-10 pt-[clamp(3rem,7vw,7rem)] animate-[rise-in_0.5s_cubic-bezier(.16,1,.3,1)_both]">
          <p className="text-sm font-bold tracking-[.14em] text-clay uppercase">The WanderLust collection</p>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-8">
            <h1 className="max-w-4xl font-display text-[clamp(3.6rem,7vw,7.5rem)] leading-[.84] tracking-[-.07em]">
              Find a place with <em className="font-normal text-clay">a point of view.</em>
            </h1>
            <p className="max-w-sm text-lg leading-relaxed text-ink/62">
              Browse characterful stays, chosen for their sense of place—not simply their location.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-y border-ink/12 py-5 animate-[rise-in_0.5s_cubic-bezier(.16,1,.3,1)_0.08s_both]">
            <div className="flex items-center gap-3 text-sm text-ink/55">
              <p>
                Showing <span className="font-bold text-ink">{allListings.length}</span> of{" "}
                <span className="font-bold text-ink">{total}</span> places to linger
              </p>
              {isFetching && !isFetchingNextPage && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sand px-2.5 py-0.5 text-xs font-semibold text-ink/75 animate-pulse">
                  <span className="h-1.5 w-1.5 rounded-full bg-clay animate-ping" />
                  Updating...
                </span>
              )}
            </div>

            <label className="group flex w-full max-w-md items-center border-b border-ink/25 pb-2 text-sm font-bold transition-colors focus-within:border-clay sm:w-80">
              Search
              <input
                value={query}
                onChange={(event) => handleQueryChange(event.target.value)}
                className="ml-3 min-w-0 flex-1 bg-transparent text-base font-medium outline-none placeholder:text-ink/40 group-focus-within:text-clay"
                placeholder="Try Manali, Goa, or Villa"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => handleQueryChange("")}
                  className="text-xs text-ink/40 hover:text-ink px-1"
                >
                  Clear
                </button>
              )}
            </label>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[90rem] flex-1 px-[clamp(1.25rem,4vw,4.5rem)] pb-[clamp(5rem,10vw,10rem)]">
        {/* Categories Horizontal Scroll */}
        <div className="-mx-1 mb-10 flex gap-2 overflow-x-auto px-1 pb-3 [scrollbar-width:none] animate-[rise-in_0.5s_cubic-bezier(.16,1,.3,1)_0.16s_both]">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategorySelect(category)}
              className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                active.toLowerCase() === category.toLowerCase()
                  ? "bg-ink text-white shadow-sm"
                  : "bg-[#ede9df] text-ink/75 hover:bg-sand hover:text-ink"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Continuous Listings Grid */}
        {allListings.length ? (
          <>
            <div className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {allListings.map((stay, index) => (
                <article key={`${stay.id}-${index}`} className="listing-reveal group" style={{ "--order": index % limit }}>
                  <Link href={`/listings/${stay.id}`}>
                    <div className="image-zoom relative aspect-[1.05/1] overflow-hidden rounded-2xl bg-sand/70">
                      <ListingImage
                        src={stay.image?.url || fallbackListings[0].image.url}
                        alt={stay.title}
                        fill
                        priority={index < 4}
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
                        <p className="mt-1 text-sm text-ink/58">
                          {stay.location}, {stay.country}
                        </p>
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

            {/* Unlimited Scrolling Sentinel & States */}
            <div ref={loadMoreTriggerRef} className="mt-16 flex flex-col items-center justify-center">
              {isFetchingNextPage ? (
                <div className="flex flex-col items-center justify-center py-8 gap-3 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-clay animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-2.5 w-2.5 rounded-full bg-clay animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-2.5 w-2.5 rounded-full bg-clay animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <p className="text-xs font-bold tracking-widest text-ink/50 uppercase">
                    Loading more places to linger...
                  </p>
                </div>
              ) : hasNextPage ? (
                <div className="py-6">
                  <button
                    type="button"
                    onClick={() => fetchNextPage()}
                    className="rounded-full border border-ink/20 px-6 py-2.5 text-xs font-bold text-ink/75 hover:bg-sand hover:text-ink transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    Scroll down or tap to load more
                  </button>
                </div>
              ) : (
                <div className="w-full mt-10 border-t border-ink/10 pt-10 text-center">
                  <div className="mx-auto h-2 w-2 rounded-full bg-clay/50 mb-3" />
                  <p className="font-display text-2xl text-ink">You have explored all {total} places to linger.</p>
                  <p className="mt-1 text-sm text-ink/50">Looking for a specific destination? Try searching above.</p>
                  <button
                    type="button"
                    onClick={scrollToTop}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#ede9df] px-5 py-2 text-xs font-bold text-ink hover:bg-sand transition-all cursor-pointer"
                  >
                    ↑ Back to top
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="py-20 text-center animate-[rise-in_0.5s_cubic-bezier(.16,1,.3,1)_both]">
            <p className="font-display text-4xl">No place matches that search.</p>
            <p className="mt-2 text-sm text-ink/50">Try broadening your keywords or clearing the category.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActive("All");
                syncUrl("All", "");
              }}
              className="mt-6 inline-flex rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-clay cursor-pointer"
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
