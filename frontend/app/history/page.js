"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function HistoryPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("wanderlust_user");
    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        setCurrentUser(u);

        // Load local bookings if any
        const localBookings = localStorage.getItem(`wanderlust_bookings_${u.id || u._id}`);
        if (localBookings) {
          setBookings(JSON.parse(localBookings));
        }
      } catch {}
    }
    setLoading(false);
  }, []);

  return (
    <main className="min-h-[100svh] flex flex-col bg-paper text-ink pt-16">
      <Navbar />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#ede9df]/60 to-transparent">
        <div className="mx-auto w-full px-[clamp(1.25rem,3.5vw,5rem)] pb-8 pt-[clamp(3rem,6vw,5.5rem)] animate-[rise-in_0.5s_cubic-bezier(.16,1,.3,1)_both]">
          <div className="flex items-center gap-2 text-xs font-bold tracking-[.14em] text-clay uppercase mb-3">
            <svg className="w-4 h-4 fill-none stroke-clay stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>Travel Journeys</span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h1 className="font-display text-[clamp(2.8rem,5.5vw,5.5rem)] leading-[.88] tracking-[-.06em]">
                Your Travel <em className="font-normal text-clay">History</em>
              </h1>
              <p className="mt-4 max-w-lg text-base text-ink/65 leading-relaxed">
                Review your confirmed reservations, journey memories, and booking itineraries.
              </p>
            </div>

            {currentUser && (
              <div className="inline-flex items-center gap-2 rounded-full bg-sand/70 border border-ink/10 px-4 py-2 text-xs font-bold text-ink/75">
                <span className="w-2 h-2 rounded-full bg-moss" />
                <span>Traveler: {currentUser.username || currentUser.email}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto w-full flex-1 px-[clamp(1.25rem,3.5vw,5rem)] pb-24 pt-6">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-clay animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="h-2.5 w-2.5 rounded-full bg-clay animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="h-2.5 w-2.5 rounded-full bg-clay animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            <p className="text-xs font-bold tracking-widest text-ink/50 uppercase">Loading journeys...</p>
          </div>
        ) : !currentUser ? (
          <div className="py-20 text-center max-w-md mx-auto animate-[rise-in_0.5s_cubic-bezier(.16,1,.3,1)_both]">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sand/80 flex items-center justify-center text-clay">
              <svg className="w-8 h-8 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="font-display text-3xl font-normal">Sign in to view travel history</h2>
            <p className="mt-2 text-sm text-ink/60 leading-relaxed">
              Log in to your WanderLust account to see your booked retreats, receipts, and past journeys.
            </p>
            <Link
              href="/login"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-clay px-7 py-3 text-xs font-bold text-white hover:bg-[#9e442b] transition-all shadow-sm"
            >
              <span>Sign In</span>
              <span>→</span>
            </Link>
          </div>
        ) : bookings.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto animate-[rise-in_0.5s_cubic-bezier(.16,1,.3,1)_both]">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sand/80 border border-ink/10 flex items-center justify-center text-clay">
              <svg className="w-8 h-8 stroke-clay fill-none stroke-[1.5]" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="font-display text-3xl font-normal">No past trips yet</h2>
            <p className="mt-2 text-sm text-ink/60 leading-relaxed">
              When you reserve a characterful stay on WanderLust, your itinerary and confirmation receipts will be saved here.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-xs font-bold text-white hover:bg-clay transition-all shadow-sm"
              >
                <span>Explore Stays</span>
                <span>→</span>
              </Link>
              <Link
                href="/wishlist"
                className="inline-flex items-center gap-2 rounded-full bg-sand/70 border border-ink/15 px-6 py-3 text-xs font-bold text-ink hover:bg-sand transition-all"
              >
                <span>View Wishlist</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking, index) => (
              <div
                key={booking.bookingId || index}
                className="rounded-3xl bg-white p-6 border border-ink/10 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-moss bg-moss/10 px-3 py-1 rounded-full">
                    Confirmed
                  </span>
                  <span className="text-xs text-ink/50 font-mono">
                    #{booking.bookingId}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold mb-1">{booking.listingTitle || "Reserved Stay"}</h3>
                <p className="text-sm text-ink/60 mb-4">{booking.location || "Curated Destination"}</p>
                <div className="border-t border-ink/10 pt-4 flex items-center justify-between text-xs font-semibold">
                  <span className="text-ink/60">Amount Paid:</span>
                  <span className="font-bold text-sm text-ink">₹{Number(booking.amount || 0).toLocaleString("en-IN")}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
