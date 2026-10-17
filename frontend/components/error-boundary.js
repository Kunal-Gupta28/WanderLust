"use client";

import React, { Component } from "react";
import Link from "next/link";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, showDetails: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("WanderLust Trail Caught Error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorDetourScene
          error={this.state.error}
          onReset={this.handleReset}
          showDetails={this.state.showDetails}
          toggleDetails={() =>
            this.setState((prev) => ({ showDetails: !prev.showDetails }))
          }
        />
      );
    }

    return this.props.children;
  }
}

export function ErrorDetourScene({
  error,
  onReset,
  showDetails,
  toggleDetails,
}) {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-paper px-4 py-12 text-center text-ink sm:px-6 lg:px-8">
      {/* Background Weather Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/4 h-[450px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-clay/10 blur-3xl" />
        <div className="absolute right-12 top-20 h-64 w-64 rounded-full bg-sand/50 blur-2xl" />

        {/* Floating Weather Clouds */}
        <div
          className="absolute top-10 left-0 text-clay/20"
          style={{ animation: "cloudFloatAcross 35s linear infinite" }}
        >
          <svg className="h-12 w-36 fill-current" viewBox="0 0 100 40">
            <path d="M20,35 Q10,35 10,25 Q10,15 22,15 Q25,8 35,8 Q45,8 48,15 Q55,10 65,12 Q75,15 75,25 Q82,25 82,32 Q82,35 75,35 Z" />
          </svg>
        </div>
        <div
          className="absolute top-28 left-0 text-sand/60"
          style={{ animation: "cloudFloatAcross 45s linear infinite", animationDelay: "-20s" }}
        >
          <svg className="h-16 w-44 fill-current" viewBox="0 0 100 40">
            <path d="M20,35 Q10,35 10,25 Q10,15 22,15 Q25,8 35,8 Q45,8 48,15 Q55,10 65,12 Q75,15 75,25 Q82,25 82,32 Q82,35 75,35 Z" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
        
        {/* Animated Traveling Detour Diorama */}
        <div className="relative mb-6 flex h-48 w-full max-w-md items-center justify-center sm:h-56">
          {/* Radar Recalibration Rings */}
          <div className="absolute h-44 w-44 rounded-full border border-dashed border-clay/35 sm:h-52 sm:w-52" />
          <div className="absolute h-36 w-36 rounded-full border border-ink/10" />

          {/* SVG Road, Hills & Moving Camper Van Scene */}
          <svg
            className="absolute inset-0 h-full w-full overflow-visible"
            viewBox="0 0 400 200"
            fill="none"
          >
            {/* Mountain Ridge Silhouettes in background */}
            <path
              d="M 20 180 L 90 120 L 160 180 L 230 110 L 310 180 L 380 135 L 420 180"
              stroke="#405446"
              strokeWidth="2"
              className="opacity-30"
              fill="rgba(64,84,70,0.06)"
            />

            {/* Winding Trail Route with Dash Animation */}
            <path
              id="turbulenceTrail"
              d="M 10 160 Q 100 130 190 165 T 390 150"
              stroke="#b95738"
              strokeWidth="3"
              strokeDasharray="8 8"
              className="opacity-60"
              style={{
                strokeDashoffset: 48,
                animation: "mapRouteDash 2.2s linear infinite",
              }}
            />

            {/* Caution/Detour Warning Marker */}
            <g transform="translate(200, 75)">
              <circle
                cx="0"
                cy="0"
                r="18"
                fill="#b95738"
                className="opacity-15 animate-ping"
              />
              <circle cx="0" cy="0" r="14" fill="#b95738" />
              <path
                d="M 0 -7 L 0 2 M 0 6 L 0 7.5"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>

            {/* Traveling Camper Van / Expedition Vehicle navigating the bump */}
            <g
              style={{
                animation: "vanTrailGlide 8s ease-in-out infinite",
              }}
            >
              <g transform="translate(-30, -22)">
                {/* Vehicle Body */}
                <rect x="5" y="6" width="38" height="20" rx="4" fill="#405446" />
                <path d="M 43 14 L 51 14 L 53 26 L 43 26 Z" fill="#405446" />
                {/* Windshield */}
                <path d="M 44 15 L 49 15 L 50 21 L 44 21 Z" fill="#f7f5ef" />
                {/* Side Windows */}
                <rect x="10" y="9" width="10" height="7" rx="1.5" fill="#f7f5ef" />
                <rect x="23" y="9" width="10" height="7" rx="1.5" fill="#f7f5ef" />
                {/* Rooftop Surfboard / Luggage */}
                <rect x="12" y="2" width="24" height="3" rx="1.5" fill="#b95738" />
                {/* Headlight beam */}
                <polygon points="53,22 80,18 80,28 53,24" fill="#e9e2d4" opacity="0.6" />
                {/* Wheels */}
                <circle cx="16" cy="27" r="4.5" fill="#17221d" />
                <circle cx="16" cy="27" r="2" fill="#e9e2d4" />
                <circle cx="42" cy="27" r="4.5" fill="#17221d" />
                <circle cx="42" cy="27" r="2" fill="#e9e2d4" />
              </g>
            </g>
          </svg>

          {/* Central Recalibrating Compass Dial */}
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-paper/95 shadow-md border border-ink/15 backdrop-blur-sm sm:h-28 sm:w-28">
            <span className="absolute top-1 text-[8px] font-bold tracking-widest text-clay">RECALIBRATING</span>
            <div className="absolute inset-2 rounded-full border border-dashed border-clay/40 animate-spin" style={{ animationDuration: "12s" }} />
            
            {/* Oscillating Compass Needle */}
            <div
              className="relative flex h-14 w-2.5 items-center justify-center"
              style={{ animation: "compassWobble 2.5s ease-in-out infinite" }}
            >
              <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[22px] border-b-clay absolute top-0" />
              <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[22px] border-t-ink/60 absolute bottom-0" />
              <div className="z-10 h-2.5 w-2.5 rounded-full bg-sand border-2 border-ink" />
            </div>
          </div>
        </div>

        {/* Status Alert Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-clay/10 px-4 py-1.5 text-xs font-bold tracking-widest text-clay uppercase">
          <span className="h-2 w-2 rounded-full bg-clay animate-ping" />
          <span>EXPEDITION INTERRUPTED • DETOUR REQUIRED</span>
        </div>

        {/* Headline */}
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
          We hit an unexpected detour.
        </h1>

        {/* Description */}
        <p className="mt-4 max-w-lg text-base leading-relaxed text-ink/75 sm:text-lg">
          A temporary turbulence interrupted this route. Don&apos;t worry — your luggage,
          profile, and itinerary are completely safe. Let&apos;s recalibrate the course.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <button
            onClick={onReset}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-clay px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#9e442b] hover:shadow-lg"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 stroke-current fill-none stroke-[2.2]"
            >
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            <span>Recalibrate Trail (Try Again)</span>
          </button>

          <Link
            href="/"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-moss"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 stroke-current fill-none stroke-[2]"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>Return to Safe Base</span>
          </Link>

          <Link
            href="/explore"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-ink/20 bg-paper px-7 py-3.5 text-sm font-bold text-ink transition-all hover:border-ink hover:bg-ink/5"
          >
            <span>Explore Stays</span>
          </Link>
        </div>

        {/* Collapsible Flight Log / Error Diagnostics */}
        {error && (
          <div className="mt-10 w-full max-w-lg border-t border-ink/10 pt-5 text-left">
            <button
              onClick={toggleDetails}
              className="flex w-full items-center justify-between text-xs font-bold text-ink/60 hover:text-clay transition-colors"
            >
              <span>EXPEDITION FLIGHT LOG (DIAGNOSTICS)</span>
              <span>{showDetails ? "▲ Hide" : "▼ Show"}</span>
            </button>

            {showDetails && (
              <div className="mt-3 overflow-hidden rounded-2xl bg-sand/30 border border-ink/10 p-4 text-xs font-mono text-ink/80 max-h-48 overflow-y-auto">
                <p className="font-bold text-clay mb-1">{error.name}: {error.message}</p>
                {error.stack && (
                  <pre className="whitespace-pre-wrap text-[11px] text-ink/60 overflow-x-auto">
                    {error.stack}
                  </pre>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes vanTrailGlide {
          0% {
            transform: translate(20px, 155px) rotate(-6deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translate(200px, 138px) rotate(4deg);
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(370px, 145px) rotate(-3deg);
            opacity: 0;
          }
        }
      `}</style>
    </main>
  );
}

export default ErrorBoundary;
