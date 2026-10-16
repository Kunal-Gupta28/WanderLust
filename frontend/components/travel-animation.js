"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MusicNoteIcon, CloseIcon } from "./icons";

// 4 Distinct Terrains / Biomes with unique roadside objects & landscape
const BIOMES = [
  {
    id: "forest",
    name: "Emerald Forest",
    subtitle: "Lush Canopies & Hills",
    daySky: "linear-gradient(180deg, #dcfce7 0%, #bbf7d0 45%, #86efac 100%)",
    nightSky: "linear-gradient(180deg, #052e16 0%, #0f3d24 55%, #14532d 100%)",
    hillsColor1: "#15803d",
    hillsColor2: "#16a34a",
    roadColor: "#14532d",
    dashColor: "#bbf7d0",
    vanTop: "#f7f5ef",
    vanBottom: "#15803d",
    treeType: "oak",
  },
  {
    id: "mountains",
    name: "Pine Highlands",
    subtitle: "Alpine Peaks & Conifers",
    daySky: "linear-gradient(180deg, #e0f2fe 0%, #bae6fd 45%, #93c5fd 100%)",
    nightSky: "linear-gradient(180deg, #082f49 0%, #0c4a6e 55%, #164e63 100%)",
    hillsColor1: "#475569",
    hillsColor2: "#64748b",
    roadColor: "#1e293b",
    dashColor: "#e2e8f0",
    vanTop: "#ffffff",
    vanBottom: "#0284c7",
    treeType: "pine",
  },
  {
    id: "desert",
    name: "Dune Oasis",
    subtitle: "Golden Sands & Cacti",
    daySky: "linear-gradient(180deg, #fef3c7 0%, #fde68a 45%, #fed7aa 100%)",
    nightSky: "linear-gradient(180deg, #451a03 0%, #78350f 55%, #9a3412 100%)",
    hillsColor1: "#b45309",
    hillsColor2: "#d97706",
    roadColor: "#451a03",
    dashColor: "#fde68a",
    vanTop: "#fffbeb",
    vanBottom: "#b45309",
    treeType: "cactus",
  },
  {
    id: "coast",
    name: "Coastal Haven",
    subtitle: "Ocean Breeze & Palms",
    daySky: "linear-gradient(180deg, #e0e7ff 0%, #c7d2fe 45%, #fbcfe8 100%)",
    nightSky: "linear-gradient(180deg, #1e1b4b 0%, #2e1065 55%, #3b0764 100%)",
    hillsColor1: "#0284c7",
    hillsColor2: "#0ea5e9",
    roadColor: "#0f172a",
    dashColor: "#38bdf8",
    vanTop: "#fdf2f8",
    vanBottom: "#db2777",
    treeType: "palm",
  },
];

// Curated surprise stays from the WanderLust collection
const SURPRISE_STAYS = [
  {
    id: "alpine-retreat",
    name: "A-frame beneath the pines",
    location: "Manali, Himachal Pradesh",
    price: "₹8,400",
    rating: "4.98",
    tag: "Mountain Solitude",
    category: "Mountains",
  },
  {
    id: "coastal-cove",
    name: "A salt-washed house by the sea",
    location: "Varkala, Kerala",
    price: "₹11,200",
    rating: "4.95",
    tag: "Ocean Cliffside",
    category: "Trending",
  },
  {
    id: "desert-dome",
    name: "Stargazing dome in the desert",
    location: "Jaisalmer, Rajasthan",
    price: "₹6,800",
    rating: "4.92",
    tag: "Dune Glamping",
    category: "Domes",
  },
  {
    id: "lake-cabin",
    name: "Still water cabin",
    location: "Nainital, Uttarakhand",
    price: "₹9,200",
    rating: "4.97",
    tag: "Lakeside Retreat",
    category: "Rooms",
  },
  {
    id: "fort-house",
    name: "An old fort, made intimate",
    location: "Udaipur, Rajasthan",
    price: "₹15,800",
    rating: "4.99",
    tag: "Heritage Haveli",
    category: "Castles",
  },
  {
    id: "forest-pool",
    name: "A pool in the wild",
    location: "Wayanad, Kerala",
    price: "₹12,700",
    rating: "4.96",
    tag: "Rainforest Canopy",
    category: "Amazing pools",
  },
];

