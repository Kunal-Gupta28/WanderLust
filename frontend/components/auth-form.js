"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { API_URL, loginUser, signupUser, demoLoginUser } from "../lib/api";
import { ZapIcon, CheckIcon } from "./icons";

export default function AuthForm({ mode }) {
  const signup = mode === "signup";
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("traveler"); // "traveler" | "host"
  const [activeDemoRole, setActiveDemoRole] = useState(null); // "traveler" | "host" | "admin"
  const [message, setMessage] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setFormLoading(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form);
    if (signup) {
      payload.role = selectedRole;
    }

    try {
      const data = signup ? await signupUser(payload) : await loginUser(payload);
      if (data.user) {
        localStorage.setItem("wanderlust_user", JSON.stringify(data.user));
        if (data.user.role) localStorage.setItem("wanderlust_role", data.user.role);
      }
      setMessage(data.message || "Welcome! Signed in successfully.");

      const destination =
        data.user?.role === "admin" || data.user?.isAdmin
          ? "/admin"
          : data.user?.role === "host"
          ? "/host/dashboard"
          : "/explore";

      setTimeout(() => router.push(destination), 800);
    } catch (error) {
      setMessage(
        error.response?.data?.error || error.message || "We could not sign you in. Please check your credentials."
      );
    } finally {
      setFormLoading(false);
    }
  }

  async function handleRoleDemoLogin(role) {
    setActiveDemoRole(role);
    setMessage("");
    try {
      const data = await demoLoginUser(role);
      const user = data.user || {
        username: role === "host" ? "elena_host" : role === "admin" ? "wanderlust_admin" : "demo_explorer",
        role,
        isAdmin: role === "admin",
      };
      localStorage.setItem("wanderlust_user", JSON.stringify(user));
      localStorage.setItem("wanderlust_role", role);
      setMessage(data.message || `Welcome! Signed in as ${role}.`);

      const destination =
        role === "admin"
          ? "/admin"
          : role === "host"
          ? "/host/dashboard"
          : "/explore";

      setTimeout(() => router.push(destination), 600);
    } catch (error) {
      const fallbackUser = {
        username: role === "host" ? "elena_host" : role === "admin" ? "wanderlust_admin" : "demo_explorer",
        role,
        isAdmin: role === "admin",
      };
      localStorage.setItem("wanderlust_user", JSON.stringify(fallbackUser));
      localStorage.setItem("wanderlust_role", role);
      setMessage(`Demo session active (${role}).`);
      const destination =
        role === "admin"
          ? "/admin"
          : role === "host"
          ? "/host/dashboard"
          : "/explore";
      setTimeout(() => router.push(destination), 600);
    } finally {
      setActiveDemoRole(null);
    }
  }

  return (
    <main className="min-h-screen w-screen overflow-x-hidden bg-paper lg:grid lg:grid-cols-2">
      {/* Left panel — Rich Visual & Branding */}
      <section className="relative hidden h-full min-h-screen overflow-hidden lg:flex lg:flex-col lg:justify-between p-[clamp(2.5rem,5vw,5rem)] text-[#f5f0e5]">
        {/* Background Image & Gradient Overlay */}
        <Image
          src="https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&q=90&w=1400"
          alt="Cozy cabin in pine forest"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-moss/95 via-moss/80 to-moss/65" />

        {/* Top Header Logo */}
        <div className="relative z-10 flex items-center justify-between">
          <Link href="/" className="font-display text-3xl tracking-[-.06em]">
            Wander<span className="text-sand">Lust</span>
          </Link>
          <span className="text-[.68rem] font-bold uppercase tracking-[.2em] bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-sand">
            Est. 2021
          </span>
        </div>

        {/* Center Headline */}
        <div className="relative z-10 my-auto py-8">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-sand/80 mb-4">
            Curated Slow Stays
          </p>
          <h2 className="max-w-md font-display text-[clamp(2.8rem,4.5vw,4.8rem)] leading-[.92] tracking-[-.05em] text-white">
            The journey starts <em className="font-normal text-sand">before you leave.</em>
          </h2>
          <p className="mt-6 max-w-sm text-sm text-[#f5f0e5]/80 leading-relaxed">
            {signup
              ? selectedRole === "host"
                ? "Share your haven with discerning travelers from across the world. Manage bookings and earn revenue seamlessly."
                : "Save the stays that catch your eye, connect with independent hosts, and book places worth remembering."
              : "Access your personalized workspace across Explorer, Host, or Administrator portals."}
          </p>
        </div>

        {/* Bottom Testimonial Note */}
        <div className="relative z-10 pt-6 border-t border-white/15 flex items-center justify-between text-xs text-[#f5f0e5]/70">
          <p className="italic font-display text-sm text-sand/90">"A quiet retreat worth remembering."</p>
          <span>Go gently.</span>
        </div>
      </section>

      {/* Right panel — Auth Form */}
      <section className="mx-auto flex h-full min-h-screen w-full max-w-[480px] flex-col justify-between px-6 py-6 sm:px-10 bg-paper overflow-y-auto">
        {/* Top Bar Navigation */}
        <div className="flex items-center justify-between lg:justify-end pt-1">
          <Link href="/" className="font-display text-2xl tracking-[-.06em] lg:hidden">
            Wander<span className="text-clay">Lust</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-full border border-ink/15 bg-white px-3.5 py-1.5 text-xs font-bold text-ink/75 hover:text-clay hover:border-clay/40 transition shadow-sm"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none stroke-[2]">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Home</span>
          </Link>
        </div>

        {/* Form Body Container */}
        <div className="my-auto py-3">
          <div className="mb-3.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-clay/10 text-clay border border-clay/20">
              <span className="w-1.5 h-1.5 rounded-full bg-clay" />
              {signup ? "Create Account" : "Welcome Back"}
            </span>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink leading-tight">
              {signup
                ? selectedRole === "host"
                  ? "Become a Property Host"
                  : "Join as a Traveler"
                : "Sign in to WanderLust"}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-ink/65 leading-relaxed">
              {signup
                ? selectedRole === "host"
                  ? "List properties, manage reservations & access Host Hub."
                  : "Explore curated slow stays, book securely & message hosts."
                : "Sign in with your credentials or test any of the 3 platform roles below."}
            </p>
          </div>

          {/* ── Signup: Role Selection Tabs ── */}
          {signup && (
            <div className="mb-4">
              <div className="grid grid-cols-2 p-1.5 bg-sand/40 rounded-2xl border border-ink/10 gap-1.5 shadow-inner">
                <button
                  type="button"
                  onClick={() => setSelectedRole("traveler")}
                  className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    selectedRole === "traveler"
                      ? "bg-white text-ink shadow-sm ring-1 ring-ink/10"
                      : "text-ink/60 hover:text-ink hover:bg-white/40"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${selectedRole === "traveler" ? "bg-moss" : "bg-ink/30"}`} />
                  <span>Traveler (Client)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole("host")}
                  className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    selectedRole === "host"
                      ? "bg-white text-clay shadow-sm ring-1 ring-clay/20"
                      : "text-ink/60 hover:text-clay hover:bg-white/40"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${selectedRole === "host" ? "bg-clay" : "bg-ink/30"}`} />
                  <span>Property Host</span>
                </button>
              </div>
            </div>
          )}

          {/* ── Login: 1-Click Quick Demo Login for All 3 Roles ── */}
          {!signup && (
            <div className="mb-4 p-4 rounded-2xl bg-sand/30 border border-ink/10 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-ink/75">
                  1-Click Instant Demo Login (3 Roles)
                </span>
                <span className="text-[10px] font-semibold text-moss flex items-center gap-1">
                  <ZapIcon className="w-3 h-3 fill-current" /> Zero password
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {/* 1. Traveler */}
                <button
                  type="button"
                  disabled={Boolean(activeDemoRole)}
                  onClick={() => handleRoleDemoLogin("traveler")}
                  className="p-3 rounded-xl border border-ink/15 bg-white hover:bg-moss/10 hover:border-moss text-left transition active:scale-95 disabled:opacity-60 cursor-pointer flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <span className="block text-[10px] font-extrabold text-moss uppercase tracking-wider">Role 1</span>
                    <span className="font-display font-bold text-xs text-ink block mt-0.5">Traveler</span>
                  </div>
                  <span className="text-[9px] text-ink/60 mt-2 font-medium">Explore & Book</span>
                </button>

                {/* 2. Host */}
                <button
                  type="button"
                  disabled={Boolean(activeDemoRole)}
                  onClick={() => handleRoleDemoLogin("host")}
                  className="p-3 rounded-xl border border-ink/15 bg-white hover:bg-clay/10 hover:border-clay text-left transition active:scale-95 disabled:opacity-60 cursor-pointer flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <span className="block text-[10px] font-extrabold text-clay uppercase tracking-wider">Role 2</span>
                    <span className="font-display font-bold text-xs text-ink block mt-0.5">Property Host</span>
                  </div>
                  <span className="text-[9px] text-ink/60 mt-2 font-medium">Host Dashboard</span>
                </button>

                {/* 3. Admin */}
                <button
                  type="button"
                  disabled={Boolean(activeDemoRole)}
                  onClick={() => handleRoleDemoLogin("admin")}
                  className="p-3 rounded-xl border border-ink/15 bg-white hover:bg-ink/10 hover:border-ink text-left transition active:scale-95 disabled:opacity-60 cursor-pointer flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <span className="block text-[10px] font-extrabold text-ink uppercase tracking-wider">Role 3</span>
                    <span className="font-display font-bold text-xs text-ink block mt-0.5">Admin CRM</span>
                  </div>
                  <span className="text-[9px] text-ink/60 mt-2 font-medium">Platform Hub</span>
                </button>
              </div>

              {activeDemoRole && (
                <p className="text-center text-xs font-bold text-clay animate-pulse pt-1">
                  Starting {activeDemoRole.toUpperCase()} session…
                </p>
              )}
            </div>
          )}

          {/* ── Form Inputs ── */}
          <form onSubmit={submit} className="space-y-3">
            {signup ? (
              <>
                {/* Full Name */}
                <div>
                  <label className="text-xs font-semibold text-ink/80 block mb-1">
                    Full Name *
                  </label>
                  <input
                    name="fullName"
                    required
                    className="w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/15 placeholder:text-ink/35 shadow-sm"
                    placeholder="e.g. Elena Rostova"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="text-xs font-semibold text-ink/80 block mb-1">
                    Email Address *
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/15 placeholder:text-ink/35 shadow-sm"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Phone & Username in 2 Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-ink/80 block mb-1">
                      Phone Number *
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      className="w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/15 placeholder:text-ink/35 shadow-sm"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-ink/80 block mb-1">
                      Username *
                    </label>
                    <input
                      name="username"
                      type="text"
                      required
                      className="w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/15 placeholder:text-ink/35 shadow-sm"
                      placeholder="Pick username"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-xs font-semibold text-ink/80 block mb-1">
                    Password *
                  </label>
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/15 placeholder:text-ink/35 shadow-sm"
                    placeholder="At least 8 characters"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="text-xs font-semibold text-ink/80 block mb-1">
                    Username *
                  </label>
                  <input
                    name="username"
                    type="text"
                    required
                    className="w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/15 placeholder:text-ink/35 shadow-sm"
                    placeholder="Your username"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-ink/80 block mb-1">
                    Password *
                  </label>
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/15 placeholder:text-ink/35 shadow-sm"
                    placeholder="Your password"
                  />
                </div>
              </>
            )}

            <button
              disabled={formLoading}
              className="mt-3 w-full rounded-xl bg-clay hover:bg-[#a0462c] py-3 text-sm font-bold text-white shadow-sm hover:shadow-md transition-all active:scale-[.99] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
            >
              {formLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Verifying…</span>
                </>
              ) : (
                <span>{signup ? `Create ${selectedRole === "host" ? "Host" : "Traveler"} Account →` : "Sign In →"}</span>
              )}
            </button>
          </form>

          {/* Status Message */}
          {message && (
            <div className="mt-3 p-3 rounded-xl bg-moss/10 border border-moss/20 text-moss text-xs font-bold text-center">
              {message}
            </div>
          )}

          {/* Toggle Login/Signup */}
          <p className="mt-3.5 text-xs text-ink/65 text-center">
            {signup ? "Already have an account?" : "New to WanderLust?"}{" "}
            <Link
              href={signup ? "/login" : "/signup"}
              className="font-bold text-clay underline underline-offset-4 hover:text-ink transition"
            >
              {signup ? "Log in" : "Create an account"}
            </Link>
          </p>
        </div>

        {/* Footer info line */}
        <div className="text-center text-[.68rem] text-ink/40 pb-1 pt-2">
          © {new Date().getFullYear()} WanderLust. Go gently.
        </div>
      </section>
    </main>
  );
}
