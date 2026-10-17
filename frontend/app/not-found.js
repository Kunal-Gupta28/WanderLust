import Link from "next/link";

export const metadata = {
  title: "404 — Lost Along the Trail | WanderLust",
  description: "The path you are looking for has wandered off the charts.",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-paper px-4 py-12 text-center text-ink sm:px-6 lg:px-8">
      {/* Background Decorative Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Soft radial atmospheric glow */}
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sand/40 blur-3xl" />
        <div className="absolute right-10 top-10 h-72 w-72 rounded-full bg-clay/5 blur-2xl" />

        {/* Drifting Clouds */}
        <div
          className="absolute top-12 left-0 text-sand/60"
          style={{ animation: "cloudFloatAcross 28s linear infinite" }}
        >
          <svg className="h-10 w-28 fill-current" viewBox="0 0 100 40">
            <path d="M20,35 Q10,35 10,25 Q10,15 22,15 Q25,8 35,8 Q45,8 48,15 Q55,10 65,12 Q75,15 75,25 Q82,25 82,32 Q82,35 75,35 Z" />
          </svg>
        </div>
        <div
          className="absolute top-36 left-0 text-sand/40"
          style={{ animation: "cloudFloatAcross 40s linear infinite", animationDelay: "-14s" }}
        >
          <svg className="h-14 w-40 fill-current" viewBox="0 0 100 40">
            <path d="M20,35 Q10,35 10,25 Q10,15 22,15 Q25,8 35,8 Q45,8 48,15 Q55,10 65,12 Q75,15 75,25 Q82,25 82,32 Q82,35 75,35 Z" />
          </svg>
        </div>

        {/* Hot Air Balloon drifting high */}
        <div
          className="absolute top-20 left-0"
          style={{ animation: "balloonDriftAcross 48s ease-in-out infinite" }}
        >
          <svg className="h-16 w-12 drop-shadow-sm" viewBox="0 0 60 80" fill="none">
            {/* Balloon Envelope */}
            <path
              d="M30 4 C16 4 6 16 6 32 C6 44 18 56 26 62 L34 62 C42 56 54 44 54 32 C54 16 44 4 30 4 Z"
              fill="#b95738"
            />
            {/* Balloon Stripes */}
            <path
              d="M30 4 C24 4 18 16 18 32 C18 44 24 56 28 62 L32 62 C36 56 42 44 42 32 C42 16 36 4 30 4 Z"
              fill="#d97757"
            />
            <path
              d="M30 4 C28 4 26 16 26 32 C26 44 28 56 29.5 62 L30.5 62 C32 56 34 44 34 32 C34 16 32 4 30 4 Z"
              fill="#f7f5ef"
            />
            {/* Basket ropes & Basket */}
            <line x1="26" y1="62" x2="27" y2="69" stroke="#17221d" strokeWidth="1.2" />
            <line x1="34" y1="62" x2="33" y2="69" stroke="#17221d" strokeWidth="1.2" />
            <rect x="25" y="69" width="10" height="7" rx="1.5" fill="#8c432b" />
          </svg>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
        
        {/* Animated Traveling Illustration Scene */}
        <div className="relative mb-6 flex h-48 w-full max-w-md items-center justify-center sm:h-56">
          {/* Circular Trail Backdrop */}
          <div className="absolute h-44 w-44 rounded-full border border-dashed border-clay/30 sm:h-52 sm:w-52" />
          <div className="absolute h-32 w-32 rounded-full border border-ink/10" />

          {/* SVG Flight Trail & Cruising Airplane */}
          <svg
            className="absolute inset-0 h-full w-full overflow-visible"
            viewBox="0 0 400 200"
            fill="none"
          >
            {/* Curved Flight Path */}
            <path
              id="travelFlightArc"
              d="M 30 160 Q 200 10 370 140"
              stroke="#b95738"
              strokeWidth="2"
              strokeDasharray="6 6"
              className="opacity-60"
              style={{
                strokeDashoffset: 48,
                animation: "mapRouteDash 2.5s linear infinite",
              }}
            />

            {/* Flight origin marker */}
            <circle cx="30" cy="160" r="4" fill="#405446" />
            <circle cx="30" cy="160" r="8" stroke="#405446" strokeWidth="1.5" className="opacity-40" />

            {/* Destination lost-pin marker (bouncing) */}
            <g transform="translate(370, 140)">
              <circle cx="0" cy="0" r="4" fill="#b95738" />
              <circle
                cx="0"
                cy="0"
                r="10"
                stroke="#b95738"
                strokeWidth="1.5"
                style={{ animation: "breathPulse 2s ease-in-out infinite" }}
              />
            </g>

            {/* Gliding Airplane cruising along the arc */}
            <g
              style={{
                animation: "airplaneCruise 6s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite",
              }}
            >
              <g transform="translate(-14, -10)">
                <path
                  d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                  fill="#17221d"
                  transform="rotate(65 12 12) scale(1.1)"
                />
              </g>
            </g>
          </svg>

          {/* Central Vintage Compass Dial */}
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-paper/90 shadow-lg border border-ink/15 backdrop-blur-sm sm:h-32 sm:w-32">
            {/* Outer Compass Degrees */}
            <span className="absolute top-1 text-[9px] font-bold tracking-widest text-clay">N</span>
            <span className="absolute bottom-1 text-[9px] font-bold tracking-widest text-ink/40">S</span>
            <span className="absolute left-1.5 text-[9px] font-bold tracking-widest text-ink/40">W</span>
            <span className="absolute right-1.5 text-[9px] font-bold tracking-widest text-ink/40">E</span>

            {/* Compass Dial Marks */}
            <div className="absolute inset-2 rounded-full border border-ink/10" />
            <div className="absolute inset-4 rounded-full border border-dashed border-sand" />

            {/* Wobbling Compass Needle */}
            <div
              className="relative flex h-16 w-3 items-center justify-center"
              style={{ animation: "compassWobble 4s ease-in-out infinite" }}
            >
              {/* North Pointer (Clay Red) */}
              <div
                className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[26px] border-b-clay absolute top-0"
              />
              {/* South Pointer (Dark Ink) */}
              <div
                className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[26px] border-t-ink/60 absolute bottom-0"
              />
              {/* Center Pivot Brass Pin */}
              <div className="z-10 h-3 w-3 rounded-full bg-sand border-2 border-ink shadow-sm" />
            </div>
          </div>
        </div>

        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-clay/10 px-4 py-1.5 text-xs font-bold tracking-widest text-clay uppercase">
          <span className="h-2 w-2 rounded-full bg-clay animate-ping" />
          <span>OFF THE BEATEN PATH • 404 DETOUR</span>
        </div>

        {/* Big 404 Number with Typography */}
        <div className="mt-3 flex items-center justify-center">
          <span className="font-display text-[clamp(4.5rem,14vw,8.5rem)] font-extrabold leading-none tracking-tight text-clay">
            4
          </span>
          <div className="mx-1 flex flex-col items-center justify-center">
            {/* Globe Icon replacing 0 */}
            <div className="relative flex h-14 w-14 sm:h-20 sm:w-20 items-center justify-center rounded-full border-2 border-dashed border-clay/40 bg-sand/30">
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 sm:h-12 sm:w-12 stroke-clay fill-none stroke-[1.6]"
                style={{ animation: "gentleSway 5s ease-in-out infinite" }}
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M2 12h20" />
              </svg>
            </div>
          </div>
          <span className="font-display text-[clamp(4.5rem,14vw,8.5rem)] font-extrabold leading-none tracking-tight text-clay">
            4
          </span>
        </div>

        {/* Catchy Headline */}
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
          This trail has wandered off the map.
        </h1>

        {/* Atmospheric Travel Description */}
        <p className="mt-4 max-w-lg text-base leading-relaxed text-ink/75 sm:text-lg">
          The sanctuary or itinerary you are searching for might have shifted location,
          been renamed, or simply ventured beyond uncharted territory. Let&apos;s guide you back to safe harbour.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <Link
            href="/"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-ink px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-moss hover:shadow-lg"
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
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-clay/40 bg-paper px-8 py-3.5 text-sm font-bold text-clay shadow-sm transition-all hover:bg-clay hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 stroke-current fill-none stroke-[2]"
            >
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
              <line x1="9" y1="3" x2="9" y2="18" />
              <line x1="15" y1="6" x2="15" y2="21" />
            </svg>
            <span>Explore Curated Stays</span>
          </Link>
        </div>

        {/* Cozy Quick Destinations Shortcuts */}
        <div className="mt-10 border-t border-ink/10 pt-6">
          <span className="text-xs font-bold uppercase tracking-wider text-ink/50">
            Or pick a favorite waypoint:
          </span>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            {[
              { label: "Trending", href: "/explore?category=Trending" },
              { label: "Mountain", href: "/explore?category=Mountain" },
              { label: "Beachfront", href: "/explore?category=Beachfront" },
              { label: "Cabins", href: "/explore?category=Cabins" },
              { label: "Our Philosophy", href: "/philosophy" },
            ].map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="rounded-full bg-sand/60 px-3.5 py-1.5 text-xs font-semibold text-ink/80 transition-colors hover:bg-clay/15 hover:text-clay"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Coordinates Footer */}
        <p className="mt-8 text-[11px] font-mono tracking-wider text-ink/40">
          COORD: 28°36&apos;50&quot;N 77°12&apos;30&quot;E • ALT: 216M • STATUS: EXPEDITION LOST
        </p>
      </div>

      {/* Scoped CSS Keyframes for the Airplane and Path Motion */}
      <style>{`
        @keyframes airplaneCruise {
          0% {
            transform: translate(30px, 160px) rotate(-35deg) scale(0.9);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translate(200px, 70px) rotate(-5deg) scale(1.05);
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(370px, 140px) rotate(30deg) scale(0.9);
            opacity: 0;
          }
        }
      `}</style>
    </main>
  );
}
