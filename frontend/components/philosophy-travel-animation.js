"use client";

import React, { useState } from "react";

const STOPS = [
  {
    id: "station1",
    name: "Valley Junction",
    action: "Boarding the vintage timber train",
    quote: "Leaving behind the frantic deadlines of the city for the gentle rocking of the rails.",
    scenery: "Misty pine forest & riverbed",
    elev: "1,200m",
  },
  {
    id: "station2",
    name: "Stone Arch Viaduct",
    action: "Crossing the glacial gorge",
    quote: "No WiFi, no rushed connection. Just the rhythmic clatter of tracks and vast alpine panoramas.",
    scenery: "Glacial canyon & rushing waters",
    elev: "2,150m",
  },
  {
    id: "station3",
    name: "Highland Wildflower Meadow",
    action: "Stopping beside the alpine pass",
    quote: "The train pauses to let a mountain herd cross. In slow travel, nobody checks their watch.",
    scenery: "Glacial streams & high meadows",
    elev: "2,780m",
  },
  {
    id: "station4",
    name: "Sanctuary Terminus",
    action: "Stepping onto the cedar timber platform",
    quote: "Arriving refreshed, unhurried, ready to dwell in quiet architectural stillness.",
    scenery: "Ancient cedar grove & warm hearth",
    elev: "3,100m",
  },
];

const CIRCADIAN_HOURS = [
  { id: "dawn", time: "06:00", label: "Alpine Dawn", sky: "linear-gradient(180deg, #fbcfe8 0%, #fed7aa 40%, #bae6fd 100%)", sunColor: "#fde047", isDark: false },
  { id: "noon", time: "12:00", label: "Glacial Noon", sky: "linear-gradient(180deg, #bae6fd 0%, #e0f2fe 50%, #dcfce7 100%)", sunColor: "#fbbf24", isDark: false },
  { id: "alpenglow", time: "18:00", label: "Alpenglow Dusk", sky: "linear-gradient(180deg, #7c2d12 0%, #c2410c 35%, #fed7aa 100%)", sunColor: "#f97316", isDark: true },
  { id: "starlight", time: "23:00", label: "Starlight Nebula", sky: "linear-gradient(180deg, #090d16 0%, #1e1b4b 50%, #312e81 100%)", sunColor: "#fef08a", isDark: true },
];

