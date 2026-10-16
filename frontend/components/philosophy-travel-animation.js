"use client";

import React, { useState } from "react";

const STOPS = [
  {
    id: "station1",
    name: "Valley Junction",
    action: "Boarding the vintage timber train",
    quote: "Leaving behind the frantic deadlines of the city for the gentle rocking of the rails.",
    scenery: "Misty pine forest & riverbed",
  },
  {
    id: "station2",
    name: "Pine Viaduct",
    action: "Crossing the stone arched viaduct",
    quote: "No WiFi, no rushed connection. Just the rhythmic clatter of tracks and mountain panoramas.",
    scenery: "Alpine gorge & waterfalls",
  },
  {
    id: "station3",
    name: "Highland Meadow",
    action: "Stopping at the wildflower meadow",
    quote: "The train pauses to let a herd of mountain goats cross. Nobody checks their watch.",
    scenery: "Glacial lakes & meadows",
  },
  {
    id: "station4",
    name: "Sanctuary Terminus",
    action: "Stepping onto the lantern-lit timber platform",
    quote: "Arriving refreshed, unhurried, ready to dwell in quiet architectural stillness.",
    scenery: "Ancient cedar grove",
  },
];

export default function PhilosophyTravelAnimation() {
  const [activeStop, setActiveStop] = useState(1);
  const [transitSpeed, setTransitSpeed] = useState("slow"); // "slow" | "scenic"
  const [isDusk, setIsDusk] = useState(false);

  return (
    <section className="px-[clamp(1.25rem,4vw,4.5rem)] py-20 max-w-[90rem] mx-auto select-none">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold tracking-[.18em] text-moss uppercase block mb-3">
          The Art of Slow Transit
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-ink tracking-[-.04em]">
          The Rhythm of Unhurried Motion
        </h2>
        <p className="text-ink/75 text-sm md:text-base mt-4 leading-relaxed">
          When speed is stripped away, travel transforms into contemplation. Watch the landscape unfold at the natural speed of contemplation.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-ink/10 shadow-xl overflow-hidden transition-all">
        {/* Scenic Railway Diorama Stage */}
        <div 
          className="relative h-64 sm:h-80 w-full overflow-hidden transition-all duration-700"
          style={{
            background: isDusk 
              ? "linear-gradient(180deg, #090d16 0%, #1e1b4b 40%, #451a03 100%)" 
              : "linear-gradient(180deg, #dbeafe 0%, #bfdbfe 40%, #dcfce7 100%)"
          }}
        >
          {/* Alpine Mountain Ranges */}
          <svg className="absolute bottom-16 inset-x-0 w-full h-44 opacity-40" viewBox="0 0 1200 240" preserveAspectRatio="none">
            <polygon points="0,240 180,60 360,200 540,40 720,180 900,50 1080,190 1200,70 1200,240" fill={isDusk ? "#1e293b" : "#475569"} />
            <polygon points="90,240 270,90 450,210 630,70 810,190 990,80 1170,180 1200,240" fill={isDusk ? "#0f172a" : "#334155"} />
          </svg>

          {/* Sun / Moon & Atmospheric elements */}
          {isDusk ? (
            <div className="absolute top-6 left-12 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100/90 shadow-[0_0_20px_rgba(254,240,138,0.5)]" />
              <span className="text-[11px] font-mono font-bold text-amber-200/80">Starlight Transit</span>
            </div>
          ) : (
            <div className="absolute top-6 left-12 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-400 shadow-[0_0_24px_rgba(251,191,36,0.6)]" />
              <span className="text-[11px] font-mono font-bold text-ink/60">Alpine Morning Light</span>
            </div>
          )}

          {/* Micro Moving Objects: High-altitude soaring eagle */}
          <div 
            className="absolute top-5 opacity-60 pointer-events-none"
            style={{ animation: "cloudFloatAcross 36s linear infinite" }}
          >
            <svg viewBox="0 0 26 12" className="w-6 h-3 text-ink/70 fill-current animate-[birdFlap_2.5s_ease-in-out_infinite]">
              <path d="M0 6 Q6 0 13 5 Q20 0 26 6 Q20 3 13 8 Q6 3 0 6 Z" />
            </svg>
          </div>

          {/* Micro Moving Objects: Flying Flock of Birds across mountain sky */}
          <div 
            className="absolute top-11 opacity-75 flex gap-3 pointer-events-none"
            style={{ animation: "cloudFloatAcross 22s linear infinite" }}
          >
            <svg viewBox="0 0 20 10" className="w-5 h-2.5 fill-current text-ink/75 animate-[birdFlap_1.2s_ease-in-out_infinite]">
              <path d="M0 6 Q5 0 10 6 Q15 0 20 6 Q15 4 10 8 Q5 4 0 6 Z" />
            </svg>
            <svg viewBox="0 0 20 10" className="w-3.5 h-2 fill-current text-ink/60 mt-1 animate-[birdFlap_1.4s_ease-in-out_infinite]">
              <path d="M0 6 Q5 0 10 6 Q15 0 20 6 Q15 4 10 8 Q5 4 0 6 Z" />
            </svg>
            <svg viewBox="0 0 20 10" className="w-4 h-2 fill-current text-ink/70 mt-0.5 animate-[birdFlap_1.1s_ease-in-out_infinite]">
              <path d="M0 6 Q5 0 10 6 Q15 0 20 6 Q15 4 10 8 Q5 4 0 6 Z" />
            </svg>
          </div>

          {/* Micro Moving Objects: Drifting Alpine Clouds */}
          {!isDusk && (
            <>
              <div 
                className="absolute top-7 opacity-50 pointer-events-none"
                style={{ animation: "cloudFloatAcross 38s linear infinite" }}
              >
                <svg viewBox="0 0 90 32" className="w-20 h-7 fill-white/80">
                  <path d="M15 25 a12 12 0 0 1 25 -5 a15 15 0 0 1 25 5 z" />
                </svg>
              </div>
              <div 
                className="absolute top-14 opacity-35 pointer-events-none"
                style={{ animation: "cloudFloatAcross 26s linear infinite" }}
              >
                <svg viewBox="0 0 80 28" className="w-16 h-6 fill-white/70">
                  <path d="M10 22 a10 10 0 0 1 20 -4 a14 14 0 0 1 22 4 z" />
                </svg>
              </div>
            </>
          )}

          {/* Micro Moving Objects: Dusk / Starlight Fireflies */}
          {isDusk && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#fef08a]"
                  style={{
                    top: `${35 + (i * 13) % 40}%`,
                    left: `${10 + (i * 17) % 80}%`,
                    animation: `fireflyFloat ${3 + (i % 3)}s ease-in-out infinite`,
                    animationDelay: `${i * 600}ms`
                  }}
                />
              ))}
            </div>
          )}

          {/* Stone Viaduct Arches */}
          <div className="absolute bottom-7 inset-x-0 h-16 flex items-end">
            <svg className="w-full h-14 opacity-90" viewBox="0 0 1200 80" preserveAspectRatio="none">
              <rect x="0" y="0" width="1200" height="12" fill="#78716c" />
              {/* Arches */}
              {[...Array(12)].map((_, i) => (
                <g key={i}>
                  <rect x={i * 100 + 10} y="12" width="80" height="68" fill="#57534e" />
                  <path d={`M ${i * 100 + 20} 80 A 30 30 0 0 1 ${i * 100 + 80} 80 Z`} fill={isDusk ? "#0f172a" : "#bfdbfe"} />
                </g>
              ))}
            </svg>
          </div>

          {/* Rail Track Line */}
          <div className="absolute bottom-19 inset-x-0 h-1.5 bg-[#44403c] border-t border-amber-500/30" />

          {/* Moving Scenic Alpine Train gliding forward across stone viaduct (Locomotive leading to the right) */}
          <div 
            className="absolute bottom-19 flex items-end pointer-events-none"
            style={{
              animation: `trainGlideAcross ${transitSpeed === "slow" ? "18s" : "9s"} linear infinite`
            }}
          >
            {/* Steam puffs rising from chimney (positioned near front chimney on right) */}
            <div className="absolute -top-7 right-4 flex flex-col items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-white/70 animate-ping" />
              <span className="w-3.5 h-3.5 rounded-full bg-white/40 mt-1" />
            </div>

            {/* Vintage Train: Carriage 2 (rear) -> Carriage 1 (mid) -> Locomotive (front) */}
            <svg viewBox="0 0 152 40" className="w-36 sm:w-48 h-9 sm:h-12 drop-shadow-md">
              {/* Carriage 2 (Rear) */}
              <rect x="2" y="8" width="36" height="24" rx="2" fill="#15803d" />
              <rect x="6" y="12" width="7" height="9" rx="1" fill="#fef08a" opacity="0.85" />
              <rect x="16" y="12" width="7" height="9" rx="1" fill="#fef08a" opacity="0.85" />
              <rect x="26" y="12" width="7" height="9" rx="1" fill="#fef08a" opacity="0.85" />

              {/* Coupler 1 */}
              <rect x="38" y="24" width="6" height="3" fill="#1c1917" />

              {/* Carriage 1 (Middle) */}
              <rect x="44" y="8" width="36" height="24" rx="2" fill="#15803d" />
              <rect x="48" y="12" width="7" height="9" rx="1" fill="#fef08a" opacity="0.85" />
              <rect x="58" y="12" width="7" height="9" rx="1" fill="#fef08a" opacity="0.85" />
              <rect x="68" y="12" width="7" height="9" rx="1" fill="#fef08a" opacity="0.85" />

              {/* Coupler 2 */}
              <rect x="80" y="24" width="6" height="3" fill="#1c1917" />

              {/* Locomotive (Leading Front, facing Right) */}
              {/* Locomotive Engineer Cab */}
              <rect x="86" y="8" width="22" height="24" rx="2" fill="#b95738" />
              <rect x="89" y="12" width="9" height="9" rx="1" fill="#fef08a" opacity="0.9" />

              {/* Locomotive Cylindrical Boiler */}
              <path d="M108 14 L134 14 Q138 14 138 22 L138 32 L108 32 Z" fill="#78350f" />
              <line x1="120" y1="14" x2="120" y2="32" stroke="#fbbf24" strokeWidth="1" opacity="0.6" />

              {/* Smokestack / Chimney */}
              <rect x="127" y="3" width="5" height="11" fill="#1c1917" />
              <polygon points="125,3 134,3 132,6 127,6" fill="#1c1917" />

              {/* Cowcatcher (Front Wedge pointing forward right) */}
              <polygon points="137,32 144,32 140,26 137,26" fill="#1c1917" />

              {/* Golden Headlamp at front */}
              <rect x="137" y="20" width="3.5" height="5" rx="1" fill="#fde047" />
              <polygon points="140,22.5 152,16 152,29" fill="#fef08a" opacity="0.45" />

              {/* Turning Train Wheels */}
              <g className={transitSpeed === "slow" ? "animate-[wheelSpin_1.2s_linear_infinite]" : "animate-[wheelSpin_0.6s_linear_infinite]"}>
                {/* Carriage 2 wheels */}
                <circle cx="10" cy="33" r="4.5" fill="#1c1917" stroke="#e7e5e4" strokeWidth="1.5" />
                <circle cx="28" cy="33" r="4.5" fill="#1c1917" stroke="#e7e5e4" strokeWidth="1.5" />
                {/* Carriage 1 wheels */}
                <circle cx="52" cy="33" r="4.5" fill="#1c1917" stroke="#e7e5e4" strokeWidth="1.5" />
                <circle cx="70" cy="33" r="4.5" fill="#1c1917" stroke="#e7e5e4" strokeWidth="1.5" />
                {/* Locomotive driving wheels */}
                <circle cx="96" cy="33" r="4.5" fill="#1c1917" stroke="#e7e5e4" strokeWidth="1.5" />
                <circle cx="112" cy="33" r="4.5" fill="#1c1917" stroke="#e7e5e4" strokeWidth="1.5" />
                <circle cx="128" cy="33" r="4.5" fill="#1c1917" stroke="#e7e5e4" strokeWidth="1.5" />
              </g>
            </svg>
          </div>

          {/* Interactive Controls Bar on Top Right */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            {/* Day / Dusk Toggle */}
            <button
              type="button"
              onClick={() => setIsDusk(!isDusk)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-ink/10 text-ink text-[11px] font-bold hover:bg-white shadow-sm transition active:scale-95"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-clay" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
              </svg>
              <span>{isDusk ? "Starlight" : "Daylight"}</span>
            </button>

            {/* Pace Speed Toggle */}
            <button
              type="button"
              onClick={() => setTransitSpeed(transitSpeed === "slow" ? "scenic" : "slow")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-bold shadow-sm transition active:scale-95 ${
                transitSpeed === "slow"
                  ? "bg-moss text-white border-moss"
                  : "bg-white/90 text-ink border-ink/10"
              }`}
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{transitSpeed === "slow" ? "Unhurried (15 km/h)" : "Scenic Drift"}</span>
            </button>
          </div>
        </div>

        {/* Alpine Railway Stops Grid */}
        <div className="p-6 sm:p-8 bg-paper">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STOPS.map((st, i) => {
              const isCurrent = activeStop === i;
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setActiveStop(i)}
                  className={`p-4 rounded-2xl text-left border transition-all group ${
                    isCurrent
                      ? "bg-white border-moss shadow-md ring-1 ring-moss/20 translate-y-[-2px]"
                      : "bg-sand/20 hover:bg-sand/40 border-ink/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isCurrent ? "bg-moss text-white" : "bg-ink/10 text-ink/60"
                    }`}>
                      Stop 0{i + 1}
                    </span>
                    <span className="text-[10px] text-ink/40 font-mono">
                      Track km {i * 24 + 12}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-ink text-base group-hover:text-moss transition-colors">
                    {st.name}
                  </h4>
                  <p className="text-ink/60 text-xs mt-1 line-clamp-2">
                    {st.action}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Stop Manifesto Quote Card */}
          <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-white border border-ink/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sand/60 text-moss grid place-items-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-moss uppercase tracking-wider">
                    {STOPS[activeStop].scenery}
                  </span>
                  <span className="text-ink/30">•</span>
                  <span className="text-xs font-mono text-ink/50">
                    {STOPS[activeStop].action}
                  </span>
                </div>
                <p className="font-display text-base md:text-lg italic text-ink mt-1 max-w-2xl">
                  &ldquo;{STOPS[activeStop].quote}&rdquo;
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-clay uppercase tracking-wider flex items-center gap-1.5 bg-clay/10 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-clay animate-pulse"></span>
                Slow Transit Philosophy
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
