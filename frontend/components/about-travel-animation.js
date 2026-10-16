"use client";

import React, { useState } from "react";

const WAYPOINTS = [
  {
    id: "departure",
    title: "City Departure",
    subtitle: "Leaving the noise & schedule behind",
    coord: "31°12'N • 77°10'E",
    detail: "Trading notification chimes for the sound of gravel beneath tires and the scent of wild cedar.",
    terrain: "Alpine foothills",
  },
  {
    id: "valley",
    title: "The Valley Detour",
    subtitle: "Bypassing expressways for old mountain paths",
    coord: "31°45'N • 77°22'E",
    detail: "Stopping at roadside wooden stalls for stone-crushed spiced tea, local plums, and unhurried conversation.",
    terrain: "Pine canopy roads",
  },
  {
    id: "river",
    title: "River Crossing",
    subtitle: "Glacial streams & suspension bridges",
    coord: "32°08'N • 77°14'E",
    detail: "Windows rolled down, cool mountain spray in the air. Time slows to the rhythm of melting snow.",
    terrain: "Glacial riverbanks",
  },
  {
    id: "sanctuary",
    title: "Sanctuary Arrival",
    subtitle: "A timber hearth warm with cedar smoke",
    coord: "32°14'N • 77°11'E",
    detail: "Unpacking boots, lighting the woodstove, and realizing you don't need to be anywhere else for days.",
    terrain: "Forest sanctuary",
  },
];

