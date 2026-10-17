"use client";

import { useMemo, useState } from "react";
import { CheckIcon } from "./icons";

// Fallback accurate coordinates for worldwide stays [lng, lat]
const CITY_COORDS = {
  jaipur: [75.7873, 26.9124],
  varkala: [76.7164, 8.7379],
  munnar: [77.0595, 10.0889],
  pondicherry: [79.8083, 11.9416],
  mumbai: [72.8777, 19.0760],
  amsterdam: [4.9041, 52.3676],
  mukteshwar: [79.6469, 29.4722],
  "tirthan valley": [77.3486, 31.6425],
  udaipur: [73.7125, 24.5854],
  inverness: [-4.2247, 57.4778],
  wayanad: [76.1320, 11.6854],
  goa: [73.8180, 15.2993],
  spiti: [78.0338, 32.2461],
  bhopal: [77.4126, 23.2599],
  nashik: [73.7898, 19.9975],
  bordeaux: [-0.5792, 44.8378],
  tromsø: [18.9553, 69.6492],
  tromso: [18.9553, 69.6492],
  reykjavík: [-21.9426, 64.1466],
  reykjavik: [-21.9426, 64.1466],
  jaisalmer: [70.9083, 26.9157],
  coorg: [75.7382, 12.3375],
  alappuzha: [76.3388, 9.4981],
  paros: [25.1531, 37.0856],
  kodaikanal: [77.4892, 10.2381],
  pushkar: [74.5511, 26.4897],
  lisbon: [-9.1393, 38.7223],
  gulmarg: [74.3805, 34.0484],
  coonoor: [76.7959, 11.3530],
  "koh samui": [100.0136, 9.5120],
  bali: [115.1889, -8.4095],
  kyoto: [135.7681, 35.0116],
  tuscany: [11.2558, 43.7696],
  zanskar: [76.8773, 33.5462],
  queenstown: [168.6626, -45.0312],
  santorini: [25.4615, 36.3932],
  manali: [77.1892, 32.2396],
  rishikesh: [78.2676, 30.0869],
  shimla: [77.1734, 31.1048],
  darjeeling: [88.2663, 27.0410],
  ooty: [76.6932, 11.4102],
  paris: [2.3522, 48.8566],
  london: [-0.1278, 51.5074],
  "new york": [-74.0060, 40.7128],
  tokyo: [139.6917, 35.6895],
  rome: [12.4964, 41.9028],
  barcelona: [2.1734, 41.3851],
  "cape town": [18.4241, -33.9249],
  sydney: [151.2093, -33.8688],
  dubai: [55.2708, 25.2048],
  maldives: [73.5093, 4.1755],
  zurich: [8.5417, 47.3769],
  venice: [12.3155, 45.4408],
  florence: [11.2558, 43.7696],
  agra: [78.0081, 27.1767],
  varanasi: [82.9739, 25.3176],
  hampi: [76.4600, 15.3350],
  leh: [77.5771, 34.1526],
  kasol: [77.3150, 32.0100],
  mussoorie: [78.0700, 30.4598],
};

