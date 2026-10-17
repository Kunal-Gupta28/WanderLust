"use client";

import { useState } from "react";
import ErrorBoundary, { ErrorDetourScene } from "../../components/error-boundary";
import Link from "next/link";

function BuggyComponent() {
  throw new Error("Simulated Expedition Turbulence: Component failed during mountain crossing!");
}

export default function ErrorPreviewPage() {
  const [shouldCrash, setShouldCrash] = useState(false);
  const [showLiveScene, setShowLiveScene] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  const sampleError = new Error(
    "NavigationRadarTimeout: Route lost along the coastal ridge. Detour protocol initiated."
  );
  sampleError.stack = `Error: NavigationRadarTimeout: Route lost along the coastal ridge.
    at WaypointNavigator (frontend/components/navigator.js:42:15)
    at renderWithHooks (react-dom.development.js:15486:18)
    at mountIndeterminateComponent (react-dom.development.js:20103:13)
    at beginWork (react-dom.development.js:21631:16)`;

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Top Banner for Demo Controls */}
      <div className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-ink/15 bg-white/90 px-6 py-3 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs font-bold text-ink/60 hover:text-clay transition-colors"
          >
            ← Back to Home
          </Link>
          <span className="h-4 w-px bg-ink/15" />
          <span className="text-xs font-bold uppercase tracking-wider text-clay">
            Error Boundary Interactive Sandbox
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setShouldCrash(false);
              setShowLiveScene((prev) => !prev);
            }}
            className="rounded-full border border-ink/20 px-3.5 py-1.5 text-xs font-bold text-ink hover:bg-sand/40 transition-colors"
          >
            {showLiveScene ? "View Buggy Component Test" : "View Live Detour Scene"}
          </button>

          {!showLiveScene && (
            <button
              onClick={() => setShouldCrash(true)}
              className="rounded-full bg-clay px-4 py-1.5 text-xs font-bold text-white hover:bg-[#9e442b] transition-all shadow-sm"
            >
              💥 Trigger Real Runtime Crash
            </button>
          )}
        </div>
      </div>

      {/* Render Mode 1: Direct Scene Display */}
      {showLiveScene ? (
        <ErrorDetourScene
          error={sampleError}
          onReset={() => alert("Recalibrate Course triggered! Resetting voyage state...")}
          showDetails={showDetails}
          toggleDetails={() => setShowDetails(!showDetails)}
        />
      ) : (
        /* Render Mode 2: Live React ErrorBoundary wrapper catching real error */
        <div className="p-8">
          <div className="mx-auto max-w-xl rounded-3xl border border-ink/15 bg-white p-8 text-center shadow-md">
            <h2 className="font-display text-2xl font-bold text-ink">
              Live React ErrorBoundary Harness
            </h2>
            <p className="mt-2 text-sm text-ink/70">
              Click the button below to intentionally throw a Javascript error inside a child component.
              The project&apos;s ErrorBoundary will intercept the crash and render the traveling animation.
            </p>

            <button
              onClick={() => setShouldCrash(true)}
              className="mt-6 rounded-full bg-clay px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#9e442b] transition-all"
            >
              Trigger Component Crash
            </button>
          </div>

          <div className="mt-8">
            <ErrorBoundary onReset={() => setShouldCrash(false)}>
              {shouldCrash ? (
                <BuggyComponent />
              ) : (
                <div className="mx-auto max-w-md rounded-2xl border border-dashed border-ink/20 p-6 text-center text-xs text-ink/50">
                  Child component is currently stable and healthy.
                </div>
              )}
            </ErrorBoundary>
          </div>
        </div>
      )}
    </div>
  );
}
