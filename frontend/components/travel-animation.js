"use client";

import { useState, useEffect } from "react";

const SURPRISE_DESTINATIONS = [
  { name: "Manali Pine Sanctuary", type: "Mountains", tag: "Cozy Wood Cabin" },
  { name: "Coorg Mist Estate", type: "Farms", tag: "Coffee Plantation" },
  { name: "Goa Cliffside Haven", type: "Rooms", tag: "Oceanfront Glasshouse" },
  { name: "Jaisalmer Starlit Dome", type: "Domes", tag: "Desert Glamping" },
  { name: "Udaipur Lake Palace", type: "Castles", tag: "Heritage Haveli" },
  { name: "Zanskar Valley Loft", type: "Mountains", tag: "Off-Grid Solitude" },
  { name: "Wayanad Treehouse", type: "Farms", tag: "Rainforest Canopy" },
];

export default function TravelAnimation({ onSelectDestination }) {
  const [isNight, setIsNight] = useState(false);
  const [speed, setSpeed] = useState("normal"); // "normal" | "fast"
  const [honking, setHonking] = useState(false);
  const [honkText, setHonkText] = useState("");
  const [activeSurprise, setActiveSurprise] = useState(null);

  const HONK_MESSAGES = [
    "BEEP BEEP! 🚐💨",
    "LET'S GO TRAVEL! 🎒✨",
    "ADVENTURE AWAITS! 🌲⛰️",
    "NEXT STOP: PARADISE! 🌊☀️",
    "SLOW TRAVEL VIBES ☕🏕️",
  ];

  function triggerHonk() {
    const randomMsg = HONK_MESSAGES[Math.floor(Math.random() * HONK_MESSAGES.length)];
    setHonkText(randomMsg);
    setHonking(true);
    setTimeout(() => setHonking(false), 1400);
  }

  function handleSurprise() {
    triggerHonk();
    const randomStay = SURPRISE_DESTINATIONS[Math.floor(Math.random() * SURPRISE_DESTINATIONS.length)];
    setActiveSurprise(randomStay);
    if (onSelectDestination) {
      onSelectDestination(randomStay.name);
    }
  }

  return (
    <div className="relative w-full select-none overflow-hidden rounded-t-3xl border-t border-x border-white/60 bg-gradient-to-b transition-colors duration-700 shadow-sm"
      style={{
        background: isNight
          ? "linear-gradient(180deg, #111a16 0%, #1c2b23 60%, #293d32 100%)"
          : "linear-gradient(180deg, #fceddf 0%, #fae5d3 40%, #e9e2d4 100%)",
      }}
    >
      <style jsx>{`
        @keyframes roadMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes treeMove {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-120%); }
        }
        @keyframes cloudFloat {
          0% { transform: translateX(0); }
          50% { transform: translateX(18px); }
          100% { transform: translateX(0); }
        }
        @keyframes balloonBob {
          0%, 100% { transform: translateY(0) rotate(1deg); }
          50% { transform: translateY(-12px) rotate(-2deg); }
        }
        @keyframes vanBounce {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-2.5px) rotate(0.8deg); }
          50% { transform: translateY(0.5px) rotate(-0.5deg); }
          75% { transform: translateY(-2px) rotate(0.4deg); }
        }
        @keyframes wheelSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes puffRise {
          0% { opacity: 0.8; transform: translate(0, 0) scale(0.6); }
          50% { opacity: 0.5; transform: translate(-14px, -8px) scale(1.1); }
          100% { opacity: 0; transform: translate(-26px, -16px) scale(1.6); }
        }
        @keyframes paperPlaneFly {
          0% { transform: translate(-40px, 12px) rotate(10deg); }
          25% { transform: translate(60px, -8px) rotate(-4deg); }
          50% { transform: translate(180px, 8px) rotate(12deg); }
          75% { transform: translate(320px, -12px) rotate(-6deg); }
          100% { transform: translate(480px, 16px) rotate(8deg); }
        }
        @keyframes flagWiggle {
          0%, 100% { transform: rotate(0deg) skewY(0deg); }
          50% { transform: rotate(-8deg) skewY(-5deg); }
        }
        @keyframes popBubble {
          0% { transform: scale(0.4) translateY(10px); opacity: 0; }
          40% { transform: scale(1.1) translateY(-4px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }

        .anim-road {
          animation: roadMove ${speed === "fast" ? "0.6s" : "1.4s"} linear infinite;
        }
        .anim-van {
          animation: vanBounce ${speed === "fast" ? "0.3s" : "0.7s"} ease-in-out infinite;
        }
        .anim-wheel {
          animation: wheelSpin ${speed === "fast" ? "0.4s" : "0.9s"} linear infinite;
          transform-origin: center;
        }
        .anim-puff-1 {
          animation: puffRise ${speed === "fast" ? "0.5s" : "1s"} ease-out infinite;
        }
        .anim-puff-2 {
          animation: puffRise ${speed === "fast" ? "0.5s" : "1s"} 0.35s ease-out infinite;
        }
        .anim-balloon {
          animation: balloonBob 4s ease-in-out infinite;
        }
        .anim-cloud-slow {
          animation: cloudFloat 7s ease-in-out infinite;
        }
        .anim-plane {
          animation: paperPlaneFly 12s linear infinite;
        }
      `}</style>

      {/* Sky & Landscape Background */}
      <div className="relative h-28 sm:h-36 w-full pt-2">
        {/* Sky Elements: Sun/Moon & Floating Balloon */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Celestial Body */}
          <div
            className="absolute top-3 right-8 sm:right-16 w-10 h-10 rounded-full transition-all duration-700 flex items-center justify-center cursor-pointer pointer-events-auto shadow-lg hover:scale-110 active:scale-95"
            style={{
              backgroundColor: isNight ? "#f8fafc" : "#ffb703",
              boxShadow: isNight
                ? "0 0 25px rgba(248, 250, 252, 0.6)"
                : "0 0 30px rgba(255, 183, 3, 0.7)",
            }}
            onClick={() => setIsNight(!isNight)}
            title={isNight ? "Switch to Golden Hour Day" : "Switch to Starry Night"}
          >
            {isNight ? (
              <svg className="w-5 h-5 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-amber-700 animate-spin" style={{ animationDuration: "16s" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" fill="#fb8500" stroke="none" />
                <path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            )}
          </div>

          {/* Twinkling Stars in Night Mode */}
          {isNight && (
            <div className="absolute inset-0 transition-opacity duration-500">
              <span className="absolute top-4 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-ping" />
              <span className="absolute top-7 left-1/2 w-1 h-1 bg-amber-200 rounded-full animate-pulse" />
              <span className="absolute top-3 left-3/4 w-1.5 h-1.5 bg-white rounded-full opacity-75" />
              <span className="absolute top-10 left-12 w-1 h-1 bg-white rounded-full animate-pulse" />
              <span className="absolute top-6 right-1/3 w-1.5 h-1.5 bg-yellow-100 rounded-full" />
            </div>
          )}

          {/* Hot Air Balloon */}
          <div className="anim-balloon absolute top-2 left-6 sm:left-14 w-10 sm:w-12 h-14 sm:h-16">
            <svg viewBox="0 0 60 80" className="w-full h-full drop-shadow-md">
              {/* Balloon Envelope */}
              <defs>
                <linearGradient id="balloonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#b95738" />
                  <stop offset="33%" stopColor="#e9e2d4" />
                  <stop offset="66%" stopColor="#405446" />
                  <stop offset="100%" stopColor="#b95738" />
                </linearGradient>
              </defs>
              <ellipse cx="30" cy="30" rx="24" ry="28" fill="url(#balloonGrad)" />
              {/* Stripes */}
              <path d="M 20 5 Q 30 30 20 57" stroke="#ffffff" strokeWidth="1.2" fill="none" opacity="0.6" />
              <path d="M 40 5 Q 30 30 40 57" stroke="#ffffff" strokeWidth="1.2" fill="none" opacity="0.6" />
              {/* Rigging */}
              <line x1="20" y1="57" x2="25" y2="67" stroke="#405446" strokeWidth="1.2" />
              <line x1="40" y1="57" x2="35" y2="67" stroke="#405446" strokeWidth="1.2" />
              {/* Basket */}
              <rect x="23" y="67" width="14" height="9" rx="2" fill="#8d5b4c" stroke="#5c382e" strokeWidth="1" />
            </svg>
          </div>

          {/* Drifting Clouds */}
          <div className="anim-cloud-slow absolute top-4 left-1/3 opacity-70">
            <svg className="w-16 h-8 fill-white/80" viewBox="0 0 64 32">
              <path d="M12 24 A 10 10 0 0 1 28 14 A 12 12 0 0 1 50 18 A 8 8 0 0 1 52 24 Z" />
            </svg>
          </div>

          {/* Paper Airplane swooping across */}
          <div className="anim-plane absolute top-6 hidden sm:block">
            <svg className="w-6 h-6 text-clay drop-shadow" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </div>

          {/* Mountain Silhouettes */}
          <div className="absolute bottom-6 left-0 right-0 h-16 pointer-events-none opacity-40">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
              <polygon points="0,120 180,30 360,120 540,40 760,120 980,20 1200,120" fill={isNight ? "#1d2e25" : "#c4b5a2"} />
              <polygon points="120,120 300,55 480,120 680,60 900,120 1100,45 1200,120" fill={isNight ? "#273d32" : "#d8ccba"} opacity="0.6" />
            </svg>
          </div>
        </div>

        {/* Playful Interactive Badge / Speech Bubble */}
        {honking && (
          <div
            className="absolute top-1 left-1/2 -translate-x-1/2 z-30 px-4 py-1.5 rounded-full bg-clay text-white text-xs sm:text-sm font-bold tracking-wider shadow-xl flex items-center gap-1.5 animate-bounce"
            style={{ animation: "popBubble 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) both" }}
          >
            <span>{honkText}</span>
          </div>
        )}

        {/* Traveling Van & Road Scene */}
        <div className="absolute bottom-0 left-0 right-0 h-10 flex flex-col justify-end">
          
          {/* Camper Van positioned in center/left */}
          <div className="relative mx-auto w-[min(94%,72rem)] h-full">
            <div
              onClick={triggerHonk}
              className="anim-van group absolute bottom-2 left-6 sm:left-24 cursor-pointer hover:scale-105 transition-transform"
              title="Click the Wanderer Van to Honk!"
            >
              <div className="relative w-28 sm:w-36 h-14 sm:h-16">
                
                {/* Exhaust Smoke Puffs */}
                <div className="absolute -left-3 bottom-3 flex flex-col">
                  <span className="anim-puff-1 w-2.5 h-2.5 rounded-full bg-white/70 block" />
                  <span className="anim-puff-2 w-3.5 h-3.5 rounded-full bg-white/50 block -mt-1" />
                </div>

                {/* Headlight Beam (especially vibrant at night) */}
                <div
                  className="absolute -right-14 sm:-right-20 top-4 w-16 sm:w-24 h-10 pointer-events-none transition-opacity"
                  style={{
                    background: "linear-gradient(90deg, rgba(254, 240, 138, 0.7) 0%, rgba(254, 240, 138, 0) 100%)",
                    clipPath: "polygon(0 35%, 100% 0, 100% 100%, 0 65%)",
                    opacity: isNight ? 0.9 : 0.45,
                  }}
                />

                {/* Van SVG */}
                <svg viewBox="0 0 160 85" className="w-full h-full drop-shadow-md">
                  {/* Roof Rack & Luggage */}
                  {/* Rack bars */}
                  <line x1="30" y1="20" x2="115" y2="20" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="42" y1="20" x2="42" y2="26" stroke="#334155" strokeWidth="2.5" />
                  <line x1="72" y1="20" x2="72" y2="26" stroke="#334155" strokeWidth="2.5" />
                  <line x1="102" y1="20" x2="102" y2="26" stroke="#334155" strokeWidth="2.5" />
                  {/* Vintage Luggage Box 1 */}
                  <rect x="36" y="9" width="30" height="11" rx="2" fill="#8d5b4c" stroke="#5c382e" strokeWidth="1" />
                  <line x1="45" y1="9" x2="45" y2="20" stroke="#fef08a" strokeWidth="1" />
                  <line x1="57" y1="9" x2="57" y2="20" stroke="#fef08a" strokeWidth="1" />
                  {/* Surfboard / Adventure Mat */}
                  <ellipse cx="90" cy="14" rx="22" ry="5" fill="#405446" stroke="#253329" strokeWidth="1" />
                  <line x1="72" y1="14" x2="108" y2="14" stroke="#e9e2d4" strokeWidth="1.2" />

                  {/* Cute Waving Flag */}
                  <path d="M 28 20 L 28 4 L 14 11 Z" fill="#b95738" style={{ animation: "flagWiggle 1s ease-in-out infinite" }} />
                  <line x1="28" y1="4" x2="28" y2="22" stroke="#475569" strokeWidth="1.5" />

                  {/* Van Main Body Top (Cream) */}
                  <path d="M 24 45 L 24 30 Q 24 25 32 25 L 120 25 Q 134 25 142 36 L 148 45 Z" fill="#f7f5ef" stroke="#17221d" strokeWidth="2.5" />
                  
                  {/* Van Main Body Bottom (Terracotta Clay) */}
                  <path d="M 24 45 L 152 45 Q 155 45 155 52 L 155 64 Q 155 68 150 68 L 138 68 Q 138 56 122 56 Q 106 56 106 68 L 56 68 Q 56 56 40 56 Q 24 56 24 68 L 18 68 Q 14 68 14 62 L 14 52 Q 14 45 24 45 Z" fill="#b95738" stroke="#17221d" strokeWidth="2.5" />

                  {/* Windows */}
                  {/* Windshield */}
                  <path d="M 124 29 L 140 38 L 140 43 L 122 43 Z" fill="#93c5fd" opacity="0.85" stroke="#17221d" strokeWidth="1.5" />
                  {/* Side Window with cute traveler silhouette */}
                  <rect x="74" y="29" width="40" height="14" rx="2" fill="#93c5fd" opacity="0.85" stroke="#17221d" strokeWidth="1.5" />
                  {/* Rear Window */}
                  <rect x="32" y="29" width="34" height="14" rx="2" fill="#93c5fd" opacity="0.85" stroke="#17221d" strokeWidth="1.5" />

                  {/* Cute Traveler silhouette / happy dog waving */}
                  <circle cx="94" cy="36" r="4.5" fill="#17221d" />
                  <ellipse cx="94" cy="44" rx="6" ry="3.5" fill="#17221d" />
                  {/* Little warm smile */}
                  <circle cx="106" cy="35" r="2.5" fill="#f59e0b" />

                  {/* Chrome Side Trim & Door Handle */}
                  <line x1="24" y1="46" x2="152" y2="46" stroke="#ffffff" strokeWidth="2" />
                  <rect x="66" y="49" width="7" height="2.5" rx="1" fill="#cbd5e1" stroke="#334155" strokeWidth="0.8" />

                  {/* Round Front Headlight */}
                  <circle cx="152" cy="53" r="4.5" fill="#fef08a" stroke="#17221d" strokeWidth="1.5" />
                  <circle cx="152" cy="53" r="2.5" fill="#ffffff" />

                  {/* Rear Light */}
                  <rect x="13.5" y="50" width="3" height="7" rx="1" fill="#ef4444" />

                  {/* Front Bumper */}
                  <rect x="146" y="62" width="12" height="5" rx="2.5" fill="#e2e8f0" stroke="#17221d" strokeWidth="1.5" />
                  {/* Rear Bumper */}
                  <rect x="10" y="62" width="8" height="5" rx="2.5" fill="#e2e8f0" stroke="#17221d" strokeWidth="1.5" />

                  {/* Wheel 1 (Rear) */}
                  <g className="anim-wheel" style={{ transformOrigin: "40px 68px" }}>
                    <circle cx="40" cy="68" r="11" fill="#1f2937" stroke="#111827" strokeWidth="2" />
                    <circle cx="40" cy="68" r="5" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
                    <circle cx="40" cy="68" r="1.5" fill="#b95738" />
                    <line x1="40" y1="63" x2="40" y2="73" stroke="#94a3b8" strokeWidth="1" />
                    <line x1="35" y1="68" x2="45" y2="68" stroke="#94a3b8" strokeWidth="1" />
                  </g>

                  {/* Wheel 2 (Front) */}
                  <g className="anim-wheel" style={{ transformOrigin: "122px 68px" }}>
                    <circle cx="122" cy="68" r="11" fill="#1f2937" stroke="#111827" strokeWidth="2" />
                    <circle cx="122" cy="68" r="5" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
                    <circle cx="122" cy="68" r="1.5" fill="#b95738" />
                    <line x1="122" y1="63" x2="122" y2="73" stroke="#94a3b8" strokeWidth="1" />
                    <line x1="117" y1="68" x2="127" y2="68" stroke="#94a3b8" strokeWidth="1" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Interactive Travel Play Controls (Right aligned on desktop) */}
            <div className="absolute right-3 sm:right-6 bottom-2 flex items-center gap-1.5 sm:gap-2 z-20">
              {/* Honk Button */}
              <button
                type="button"
                onClick={triggerHonk}
                className="flex items-center gap-1.5 rounded-full bg-white/90 hover:bg-white text-ink text-[0.7rem] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 shadow-sm border border-black/10 hover:border-clay hover:text-clay transition active:scale-95"
                title="Honk the horn!"
              >
                <span>Honk</span>
                <span className="text-clay">📢</span>
              </button>

              {/* Speed Mode Toggle */}
              <button
                type="button"
                onClick={() => setSpeed(speed === "normal" ? "fast" : "normal")}
                className={`flex items-center gap-1.5 rounded-full text-[0.7rem] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 shadow-sm border transition active:scale-95 ${
                  speed === "fast"
                    ? "bg-clay text-white border-clay shadow-clay/30"
                    : "bg-white/90 hover:bg-white text-ink border-black/10 hover:border-clay"
                }`}
                title="Toggle Roadtrip Speed"
              >
                <span>{speed === "fast" ? "Turbo ⚡" : "Cruise 🛣️"}</span>
              </button>

              {/* Surprise Adventure Generator */}
              <button
                type="button"
                onClick={handleSurprise}
                className="flex items-center gap-1.5 rounded-full bg-moss hover:bg-[#2e3e34] text-sand text-[0.7rem] sm:text-xs font-bold px-3 sm:px-4 py-1.5 shadow-sm border border-moss/30 transition hover:scale-105 active:scale-95"
                title="Surprise me with a random handpicked stay!"
              >
                <span>Surprise Stay</span>
                <span>✨</span>
              </button>
            </div>
          </div>

          {/* Endless Moving Road Strip */}
          <div className="relative w-full h-3 bg-[#2d3a33] overflow-hidden border-t border-[#17221d]">
            <div className="anim-road flex w-[200%] h-full items-center">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="flex-1 flex justify-center">
                  <div className="w-8 sm:w-14 h-1 bg-[#fef08a]/80 rounded-full" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Surprise Stay Announcement Banner if clicked */}
      {activeSurprise && (
        <div className="bg-sand/80 px-4 py-2 border-t border-ink/10 flex items-center justify-between text-xs text-ink/80 transition-all">
          <div className="flex items-center gap-2 truncate">
            <span className="font-bold text-clay uppercase tracking-wider text-[0.65rem]">Surprise Destination:</span>
            <span className="font-bold text-ink">{activeSurprise.name}</span>
            <span className="hidden sm:inline text-ink/50">• {activeSurprise.tag}</span>
          </div>
          <button
            type="button"
            onClick={() => setActiveSurprise(null)}
            className="text-ink/40 hover:text-ink font-bold px-1 text-sm ml-2"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
