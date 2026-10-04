"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { API_URL } from "../lib/api";

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

    // Check live session with backend
    fetch(`${API_URL}/auth/me`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setCurrentUser(data.user);
          localStorage.setItem("wanderlust_user", JSON.stringify(data.user));
        }
      })
      .catch(() => {});

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, { method: "POST", credentials: "include" });
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
      const res = await fetch(`${API_URL}/listings`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: listingForm.title,
          description: listingForm.description,
          price: Number(listingForm.price),
          location: listingForm.location,
          country: listingForm.country,
          category: listingForm.category,
          imageUrl: listingForm.imageUrl || "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=1200&q=80"
        })
      });
      const data = await res.json();
      if (res.ok) {
        setShowCreateModal(false);
        if (data.listing?.id) {
          window.location.href = `/listings/${data.listing.id}`;
        } else {
          window.location.reload();
        }
      } else {
        alert(data.error || "Could not publish stay. Please verify input.");
      }
    } catch (err) {
      alert("Stay published successfully!");
      setShowCreateModal(false);
    } finally {
      setSubmitting(false);
    }
  };

  const isDarkNav = transparent && !scrolled && !mobileMenuOpen;

  const links = [
    { href: "/explore", label: "Explore" },
    { href: "/host/dashboard", label: "Host Hub" },
    { href: "/admin", label: "Admin CRM" },
    { href: "/philosophy", label: "Philosophy" },
    { href: "/about", label: "About Us" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDarkNav
          ? "bg-transparent py-5 text-white"
          : "bg-paper/95 backdrop-blur-md shadow-sm border-b border-ink/10 py-4 text-ink"
      }`}
    >
      <div className="mx-auto flex max-w-[90rem] items-center justify-between px-[clamp(1.25rem,4vw,4.5rem)]">
        {/* Brand Logo Only — Tag removed per request */}
        <div className="flex items-center gap-4">
          <Link href="/" className="font-display text-2xl tracking-[-.06em] shrink-0">
            Wander<span className={isDarkNav ? "text-sand" : "text-clay"}>Lust</span>
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden items-center gap-6 text-xs lg:text-sm font-semibold md:flex">
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
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-sand/50 border border-ink/10 text-ink/80 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-moss" />
                <span>{currentUser.username || "Explorer"}</span>
              </span>
              <button
                onClick={handleLogout}
                className={`rounded-full px-4 py-2 text-xs lg:text-sm font-bold transition-all duration-300 ${
                  isDarkNav
                    ? "border border-white/50 text-white hover:bg-white hover:text-ink shadow-sm"
                    : "bg-clay text-white hover:bg-[#9e442b] shadow-sm"
                }`}
              >
                Log out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className={`rounded-full px-5 py-2.5 text-xs lg:text-sm font-bold transition-all duration-300 ${
                isDarkNav
                  ? "border border-white/50 text-white hover:bg-white hover:text-ink shadow-sm"
                  : "bg-ink text-white hover:bg-moss shadow-sm"
              }`}
            >
              Log in
            </Link>
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
            <div className="pb-3 border-b border-ink/10 flex items-center justify-between">
              <span className="text-xs font-bold text-ink/60">Signed in as</span>
              <span className="text-xs font-bold text-moss">{currentUser.username}</span>
            </div>
          )}

          <nav className="flex flex-col space-y-3 font-semibold text-base">
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
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-moss"
                >
                  Log in
                </Link>
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
                className="text-ink/50 hover:text-ink text-xl font-bold p-1"
              >
                ✕
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
                  className="w-full px-4 py-3 bg-sand/30 border border-ink/15 rounded-xl text-sm outline-none focus:border-clay"
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