export default function PhilosophyTravelAnimation() {
  const [activeStop, setActiveStop] = useState(1);
  const [transitSpeed, setTransitSpeed] = useState("slow"); // "slow" | "scenic"
  const [circadianIdx, setCircadianIdx] = useState(1); // 1 = noon
  const [breathPhase, setBreathPhase] = useState("Inhale");

  const currentHour = CIRCADIAN_HOURS[circadianIdx];
  const isNight = currentHour.isDark;

  return (
    <section className="px-[clamp(1.25rem,4vw,4.5rem)] py-20 w-full mx-auto select-none">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand/60 border border-ink/10 text-xs font-semibold text-moss mb-3 animate-[markerBounce_3s_ease-in-out_infinite]">
          <span className="w-2 h-2 rounded-full bg-moss animate-pulse" />
          <span>Alpine Viaduct Transit • Circadian Orrery</span>
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-ink tracking-[-.04em]">
          The Rhythm of Unhurried Motion
        </h2>
        <p className="text-ink/75 text-sm md:text-base mt-3 leading-relaxed">
          Speed is the enemy of contemplation. Watch the vintage alpine train glide across the glacial valley, shifting as the sun arcs across mountain peaks.
        </p>
      </div>

      {/* Main Panoramic Scenic Frame */}
      <div className="relative rounded-3xl border border-ink/15 shadow-2xl bg-paper overflow-hidden">
        {/* Top Control Bar: Circadian Time Dial */}
        <div className="bg-sand/35 px-6 py-3 border-b border-ink/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono text-ink/70 font-semibold uppercase tracking-wider">
              Circadian Living Arc
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-ink/30" />
            <span className="font-mono text-moss font-bold">{currentHour.time} • {currentHour.label}</span>
          </div>

          {/* Time Dial Selector */}
          <div className="inline-flex rounded-full bg-paper p-1 border border-ink/10 shadow-xs">
            {CIRCADIAN_HOURS.map((hour, idx) => (
              <button
                key={hour.id}
                onClick={() => setCircadianIdx(idx)}
                className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold transition ${
                  circadianIdx === idx
                    ? "bg-moss text-paper shadow-xs"
                    : "text-ink/60 hover:text-ink"
                }`}
              >
                {hour.time}
              </button>
            ))}
          </div>
        </div>

        {/* Panoramic Mountain Pass Diorama */}
        <div
          className="relative h-72 sm:h-96 w-full overflow-hidden transition-all duration-1000"
          style={{ background: currentHour.sky }}
        >
          {/* Alpine Mountain Ranges Silhouettes */}
          <svg className="absolute bottom-20 inset-x-0 w-full h-52 opacity-45" viewBox="0 0 1200 240" preserveAspectRatio="none">
            <polygon points="0,240 180,50 360,190 540,30 720,170 900,40 1080,180 1200,60 1200,240" fill={isNight ? "#0f172a" : "#334155"} />
            <polygon points="90,240 270,80 450,200 630,60 810,180 990,70 1170,170 1200,240" fill={isNight ? "#1e293b" : "#475569"} />
          </svg>

          {/* Sun / Moon Orb with Celestial Arc */}
          <div
            className="absolute transition-all duration-1000 pointer-events-none flex items-center gap-2.5"
            style={{
              top: circadianIdx === 1 ? "12%" : "20%",
              left: `${15 + circadianIdx * 24}%`,
            }}
          >
            <div
              className="w-10 h-10 rounded-full shadow-[0_0_28px_rgba(251,191,36,0.7)] transition-all"
              style={{ backgroundColor: currentHour.sunColor }}
            />
            {isNight && (
              <div className="hidden sm:block text-[10px] font-mono font-bold text-amber-200/80 bg-black/40 px-2 py-0.5 rounded-full">
                Starlight Transit
              </div>
            )}
          </div>

          {/* Micro Moving Objects: High-altitude soaring eagle */}
          <div
            className="absolute top-6 opacity-60 pointer-events-none"
            style={{ animation: "cloudFloatAcross 36s linear infinite" }}
          >
            <svg viewBox="0 0 26 12" className="w-6 h-3 text-ink/70 fill-current animate-[birdFlap_2.5s_ease-in-out_infinite]">
              <path d="M0 6 Q6 0 13 5 Q20 0 26 6 Q20 3 13 8 Q6 3 0 6 Z" />
            </svg>
          </div>

          {/* Micro Moving Objects: Flock of Birds */}
          <div
            className="absolute top-12 opacity-70 flex gap-3 pointer-events-none"
            style={{ animation: "cloudFloatAcross 22s linear infinite" }}
          >
            <svg viewBox="0 0 20 10" className="w-4 h-2 fill-current text-ink/70 animate-[birdFlap_1.2s_ease-in-out_infinite]">
              <path d="M0 6 Q5 0 10 6 Q15 0 20 6 Q15 4 10 8 Q5 4 0 6 Z" />
            </svg>
            <svg viewBox="0 0 20 10" className="w-3.5 h-1.5 fill-current text-ink/60 mt-1 animate-[birdFlap_1.4s_ease-in-out_infinite]">
              <path d="M0 6 Q5 0 10 6 Q15 0 20 6 Q15 4 10 8 Q5 4 0 6 Z" />
            </svg>
          </div>

          {/* Glacial River Gorge beneath Viaduct */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-[#0e7490]/80 overflow-hidden border-t border-cyan-300/30">
            {/* Animated Flowing Water Ripples */}
            <div className="w-[200%] h-full flex opacity-60 animate-[riverFlow_3s_linear_infinite]">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="flex-1 flex flex-col justify-around py-1">
                  <div className="w-12 h-0.5 rounded-full bg-cyan-100/60" />
                  <div className="w-8 h-0.5 rounded-full bg-cyan-200/40 ml-4" />
                </div>
              ))}
            </div>
            {/* Glacial River Label */}
            <span className="absolute bottom-2 left-6 text-[10px] font-mono tracking-widest text-cyan-100/80 font-bold uppercase">
              Glacial River Run • 1,200m Gorge
            </span>
          </div>

          {/* Ancient Stone Viaduct Arches spanning the chasm */}
          <div className="absolute bottom-12 inset-x-0 h-24 flex items-end pointer-events-none">
            <svg className="w-full h-20 opacity-95" viewBox="0 0 1200 90" preserveAspectRatio="none">
              <rect x="0" y="0" width="1200" height="14" fill="#57534e" />
              {/* Arches */}
              {[...Array(10)].map((_, i) => (
                <g key={i}>
                  <rect x={i * 120 + 15} y="14" width="90" height="76" fill="#44403c" />
                  <path d={`M ${i * 120 + 25} 90 A 35 35 0 0 1 ${i * 120 + 95} 90 Z`} fill={isNight ? "#090d16" : "#0e7490"} />
                </g>
              ))}
            </svg>
          </div>

          {/* Rail Track Line */}
          <div className="absolute bottom-32 inset-x-0 h-1.5 bg-[#292524] border-t border-amber-500/40" />

          {/* Lone Wayfarer / Hiker on Cliff Overlook (Left Forefront) */}
          <div className="absolute bottom-30 left-6 sm:left-12 z-10 flex flex-col items-center pointer-events-none">
            <svg viewBox="0 0 24 36" className="w-6 h-9 drop-shadow-md">
              {/* Sitting on stone */}
              <ellipse cx="12" cy="34" rx="8" ry="3" fill="#292524" />
              {/* Head */}
              <circle cx="12" cy="10" r="3.5" fill="#d97706" />
              {/* Broad Brim Mountain Hat */}
              <ellipse cx="12" cy="8" rx="6" ry="1.5" fill="#78350f" />
              {/* Body / Backpack */}
              <rect x="8" y="14" width="8" height="12" rx="2" fill="#15803d" />
              <rect x="5" y="15" width="4" height="9" rx="1.5" fill="#b45309" />
              {/* Walking Staff */}
              <line x1="17" y1="6" x2="18" y2="34" stroke="#78350f" strokeWidth="1.5" />
            </svg>
            <span className="text-[9px] font-mono text-sand font-bold tracking-tight bg-black/50 px-1 rounded mt-0.5">
              Wayfarer Vista
            </span>
          </div>

          {/* Forward Alpine Train Gliding Across Viaduct (Locomotive leading to the right) */}
          <div
            className="absolute bottom-32 flex items-end pointer-events-none"
            style={{
              animation: `trainGlideAcross ${transitSpeed === "slow" ? "18s" : "9s"} linear infinite`,
            }}
          >
            {/* Steam puffs rising from chimney on right */}
            <div className="absolute -top-7 right-4 flex flex-col items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-white/70 animate-ping" />
              <span className="w-3.5 h-3.5 rounded-full bg-white/40 mt-1" />
            </div>

            {/* Vintage Train: Carriage 2 (rear) -> Carriage 1 (mid) -> Locomotive (front) */}
            <svg viewBox="0 0 152 40" className="w-36 sm:w-48 h-9 sm:h-12 drop-shadow-md">
              {/* Carriage 2 */}
              <rect x="2" y="8" width="36" height="24" rx="2" fill="#15803d" />
              <rect x="6" y="12" width="7" height="9" rx="1" fill="#fef08a" opacity="0.85" />
              <rect x="16" y="12" width="7" height="9" rx="1" fill="#fef08a" opacity="0.85" />
              <rect x="26" y="12" width="7" height="9" rx="1" fill="#fef08a" opacity="0.85" />

              <rect x="38" y="24" width="6" height="3" fill="#1c1917" />

              {/* Carriage 1 */}
              <rect x="44" y="8" width="36" height="24" rx="2" fill="#15803d" />
              <rect x="48" y="12" width="7" height="9" rx="1" fill="#fef08a" opacity="0.85" />
              <rect x="58" y="12" width="7" height="9" rx="1" fill="#fef08a" opacity="0.85" />
              <rect x="68" y="12" width="7" height="9" rx="1" fill="#fef08a" opacity="0.85" />

              <rect x="80" y="24" width="6" height="3" fill="#1c1917" />

              {/* Locomotive (Front, facing right) */}
              <rect x="86" y="8" width="22" height="24" rx="2" fill="#b95738" />
              <rect x="89" y="12" width="9" height="9" rx="1" fill="#fef08a" opacity="0.9" />

              <path d="M108 14 L134 14 Q138 14 138 22 L138 32 L108 32 Z" fill="#78350f" />
              <line x1="120" y1="14" x2="120" y2="32" stroke="#fbbf24" strokeWidth="1" opacity="0.6" />

              <rect x="127" y="3" width="5" height="11" fill="#1c1917" />
              <polygon points="125,3 134,3 132,6 127,6" fill="#1c1917" />

              <polygon points="137,32 144,32 140,26 137,26" fill="#1c1917" />

              {/* Golden Headlamp */}
              <rect x="137" y="20" width="3.5" height="5" rx="1" fill="#fde047" />
              <polygon points="140,22.5 152,16 152,29" fill="#fef08a" opacity="0.45" />

              {/* Turning Wheels */}
              <g className={transitSpeed === "slow" ? "animate-[wheelSpin_1.2s_linear_infinite]" : "animate-[wheelSpin_0.6s_linear_infinite]"}>
                <circle cx="10" cy="33" r="4.5" fill="#1c1917" stroke="#e7e5e4" strokeWidth="1.5" />
                <circle cx="28" cy="33" r="4.5" fill="#1c1917" stroke="#e7e5e4" strokeWidth="1.5" />
                <circle cx="52" cy="33" r="4.5" fill="#1c1917" stroke="#e7e5e4" strokeWidth="1.5" />
                <circle cx="70" cy="33" r="4.5" fill="#1c1917" stroke="#e7e5e4" strokeWidth="1.5" />
                <circle cx="96" cy="33" r="4.5" fill="#1c1917" stroke="#e7e5e4" strokeWidth="1.5" />
                <circle cx="112" cy="33" r="4.5" fill="#1c1917" stroke="#e7e5e4" strokeWidth="1.5" />
                <circle cx="128" cy="33" r="4.5" fill="#1c1917" stroke="#e7e5e4" strokeWidth="1.5" />
              </g>
            </svg>
          </div>
        </div>

        {/* Lower Dashboard: Slow Travel Breath Pacer & Station Logs */}
        <div className="bg-sand/20 p-6 sm:p-8 border-t border-ink/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Mindfulness Breath Pacer Widget */}
          <div className="lg:col-span-5 bg-paper p-5 sm:p-6 rounded-2xl border border-ink/10 shadow-sm flex items-center gap-5">
            {/* Concentric Breath Ring */}
            <div className="relative w-16 h-16 rounded-full border-2 border-moss/30 grid place-items-center shrink-0">
              <div className="w-12 h-12 rounded-full bg-moss/15 animate-[breathPulse_4s_ease-in-out_infinite]" />
              <span className="absolute text-[9px] font-mono font-bold text-moss uppercase tracking-wider">
                Breathe
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-moss block mb-1">
                Cadence of Slow Travel
              </span>
              <p className="text-xs text-ink/75 leading-relaxed">
                4s Inhale • 2s Stillness • 4s Exhale. Synchronize your breathing to the rhythm of the mountain transit.
              </p>

              {/* Transit Cadence Toggle */}
              <div className="flex items-center gap-2 mt-3 text-[11px] font-bold">
                <span className="text-ink/60">Transit Pace:</span>
                <button
                  onClick={() => setTransitSpeed("slow")}
                  className={`px-2.5 py-0.5 rounded-full transition ${
                    transitSpeed === "slow"
                      ? "bg-moss text-paper shadow-xs"
                      : "text-ink/60 hover:text-ink bg-sand/50"
                  }`}
                >
                  Unhurried (18s)
                </button>
                <button
                  onClick={() => setTransitSpeed("scenic")}
                  className={`px-2.5 py-0.5 rounded-full transition ${
                    transitSpeed === "scenic"
                      ? "bg-clay text-paper shadow-xs"
                      : "text-ink/60 hover:text-ink bg-sand/50"
                  }`}
                >
                  Scenic Cruise (9s)
                </button>
              </div>
            </div>
          </div>

          {/* Station Logs Selector */}
          <div className="lg:col-span-7 flex flex-col gap-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {STOPS.map((stop, idx) => (
                <button
                  key={stop.id}
                  onClick={() => setActiveStop(idx)}
                  className={`p-3 rounded-xl border text-left transition ${
                    activeStop === idx
                      ? "bg-paper border-moss shadow-sm"
                      : "bg-paper/60 border-ink/10 hover:bg-paper"
                  }`}
                >
                  <span className="text-[10px] font-mono text-moss font-bold block">0{idx + 1}. {stop.elev}</span>
                  <span className="font-display font-bold text-xs text-ink truncate block mt-0.5">
                    {stop.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Station Story Card */}
            <div className="bg-paper p-4 rounded-xl border border-ink/10 text-xs flex items-center justify-between gap-4 mt-1">
              <div>
                <span className="font-bold text-clay uppercase tracking-wider text-[10px] block">
                  {STOPS[activeStop].action}
                </span>
                <p className="text-ink/80 italic mt-0.5">
                  "{STOPS[activeStop].quote}"
                </p>
              </div>
              <span className="hidden sm:inline-block font-mono text-[11px] text-ink/50 shrink-0">
                {STOPS[activeStop].scenery}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
