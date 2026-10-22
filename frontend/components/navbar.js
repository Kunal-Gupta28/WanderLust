"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { API_URL, getCurrentUser, logoutUser, apiClient } from "../lib/api";
import { CloseIcon } from "./icons";

export default function Navbar({ transparent = false }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const links = [
    { href: "/explore", label: "Explore" },
    { href: "/philosophy", label: "Philosophy" },
    { href: "/about", label: "About Us" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  // When logged in, hide options from top navbar that exist in the profile dropdown
  const visibleNavLinks = currentUser
    ? links.filter((link) => link.href !== "/explore" && link.href !== "/faq")
    : links;

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
          {visibleNavLinks.map((link) => {
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
            <div
              ref={profileMenuRef}
              className="relative"
              onMouseEnter={() => setProfileMenuOpen(true)}
              onMouseLeave={() => setProfileMenuOpen(false)}
            >
              {/* Circular Profile Avatar Button */}
              <button
                type="button"
                onClick={() => setProfileMenuOpen((prev) => !prev)}
                className={`group flex items-center gap-2.5 rounded-full pl-3 pr-1.5 py-1.5 border transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md ${
                  isDarkNav
                    ? profileMenuOpen
                      ? "border-sand bg-white/20 text-white shadow-md ring-2 ring-sand/30"
                      : "border-white/30 bg-white/10 hover:bg-white/20 text-white"
                    : profileMenuOpen
                    ? "border-clay bg-white text-ink shadow-md ring-2 ring-clay/20"
                    : "border-ink/15 bg-white/80 hover:bg-white hover:border-ink/30 text-ink"
                }`}
                aria-label="User profile options"
                aria-expanded={profileMenuOpen}
              >
                {/* 3-line subtle menu bars */}
                <svg
                  className="w-4 h-4 stroke-current fill-none stroke-[2] opacity-75 group-hover:opacity-100 transition-opacity"
                  viewBox="0 0 24 24"
                >
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>

                {/* Circular Initial Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-clay via-[#b34c32] to-[#c85a3d] text-white flex items-center justify-center font-display font-bold text-sm tracking-wide shadow-xs group-hover:scale-105 transition-transform">
                  {currentUser.username ? currentUser.username.charAt(0).toUpperCase() : "U"}
                </div>
              </button>

              {/* Hover & Click Dropdown Menu */}
              {profileMenuOpen && (
                <div className="absolute right-0 top-full pt-2 z-50 w-72 animate-[rise-in_0.2s_cubic-bezier(.16,1,.3,1)_both]">
                  <div className="rounded-3xl bg-paper/98 backdrop-blur-2xl border border-ink/10 shadow-[0_16px_48px_rgba(23,34,29,0.16)] p-3 text-ink overflow-hidden max-h-[85vh] overflow-y-auto [scrollbar-width:thin]">
                    {/* User Header Profile Card */}
                    <div className="px-3.5 py-3 rounded-2xl bg-sand/60 border border-ink/8 mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-clay text-white flex items-center justify-center font-display font-bold text-base shadow-sm shrink-0">
                          {currentUser.username ? currentUser.username.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-ink truncate leading-tight">
                            {currentUser.username || "Traveler"}
                          </p>
                          <p className="text-xs text-ink/55 truncate">
                            {currentUser.email || "wanderer@wanderlust.com"}
                          </p>
                          <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider text-moss bg-moss/10 px-2 py-0.5 rounded-full">
                            {currentUser.role === "admin" || currentUser.isAdmin
                              ? "Administrator"
                              : currentUser.role === "host"
                              ? "Verified Host"
                              : "Explorer"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Options List */}
                    <div className="space-y-0.5 text-xs font-semibold">
                      {/* Wishlist */}
                      <Link
                        href="/wishlist"
                        onClick={() => setProfileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-sand/70 transition-colors text-ink/85 hover:text-ink cursor-pointer"
                      >
                        <span className="w-7 h-7 rounded-lg bg-clay/10 text-clay flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 fill-clay" viewBox="0 0 24 24">
                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </span>
                        <div className="flex-1">
                          <span className="block font-bold">Saved Wishlist</span>
                          <span className="block text-[11px] text-ink/50 font-normal">Bookmarked retreats</span>
                        </div>
                      </Link>

                      {/* Travel History */}
                      <Link
                        href="/history"
                        onClick={() => setProfileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-sand/70 transition-colors text-ink/85 hover:text-ink cursor-pointer"
                      >
                        <span className="w-7 h-7 rounded-lg bg-moss/10 text-moss flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </span>
                        <div className="flex-1">
                          <span className="block font-bold">Travel History</span>
                          <span className="block text-[11px] text-ink/50 font-normal">Past trips & bookings</span>
                        </div>
                      </Link>

                      {/* Explore Directory */}
                      <Link
                        href="/explore"
                        onClick={() => setProfileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-sand/70 transition-colors text-ink/85 hover:text-ink cursor-pointer"
                      >
                        <span className="w-7 h-7 rounded-lg bg-sand text-ink flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                          </svg>
                        </span>
                        <div className="flex-1">
                          <span className="block font-bold">Explore Stays</span>
                          <span className="block text-[11px] text-ink/50 font-normal">Browse 900+ places</span>
                        </div>
                      </Link>

                      {/* Philosophy */}
                      <Link
                        href="/philosophy"
                        onClick={() => setProfileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-sand/70 transition-colors text-ink/85 hover:text-ink cursor-pointer"
                      >
                        <span className="w-7 h-7 rounded-lg bg-sand text-ink flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </span>
                        <div className="flex-1">
                          <span className="block font-bold">Philosophy</span>
                          <span className="block text-[11px] text-ink/50 font-normal">Our travel philosophy</span>
                        </div>
                      </Link>

                      {/* About Us */}
                      <Link
                        href="/about"
                        onClick={() => setProfileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-sand/70 transition-colors text-ink/85 hover:text-ink cursor-pointer"
                      >
                        <span className="w-7 h-7 rounded-lg bg-sand text-ink flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </span>
                        <div className="flex-1">
                          <span className="block font-bold">About Us</span>
                          <span className="block text-[11px] text-ink/50 font-normal">Our story & curation</span>
                        </div>
                      </Link>

                      {/* Contact */}
                      <Link
                        href="/contact"
                        onClick={() => setProfileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-sand/70 transition-colors text-ink/85 hover:text-ink cursor-pointer"
                      >
                        <span className="w-7 h-7 rounded-lg bg-sand text-ink flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </span>
                        <div className="flex-1">
                          <span className="block font-bold">Contact</span>
                          <span className="block text-[11px] text-ink/50 font-normal">Concierge & support</span>
                        </div>
                      </Link>

                      {/* Host Operations Hub */}
                      <Link
                        href="/host/dashboard"
                        onClick={() => setProfileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-sand/70 transition-colors text-ink/85 hover:text-ink cursor-pointer"
                      >
                        <span className="w-7 h-7 rounded-lg bg-[#ded7c8] text-ink flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </span>
                        <div className="flex-1">
                          <span className="block font-bold">Host Operations Hub</span>
                          <span className="block text-[11px] text-ink/50 font-normal">Listings & analytics</span>
                        </div>
                      </Link>

                      {/* Admin Console (if admin) */}
                      {(currentUser.role === "admin" || currentUser.isAdmin) && (
                        <Link
                          href="/admin"
                          onClick={() => setProfileMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-amber-500/10 transition-colors text-amber-900 cursor-pointer"
                        >
                          <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          </span>
                          <div className="flex-1">
                            <span className="block font-bold">Admin Console</span>
                            <span className="block text-[11px] text-amber-700/80 font-normal">Platform management</span>
                          </div>
                        </Link>
                      )}

                      {/* Help & FAQ */}
                      <Link
                        href="/faq"
                        onClick={() => setProfileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-sand/70 transition-colors text-ink/85 hover:text-ink cursor-pointer"
                      >
                        <span className="w-7 h-7 rounded-lg bg-ink/5 text-ink/70 flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                        <div className="flex-1">
                          <span className="block font-bold">Help & FAQ</span>
                          <span className="block text-[11px] text-ink/50 font-normal">Assistance & policies</span>
                        </div>
                      </Link>
                    </div>

                    {/* Divider */}
                    <div className="my-2 border-t border-ink/10" />

                    {/* Logout Option */}
                    <button
                      type="button"
                      onClick={() => {
                        setProfileMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer text-left"
                    >
                      <span className="w-7 h-7 rounded-lg bg-red-100/70 text-red-600 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </span>
                      <span>Log out</span>
                    </button>
                  </div>
                </div>
              )}
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
            <div className="p-3.5 rounded-2xl bg-sand/60 border border-ink/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-clay text-white flex items-center justify-center font-display font-bold text-base shadow-sm shrink-0">
                {currentUser.username ? currentUser.username.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-ink truncate leading-tight">
                  {currentUser.username || "Traveler"}
                </p>
                <p className="text-xs text-ink/55 truncate">
                  {currentUser.email || "wanderer@wanderlust.com"}
                </p>
                <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider text-moss bg-moss/10 px-2 py-0.5 rounded-full">
                  {currentUser.role === "admin" || currentUser.isAdmin
                    ? "Administrator"
                    : currentUser.role === "host"
                    ? "Verified Host"
                    : "Explorer"}
                </span>
              </div>
            </div>
          )}

          {currentUser && (
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-sand/60 text-ink font-bold text-xs"
              >
                <svg className="w-4 h-4 text-clay fill-clay shrink-0" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>Wishlist</span>
              </Link>
              <Link
                href="/history"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-sand/60 text-ink font-bold text-xs"
              >
                <svg className="w-4 h-4 text-moss stroke-current fill-none stroke-2 shrink-0" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Travel History</span>
              </Link>
            </div>
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

            {visibleNavLinks.map((link) => {
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
                  className="w-full text-center rounded-full bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700 shadow-sm flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Log out</span>
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

