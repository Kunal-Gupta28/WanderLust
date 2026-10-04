"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { API_URL } from "../lib/api";

export default function AuthForm({ mode }) {
  const signup = mode === "signup";
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [demoLoading, setDemoLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setFormLoading(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch(
        `${API_URL}/auth/${signup ? "signup" : "login"}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Object.fromEntries(form)),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      if (data.user) {
        localStorage.setItem("wanderlust_user", JSON.stringify(data.user));
        if (data.user.role) localStorage.setItem("wanderlust_role", data.user.role);
      }
      setMessage(data.message || "Welcome! Signed in successfully.");
      setTimeout(() => router.push("/"), 800);
    } catch (error) {
      setMessage(
        error.message || "We could not sign you in. Please check your credentials."
      );
    } finally {
      setFormLoading(false);
    }
  }

  async function handleDemoLogin() {
    setDemoLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/auth/demo-login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      const demoUser = data.user || { username: "demo_explorer", role: "traveler" };
      localStorage.setItem("wanderlust_user", JSON.stringify(demoUser));
      setMessage(data.message || "Welcome, demo explorer!");
      setTimeout(() => router.push("/"), 800);
    } catch (error) {
      // Fallback local session if endpoint delayed
      localStorage.setItem("wanderlust_user", JSON.stringify({ username: "demo_explorer", role: "traveler" }));
      setMessage("Welcome! Demo session active.");
      setTimeout(() => router.push("/"), 800);
    } finally {
      setDemoLoading(false);
    }
  }

  return (
    <main className="h-screen w-screen overflow-hidden bg-paper lg:grid lg:grid-cols-2">
      {/* Left panel — Rich Visual & Branding */}
      <section className="relative hidden h-full overflow-hidden lg:flex lg:flex-col lg:justify-between p-[clamp(2.5rem,5vw,5rem)] text-[#f5f0e5]">
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
            Save the stays that catch your eye, connect with independent hosts, and return when the timing is right.
          </p>
        </div>

        {/* Bottom Testimonial Note */}
        <div className="relative z-10 pt-6 border-t border-white/15 flex items-center justify-between text-xs text-[#f5f0e5]/70">
          <p className="italic font-display text-sm text-sand/90">"A quiet retreat worth remembering."</p>
          <span>Go gently.</span>
        </div>
      </section>

      {/* Right panel — Auth Form */}
      <section className="mx-auto flex h-full w-full max-w-lg flex-col justify-between px-6 py-6 sm:px-10 lg:px-12 bg-paper">
        {/* Top Bar Navigation */}
        <div className="flex items-center justify-between lg:justify-end pt-2">
          <Link href="/" className="font-display text-2xl tracking-[-.06em] lg:hidden">
            Wander<span className="text-clay">Lust</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-full border border-ink/15 bg-white/60 px-3.5 py-1.5 text-xs font-bold text-ink/75 hover:bg-white hover:text-clay hover:border-clay/40 transition shadow-sm"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none stroke-[2]">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Home</span>
          </Link>
        </div>

        {/* Form Body Container */}
        <div className="my-auto py-4">
          <span className="text-xs font-bold tracking-[.18em] text-clay uppercase">
            {signup ? "A New Chapter" : "Welcome Back"}
          </span>
          <h1 className="mt-1 font-display text-[clamp(2.2rem,3.8vw,3.2rem)] font-bold leading-[.95] tracking-[-.05em] text-ink">
            {signup ? "Make room for wonder." : "Your saved stays await."}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-ink/65">
            {signup
              ? "Create your WanderLust account to unlock saved stays & host messaging."
              : "Sign in to manage your saved stays and reservation requests."}
          </p>

          {/* ── 1-Click Demo Login Highlight CTA ── */}
          <div className="mt-6">
            <button
              onClick={handleDemoLogin}
              disabled={demoLoading}
              type="button"
              className="group relative flex w-full items-center justify-center gap-2.5 rounded-2xl bg-moss py-3.5 px-4 text-sm font-bold text-white shadow-md hover:bg-moss/90 transition-all active:scale-[.99] disabled:opacity-60"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-none stroke-current stroke-[2.2] text-sand group-hover:scale-110 transition-transform"
                aria-hidden="true"
              >
                <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
              </svg>
              <span>{demoLoading ? "Starting Demo Session…" : "1-Click Demo Login"}</span>
            </button>
            <p className="mt-1.5 text-center text-[.7rem] font-semibold text-moss">
              ⚡ Instant Recruiter Access — zero registration required
            </p>
          </div>

          {/* ── Elegant Divider ── */}
          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-ink/15" />
            <span className="text-[.65rem] font-bold tracking-[.12em] text-ink/40 uppercase">
              or continue with credentials
            </span>
            <span className="h-px flex-1 bg-ink/15" />
          </div>

          {/* ── Form Inputs ── */}
          <form onSubmit={submit} className="space-y-3.5">
            {signup && (
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-ink/75 block">
                  Full Name *
                </label>
                <input
                  name="username"
                  required
                  className="w-full rounded-xl border border-ink/15 bg-sand/20 px-4 py-2.5 text-sm text-ink outline-none transition focus:border-clay focus:bg-white focus:ring-1 focus:ring-clay/20 placeholder:text-ink/35"
                  placeholder="e.g. Elena Rostova"
                />
              </div>
            )}
            {signup && (
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-ink/75 block">
                  Email Address *
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-ink/15 bg-sand/20 px-4 py-2.5 text-sm text-ink outline-none transition focus:border-clay focus:bg-white focus:ring-1 focus:ring-clay/20 placeholder:text-ink/35"
                  placeholder="you@example.com"
                />
              </div>
            )}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-ink/75 block">
                {signup ? "Username *" : "Username *"}
              </label>
              <input
                name={signup ? "password" : "username"}
                type={signup ? "password" : "text"}
                required
                className="w-full rounded-xl border border-ink/15 bg-sand/20 px-4 py-2.5 text-sm text-ink outline-none transition focus:border-clay focus:bg-white focus:ring-1 focus:ring-clay/20 placeholder:text-ink/35"
                placeholder={signup ? "At least 8 characters" : "Your username"}
              />
            </div>
            {!signup && (
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-ink/75 block">
                  Password *
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full rounded-xl border border-ink/15 bg-sand/20 px-4 py-2.5 text-sm text-ink outline-none transition focus:border-clay focus:bg-white focus:ring-1 focus:ring-clay/20 placeholder:text-ink/35"
                  placeholder="Your password"
                />
              </div>
            )}

            <button
              disabled={formLoading}
              className="mt-3 w-full rounded-xl bg-clay py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#9e442b] active:scale-[.99] disabled:opacity-60 flex items-center justify-center gap-2"
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
                signup ? "Create Account" : "Log In"
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
          <p className="mt-4 text-xs text-ink/65 text-center">
            {signup ? "Already have an account?" : "New to WanderLust?"}{" "}
            <Link
              href={signup ? "/login" : "/signup"}
              className="font-bold text-clay underline underline-offset-4 hover:text-ink transition"
            >
              {signup ? "Log in" : "Create one"}
            </Link>
          </p>
        </div>

        {/* Footer info line */}
        <div className="text-center text-[.7rem] text-ink/45 pb-2">
          © {new Date().getFullYear()} WanderLust. Go gently.
        </div>
      </section>
    </main>
  );
}
