"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, useTransition } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import ListingImage from "./listing-image";
import { categories, fallbackListings } from "../lib/api";
import { useListingsQuery } from "../lib/queries";

const slug = (value) => value.toLowerCase().replaceAll(" ", "-");

// Smart pagination range generator with ellipsis (e.g. [1, 2, 3, 4, 5, '...', 10])
function getPaginationRange(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
}

export default function ExploreDirectory({
  initialData,
  initialActive = "All",
  initialQuery = "",
  initialPage = 1,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [active, setActive] = useState(initialActive);
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [jumpInput, setJumpInput] = useState(String(initialPage));
  const limit = 12;

  const listingsSectionRef = useRef(null);

  // Keep jump input in sync with current page
  useEffect(() => {
    setJumpInput(String(page));
  }, [page]);

  const handleJumpSubmit = (e) => {
    if (e) e.preventDefault();
    const target = parseInt(jumpInput, 10);
    if (!isNaN(target)) {
      const clamped = Math.max(1, Math.min(target, totalPages));
      handlePageChange(clamped);
      setJumpInput(String(clamped));
    } else {
      setJumpInput(String(page));
    }
  };

  // Sync with URL params on mount or when browser back/forward is used
  useEffect(() => {
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      const urlQuery = sp.get("q");
      const urlCat = sp.get("category");
      const urlPage = parseInt(sp.get("page"), 10);

      if (urlQuery !== null && urlQuery !== query) setQuery(urlQuery);
      if (urlCat) {
        const match = categories.find((c) => c.toLowerCase() === urlCat.toLowerCase());
        if (match && match !== active) setActive(match);
      }
      if (urlPage && !isNaN(urlPage) && urlPage !== page) {
        setPage(urlPage);
      } else if (!urlPage && page !== 1 && !searchParams?.get("page")) {
        setPage(1);
      }
    }
  }, [searchParams]);

  // Use TanStack Query hook for cached, paginated listings
  const isInitialParams = active === initialActive && query === initialQuery && page === initialPage;

  const { data, isFetching, isLoading } = useListingsQuery(
    { page, limit, category: active, q: query },
    isInitialParams ? initialData : undefined
  );

  const currentListings = data?.listings || (isInitialParams ? initialData?.listings : fallbackListings.slice(0, limit)) || [];
  const total = data?.total ?? (isInitialParams ? initialData?.total : currentListings.length) ?? 0;
  const totalPages = data?.totalPages ?? Math.max(1, Math.ceil(total / limit));

  // Compute item count range for the current page
  const startItem = total === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  // Smooth scroll back to listings section when page changes
  const scrollToGrid = () => {
    if (listingsSectionRef.current) {
      const yOffset = -90;
      const y = listingsSectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // URL state synchronization
  const syncUrl = (newCategory, newQuery, newPage) => {
    startTransition(() => {
      const sp = new URLSearchParams();
      if (newQuery) sp.set("q", newQuery);
      if (newPage && newPage > 1) sp.set("page", String(newPage));

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
    setPage(1);
    syncUrl(category, query, 1);
    scrollToGrid();
  };

  const handleQueryChange = (val) => {
    setQuery(val);
    setPage(1);
    syncUrl(active, val, 1);
  };

  const handlePageChange = (newPage) => {
    const target = Math.max(1, Math.min(newPage, totalPages));
    if (target === page) return;
    setPage(target);
    syncUrl(active, query, target);
    scrollToGrid();
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
                Showing <span className="font-bold text-ink">{startItem}–{endItem}</span> of{" "}
                <span className="font-bold text-ink">{total}</span> places to linger
                {totalPages > 1 && (
                  <span className="ml-2 font-medium text-ink/40">
                    (Page <span className="font-bold text-ink/75">{page}</span> of {totalPages})
                  </span>
                )}
              </p>
              {isFetching && (
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
                  className="text-xs text-ink/40 hover:text-ink px-1 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </label>
          </div>
        </div>
      </section>

      <section
        ref={listingsSectionRef}
        className="mx-auto w-full max-w-[90rem] flex-1 px-[clamp(1.25rem,4vw,4.5rem)] pb-[clamp(5rem,10vw,10rem)]"
      >
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

        {/* Listings Grid */}
        {currentListings.length ? (
          <>
            <div className={`grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 transition-opacity duration-200 ${isFetching ? "opacity-75" : "opacity-100"}`}>
              {currentListings.map((stay, index) => (
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

            {/* Classic WanderLust Pagination Bar */}
            {totalPages > 1 ? (
              <nav
                aria-label="Stays Pagination"
                className="mt-16 pt-10 border-t border-ink/10 flex flex-col md:flex-row items-center justify-between gap-6"
              >
                {/* Page Status / Summary */}
                <div className="text-xs sm:text-sm text-ink/65">
                  Showing <span className="font-bold text-ink">{startItem}–{endItem}</span> of{" "}
                  <span className="font-bold text-ink">{total}</span> stays • Page{" "}
                  <span className="font-bold text-ink">{page}</span> of{" "}
                  <span className="font-bold text-ink">{totalPages}</span>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-2">
                  {/* Previous Page Button */}
                  <button
                    type="button"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page <= 1}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                      page <= 1
                        ? "opacity-30 cursor-not-allowed bg-ink/5 text-ink/40"
                        : "bg-[#ede9df] text-ink hover:bg-sand hover:text-ink active:scale-95 cursor-pointer shadow-xs"
                    }`}
                    aria-label="Previous Page"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path
                        fillRule="evenodd"
                        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Previous</span>
                  </button>

                  {/* Number Pills */}
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    {getPaginationRange(page, totalPages).map((item, idx) => {
                      if (item === "...") {
                        return (
                          <span
                            key={`ellipsis-${idx}`}
                            className="w-8 text-center text-xs sm:text-sm font-bold text-ink/35 select-none"
                          >
                            ...
                          </span>
                        );
                      }

                      const pageNum = Number(item);
                      const isActive = pageNum === page;

                      return (
                        <button
                          key={`page-${pageNum}`}
                          type="button"
                          onClick={() => handlePageChange(pageNum)}
                          aria-current={isActive ? "page" : undefined}
                          className={`h-9 min-w-[2.25rem] sm:min-w-[2.5rem] px-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                            isActive
                              ? "bg-ink text-white shadow-sm scale-105"
                              : "bg-[#ede9df] text-ink/75 hover:bg-sand hover:text-ink active:scale-95"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Page Button */}
                  <button
                    type="button"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= totalPages}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                      page >= totalPages
                        ? "opacity-30 cursor-not-allowed bg-ink/5 text-ink/40"
                        : "bg-[#ede9df] text-ink hover:bg-sand hover:text-ink active:scale-95 cursor-pointer shadow-xs"
                    }`}
                    aria-label="Next Page"
                  >
                    <span>Next</span>
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010-1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {/* Elegant Jump to Page Pill */}
                {totalPages > 5 && (
                  <form
                    onSubmit={handleJumpSubmit}
                    className="inline-flex items-center gap-2 rounded-full bg-[#ede9df]/85 border border-ink/10 pl-3.5 pr-1.5 py-1 text-xs text-ink/70 shadow-2xs transition-all hover:border-ink/20"
                  >
                    <span className="font-semibold text-ink/65">Page</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={jumpInput}
                      onChange={(e) => setJumpInput(e.target.value.replace(/[^0-9]/g, ""))}
                      className="w-12 h-7 rounded-full bg-white text-center font-bold text-ink text-xs border border-ink/15 shadow-2xs outline-none focus:border-clay focus:ring-2 focus:ring-clay/20 transition-all"
                      aria-label="Target page number"
                    />
                    <span className="font-medium text-ink/50">of {totalPages}</span>
                    <button
                      type="submit"
                      className="h-7 px-3 rounded-full bg-ink text-white font-bold text-[11px] hover:bg-clay active:scale-95 transition-all cursor-pointer shadow-2xs flex items-center justify-center gap-1"
                      title="Jump to page"
                    >
                      <span>Go</span>
                      <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                        <path
                          fillRule="evenodd"
                          d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </form>
                )}
              </nav>
            ) : (
              <div className="mt-16 pt-10 border-t border-ink/10 text-center">
                <p className="text-xs text-ink/50 uppercase tracking-wider font-semibold">
                  Showing all {total} places to linger in {active}
                </p>
              </div>
            )}
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
                setPage(1);
                syncUrl("All", "", 1);
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
