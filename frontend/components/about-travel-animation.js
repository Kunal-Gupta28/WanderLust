"use client";

import React, { useState, useEffect } from "react";

const MILESTONES = [
  {
    id: "genesis",
    year: "2021",
    name: "The First 12 Cabins",
    location: "Solang Valley, Himalayas",
    coord: "31°14'N • 77°10'E",
    elev: "2,480m",
    x: 18, // percentage across map
    y: 72, // percentage down map
    story: "WanderLust began with an intimate collection of twelve hand-built cedar cabins hidden along an unmapped Himalayan sheep trail.",
    sketchType: "aframe",
    badge: "Genesis Camp",
  },
  {
    id: "ridge",
    year: "2023",
    name: "The High Pine Ridge",
    location: "Kinnaur Alpine Slopes",
    coord: "31°42'N • 77°28'E",
    elev: "3,140m",
    x: 44,
    y: 38,
    story: "Expanding beyond roads: we partnered with multi-generational apple orchardists to restore forgotten timber watchtowers.",
    sketchType: "watchtower",
    badge: "Alpine Expansion",
  },
  {
    id: "river",
    year: "2024",
    name: "Glacial River Sanctuaries",
    location: "Tirthan River Basin",
    coord: "32°04'N • 77°16'E",
    elev: "2,150m",
    x: 68,
    y: 62,
    story: "Introducing waterside stone retreats where the soothing sound of cold glacial rivers replaces alarms and email notifications.",
    sketchType: "stonehouse",
    badge: "Waterside Craft",
  },
  {
    id: "global",
    year: "2026",
    name: "Global Sanctuary Collective",
    location: "32 Countries Worldwide",
    coord: "32°22'N • 77°12'E",
    elev: "1,920m",
    x: 88,
    y: 28,
    story: "Today, over 930 architectural sanctuaries stand united by one quiet ethos: restorative stillness, honest craft, and deep respect for the land.",
    sketchType: "observatory",
    badge: "Today's Map",
  },
];

