"use client";

import { useState } from "react";

// Curated Travel Biome Themes
const THEMES = [
  {
    id: "sunset",
    name: "Golden Hour",
    skyGradient: "linear-gradient(180deg, #fceddf 0%, #fae5d3 40%, #e9e2d4 100%)",
    mountainColor1: "#c4b5a2",
    mountainColor2: "#d8ccba",
    roadColor: "#2d3a33",
    dashColor: "#fef08a",
    vanTop: "#f7f5ef",
    vanBottom: "#b95738",
    sunColor: "#ffb703",
    sunGlow: "0 0 30px rgba(255, 183, 3, 0.7)",
    dest: { name: "Manali Pine Sanctuary", type: "Mountains", tag: "Cozy Wood Cabin" }
  },
  {
    id: "alpine",
    name: "Alpine Mist",
    skyGradient: "linear-gradient(180deg, #e0f2fe 0%, #bae6fd 45%, #93c5fd 100%)",
    mountainColor1: "#64748b",
    mountainColor2: "#94a3b8",
    roadColor: "#1e293b",
    dashColor: "#e2e8f0",
    vanTop: "#ffffff",
    vanBottom: "#0284c7",
    sunColor: "#e0f2fe",
    sunGlow: "0 0 25px rgba(224, 242, 254, 0.9)",
    dest: { name: "Zanskar Valley Loft", type: "Mountains", tag: "Off-Grid Solitude" }
  },
  {
    id: "forest",
    name: "Emerald Forest",
    skyGradient: "linear-gradient(180deg, #ecfdf5 0%, #d1fae5 45%, #a7f3d0 100%)",
    mountainColor1: "#2d6a4f",
    mountainColor2: "#40916c",
    roadColor: "#1b4332",
    dashColor: "#d8f3dc",
    vanTop: "#f7f5ef",
    vanBottom: "#2d6a4f",
    sunColor: "#fef08a",
    sunGlow: "0 0 25px rgba(254, 240, 138, 0.8)",
    dest: { name: "Coorg Mist Estate", type: "Farms", tag: "Coffee Plantation" }
  },
  {
    id: "desert",
    name: "Dune Oasis",
    skyGradient: "linear-gradient(180deg, #fef3c7 0%, #fde68a 40%, #fed7aa 100%)",
    mountainColor1: "#b45309",
    mountainColor2: "#d97706",
    roadColor: "#451a03",
    dashColor: "#fef08a",
    vanTop: "#fffbeb",
    vanBottom: "#b45309",
    sunColor: "#f97316",
    sunGlow: "0 0 35px rgba(249, 115, 22, 0.8)",
    dest: { name: "Jaisalmer Starlit Dome", type: "Domes", tag: "Desert Glamping" }
  },
  {
    id: "night",
    name: "Cosmic Night",
    skyGradient: "linear-gradient(180deg, #090d16 0%, #111827 50%, #1e293b 100%)",
    mountainColor1: "#0f172a",
    mountainColor2: "#1e293b",
    roadColor: "#020617",
    dashColor: "#93c5fd",
    vanTop: "#f8fafc",
    vanBottom: "#6366f1",
    sunColor: "#f8fafc",
    sunGlow: "0 0 25px rgba(248, 250, 252, 0.85)",
    dest: { name: "Goa Cliffside Haven", type: "Rooms", tag: "Oceanfront Glasshouse" }
  }
];

// Clean SVG Icons (Zero Emojis)
function HornIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function SpeedometerIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 14l3-3" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  );
}

function TurboZapIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function CompassIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" opacity="0.3" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function SparklesIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" fill="currentColor" opacity="0.2" />
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
    </svg>
  );
}

function PaletteIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2Z" />
    </svg>
  );
}

