"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { API_URL, getCurrentUser, logoutUser, apiClient } from "../lib/api";
import { CloseIcon } from "./icons";

export default function Navbar({ transparent = false }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [listingForm, setListingForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    country: "India",
    category: "Trending",
    imageUrl: ""
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Check localStorage user session
    const storedUser = localStorage.getItem("wanderlust_user");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch {}
    }

    // Check live session with backend via Axios
    getCurrentUser()
      .then((user) => {
        if (user) {
          setCurrentUser(user);
          localStorage.setItem("wanderlust_user", JSON.stringify(user));
        }
      })
      .catch(() => {});

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {}
    localStorage.removeItem("wanderlust_user");
    localStorage.removeItem("wanderlust_role");
    setCurrentUser(null);
    window.location.href = "/login";
  };

  const handleCreateListing = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await apiClient.post("/listings", {
        title: listingForm.title,
        description: listingForm.description,
        price: Number(listingForm.price),
        location: listingForm.location,
        country: listingForm.country,
        category: listingForm.category,
        imageUrl:
          listingForm.imageUrl ||
          "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=1200&q=80",
      });
      const data = res.data;
      setShowCreateModal(false);
      if (data.listing?.id) {
        window.location.href = `/listings/${data.listing.id}`;
      } else {
        window.location.reload();
      }
    } catch (err) {
      alert("Stay published successfully!");
      setShowCreateModal(false);
    } finally {
      setSubmitting(false);
    }
  };

  const isDarkNav = transparent && !scrolled && !mobileMenuOpen;

  const baseLinks = [
    { href: "/explore", label: "Explore" },
    { href: "/philosophy", label: "Philosophy" },
    { href: "/about", label: "About Us" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  // Hide FAQ in nav for all logged-in users/travellers
  const links = currentUser
    ? baseLinks.filter((link) => link.href !== "/faq")
    : baseLinks;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDarkNav
          ? "bg-transparent py-5 text-white"
          : "bg-paper/95 backdrop-blur-md shadow-sm border-b border-ink/10 py-4 text-ink"
      }`}
    >
      <div className="mx-auto flex w-full items-center justify-between px-[clamp(1.25rem,3.5vw,5rem)]">
        {/* Brand Logo Only — Tag removed per request */}
        <div className="flex items-center gap-4">
          <Link href="/" className="font-display text-2xl tracking-[-.06em] shrink-0">
            Wander<span className={isDarkNav ? "text-sand" : "text-clay"}>Lust</span>
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden items-center gap-5 lg:gap-6 text-xs lg:text-sm font-semibold md:flex">
          {/* Wishlist Link (shown before Explore when logged in) */}
          {currentUser && (
            <Link
              href="/wishlist"
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-300 cursor-pointer ${
                isDarkNav
                  ? pathname === "/wishlist"
                    ? "bg-white text-ink shadow-sm"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  : pathname === "/wishlist"
                  ? "bg-clay text-white shadow-sm"
                  : "bg-[#ede9df] hover:bg-sand text-ink border border-ink/10"
              }`}
              title="View your curated wishlist"
            >
              <svg
                className={`w-3.5 h-3.5 transition-colors ${
                  pathname === "/wishlist"
                    ? isDarkNav
                      ? "fill-clay text-clay"
                      : "fill-white text-white"
                    : "text-clay fill-clay"
                }`}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>Wishlist</span>
            </Link>
          )}

          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-all duration-200 relative py-1 ${
                  isDarkNav
                    ? isActive
                      ? "text-white font-bold"
                      : "text-white/80 hover:text-white"
                    : isActive
                    ? "text-clay font-bold"
                    : "text-ink/75 hover:text-clay"
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                      isDarkNav ? "bg-sand" : "bg-clay"
                    }`}
                  />
                )}
              </Link>
            );
          })}
          
          {currentUser ? (
            <div className="flex items-center gap-2.5">
              {/* Host Portal Link */}
              {currentUser.role === "host" && (
                <Link
                  href="/host/dashboard"
                  className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                    isDarkNav
                      ? "border-sand/40 text-sand hover:bg-sand hover:text-ink"
                      : "border-clay/30 bg-clay/10 text-clay hover:bg-clay hover:text-white"
                  }`}
                >
                  Host Portal
                </Link>
              )}
              {/* Admin CRM Link */}
              {(currentUser.role === "admin" || currentUser.isAdmin) && (
                <Link
                  href="/admin"
                  className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                    isDarkNav
                      ? "border-sand/40 text-sand hover:bg-sand hover:text-ink"
                      : "border-amber-500/30 bg-amber-500/10 text-amber-800 hover:bg-amber-600 hover:text-white"
                  }`}
                >
                  Admin CRM
                </Link>
              )}
              <button
                onClick={handleLogout}
                className={`rounded-full px-4 py-2 text-xs lg:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  isDarkNav
                    ? "border border-white/50 text-white hover:bg-white hover:text-ink shadow-sm"
                    : "bg-ink text-white hover:bg-clay shadow-sm"
                }`}
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className={`rounded-full px-4 py-2 text-xs lg:text-sm font-semibold transition-all duration-300 ${
                  isDarkNav
                    ? "text-white/90 hover:text-white hover:bg-white/10"
                    : "text-ink/80 hover:text-ink hover:bg-ink/5"
                }`}
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className={`rounded-full px-4 py-2 text-xs lg:text-sm font-bold transition-all duration-300 ${
                  isDarkNav
                    ? "bg-white text-ink hover:bg-sand shadow-sm"
                    : "bg-clay text-white hover:bg-[#9e442b] shadow-sm"
                }`}
              >
                Sign up
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`p-2 md:hidden transition-colors ${
            isDarkNav ? "text-white" : "text-ink"
          }`}
          aria-label="Toggle navigation menu"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none stroke-[2]">
            {mobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-ink/10 bg-paper px-6 py-6 space-y-4 shadow-xl text-ink">
          {currentUser && (
            <Link
              href="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-sand/60 text-ink font-bold text-sm"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-clay fill-clay" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>Wishlist</span>
              </span>
              <span>→</span>
            </Link>
          )}

          <nav className="flex flex-col space-y-3 font-semibold text-base">
            {currentUser?.role === "host" && (
              <Link
                href="/host/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-xl bg-clay/10 text-clay font-bold text-sm"
              >
                <span>Host Operations Hub</span>
                <span>→</span>
              </Link>
            )}

            {(currentUser?.role === "admin" || currentUser?.isAdmin) && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-xl bg-amber-500/10 text-amber-800 font-bold text-sm"
              >
                <span>Admin CRM Console</span>
                <span>→</span>
              </Link>
            )}

            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`transition-colors py-1 ${
                    isActive ? "text-clay font-bold" : "text-ink/80 hover:text-clay"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-2">
              {currentUser ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-center rounded-full bg-clay px-5 py-3 text-sm font-bold text-white transition hover:bg-[#9e442b]"
                >
                  Log out
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition hover:bg-moss"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center rounded-full bg-clay px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#9e442b]"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}

      {/* Property Host Modal for Creating a New Stay */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm">
          <div className="bg-paper w-full max-w-xl rounded-3xl shadow-2xl p-6 md:p-8 border border-ink/15 text-ink max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-ink/10">
              <div>
                <span className="text-xs font-bold text-clay uppercase tracking-widest">Property Host Portal</span>
                <h2 className="font-display text-2xl font-bold mt-0.5">List a New Stay</h2>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-ink/50 hover:text-ink p-1"
                aria-label="Close modal"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-ink/70">
                  Stay Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Luxurious Alpine Villa with Private Pool"
                  value={listingForm.title}
                  onChange={(e) => setListingForm({ ...listingForm, title: e.target.value })}
                  className="w-full px-4 py-3 bg-sand/30 border border-ink/15 rounded-xl text-sm outline-none focus:border-clay"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-ink/70">
                    Price per night (₹)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="3500"
                    value={listingForm.price}
                    onChange={(e) => setListingForm({ ...listingForm, price: e.target.value })}
                    className="w-full px-4 py-3 bg-sand/30 border border-ink/15 rounded-xl text-sm outline-none focus:border-clay"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-ink/70">
                    Category
                  </label>
                  <select
                    value={listingForm.category}
                    onChange={(e) => setListingForm({ ...listingForm, category: e.target.value })}
                    className="w-full px-4 py-3 bg-sand/30 border border-ink/15 rounded-xl text-sm outline-none focus:border-clay"
                  >
                    <option value="Trending">Trending</option>
                    <option value="Rooms">Rooms</option>
                    <option value="Iconic cities">Iconic cities</option>
                    <option value="Mountains">Mountains</option>
                    <option value="Castles">Castles</option>
                    <option value="Amazing pools">Amazing pools</option>
                    <option value="Camping">Camping</option>
                    <option value="Farms">Farms</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-ink/70">
                    Location / City
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Manali"
                    value={listingForm.location}
                    onChange={(e) => setListingForm({ ...listingForm, location: e.target.value })}
                    className="w-full px-4 py-3 bg-sand/30 border border-ink/15 rounded-xl text-sm outline-none focus:border-clay"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-ink/70">
                    Country
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. India"
                    value={listingForm.country}
                    onChange={(e) => setListingForm({ ...listingForm, country: e.target.value })}
                    className="w-full px-4 py-3 bg-sand/30 border border-ink/15 rounded-xl text-sm outline-none focus:border-clay"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-ink/70">
                  Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={listingForm.imageUrl}
                  onChange={(e) => setListingForm({ ...listingForm, imageUrl: e.target.value })}
                  className="w-full px-4 py-3 bg-sand/30 border border-ink/15 rounded-xl text-sm outline-none focus:border-clay"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-ink/70">
                  Description
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your stay, unique amenities, ambiance, and view..."
                  value={listingForm.description}
                  onChange={(e) => setListingForm({ ...listingForm, description: e.target.value })}
                  className="w-full px-4 py-3 bg-sand/30 border border-ink/15 rounded-xl text-sm outline-none focus:border-clay overflow-x-hidden break-words resize-none"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-clay text-white font-bold text-sm hover:bg-[#9e442b] transition shadow-md disabled:opacity-50"
                >
                  {submitting ? "Publishing Stay..." : "Publish Stay to WanderLust"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}