export default function ListingMap({ listing }) {
  const [copiedCoords, setCopiedCoords] = useState(false);

  const { lat, lng } = useMemo(() => {
    const rawCoords = listing?.geometry?.coordinates;
    if (
      Array.isArray(rawCoords) &&
      rawCoords.length === 2 &&
      (rawCoords[0] !== 0 || rawCoords[1] !== 0)
    ) {
      return { lng: rawCoords[0], lat: rawCoords[1] };
    }

    // Fallback based on city name
    const locKey = (listing?.location || "").trim().toLowerCase();
    const cityCoord = CITY_COORDS[locKey];
    if (cityCoord) {
      return { lng: cityCoord[0], lat: cityCoord[1] };
    }

    // Default safe fallback (Jaipur / Rajasthan cultural center)
    return { lng: 75.7873, lat: 26.9124 };
  }, [listing]);

  // OpenStreetMap embed URL with tight bounding box and marker
  const deltaLng = 0.028;
  const deltaLat = 0.018;
  const bbox = `${lng - deltaLng}%2C${lat - deltaLat}%2C${lng + deltaLng}%2C${lat + deltaLat}`;
  const mapEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const googleDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const appleMapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(
    listing?.title || listing?.location || "Stay"
  )}&ll=${lat},${lng}`;

  const copyCoordinates = () => {
    const text = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedCoords(true);
      setTimeout(() => setCopiedCoords(false), 2200);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Location Header */}
      <div>
        <span className="text-xs font-bold text-clay uppercase tracking-widest">
          Location & Surroundings
        </span>
        <h2 className="font-display text-3xl md:text-4xl mt-1 text-ink">
          Where you&apos;ll be
        </h2>
        <p className="text-sm md:text-base text-ink/70 font-medium mt-1">
          {listing.location}, {listing.country}
        </p>
      </div>

      {/* Interactive Map Canvas */}
      <div className="relative rounded-[2rem] overflow-hidden border border-ink/15 shadow-xl bg-sand/60 h-[420px] md:h-[460px] group">
        <iframe
          title={`Map location of ${listing.title}`}
          src={mapEmbedUrl}
          className="w-full h-full border-0 grayscale-[15%] contrast-[105%]"
          loading="lazy"
          allowFullScreen
        />

        {/* Floating Sanctuary Badge */}
        <div className="absolute top-4 left-4 z-10 max-w-[85%] sm:max-w-md bg-paper/95 backdrop-blur-md p-3.5 rounded-2xl border border-ink/10 shadow-lg flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-clay text-white flex items-center justify-center shrink-0 shadow-md">
            <svg
              className="w-5 h-5 stroke-[2.2]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-moss animate-pulse" />
              <span className="text-[10px] font-bold text-moss uppercase tracking-wider">
                Sanctuary Pin
              </span>
            </div>
            <p className="font-bold text-xs sm:text-sm text-ink truncate">
              {listing.title}
            </p>
            <p className="text-[11px] font-mono text-ink/60">
              {lat.toFixed(4)}° N, {lng.toFixed(4)}° E
            </p>
          </div>
        </div>

        {/* Quick Directions Button (Floating Bottom-Right) */}
        <a
          href={googleDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 z-10 px-4 py-2.5 rounded-full bg-ink hover:bg-moss text-white text-xs font-bold shadow-xl transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
        >
          <svg
            className="w-4 h-4 stroke-[2]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          <span>Get Directions</span>
        </a>
      </div>

      {/* External Map Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-white border border-ink/15 hover:border-ink/40 text-xs font-bold text-ink transition shadow-sm flex items-center gap-2 hover:bg-sand/40"
          >
            <svg className="w-3.5 h-3.5 text-clay" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span>Open in Google Maps</span>
          </a>

          <a
            href={appleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-white border border-ink/15 hover:border-ink/40 text-xs font-bold text-ink transition shadow-sm flex items-center gap-2 hover:bg-sand/40"
          >
            <svg className="w-3.5 h-3.5 text-ink" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.66-.82 1.11-1.96.99-3.11-1 .04-2.16.67-2.84 1.48-.59.69-1.12 1.83-.98 2.94 1.11.09 2.19-.58 2.83-1.31z" />
            </svg>
            <span>Open in Apple Maps</span>
          </a>

          <button
            type="button"
            onClick={copyCoordinates}
            className="px-4 py-2 rounded-xl bg-white border border-ink/15 hover:border-ink/40 text-xs font-bold text-ink transition shadow-sm flex items-center gap-2 hover:bg-sand/40 cursor-pointer"
          >
            {copiedCoords ? (
              <>
                <CheckIcon className="w-3.5 h-3.5 text-moss stroke-[3]" />
                <span className="text-moss">Coordinates Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 text-ink/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy Coordinates</span>
              </>
            )}
          </button>
        </div>

        <span className="text-xs font-mono text-ink/50">
          GPS: {lat.toFixed(4)}, {lng.toFixed(4)}
        </span>
      </div>

      {/* Neighborhood Highlights Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-2xl bg-white border border-ink/10 shadow-sm flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-sand text-ink flex items-center justify-center shrink-0 text-sm">
            🚶
          </div>
          <div>
            <h4 className="font-bold text-xs text-ink">Walkable Haven</h4>
            <p className="text-[11px] text-ink/65 mt-0.5 leading-snug">
              Scenic lanes, heritage architecture & sunset promenade.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-ink/10 shadow-sm flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-sand text-ink flex items-center justify-center shrink-0 text-sm">
            ☕
          </div>
          <div>
            <h4 className="font-bold text-xs text-ink">Artisan Dining</h4>
            <p className="text-[11px] text-ink/65 mt-0.5 leading-snug">
              Specialty roast cafés & organic farm-to-table eateries.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-ink/10 shadow-sm flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-sand text-ink flex items-center justify-center shrink-0 text-sm">
            🚗
          </div>
          <div>
            <h4 className="font-bold text-xs text-ink">Seamless Transit</h4>
            <p className="text-[11px] text-ink/65 mt-0.5 leading-snug">
              Dedicated parking with direct taxi and cab connectivity.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Notice Card */}
      <div className="p-4 rounded-2xl bg-sand/30 border border-ink/10 flex items-center gap-3 text-xs text-ink/70">
        <span className="w-6 h-6 rounded-full bg-clay/10 text-clay flex items-center justify-center shrink-0 font-bold">
          ℹ
        </span>
        <p>
          <strong>Privacy note:</strong> Exact house address and smart lockbox
          access instructions are sent immediately upon booking confirmation to
          preserve quiet seclusion.
        </p>
      </div>
    </div>
  );
}
