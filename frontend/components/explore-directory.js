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

// Smart pagination page array generator (e.g. [1, 2, 3, 4, 5, '...', 78])
function getPaginationItems(currentPage, totalPages) {
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
  const limit = 12;

  const listingsTopRef = useRef(null);

  // Sync with URL params on mount or when URL changes
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
      if (urlPage && urlPage !== page) setPage(urlPage);
    }
  }, [searchParams]);

  // Use TanStack Query with Axios under the hood
  const isInitialParams =
    page === initialPage && active === initialActive && query === initialQuery;

  const { data, isFetching, isLoading, isPlaceholderData } = useListingsQuery(
    { page, limit, category: active, q: query },
    isInitialParams ? initialData : undefined
  );

  const listings = data?.listings || initialData?.listings || fallbackListings.slice(0, limit);
  const total = data?.total !== undefined ? data.total : (initialData?.total || fallbackListings.length);
  const totalPages = data?.totalPages || Math.max(1, Math.ceil(total / limit));
  const currentPage = Math.min(page, totalPages);

  // Update URL shallowly so user can bookmark or refresh
  const syncUrl = (newCategory, newQuery, newPage) => {
    startTransition(() => {
      const sp = new URLSearchParams();
      if (newQuery) sp.set("q", newQuery);
      if (newPage > 1) sp.set("page", String(newPage));

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
  };

  const handleQueryChange = (val) => {
    setQuery(val);
    setPage(1);
    syncUrl(active, val, 1);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) return;
    setPage(newPage);
    syncUrl(active, query, newPage);

    // Smooth scroll to top of listings section
    if (listingsTopRef.current) {
      listingsTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const paginationItems = getPaginationItems(currentPage, totalPages);

  // Showing range calculations
  const startIndex = total === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endIndex = Math.min(currentPage * limit, total);

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
                Showing <span className="font-bold text-ink">{startIndex}–{endIndex}</span> of{" "}
                <span className="font-bold text-ink">{total}</span> places to linger
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
                  className="text-xs text-ink/40 hover:text-ink px-1"
                >
                  Clear
                </button>
              )}
            </label>
          </div>
        </div>
      </section>

      <section
        ref={listingsTopRef}
        className="mx-auto w-full max-w-[90rem] flex-1 px-[clamp(1.25rem,4vw,4.5rem)] pb-[clamp(5rem,10vw,10rem)] scroll-mt-24"
      >
        {/* Categories Bar */}
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
        {listings.length ? (
          <>
            <div
              className={`grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 transition-opacity duration-300 ${
                isFetching && isPlaceholderData ? "opacity-70" : "opacity-100"
              }`}
            >
              {listings.map((stay, index) => (
                <article key={stay.id} className="listing-reveal group" style={{ "--order": index % limit }}>
                  <Link href={`/listings/${stay.id}`}>
                    <div className="image-zoom relative aspect-[1.05/1] overflow-hidden rounded-2xl bg-sand/70">
                      <ListingImage
                        src={stay.image?.url || fallbackListings[0].image.url}
                        alt={stay.title}
                        fill
                        priority={index < 4 && page === 1}
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <nav
                aria-label="Pagination"
                className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-ink/10 pt-10 sm:flex-row"
              >
                <div className="text-sm text-ink/60">
                  Page <span className="font-bold text-ink">{currentPage}</span> of{" "}
                  <span className="font-bold text-ink">{totalPages}</span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                  {/* Previous Button */}
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1 || isFetching}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                      currentPage <= 1
                        ? "cursor-not-allowed text-ink/30 bg-[#ede9df]/40"
                        : "cursor-pointer bg-[#ede9df] text-ink hover:bg-sand active:scale-95"
                    }`}
                  >
                    <span>←</span> Previous
                  </button>

                  {/* Numbered Page Buttons */}
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    {paginationItems.map((item, idx) => {
                      if (item === "...") {
                        return (
                          <span
                            key={`ellipsis-${idx}`}
                            className="px-2 text-sm text-ink/40 select-none"
                          >
                            …
                          </span>
                        );
                      }
                      const pageNum = Number(item);
                      const isCurrent = pageNum === currentPage;
                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => handlePageChange(pageNum)}
                          disabled={isCurrent || isFetching}
                          className={`h-10 min-w-10 rounded-full px-3 text-sm font-bold transition-all duration-200 ${
                            isCurrent
                              ? "bg-ink text-white shadow-sm"
                              : "bg-[#ede9df] text-ink/75 hover:bg-sand hover:text-ink cursor-pointer active:scale-95"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages || isFetching}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                      currentPage >= totalPages
                        ? "cursor-not-allowed text-ink/30 bg-[#ede9df]/40"
                        : "cursor-pointer bg-[#ede9df] text-ink hover:bg-sand active:scale-95"
                    }`}
                  >
                    Next <span>→</span>
                  </button>
                </div>

                {/* Quick Page Jump (if many pages) */}
                {totalPages > 5 && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-ink/60">
                    <span>Jump to</span>
                    <select
                      value={currentPage}
                      onChange={(e) => handlePageChange(Number(e.target.value))}
                      className="rounded-lg border border-ink/20 bg-paper px-2 py-1.5 text-xs font-bold text-ink focus:border-clay focus:outline-none"
                    >
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <option key={p} value={p}>
                          Page {p}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </nav>
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