export default function AboutTravelAnimation() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [mapStyle, setMapStyle] = useState("contour"); // "contour" | "elevation"

  // Auto-tour through the heritage milestones
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % MILESTONES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeMilestone = MILESTONES[activeIdx];

  return (
    <section className="px-[clamp(1.25rem,4vw,4.5rem)] py-20 max-w-[90rem] mx-auto select-none">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand/60 border border-ink/10 text-xs font-semibold text-clay mb-3 animate-[markerBounce_3s_ease-in-out_infinite]">
          <span className="w-2 h-2 rounded-full bg-clay animate-pulse" />
          <span>Topographical Field Map • Est. 2021</span>
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-ink tracking-[-.04em]">
          Cartography of Quiet Places
        </h2>
        <p className="text-ink/75 text-sm md:text-base mt-3 leading-relaxed">
          WanderLust was mapped not by city boundaries, but by elevation, morning light, and acoustic silence. Trace our four landmark expedition milestones.
        </p>
      </div>

      {/* Main Topographical Expedition Desk */}
      <div className="relative rounded-3xl border border-ink/15 shadow-2xl bg-[#faf6ed] overflow-hidden">
        {/* Desk Header Tools Bar */}
        <div className="bg-[#f2ece0] px-6 py-3 border-b border-ink/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-mono text-ink/70 font-semibold uppercase tracking-wider">
              Survey Chart: Solang to Global Ridges
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-ink/30" />
            <span className="hidden sm:inline-block font-mono text-clay">Scale 1:25,000</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper border border-ink/10 text-ink text-[11px] font-bold hover:bg-white transition active:scale-95 shadow-sm"
            >
              {isPlaying ? (
                <>
                  <svg className="w-3 h-3 text-clay fill-current" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                  <span>Pause Tour</span>
                </>
              ) : (
                <>
                  <svg className="w-3 h-3 text-moss fill-current" viewBox="0 0 24 24">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                  <span>Auto-Trace Journey</span>
                </>
              )}
            </button>

            <button
              onClick={() => setMapStyle(mapStyle === "contour" ? "elevation" : "contour")}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium border border-ink/10 text-ink/70 hover:text-ink hover:bg-paper transition"
            >
              {mapStyle === "contour" ? "Contours" : "Relief Grids"}
            </button>
          </div>
        </div>

        {/* Map Canvas */}
        <div className="relative h-[380px] sm:h-[440px] w-full bg-[#f8f4ea] overflow-hidden">
          {/* Subtle Latitude / Longitude Grid */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg className="w-full h-full" width="100%" height="100%">
              <defs>
                <pattern id="mapGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#78350f" strokeWidth="0.5" strokeDasharray="2 3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#mapGrid)" />
            </svg>
          </div>

          {/* Topographical Contour Curves */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 500" preserveAspectRatio="none">
            {/* Mountain Ridges Contour Lines */}
            <path
              d="M -50 480 Q 200 400 350 460 T 700 420 T 1050 480"
              fill="none"
              stroke="#b95738"
              strokeWidth="1.2"
              strokeOpacity="0.25"
            />
            <path
              d="M -50 420 Q 180 320 380 390 T 750 340 T 1050 410"
              fill="none"
              stroke="#b95738"
              strokeWidth="1.2"
              strokeOpacity="0.3"
            />
            <path
              d="M -50 350 Q 150 250 400 310 T 780 260 T 1050 320"
              fill="none"
              stroke="#b95738"
              strokeWidth="1.2"
              strokeOpacity="0.35"
            />
            <path
              d="M -50 270 Q 130 180 430 220 T 800 170 T 1050 240"
              fill="none"
              stroke="#b95738"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            <path
              d="M 50 160 Q 220 90 450 140 T 840 90 T 1050 150"
              fill="none"
              stroke="#78350f"
              strokeWidth="1"
              strokeOpacity="0.3"
            />
            {/* High Peak Rings */}
            <ellipse cx="440" cy="190" rx="90" ry="40" fill="none" stroke="#b95738" strokeWidth="1" strokeOpacity="0.35" />
            <ellipse cx="440" cy="190" rx="45" ry="20" fill="none" stroke="#b95738" strokeWidth="1.2" strokeOpacity="0.45" />
            <circle cx="440" cy="190" r="2" fill="#b95738" opacity="0.6" />
            <text x="448" y="193" fill="#b95738" fontSize="10" fontFamily="monospace" opacity="0.6">▲ Peak 3,420m</text>

            <ellipse cx="880" cy="140" rx="70" ry="32" fill="none" stroke="#15803d" strokeWidth="1" strokeOpacity="0.35" />
            <ellipse cx="880" cy="140" rx="35" ry="16" fill="none" stroke="#15803d" strokeWidth="1.2" strokeOpacity="0.45" />

            {/* Dotted Expedition Journey Trail connecting all 4 waypoints */}
            <path
              d="M 180 360 Q 300 240 440 190 T 680 310 T 880 140"
              fill="none"
              stroke="#b95738"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              className="animate-[mapRouteDash_2.5s_linear_infinite]"
            />
          </svg>

          {/* Interactive Vintage Brass Surveyor's Compass (Top Left) */}
          <div className="absolute top-4 left-4 z-10 bg-[#faf6ed]/90 backdrop-blur-sm p-3 rounded-2xl border border-ink/10 shadow-md pointer-events-none flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-clay/60 bg-[#fffdfa] shadow-inner relative grid place-items-center">
              {/* Compass Cardinal Marks */}
              <span className="absolute top-0.5 text-[8px] font-bold text-clay font-mono">N</span>
              <span className="absolute bottom-0.5 text-[8px] font-bold text-ink/40 font-mono">S</span>
              <span className="absolute left-1 text-[8px] font-bold text-ink/40 font-mono">W</span>
              <span className="absolute right-1 text-[8px] font-bold text-ink/40 font-mono">E</span>
              {/* Wobbling Magnetic Needle */}
              <div className="w-1 h-9 animate-[compassWobble_4s_ease-in-out_infinite] relative">
                <div className="w-full h-1/2 bg-clay rounded-t-sm" />
                <div className="w-full h-1/2 bg-ink/40 rounded-b-sm" />
              </div>
            </div>
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-moss font-bold">Expedition Heading</span>
              <span className="font-mono text-xs text-ink font-semibold">{activeMilestone.coord}</span>
            </div>
          </div>

          {/* Gliding Cartographer's Magnifying Loupe hovering over the active milestone */}
          <div
            className="absolute z-20 pointer-events-none transition-all duration-700 ease-out"
            style={{
              left: `${activeMilestone.x}%`,
              top: `${activeMilestone.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Loupe Outer Ring & Handle */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-[#b45309] bg-[#fffdfa]/95 shadow-[0_12px_32px_rgba(120,53,15,0.25)] backdrop-blur-xs flex flex-col items-center justify-center p-2">
              {/* Loupe Brass Screws & Ticks */}
              <div className="absolute inset-0 rounded-full border border-[#f59e0b]/50 pointer-events-none" />

              {/* Architectural Sketch inside Loupe */}
              <div className="w-12 h-10 text-clay flex items-center justify-center">
                {activeMilestone.sketchType === "aframe" && (
                  <svg viewBox="0 0 40 35" className="w-full h-full fill-none stroke-current stroke-[1.8]">
                    <polygon points="20,2 4,33 36,33" />
                    <line x1="20" y1="2" x2="20" y2="33" />
                    <line x1="12" y1="18" x2="28" y2="18" />
                    <rect x="16" y="22" width="8" height="11" fill="currentColor" fillOpacity="0.2" />
                  </svg>
                )}
                {activeMilestone.sketchType === "watchtower" && (
                  <svg viewBox="0 0 40 35" className="w-full h-full fill-none stroke-current stroke-[1.8]">
                    <rect x="12" y="8" width="16" height="25" />
                    <polygon points="8,8 20,2 32,8" />
                    <rect x="16" y="14" width="8" height="6" fill="currentColor" fillOpacity="0.2" />
                    <line x1="12" y1="24" x2="28" y2="24" />
                  </svg>
                )}
                {activeMilestone.sketchType === "stonehouse" && (
                  <svg viewBox="0 0 40 35" className="w-full h-full fill-none stroke-current stroke-[1.8]">
                    <polygon points="6,14 20,4 34,14" />
                    <rect x="8" y="14" width="24" height="18" />
                    <rect x="12" y="18" width="6" height="6" fill="currentColor" fillOpacity="0.2" />
                    <rect x="22" y="18" width="6" height="14" />
                  </svg>
                )}
                {activeMilestone.sketchType === "observatory" && (
                  <svg viewBox="0 0 40 35" className="w-full h-full fill-none stroke-current stroke-[1.8]">
                    <path d="M10 24 A 12 12 0 0 1 30 24 Z" />
                    <rect x="8" y="24" width="24" height="9" />
                    <line x1="20" y1="4" x2="26" y2="0" strokeWidth="2.2" />
                  </svg>
                )}
              </div>

              {/* Waypoint elevation label */}
              <span className="text-[10px] font-mono font-bold text-ink/75 mt-0.5">
                Elev: {activeMilestone.elev}
              </span>
              <span className="text-[9px] font-mono text-clay uppercase tracking-wider">
                {activeMilestone.year}
              </span>

              {/* Brass Loupe Handle */}
              <div className="absolute -bottom-6 -right-6 w-8 h-2.5 bg-[#78350f] rounded-full transform rotate-45 border border-[#b45309] shadow-sm" />
            </div>
          </div>

          {/* Interactive Milestone Waypoint Pins on Map */}
          {MILESTONES.map((item, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveIdx(idx);
                  setIsPlaying(false);
                }}
                className="absolute z-15 -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none"
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
              >
                <div className="flex flex-col items-center">
                  {/* Waypoint Beacon Pulse */}
                  <div className="relative flex items-center justify-center">
                    <span className={`absolute rounded-full transition-all ${isActive ? "w-8 h-8 bg-clay/30 animate-ping" : "w-0 h-0"}`} />
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold border-2 transition-transform duration-300 ${
                        isActive
                          ? "bg-clay text-white border-white scale-125 shadow-lg"
                          : "bg-paper text-ink border-ink/40 group-hover:scale-110 shadow-sm"
                      }`}
                    >
                      0{idx + 1}
                    </div>
                  </div>

                  {/* Waypoint Tag Label */}
                  <div className="mt-1 px-2 py-0.5 rounded bg-[#f2ece0]/90 border border-ink/10 text-[10px] font-mono font-semibold text-ink/80 whitespace-nowrap shadow-xs">
                    {item.year} • {item.name}
                  </div>
                </div>
              </button>
            );
          })}

          {/* Map Legend (Bottom Right) */}
          <div className="absolute bottom-4 right-4 z-10 bg-[#faf6ed]/90 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-ink/10 shadow-sm pointer-events-none text-[10px] font-mono text-ink/70">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-0.5 bg-clay border-t border-dashed" />
              <span>Historic Expedition Route</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-clay" />
              <span>Documented Field Sanctuary</span>
            </div>
          </div>
        </div>

        {/* Milestone Detail Card & Timeline Navigator */}
        <div className="bg-[#f2ece0]/70 p-6 sm:p-8 border-t border-ink/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Milestone Quick Select Buttons */}
          <div className="lg:col-span-5 flex flex-wrap sm:flex-nowrap gap-2">
            {MILESTONES.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveIdx(idx);
                  setIsPlaying(false);
                }}
                className={`flex-1 min-w-[120px] p-3 rounded-2xl border text-left transition-all ${
                  activeIdx === idx
                    ? "bg-paper border-clay shadow-md -translate-y-0.5"
                    : "bg-paper/50 border-ink/10 hover:bg-paper hover:border-ink/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-clay">0{idx + 1}.</span>
                  <span className="font-mono text-[10px] text-ink/50">{item.year}</span>
                </div>
                <div className="font-display font-bold text-sm text-ink truncate mt-0.5">
                  {item.name}
                </div>
              </button>
            ))}
          </div>

          {/* Active Milestone Journal Entry */}
          <div className="lg:col-span-7 bg-paper p-5 sm:p-6 rounded-2xl border border-ink/10 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-ink/10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-moss">
                  Waypoint 0{activeIdx + 1}
                </span>
                <span className="text-xs text-ink/40">•</span>
                <span className="font-mono text-xs text-clay font-bold">{activeMilestone.badge}</span>
              </div>
              <div className="font-mono text-xs text-ink/60">
                {activeMilestone.location} ({activeMilestone.elev})
              </div>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-ink mb-2">
              {activeMilestone.name}
            </h3>
            <p className="text-sm text-ink/75 leading-relaxed">
              {activeMilestone.story}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