export default function AboutTravelAnimation() {
  const [activeWaypoint, setActiveWaypoint] = useState(1);
  const [journeyPace, setJourneyPace] = useState("unhurried"); // "unhurried" | "scenic"
  const [timeOfDay, setTimeOfDay] = useState("golden"); // "morning" | "golden" | "dusk"

  const skyGradients = {
    morning: "linear-gradient(180deg, #e0f2fe 0%, #bae6fd 45%, #dcfce7 100%)",
    golden: "linear-gradient(180deg, #fef3c7 0%, #fed7aa 45%, #e9d5ff 100%)",
    dusk: "linear-gradient(180deg, #1e1b4b 0%, #312e81 40%, #7c2d12 100%)",
  };

  const isNight = timeOfDay === "dusk";

  return (
    <section className="px-[clamp(1.25rem,4vw,4.5rem)] py-20 max-w-[90rem] mx-auto select-none">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold tracking-[.18em] text-clay uppercase block mb-3">
          The Journey Between Places
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-ink tracking-[-.04em]">
          Traveling as an Act of Discovery
        </h2>
        <p className="text-ink/75 text-sm md:text-base mt-4 leading-relaxed">
          At WanderLust, the journey is never an obstacle to overcome—it is the very threshold where stillness begins.
        </p>
      </div>

      {/* Main Interactive Travel Scene Card */}
      <div className="bg-white rounded-3xl border border-ink/10 shadow-xl overflow-hidden transition-all">
        {/* Sky & Road Stage */}
        <div 
          className="relative h-64 sm:h-72 w-full overflow-hidden transition-all duration-700"
          style={{ background: skyGradients[timeOfDay] }}
        >
          {/* Mountains Silhouette in Background */}
          <svg className="absolute bottom-10 inset-x-0 w-full h-36 opacity-35" viewBox="0 0 1200 200" preserveAspectRatio="none">
            <polygon points="0,200 120,80 260,170 420,40 580,150 740,60 900,160 1060,50 1200,180 1200,200" fill={isNight ? "#0f172a" : "#78350f"} />
            <polygon points="60,200 200,100 360,180 520,70 680,160 840,80 1000,170 1140,90 1200,200" fill={isNight ? "#1e1b4b" : "#451a03"} />
          </svg>

          {/* Drifting Clouds / Stars */}
          {isNight ? (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(18)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                  style={{
                    top: `${10 + (i * 17) % 55}%`,
                    left: `${5 + (i * 23) % 90}%`,
                    animationDelay: `${(i * 350) % 2000}ms`
                  }}
                />
              ))}
              {/* Crescent Moon */}
              <div className="absolute top-6 right-12 w-9 h-9 rounded-full shadow-[inset_3px_2px_0_0_#fde68a] transform -rotate-12" />
            </div>
          ) : (
            <div className="absolute inset-0 pointer-events-none">
              {/* Hot Air Balloon floating */}
              <div className="absolute top-7 left-[15%] sm:left-[22%] animate-[balloonBob_5s_ease-in-out_infinite] flex flex-col items-center">
                <svg viewBox="0 0 40 55" className="w-8 h-11 text-clay drop-shadow-md">
                  <path d="M20 2 C9 2 2 11 2 22 C2 33 14 43 18 48 L22 48 C26 43 38 33 38 22 C38 11 31 2 20 2 Z" fill="#b95738" />
                  <path d="M14 2 C9 12 9 32 17 48" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.6" />
                  <path d="M26 2 C31 12 31 32 23 48" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.6" />
                  <rect x="17" y="50" width="6" height="5" rx="1" fill="#78350f" />
                  <line x1="17" y1="48" x2="17" y2="50" stroke="#78350f" strokeWidth="1" />
                  <line x1="23" y1="48" x2="23" y2="50" stroke="#78350f" strokeWidth="1" />
                </svg>
              </div>

              {/* Gentle Fluffy Clouds */}
              <div className="absolute top-10 right-[25%] opacity-70 animate-[cloudFloat_16s_ease-in-out_infinite]">
                <svg viewBox="0 0 100 40" className="w-20 h-8 fill-white/80">
                  <path d="M20 30 a16 16 0 0 1 30 -6 a18 18 0 0 1 30 6 z" />
                </svg>
              </div>
            </div>
          )}

          {/* Dotted Flight / Journey Trail Line across the sky */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 240" preserveAspectRatio="none">
            <path 
              d="M 50 170 Q 250 80, 500 130 T 950 80" 
              fill="none" 
              stroke={isNight ? "#fbbf24" : "#b95738"} 
              strokeWidth="2.5" 
              strokeDasharray="6 6"
              className="opacity-60"
            />
          </svg>

          {/* Traveling Camper Van / Expedition Vehicle on the Road */}
          <div className="absolute bottom-3 inset-x-0 h-10 border-t border-black/20 flex items-center bg-[#292524] overflow-hidden">
            {/* Animated Road Dashes */}
            <div className={`flex w-[200%] h-1 items-center ${journeyPace === "unhurried" ? "animate-[roadMove_4s_linear_infinite]" : "animate-[roadMove_2s_linear_infinite]"}`}>
              {[...Array(30)].map((_, i) => (
                <div key={i} className="flex-1 flex justify-center">
                  <div className="w-8 sm:w-12 h-1 rounded-full bg-sand/70" />
                </div>
              ))}
            </div>

            {/* Traveling Van */}
            <div className="absolute left-[38%] sm:left-[45%] bottom-1 animate-[vanBob_1.8s_ease-in-out_infinite] flex items-center">
              {/* Dust puffs behind */}
              <div className="mr-1 flex flex-col gap-0.5 opacity-60">
                <span className="w-1.5 h-1.5 rounded-full bg-sand/80 animate-ping" />
                <span className="w-2 h-2 rounded-full bg-sand/60" />
              </div>

              {/* Camper Van Body (SVG) */}
              <svg viewBox="0 0 80 44" className="w-16 sm:w-20 h-9 sm:h-11">
                {/* Luggage on Roof */}
                <rect x="22" y="3" width="30" height="4" rx="2" fill="#78350f" />
                <rect x="25" y="0" width="16" height="4" rx="1" fill="#b95738" />
                <line x1="28" y1="0" x2="28" y2="7" stroke="#fbbf24" strokeWidth="1" />
                <line x1="36" y1="0" x2="36" y2="7" stroke="#fbbf24" strokeWidth="1" />
                {/* Van Roof */}
                <path d="M12 12 Q20 7 50 7 Q68 7 74 15 L76 22 L10 22 Z" fill="#f7f5ef" stroke="#444" strokeWidth="1.2" />
                {/* Windshield & Windows */}
                <path d="M52 10 L68 15 L66 22 L50 22 Z" fill="#93c5fd" opacity="0.8" />
                <rect x="34" y="10" width="13" height="11" rx="1.5" fill="#93c5fd" opacity="0.8" />
                <rect x="18" y="10" width="13" height="11" rx="1.5" fill="#93c5fd" opacity="0.8" />
                {/* Lower Van Body */}
                <path d="M8 22 L76 22 L77 34 Q77 36 74 36 L12 36 Q8 36 8 32 Z" fill={isNight ? "#0284c7" : "#15803d"} />
                {/* Headlight */}
                <circle cx="75" cy="27" r="2.5" fill="#fde047" />
                {isNight && (
                  <polygon points="77,27 120,20 120,38" fill="url(#beam)" opacity="0.3" />
                )}
                {/* Wheels */}
                <g className="animate-[wheelSpin_0.8s_linear_infinite]">
                  <circle cx="22" cy="36" r="6.5" fill="#1c1917" stroke="#e7e5e4" strokeWidth="2.5" />
                  <circle cx="22" cy="36" r="2.5" fill="#a8a29e" />
                </g>
                <g className="animate-[wheelSpin_0.8s_linear_infinite]">
                  <circle cx="62" cy="36" r="6.5" fill="#1c1917" stroke="#e7e5e4" strokeWidth="2.5" />
                  <circle cx="62" cy="36" r="2.5" fill="#a8a29e" />
                </g>
              </svg>
            </div>
          </div>

          {/* Time of Day & Pace Controls Overlay */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            {/* Atmosphere Selector */}
            <div className="flex bg-white/90 backdrop-blur-md rounded-full p-1 border border-ink/10 shadow-sm text-[10px] font-bold">
              <button
                type="button"
                onClick={() => setTimeOfDay("morning")}
                className={`px-2.5 py-1 rounded-full transition ${timeOfDay === "morning" ? "bg-ink text-white" : "text-ink/70 hover:text-ink"}`}
              >
                Morning
              </button>
              <button
                type="button"
                onClick={() => setTimeOfDay("golden")}
                className={`px-2.5 py-1 rounded-full transition ${timeOfDay === "golden" ? "bg-clay text-white" : "text-ink/70 hover:text-ink"}`}
              >
                Golden
              </button>
              <button
                type="button"
                onClick={() => setTimeOfDay("dusk")}
                className={`px-2.5 py-1 rounded-full transition ${timeOfDay === "dusk" ? "bg-[#1e1b4b] text-white" : "text-ink/70 hover:text-ink"}`}
              >
                Night
              </button>
            </div>

            {/* Pace Toggle */}
            <button
              type="button"
              onClick={() => setJourneyPace(journeyPace === "unhurried" ? "scenic" : "unhurried")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-ink/10 text-ink text-[11px] font-bold hover:bg-white shadow-sm transition active:scale-95"
              title="Toggle expedition pace"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-clay" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{journeyPace === "unhurried" ? "Slow Pace" : "Scenic Pace"}</span>
            </button>
          </div>
        </div>

        {/* Interactive Waypoints Track */}
        <div className="p-6 sm:p-8 bg-paper">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {WAYPOINTS.map((wp, i) => {
              const isActive = activeWaypoint === i;
              return (
                <button
                  key={wp.id}
                  type="button"
                  onClick={() => setActiveWaypoint(i)}
                  className={`p-4 rounded-2xl text-left border transition-all text-sm group ${
                    isActive
                      ? "bg-white border-clay shadow-md ring-1 ring-clay/20 translate-y-[-2px]"
                      : "bg-sand/20 hover:bg-sand/40 border-ink/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isActive ? "bg-clay text-white" : "bg-ink/10 text-ink/60"
                    }`}>
                      Stage 0{i + 1}
                    </span>
                    <span className="text-[10px] font-mono text-ink/40">
                      {wp.coord.split("•")[0]}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-ink text-base group-hover:text-clay transition-colors">
                    {wp.title}
                  </h4>
                  <p className="text-ink/60 text-xs mt-1 line-clamp-2">
                    {wp.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Waypoint Expanded Detail Card */}
          <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-white border border-ink/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sand/60 text-clay grid place-items-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-clay uppercase tracking-wider">
                    {WAYPOINTS[activeWaypoint].terrain}
                  </span>
                  <span className="text-ink/30">•</span>
                  <span className="text-xs font-mono text-ink/50">
                    GPS: {WAYPOINTS[activeWaypoint].coord}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-ink mt-0.5">
                  {WAYPOINTS[activeWaypoint].title}
                </h3>
                <p className="text-ink/75 text-sm mt-1 max-w-2xl">
                  {WAYPOINTS[activeWaypoint].detail}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-moss uppercase tracking-wider flex items-center gap-1.5 bg-moss/10 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Slow Trail Verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