// Clean SVG Icons
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

function TerrainIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function TicketIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" />
      <path d="M13 17v2" />
      <path d="M13 11v2" />
    </svg>
  );
}

function StarIcon({ className = "w-3 h-3" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default function TravelAnimation({ onSelectDestination, triggerRef }) {
  // 1. Day / Night Atmospheric state (controlled ONLY by Sun / Moon button)
  const [isNight, setIsNight] = useState(false);

  // 2. Terrain / Biome state (controlled ONLY by Landscape Biome button)
  const [biomeIndex, setBiomeIndex] = useState(0);

  // 3. Speed mode state (controlled ONLY by Cruise / Turbo button)
  const [speed, setSpeed] = useState("normal"); // "normal" | "fast"

  // 4. Honk interaction state
  const [honking, setHonking] = useState(false);
  const [honkText, setHonkText] = useState("");

  // 5. Surprise Stay / Adventure Lottery state (controlled ONLY by Surprise Stay button)
  const [luckyStay, setLuckyStay] = useState(null);
  const [ticketNotice, setTicketNotice] = useState(false);

  const currentBiome = BIOMES[biomeIndex];
  const skyBackground = isNight ? currentBiome.nightSky : currentBiome.daySky;

  const HONK_MESSAGES = [
    "BEEP BEEP",
    "ADVENTURE AWAITS",
    "HIT THE OPEN ROAD",
    "SLOW TRAVEL VIBES",
    "WANDER FREELY",
  ];

  function triggerHonk() {
    const randomMsg = HONK_MESSAGES[Math.floor(Math.random() * HONK_MESSAGES.length)];
    setHonkText(randomMsg);
    setHonking(true);
    setTimeout(() => setHonking(false), 1400);
  }

  // --- BUTTON 1: Sun / Moon Celestial Button ---
  // Strictly toggles Day & Night atmosphere!
  function toggleDayNight() {
    setIsNight((prev) => !prev);
  }

  // --- BUTTON 2: Landscape / Biome Button ("Emerald Forest", etc.) ---
  // Strictly cycles through the 4 scenic terrain environments!
  function cycleBiome() {
    setBiomeIndex((prev) => (prev + 1) % BIOMES.length);
  }

  // --- BUTTON 3: Surprise Stay Button ---
  // Strictly rolls a lucky stay lottery ticket with destination card & search autofill!
  function rollSurpriseStay() {
    triggerHonk();
    // Pick a random stay from the collection
    const randomPick = SURPRISE_STAYS[Math.floor(Math.random() * SURPRISE_STAYS.length)];
    setLuckyStay(randomPick);
    setTicketNotice(true);

    if (onSelectDestination) {
      onSelectDestination(randomPick.name, randomPick.category, randomPick.id);
    }
  }

  useEffect(() => {
    if (triggerRef) {
      triggerRef.current = rollSurpriseStay;
    }
  }, [triggerRef]);

  return (
    <div
      className="relative w-full select-none overflow-hidden rounded-t-3xl border-t border-x border-white/60 transition-colors duration-700 shadow-sm"
      style={{ background: skyBackground }}
    >
      <style jsx>{`
        @keyframes roadMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes cloudFloat {
          0% { transform: translateX(-40px); }
          50% { transform: translateX(50px); }
          100% { transform: translateX(-40px); }
        }
        @keyframes balloonBob {
          0%, 100% { transform: translate(0, 0) rotate(1deg); }
          50% { transform: translate(35px, -14px) rotate(-2deg); }
        }
        @keyframes vanBounce {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(14px, -3px) rotate(0.8deg); }
          50% { transform: translate(28px, 0.5px) rotate(-0.5deg); }
          75% { transform: translate(16px, -2px) rotate(0.4deg); }
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
        @keyframes treeSlide {
          0% { transform: translateX(800px); }
          100% { transform: translateX(-150px); }
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
        .anim-tree-1 {
          animation: treeSlide ${speed === "fast" ? "2.5s" : "5.5s"} linear infinite;
        }
        .anim-tree-2 {
          animation: treeSlide ${speed === "fast" ? "2.5s" : "5.5s"} 2.8s linear infinite;
        }
      `}</style>

      {/* Sky Canvas */}
      <div className="relative h-28 sm:h-36 w-full pt-2">
        
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          
          {/* BUTTON 1: Sun / Moon Celestial Toggle (Top Right) */}
          <button
            type="button"
            onClick={toggleDayNight}
            className="absolute top-3 right-6 sm:right-14 w-10 h-10 rounded-full transition-all duration-700 flex items-center justify-center cursor-pointer pointer-events-auto shadow-lg hover:scale-110 active:scale-95 z-20"
            style={{
              backgroundColor: isNight ? "#f8fafc" : "#ffb703",
              boxShadow: isNight ? "0 0 25px rgba(248, 250, 252, 0.85)" : "0 0 30px rgba(255, 183, 3, 0.75)",
            }}
            title={isNight ? "Switch to Daytime / Golden Hour" : "Switch to Starry Night"}
          >
            {isNight ? (
              /* Crescent Moon for Night */
              <svg className="w-5 h-5 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              /* Radiant Sun for Day */
              <svg className="w-5 h-5 text-amber-800 animate-spin" style={{ animationDuration: "20s" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.3" />
                <circle cx="12" cy="12" r="3" stroke="currentColor" />
                <path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            )}
          </button>

          {/* Twinkling Stars in Night Mode */}
          {isNight && (
            <div className="absolute inset-0 transition-opacity duration-500">
              <span className="absolute top-4 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-ping" />
              <span className="absolute top-7 left-1/2 w-1 h-1 bg-amber-200 rounded-full animate-pulse" />
              <span className="absolute top-3 left-3/4 w-1.5 h-1.5 bg-white rounded-full opacity-75" />
              <span className="absolute top-10 left-12 w-1 h-1 bg-white rounded-full animate-pulse" />
              <span className="absolute top-6 right-1/3 w-1.5 h-1.5 bg-indigo-100 rounded-full" />
            </div>
          )}

          {/* Speed Streaks in Turbo Mode */}
          {speed === "fast" && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
              <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent" style={{ animation: "speedStreak 0.6s linear infinite" }} />
              <div className="absolute top-14 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-200 to-transparent" style={{ animation: "speedStreak 0.45s 0.2s linear infinite" }} />
            </div>
          )}

          {/* Floating Hot Air Balloon */}
          <div className="anim-balloon absolute top-2 left-6 sm:left-14 w-10 sm:w-12 h-14 sm:h-16">
            <svg viewBox="0 0 60 80" className="w-full h-full drop-shadow-md">
              <ellipse cx="30" cy="30" rx="24" ry="28" fill={currentBiome.vanBottom} />
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

          {/* Biome Landscape Silhouettes (Mountains vs Dunes vs Coastal Waves vs Forest Hills) */}
          <div className="absolute bottom-6 left-0 right-0 h-16 pointer-events-none opacity-50 transition-all duration-700">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
              {currentBiome.treeType === "pine" ? (
                /* High Jagged Peaks */
                <>
                  <polygon points="0,120 160,20 320,120 480,35 680,120 880,15 1060,120 1200,30 1200,120" fill={currentBiome.hillsColor1} />
                  <polygon points="80,120 240,45 400,120 580,50 780,120 980,40 1200,120" fill={currentBiome.hillsColor2} opacity="0.6" />
                </>
              ) : currentBiome.treeType === "cactus" ? (
                /* Smooth Desert Dunes */
                <>
                  <path d="M 0 120 Q 200 40 450 120 Q 750 30 1050 120 L 1200 120 L 1200 120 Z" fill={currentBiome.hillsColor1} />
                  <path d="M 100 120 Q 400 60 700 120 Q 950 50 1200 120 Z" fill={currentBiome.hillsColor2} opacity="0.6" />
                </>
              ) : currentBiome.treeType === "palm" ? (
                /* Ocean Waves / Coastal Bluffs */
                <>
                  <path d="M 0 120 Q 150 70 300 120 T 600 120 T 900 120 T 1200 120 Z" fill={currentBiome.hillsColor1} />
                  <polygon points="0,120 250,50 500,120 850,45 1200,120" fill={currentBiome.hillsColor2} opacity="0.5" />
                </>
              ) : (
                /* Rolling Forest Hills */
                <>
                  <polygon points="0,120 180,30 360,120 540,40 760,120 980,20 1200,120" fill={currentBiome.hillsColor1} />
                  <polygon points="120,120 300,55 480,120 680,60 900,120 1100,45 1200,120" fill={currentBiome.hillsColor2} opacity="0.6" />
                </>
              )}
            </svg>
          </div>

          {/* Animated Roadside Biome Objects Sliding By (Pines / Palms / Cacti / Oaks) */}
          <div className="absolute bottom-3 left-0 right-0 h-12 overflow-hidden pointer-events-none">
            {/* Tree 1 */}
            <div className="anim-tree-1 absolute bottom-0">
              {currentBiome.treeType === "pine" && (
                <svg className="w-6 h-10 text-slate-700" viewBox="0 0 24 36" fill="currentColor">
                  <polygon points="12,2 2,16 6,16 1,26 8,26 8,36 16,36 16,26 23,26 18,16 22,16" />
                </svg>
              )}
              {currentBiome.treeType === "palm" && (
                <svg className="w-8 h-12 text-teal-800" viewBox="0 0 32 40" fill="currentColor">
                  <path d="M 14 40 Q 16 20 18 10 Q 8 6 2 12 Q 16 12 18 10 Q 18 0 28 4 Q 20 10 18 10 Q 28 16 32 24 Q 22 18 18 10 L 16 40 Z" />
                </svg>
              )}
              {currentBiome.treeType === "cactus" && (
                <svg className="w-6 h-10 text-amber-900" viewBox="0 0 24 36" fill="currentColor">
                  <path d="M 10 36 L 10 6 A 2 2 0 0 1 14 6 L 14 14 L 18 14 A 2 2 0 0 1 20 16 L 20 22 L 18 22 L 18 18 L 14 18 L 14 36 Z M 10 16 L 6 16 A 2 2 0 0 0 4 18 L 4 24 L 6 24 L 6 20 L 10 20 Z" />
                </svg>
              )}
              {currentBiome.treeType === "oak" && (
                <svg className="w-7 h-11 text-emerald-900" viewBox="0 0 28 38" fill="currentColor">
                  <circle cx="14" cy="14" r="12" />
                  <rect x="12" y="24" width="4" height="14" fill="#5c382e" />
                </svg>
              )}
            </div>

            {/* Tree 2 */}
            <div className="anim-tree-2 absolute bottom-0">
              {currentBiome.treeType === "pine" && (
                <svg className="w-5 h-8 text-slate-600" viewBox="0 0 24 36" fill="currentColor">
                  <polygon points="12,2 2,16 6,16 1,26 8,26 8,36 16,36 16,26 23,26 18,16 22,16" />
                </svg>
              )}
              {currentBiome.treeType === "palm" && (
                <svg className="w-7 h-10 text-teal-700" viewBox="0 0 32 40" fill="currentColor">
                  <path d="M 14 40 Q 16 20 18 10 Q 8 6 2 12 Q 16 12 18 10 Q 18 0 28 4 Q 20 10 18 10 Q 28 16 32 24 Q 22 18 18 10 L 16 40 Z" />
                </svg>
              )}
              {currentBiome.treeType === "cactus" && (
                <svg className="w-5 h-8 text-amber-800" viewBox="0 0 24 36" fill="currentColor">
                  <path d="M 10 36 L 10 6 A 2 2 0 0 1 14 6 L 14 14 L 18 14 A 2 2 0 0 1 20 16 L 20 22 L 18 22 L 18 18 L 14 18 L 14 36 Z M 10 16 L 6 16 A 2 2 0 0 0 4 18 L 4 24 L 6 24 L 6 20 L 10 20 Z" />
                </svg>
              )}
              {currentBiome.treeType === "oak" && (
                <svg className="w-6 h-9 text-emerald-800" viewBox="0 0 28 38" fill="currentColor">
                  <circle cx="14" cy="14" r="11" />
                  <rect x="12" y="23" width="4" height="13" fill="#5c382e" />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Speech Bubble on Honk */}
        {honking && (
          <div className="absolute top-1 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1 rounded-full bg-clay text-white text-[0.7rem] sm:text-xs font-bold tracking-wider shadow-lg flex items-center gap-1.5 animate-bounce">
            <HornIcon className="w-3.5 h-3.5 text-white animate-pulse" />
            <span>{honkText}</span>
          </div>
        )}

        {/* Floating Music Notes on Honk */}
        {honking && (
          <div className="absolute bottom-16 left-28 sm:left-48 pointer-events-none z-30 flex items-center gap-2">
            <span className="text-clay" style={{ animation: "noteFloat 0.8s ease-out forwards" }}>
              <MusicNoteIcon className="w-3.5 h-3.5" />
            </span>
            <span className="text-moss" style={{ animation: "noteFloat 1s 0.15s ease-out forwards" }}>
              <MusicNoteIcon className="w-4 h-4" />
            </span>
          </div>
        )}

        {/* Van & Road Canvas */}
        <div className="absolute bottom-0 left-0 right-0 h-10 flex flex-col justify-end">
          
          <div className="relative mx-auto w-[min(94%,72rem)] h-full">
            
            {/* The Camper Van */}
            <div
              onClick={triggerHonk}
              className="anim-van group absolute bottom-2 left-6 sm:left-24 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
              title="Click the Wanderer Van to Honk!"
            >
              <div className="relative w-28 sm:w-36 h-14 sm:h-16">
                
                {/* Soundwave Ring on Honk */}
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
                  <line x1="30" y1="20" x2="115" y2="20" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="42" y1="20" x2="42" y2="26" stroke="#334155" strokeWidth="2.5" />
                  <line x1="72" y1="20" x2="72" y2="26" stroke="#334155" strokeWidth="2.5" />
                  <line x1="102" y1="20" x2="102" y2="26" stroke="#334155" strokeWidth="2.5" />
                  
                  {/* Suitcase */}
                  <rect x="36" y="9" width="30" height="11" rx="2" fill="#8d5b4c" stroke="#5c382e" strokeWidth="1" />
                  <line x1="45" y1="9" x2="45" y2="20" stroke="#fef08a" strokeWidth="1" />
                  <line x1="57" y1="9" x2="57" y2="20" stroke="#fef08a" strokeWidth="1" />
                  
                  {/* Bedroll */}
                  <ellipse cx="90" cy="14" rx="22" ry="5" fill="#405446" stroke="#253329" strokeWidth="1" />
                  <line x1="72" y1="14" x2="108" y2="14" stroke="#e9e2d4" strokeWidth="1.2" />

                  {/* Flag */}
                  <path d="M 28 20 L 28 4 L 14 11 Z" fill={currentBiome.vanBottom} style={{ animation: "flagWiggle 1s ease-in-out infinite" }} />
                  <line x1="28" y1="4" x2="28" y2="22" stroke="#475569" strokeWidth="1.5" />

                  {/* Van Top */}
                  <path d="M 24 45 L 24 30 Q 24 25 32 25 L 120 25 Q 134 25 142 36 L 148 45 Z" fill={currentBiome.vanTop} stroke="#17221d" strokeWidth="2.5" />
                  
                  {/* Van Bottom */}
                  <path d="M 24 45 L 152 45 Q 155 45 155 52 L 155 64 Q 155 68 150 68 L 138 68 Q 138 56 122 56 Q 106 56 106 68 L 56 68 Q 56 56 40 56 Q 24 56 24 68 L 18 68 Q 14 68 14 62 L 14 52 Q 14 45 24 45 Z" fill={currentBiome.vanBottom} stroke="#17221d" strokeWidth="2.5" />

                  {/* Windows */}
                  <path d="M 124 29 L 140 38 L 140 43 L 122 43 Z" fill="#93c5fd" opacity="0.85" stroke="#17221d" strokeWidth="1.5" />
                  <rect x="74" y="29" width="40" height="14" rx="2" fill="#93c5fd" opacity="0.85" stroke="#17221d" strokeWidth="1.5" />
                  <rect x="32" y="29" width="34" height="14" rx="2" fill="#93c5fd" opacity="0.85" stroke="#17221d" strokeWidth="1.5" />

                  {/* Traveler silhouette */}
                  <circle cx="94" cy="36" r="4.5" fill="#17221d" />
                  <ellipse cx="94" cy="44" rx="6" ry="3.5" fill="#17221d" />
                  <circle cx="106" cy="35" r="2.5" fill="#f59e0b" />

                  {/* Trim & Handle */}
                  <line x1="24" y1="46" x2="152" y2="46" stroke="#ffffff" strokeWidth="2" />
                  <rect x="66" y="49" width="7" height="2.5" rx="1" fill="#cbd5e1" stroke="#334155" strokeWidth="0.8" />

                  {/* Headlight */}
                  <circle cx="152" cy="53" r="4.5" fill="#fef08a" stroke="#17221d" strokeWidth="1.5" />
                  <circle cx="152" cy="53" r="2.5" fill="#ffffff" />
                  <rect x="13.5" y="50" width="3" height="7" rx="1" fill="#ef4444" />

                  {/* Bumpers */}
                  <rect x="146" y="62" width="12" height="5" rx="2.5" fill="#e2e8f0" stroke="#17221d" strokeWidth="1.5" />
                  <rect x="10" y="62" width="8" height="5" rx="2.5" fill="#e2e8f0" stroke="#17221d" strokeWidth="1.5" />

                  {/* Wheels */}
                  <g className="anim-wheel" style={{ transformOrigin: "40px 68px" }}>
                    <circle cx="40" cy="68" r="11" fill="#1f2937" stroke="#111827" strokeWidth="2" />
                    <circle cx="40" cy="68" r="5" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
                    <circle cx="40" cy="68" r="1.5" fill={currentBiome.vanBottom} />
                    <line x1="40" y1="63" x2="40" y2="73" stroke="#94a3b8" strokeWidth="1" />
                    <line x1="35" y1="68" x2="45" y2="68" stroke="#94a3b8" strokeWidth="1" />
                  </g>

                  <g className="anim-wheel" style={{ transformOrigin: "122px 68px" }}>
                    <circle cx="122" cy="68" r="11" fill="#1f2937" stroke="#111827" strokeWidth="2" />
                    <circle cx="122" cy="68" r="5" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
                    <circle cx="122" cy="68" r="1.5" fill={currentBiome.vanBottom} />
                    <line x1="122" y1="63" x2="122" y2="73" stroke="#94a3b8" strokeWidth="1" />
                    <line x1="117" y1="68" x2="127" y2="68" stroke="#94a3b8" strokeWidth="1" />
                  </g>
                </svg>
              </div>
            </div>

            {/* CONTROL CONSOLE (Each button has a COMPLETELY UNIQUE role) */}
            <div className="absolute right-2 sm:right-6 bottom-2 flex items-center gap-1.5 sm:gap-2 z-20">
              
              {/* BUTTON 2: Scenic Terrain Switcher ("Emerald Forest", "Pine Highlands", etc.) */}
              <button
                type="button"
                onClick={cycleBiome}
                className="flex items-center gap-1.5 rounded-full bg-white/95 hover:bg-white text-ink text-[0.7rem] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 shadow-sm border border-black/10 hover:border-moss hover:text-moss transition active:scale-95"
                title={`Terrain: ${currentBiome.name} (${currentBiome.subtitle}). Click to cycle scenery.`}
              >
                <TerrainIcon className="w-3.5 h-3.5 text-moss" />
                <span>{currentBiome.name}</span>
              </button>

              {/* Honk Horn Button */}
              <button
                type="button"
                onClick={triggerHonk}
                className="flex items-center gap-1.5 rounded-full bg-white/95 hover:bg-white text-ink text-[0.7rem] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 shadow-sm border border-black/10 hover:border-clay hover:text-clay transition active:scale-95"
                title="Honk the horn!"
              >
                <HornIcon className="w-3.5 h-3.5 text-clay" />
                <span>Honk</span>
              </button>

              {/* Speed Mode Toggle */}
              <button
                type="button"
                onClick={() => setSpeed(speed === "normal" ? "fast" : "normal")}
                className={`flex items-center gap-1.5 rounded-full text-[0.7rem] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 shadow-sm border transition active:scale-95 ${
                  speed === "fast"
                    ? "bg-clay text-white border-clay shadow-clay/30"
                    : "bg-white/95 hover:bg-white text-ink border-black/10 hover:border-clay"
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

              {/* BUTTON 3: Surprise Stay Lottery Button */}
              <button
                type="button"
                onClick={rollSurpriseStay}
                className="flex items-center gap-1.5 rounded-full bg-ink hover:bg-black text-sand text-[0.7rem] sm:text-xs font-bold px-3 sm:px-4 py-1.5 shadow-sm border border-white/20 transition hover:scale-105 active:scale-95"
                title="Draw a lucky stay lottery ticket with direct booking link!"
              >
                <TicketIcon className="w-3.5 h-3.5 text-sand" />
                <span>Surprise Stay</span>
              </button>

            </div>
          </div>

          {/* Road Strip */}
          <div
            className="relative w-full h-3 overflow-hidden border-t border-black/30 transition-colors duration-700"
            style={{ backgroundColor: currentBiome.roadColor }}
          >
            <div className="anim-road flex w-[200%] h-full items-center">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="flex-1 flex justify-center">
                  <div
                    className="w-8 sm:w-14 h-1 rounded-full opacity-80"
                    style={{ backgroundColor: currentBiome.dashColor }}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Lucky Stay Boarding Pass / Discovery Ticket Card (Triggered by BUTTON 3) */}
      {ticketNotice && luckyStay && (
        <div className="bg-white/95 backdrop-blur-md px-4 py-3 border-t border-ink/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs transition-all animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-clay text-white shrink-0">
              <TicketIcon className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[0.65rem] uppercase tracking-wider text-clay bg-clay/10 px-2 py-0.5 rounded-full">
                  Lucky Match
                </span>
                <span className="font-bold text-ink text-sm">{luckyStay.name}</span>
                <span className="flex items-center gap-0.5 text-amber-500 font-bold text-[0.7rem]">
                  <StarIcon className="w-3 h-3 fill-current" />
                  {luckyStay.rating}
                </span>
              </div>
              <p className="text-ink/65 text-[0.75rem] mt-0.5">
                {luckyStay.location} • <strong className="text-ink">{luckyStay.price}</strong> / night • {luckyStay.tag}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            <Link
              href={`/listings/${luckyStay.id}`}
              className="rounded-xl bg-clay hover:bg-[#9e442b] text-white px-3 py-1.5 font-bold transition shadow-sm inline-flex items-center gap-1.5"
            >
              <span>Explore This Stay</span>
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[2]">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href={`/listings/${luckyStay.id}`}
              className="rounded-xl bg-sand/80 hover:bg-sand text-ink px-3 py-1.5 font-bold transition"
            >
              View Listing
            </Link>
            <button
              type="button"
              onClick={rollSurpriseStay}
              className="rounded-xl bg-sand/60 hover:bg-sand text-ink px-3 py-1.5 font-bold transition"
            >
              Roll Again
            </button>
            <button
              type="button"
              onClick={() => setTicketNotice(false)}
              className="text-ink/40 hover:text-ink p-1 transition-colors"
              title="Dismiss ticket"
              aria-label="Dismiss ticket"
            >
              <CloseIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
