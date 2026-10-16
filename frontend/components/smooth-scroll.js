"use client";

import { useEffect, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Lenis from "lenis";

function ScrollWatcher({ lenisRef }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Whenever route or search query parameters change, immediately scroll to page top
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [pathname, searchParams, lenisRef]);

  return null;
}

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Prevent browser from automatically restoring previous scroll offset on navigation
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({
      duration: 1.0,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Ensure initial load starts at top
    lenis.scrollTo(0, { immediate: true });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <ScrollWatcher lenisRef={lenisRef} />
      </Suspense>
      {children}
    </>
  );
}