export default function TravelAnimation({ onSelectDestination }) {
  const [themeIndex, setThemeIndex] = useState(0);
  const [speed, setSpeed] = useState("normal"); // "normal" | "fast"
  const [honking, setHonking] = useState(false);
  const [honkText, setHonkText] = useState("");
  const [activeSurprise, setActiveSurprise] = useState(null);

  const currentTheme = THEMES[themeIndex];
  const isNight = currentTheme.id === "night";

  const HONK_MESSAGES = [
    "BEEP BEEP",
    "LET'S HIT THE ROAD",
    "ADVENTURE AWAITS",
    "NEXT STOP: PARADISE",
    "SLOW TRAVEL VIBES",
  ];

  function triggerHonk() {
    const randomMsg = HONK_MESSAGES[Math.floor(Math.random() * HONK_MESSAGES.length)];
    setHonkText(randomMsg);
    setHonking(true);
    setTimeout(() => setHonking(false), 1400);
  }

  // Speed Toggle: Switch between Cruise & Turbo with theme transition
  function toggleSpeed() {
    if (speed === "normal") {
      setSpeed("fast");
    } else {
      setSpeed("normal");
    }
  }

  // Surprise Stay: Switch theme & pick destination
  function handleSurprise() {
    const nextIdx = (themeIndex + 1) % THEMES.length;
    setThemeIndex(nextIdx);
    const selectedTheme = THEMES[nextIdx];
    setActiveSurprise(selectedTheme.dest);
    triggerHonk();
    if (onSelectDestination) {
      onSelectDestination(selectedTheme.dest.name);
    }
  }

  // Direct Theme Cycle
  function cycleTheme() {
    const nextIdx = (themeIndex + 1) % THEMES.length;
    setThemeIndex(nextIdx);
  }

  return (
    <div
      className="relative w-full select-none overflow-hidden rounded-t-3xl border-t border-x border-white/60 transition-all duration-700 shadow-sm"
      style={{ background: currentTheme.skyGradient }}
    >
      <style jsx>{`
        @keyframes roadMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
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
        @keyframes vanHonkSquash {
          0% { transform: scale(1) translateY(0); }
          30% { transform: scale(1.08, 0.92) translateY(-6px); }
          60% { transform: scale(0.96, 1.04) translateY(-2px); }
          100% { transform: scale(1) translateY(0); }
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
        @keyframes soundWave {
          0% { opacity: 0.9; transform: scale(0.5); }
          100% { opacity: 0; transform: scale(2.2); }
        }
        @keyframes speedStreak {
          0% { transform: translateX(120%); opacity: 0; }
          40% { opacity: 0.6; }
          100% { transform: translateX(-120%); opacity: 0; }
        }
        @keyframes flagWiggle {
          0%, 100% { transform: rotate(0deg) skewY(0deg); }
          50% { transform: rotate(-8deg) skewY(-5deg); }
        }
        @keyframes noteFloat {
          0% { transform: translateY(0) scale(0.8); opacity: 1; }
          100% { transform: translateY(-24px) scale(1.2); opacity: 0; }
        }

        .anim-road {
          animation: roadMove ${speed === "fast" ? "0.5s" : "1.3s"} linear infinite;
        }
        .anim-van {
          animation: ${honking ? "vanHonkSquash 0.5s ease" : `vanBounce ${speed === "fast" ? "0.3s" : "0.7s"} ease-in-out infinite`};
        }
        .anim-wheel {
          animation: wheelSpin ${speed === "fast" ? "0.35s" : "0.85s"} linear infinite;
          transform-origin: center;
        }
        .anim-puff-1 {
          animation: puffRise ${speed === "fast" ? "0.45s" : "0.9s"} ease-out infinite;
        }
        .anim-puff-2 {
          animation: puffRise ${speed === "fast" ? "0.45s" : "0.9s"} 0.3s ease-out infinite;
        }
        .anim-balloon {
          animation: balloonBob 4s ease-in-out infinite;
        }
        .anim-cloud-slow {
          animation: cloudFloat 7s ease-in-out infinite;
        }
      `}</style>

      {/* Sky & Animated Landscape Canvas */}
      <div className="relative h-28 sm:h-36 w-full pt-2">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Celestial Body: Sun or Moon */}
          <div
            className="absolute top-3 right-8 sm:right-16 w-10 h-10 rounded-full transition-all duration-700 flex items-center justify-center cursor-pointer pointer-events-auto shadow-lg hover:scale-110 active:scale-95"
            style={{
              backgroundColor: currentTheme.sunColor,
              boxShadow: currentTheme.sunGlow,
            }}
            onClick={cycleTheme}
            title={`Current Theme: ${currentTheme.name}. Click to change!`}
          >
            {isNight ? (
              <svg className="w-5 h-5 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-amber-800 animate-spin" style={{ animationDuration: "20s" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.3" />
                <circle cx="12" cy="12" r="3" stroke="currentColor" />
                <path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            )}
          </div>

          {/* Twinkling Stars in Cosmic Night */}
          {isNight && (
            <div className="absolute inset-0 transition-opacity duration-500">
              <span className="absolute top-4 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-ping" />
              <span className="absolute top-7 left-1/2 w-1 h-1 bg-amber-200 rounded-full animate-pulse" />
              <span className="absolute top-3 left-3/4 w-1.5 h-1.5 bg-white rounded-full opacity-75" />
              <span className="absolute top-10 left-12 w-1 h-1 bg-white rounded-full animate-pulse" />
              <span className="absolute top-6 right-1/3 w-1.5 h-1.5 bg-indigo-100 rounded-full" />
            </div>
          )}

          {/* High-speed motion streaks when Turbo is active */}
          {speed === "fast" && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
              <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent" style={{ animation: "speedStreak 0.6s linear infinite" }} />
              <div className="absolute top-14 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-200 to-transparent" style={{ animation: "speedStreak 0.45s 0.2s linear infinite" }} />
              <div className="absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent" style={{ animation: "speedStreak 0.5s 0.35s linear infinite" }} />
            </div>
          )}

          {/* Hot Air Balloon */}
          <div className="anim-balloon absolute top-2 left-6 sm:left-14 w-10 sm:w-12 h-14 sm:h-16">
            <svg viewBox="0 0 60 80" className="w-full h-full drop-shadow-md">
              <defs>
                <linearGradient id={`balloon-${themeIndex}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={currentTheme.vanBottom} />
                  <stop offset="50%" stopColor={currentTheme.vanTop} />
                  <stop offset="100%" stopColor={currentTheme.vanBottom} />
                </linearGradient>
              </defs>
              <ellipse cx="30" cy="30" rx="24" ry="28" fill={`url(#balloon-${themeIndex})`} />
              <path d="M 20 5 Q 30 30 20 57" stroke="#ffffff" strokeWidth="1.2" fill="none" opacity="0.6" />
              <path d="M 40 5 Q 30 30 40 57" stroke="#ffffff" strokeWidth="1.2" fill="none" opacity="0.6" />
              <line x1="20" y1="57" x2="25" y2="67" stroke="#334155" strokeWidth="1.2" />
              <line x1="40" y1="57" x2="35" y2="67" stroke="#334155" strokeWidth="1.2" />
              <rect x="23" y="67" width="14" height="9" rx="2" fill="#8d5b4c" stroke="#5c382e" strokeWidth="1" />
            </svg>
          </div>

          {/* Drifting Clouds */}
          <div className="anim-cloud-slow absolute top-4 left-1/3 opacity-70">
            <svg className="w-16 h-8 fill-white/80" viewBox="0 0 64 32">
              <path d="M12 24 A 10 10 0 0 1 28 14 A 12 12 0 0 1 50 18 A 8 8 0 0 1 52 24 Z" />
            </svg>
          </div>

          {/* Dynamic Mountain & Landscape Silhouette tailored to theme */}
          <div className="absolute bottom-6 left-0 right-0 h-16 pointer-events-none opacity-50 transition-colors duration-700">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
              <polygon points="0,120 180,30 360,120 540,40 760,120 980,20 1200,120" fill={currentTheme.mountainColor1} />
              <polygon points="120,120 300,55 480,120 680,60 900,120 1100,45 1200,120" fill={currentTheme.mountainColor2} opacity="0.6" />
            </svg>
          </div>
        </div>

        {/* Playful Interactive Speech Bubble on Honk */}
        {honking && (
          <div className="absolute top-1 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1 rounded-full bg-clay text-white text-[0.7rem] sm:text-xs font-bold tracking-wider shadow-lg flex items-center gap-1.5 animate-bounce">
            <HornIcon className="w-3.5 h-3.5 text-white animate-pulse" />
            <span>{honkText}</span>
          </div>
        )}

        {/* Floating Music Notes on Honk */}
        {honking && (
          <div className="absolute bottom-16 left-28 sm:left-48 pointer-events-none z-30">
            <span className="absolute text-clay font-bold text-xs" style={{ animation: "noteFloat 0.8s ease-out forwards", left: "0px" }}>♪</span>
            <span className="absolute text-moss font-bold text-sm" style={{ animation: "noteFloat 1s 0.15s ease-out forwards", left: "14px" }}>♫</span>
          </div>
        )}

        {/* Traveling Van & Road Canvas */}
        <div className="absolute bottom-0 left-0 right-0 h-10 flex flex-col justify-end">
          
          <div className="relative mx-auto w-[min(94%,72rem)] h-full">
            {/* The Camper Van */}
            <div
              onClick={triggerHonk}
              className="anim-van group absolute bottom-2 left-6 sm:left-24 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
              title="Click the Wanderer Van to Honk!"
            >
              <div className="relative w-28 sm:w-36 h-14 sm:h-16">
                
                {/* Expanding Soundwave Ring on Honk */}
                {honking && (
                  <div
                    className="absolute -right-4 top-4 w-10 h-10 rounded-full border-2 border-clay pointer-events-none"
                    style={{ animation: "soundWave 0.6s ease-out infinite" }}
                  />
                )}

                {/* Exhaust Smoke Puffs */}
                <div className="absolute -left-3 bottom-3 flex flex-col">
                  <span className="anim-puff-1 w-2.5 h-2.5 rounded-full bg-white/70 block" />
                  <span className="anim-puff-2 w-3.5 h-3.5 rounded-full bg-white/50 block -mt-1" />
                </div>

                {/* Headlight Beam */}
                <div
                  className="absolute -right-14 sm:-right-20 top-4 w-16 sm:w-24 h-10 pointer-events-none transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(90deg, rgba(254, 240, 138, 0.75) 0%, rgba(254, 240, 138, 0) 100%)",
                    clipPath: "polygon(0 35%, 100% 0, 100% 100%, 0 65%)",
                    opacity: isNight ? 0.95 : 0.45,
                  }}
                />

                {/* Van SVG */}
                <svg viewBox="0 0 160 85" className="w-full h-full drop-shadow-md">
                  {/* Roof Rack & Adventure Gear */}
                  <line x1="30" y1="20" x2="115" y2="20" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="42" y1="20" x2="42" y2="26" stroke="#334155" strokeWidth="2.5" />
                  <line x1="72" y1="20" x2="72" y2="26" stroke="#334155" strokeWidth="2.5" />
                  <line x1="102" y1="20" x2="102" y2="26" stroke="#334155" strokeWidth="2.5" />
                  
                  {/* Suitcase */}
                  <rect x="36" y="9" width="30" height="11" rx="2" fill="#8d5b4c" stroke="#5c382e" strokeWidth="1" />
                  <line x1="45" y1="9" x2="45" y2="20" stroke="#fef08a" strokeWidth="1" />
                  <line x1="57" y1="9" x2="57" y2="20" stroke="#fef08a" strokeWidth="1" />
                  
                  {/* Adventure Roll */}
                  <ellipse cx="90" cy="14" rx="22" ry="5" fill="#405446" stroke="#253329" strokeWidth="1" />
                  <line x1="72" y1="14" x2="108" y2="14" stroke="#e9e2d4" strokeWidth="1.2" />

                  {/* Fluttering Flag */}
                  <path d="M 28 20 L 28 4 L 14 11 Z" fill={currentTheme.vanBottom} style={{ animation: "flagWiggle 1s ease-in-out infinite" }} />
                  <line x1="28" y1="4" x2="28" y2="22" stroke="#475569" strokeWidth="1.5" />

                  {/* Van Top */}
                  <path d="M 24 45 L 24 30 Q 24 25 32 25 L 120 25 Q 134 25 142 36 L 148 45 Z" fill={currentTheme.vanTop} stroke="#17221d" strokeWidth="2.5" />
                  
                  {/* Van Bottom (Themed) */}
                  <path d="M 24 45 L 152 45 Q 155 45 155 52 L 155 64 Q 155 68 150 68 L 138 68 Q 138 56 122 56 Q 106 56 106 68 L 56 68 Q 56 56 40 56 Q 24 56 24 68 L 18 68 Q 14 68 14 62 L 14 52 Q 14 45 24 45 Z" fill={currentTheme.vanBottom} stroke="#17221d" strokeWidth="2.5" />

                  {/* Windows */}
                  <path d="M 124 29 L 140 38 L 140 43 L 122 43 Z" fill="#93c5fd" opacity="0.85" stroke="#17221d" strokeWidth="1.5" />
                  <rect x="74" y="29" width="40" height="14" rx="2" fill="#93c5fd" opacity="0.85" stroke="#17221d" strokeWidth="1.5" />
                  <rect x="32" y="29" width="34" height="14" rx="2" fill="#93c5fd" opacity="0.85" stroke="#17221d" strokeWidth="1.5" />

                  {/* Traveler silhouette */}
                  <circle cx="94" cy="36" r="4.5" fill="#17221d" />
                  <ellipse cx="94" cy="44" rx="6" ry="3.5" fill="#17221d" />
                  <circle cx="106" cy="35" r="2.5" fill="#f59e0b" />

                  {/* Trim & Door Handle */}
                  <line x1="24" y1="46" x2="152" y2="46" stroke="#ffffff" strokeWidth="2" />
                  <rect x="66" y="49" width="7" height="2.5" rx="1" fill="#cbd5e1" stroke="#334155" strokeWidth="0.8" />

                  {/* Headlight */}
                  <circle cx="152" cy="53" r="4.5" fill="#fef08a" stroke="#17221d" strokeWidth="1.5" />
                  <circle cx="152" cy="53" r="2.5" fill="#ffffff" />
                  <rect x="13.5" y="50" width="3" height="7" rx="1" fill="#ef4444" />

                  {/* Bumpers */}
                  <rect x="146" y="62" width="12" height="5" rx="2.5" fill="#e2e8f0" stroke="#17221d" strokeWidth="1.5" />
                  <rect x="10" y="62" width="8" height="5" rx="2.5" fill="#e2e8f0" stroke="#17221d" strokeWidth="1.5" />

                  {/* Rear Wheel */}
                  <g className="anim-wheel" style={{ transformOrigin: "40px 68px" }}>
                    <circle cx="40" cy="68" r="11" fill="#1f2937" stroke="#111827" strokeWidth="2" />
                    <circle cx="40" cy="68" r="5" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
                    <circle cx="40" cy="68" r="1.5" fill={currentTheme.vanBottom} />
                    <line x1="40" y1="63" x2="40" y2="73" stroke="#94a3b8" strokeWidth="1" />
                    <line x1="35" y1="68" x2="45" y2="68" stroke="#94a3b8" strokeWidth="1" />
                  </g>

                  {/* Front Wheel */}
                  <g className="anim-wheel" style={{ transformOrigin: "122px 68px" }}>
                    <circle cx="122" cy="68" r="11" fill="#1f2937" stroke="#111827" strokeWidth="2" />
                    <circle cx="122" cy="68" r="5" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
                    <circle cx="122" cy="68" r="1.5" fill={currentTheme.vanBottom} />
                    <line x1="122" y1="63" x2="122" y2="73" stroke="#94a3b8" strokeWidth="1" />
                    <line x1="117" y1="68" x2="127" y2="68" stroke="#94a3b8" strokeWidth="1" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Interactive Control Buttons (Pure Vector SVG Icons, Zero Emojis) */}
            <div className="absolute right-2 sm:right-6 bottom-2 flex items-center gap-1.5 sm:gap-2 z-20">
              
              {/* Theme Cycle Button */}
              <button
                type="button"
                onClick={cycleTheme}
                className="hidden sm:flex items-center gap-1.5 rounded-full bg-white/90 hover:bg-white text-ink text-[0.7rem] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 shadow-sm border border-black/10 hover:border-clay hover:text-clay transition active:scale-95"
                title={`Theme: ${currentTheme.name}. Click to switch theme.`}
              >
                <PaletteIcon className="w-3.5 h-3.5 text-clay" />
                <span className="hidden md:inline">{currentTheme.name}</span>
              </button>

              {/* Honk Button with SVG Horn */}
              <button
                type="button"
                onClick={triggerHonk}
                className="flex items-center gap-1.5 rounded-full bg-white/90 hover:bg-white text-ink text-[0.7rem] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 shadow-sm border border-black/10 hover:border-clay hover:text-clay transition active:scale-95"
                title="Honk the horn!"
              >
                <HornIcon className="w-3.5 h-3.5 text-clay" />
                <span>Honk</span>
              </button>

              {/* Speed Mode Toggle with SVG Speedometer / Turbo */}
              <button
                type="button"
                onClick={toggleSpeed}
                className={`flex items-center gap-1.5 rounded-full text-[0.7rem] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 shadow-sm border transition active:scale-95 ${
                  speed === "fast"
                    ? "bg-clay text-white border-clay shadow-clay/30"
                    : "bg-white/90 hover:bg-white text-ink border-black/10 hover:border-clay"
                }`}
                title="Toggle Speed"
              >
                {speed === "fast" ? (
                  <>
                    <TurboZapIcon className="w-3.5 h-3.5 text-amber-300" />
                    <span>Turbo</span>
                  </>
                ) : (
                  <>
                    <SpeedometerIcon className="w-3.5 h-3.5 text-moss" />
                    <span>Cruise</span>
                  </>
                )}
              </button>

              {/* Surprise Adventure Generator with SVG Compass / Sparkle */}
              <button
                type="button"
                onClick={handleSurprise}
                className="flex items-center gap-1.5 rounded-full bg-moss hover:bg-[#2e3e34] text-sand text-[0.7rem] sm:text-xs font-bold px-3 sm:px-4 py-1.5 shadow-sm border border-moss/30 transition hover:scale-105 active:scale-95"
                title="Surprise me with a new destination and landscape theme!"
              >
                <SparklesIcon className="w-3.5 h-3.5 text-sand" />
                <span>Surprise Stay</span>
              </button>

            </div>
          </div>

          {/* Endless Moving Road Strip (Themed) */}
          <div
            className="relative w-full h-3 overflow-hidden border-t border-black/30 transition-colors duration-700"
            style={{ backgroundColor: currentTheme.roadColor }}
          >
            <div className="anim-road flex w-[200%] h-full items-center">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="flex-1 flex justify-center">
                  <div
                    className="w-8 sm:w-14 h-1 rounded-full opacity-80"
                    style={{ backgroundColor: currentTheme.dashColor }}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Surprise Stay Announcement Banner */}
      {activeSurprise && (
        <div className="bg-white/90 backdrop-blur-md px-4 py-2 border-t border-ink/10 flex items-center justify-between text-xs text-ink/80 transition-all">
          <div className="flex items-center gap-2 truncate">
            <CompassIcon className="w-4 h-4 text-clay shrink-0" />
            <span className="font-bold text-clay uppercase tracking-wider text-[0.65rem]">Theme: {currentTheme.name}</span>
            <span className="text-ink/30">•</span>
            <span className="font-bold text-ink">{activeSurprise.name}</span>
            <span className="hidden sm:inline text-ink/60">({activeSurprise.tag})</span>
          </div>
          <button
            type="button"
            onClick={() => setActiveSurprise(null)}
            className="text-ink/40 hover:text-ink font-bold px-1.5 text-sm ml-2"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
