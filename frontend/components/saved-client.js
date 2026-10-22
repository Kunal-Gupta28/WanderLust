"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "./navbar";
import Footer from "./footer";
import ListingImage from "./listing-image";
import { getListing, fallbackListings, getWishlist, toggleWishlist, getCurrentUser } from "../lib/api";

export default function SavedClient() {
  const [user, setUser] = useState(null);
  const [savedIds, setSavedIds] = useState([]);
  const [savedStays, setSavedStays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load user and saved IDs on mount
  useEffect(() => {
    let isMounted = true;

    async function loadSavedData() {
      setIsLoading(true);
      let currentUser = null;

      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("wanderlust_user");
        if (stored) {
          try {
            currentUser = JSON.parse(stored);
          } catch {}
        }
      }

      if (!currentUser) {
        currentUser = await getCurrentUser();
      }

      if (!isMounted) return;
      setUser(currentUser);

      if (!currentUser) {
        setIsLoading(false);
        return;
      }

      const userKey = currentUser.id || currentUser._id || currentUser.username;
      const key = `wanderlust_saved_${userKey}`;
      let ids = [];

      // 1. Read from localStorage
      if (typeof window !== "undefined") {
        try {
          const raw = localStorage.getItem(key);
          if (raw) ids = JSON.parse(raw);
        } catch {}
      }

      // 2. Read from backend API (if empty or merged)
      try {
        const backendIds = await getWishlist();
        if (Array.isArray(backendIds) && backendIds.length) {
          ids = Array.from(new Set([...ids, ...backendIds.map(String)]));
          if (typeof window !== "undefined") {
            localStorage.setItem(key, JSON.stringify(ids));
          }
        }
      } catch {}

      if (!isMounted) return;
      setSavedIds(ids);

      // 3. Resolve stays data for all saved IDs
      const loadedStays = [];
      for (const id of ids) {
        // Fast match from fallback dataset
        const localMatch = fallbackListings.find((s) => String(s.id) === String(id));
        if (localMatch) {
          loadedStays.push(localMatch);
        } else {
          try {
            const data = await getListing(id);
            if (data?.listing) loadedStays.push(data.listing);
          } catch {}
        }
      }

      if (isMounted) {
        setSavedStays(loadedStays);
        setIsLoading(false);
      }
    }

    loadSavedData();

    // Listen for wishlist updates from detail page
    const handleUpdate = () => loadSavedData();
    window.addEventListener("wanderlust_wishlist_updated", handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener("wanderlust_wishlist_updated", handleUpdate);
    };
  }, []);

  // Remove stay from wishlist
  const handleRemove = async (stayId) => {
    const idStr = String(stayId);
    const updatedIds = savedIds.filter((id) => id !== idStr);
    const updatedStays = savedStays.filter((stay) => String(stay.id || stay._id) !== idStr);

    setSavedIds(updatedIds);
    setSavedStays(updatedStays);

    // Sync localStorage
    if (user && typeof window !== "undefined") {
      const userKey = user.id || user._id || user.username;
      localStorage.setItem(`wanderlust_saved_${userKey}`, JSON.stringify(updatedIds));
      window.dispatchEvent(new Event("wanderlust_wishlist_updated"));
    }

    // Sync backend API
    try {
      await toggleWishlist(idStr);
    } catch {}
  };

  return (
    <main className="min-h-[100svh] flex flex-col bg-paper text-ink pt-16">
      <Navbar />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#ede9df]/60 to-transparent">
        <div className="mx-auto max-w-[90rem] px-[clamp(1.25rem,4vw,4.5rem)] pb-8 pt-[clamp(3rem,6vw,5.5rem)] animate-[rise-in_0.5s_cubic-bezier(.16,1,.3,1)_both]">
          <div className="flex items-center gap-2 text-xs font-bold tracking-[.14em] text-clay uppercase mb-3">
            <svg className="w-4 h-4 fill-clay" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>Curated Collection</span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h1 className="font-display text-[clamp(2.8rem,5.5vw,5.5rem)] leading-[.88] tracking-[-.06em]">
                Your Personal <em className="font-normal text-clay">Wishlist</em>
              </h1>
              <p className="mt-4 max-w-lg text-base text-ink/65 leading-relaxed">
                Places you want to linger. Review your curated hideaways, mountain cabins, and seaside villas.
              </p>
            </div>

            {user && (
              <div className="inline-flex items-center gap-2 rounded-full bg-sand/70 border border-ink/10 px-4 py-2 text-xs font-bold text-ink/75">
                <span className="w-2 h-2 rounded-full bg-clay" />
                <span>
                  {savedStays.length} {savedStays.length === 1 ? "Stay" : "Stays"} in Wishlist
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto w-full max-w-[90rem] flex-1 px-[clamp(1.25rem,4vw,4.5rem)] pb-24 pt-6">
        {isLoading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-clay animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="h-2.5 w-2.5 rounded-full bg-clay animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="h-2.5 w-2.5 rounded-full bg-clay animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            <p className="text-xs font-bold tracking-widest text-ink/50 uppercase">Loading your wishlist...</p>
          </div>
        ) : !user ? (
          /* Logged out state */
          <div className="py-20 text-center max-w-md mx-auto animate-[rise-in_0.5s_cubic-bezier(.16,1,.3,1)_both]">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sand/80 flex items-center justify-center text-clay">
              <svg className="w-8 h-8 fill-clay" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="font-display text-3xl font-normal">Sign in to view your wishlist</h2>
            <p className="mt-2 text-sm text-ink/60 leading-relaxed">
              Log in to keep track of your favorite retreats and access them anytime, anywhere.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Link
                href="/login"
                className="rounded-full bg-ink px-6 py-2.5 text-xs font-bold text-white hover:bg-clay transition-all shadow-sm"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-sand/70 border border-ink/15 px-6 py-2.5 text-xs font-bold text-ink hover:bg-sand transition-all"
              >
                Create Account
              </Link>
            </div>
          </div>
        ) : savedStays.length === 0 ? (
          /* Empty wishlist state */
          <div className="py-24 text-center max-w-md mx-auto animate-[rise-in_0.5s_cubic-bezier(.16,1,.3,1)_both]">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sand/80 border border-ink/10 flex items-center justify-center text-clay">
              <svg className="w-7 h-7 stroke-clay fill-none stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="font-display text-3xl font-normal">Your wishlist is empty</h2>
            <p className="mt-2 text-sm text-ink/60 leading-relaxed">
              When exploring WanderLust, tap the <strong className="text-clay">Save</strong> button on any stay you love to bookmark it here for later.
            </p>
            <Link
              href="/explore"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-xs font-bold text-white hover:bg-clay transition-all shadow-sm"
            >
              <span>Explore Collection</span>
              <span>→</span>
            </Link>
          </div>
        ) : (
          /* Stays Grid */
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {savedStays.map((stay, index) => {
              const stayId = String(stay.id || stay._id);
              return (
                <article
                  key={`${stayId}-${index}`}
                  className="listing-reveal group relative"
                  style={{ "--order": index % 12 }}
                >
                  <Link href={`/listings/${stayId}`}>
                    <div className="image-zoom relative aspect-[1.05/1] overflow-hidden rounded-2xl bg-sand/70">
                      <ListingImage
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

                  {/* Remove from wishlist button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemove(stayId);
                    }}
                    className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-ink/10 flex items-center justify-center text-clay hover:scale-110 active:scale-90 transition-all cursor-pointer shadow-sm"
                    title="Remove from saved"
                  >
                    <svg className="w-4 h-4 fill-clay" viewBox="0 0 24 24">
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
