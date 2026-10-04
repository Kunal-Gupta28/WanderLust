"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="bg-ink text-white/80 py-16 md:py-24 px-[clamp(1.25rem,4vw,4.5rem)] section-reveal border-t border-white/10"
    >
      <div className="max-w-[90rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Branding */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="text-3xl font-display text-white tracking-[-.06em]">
              Wander<span className="text-sand">Lust</span>
            </Link>
            <p className="text-sm max-w-xs text-white/70 leading-relaxed">
              Thoughtfully chosen stays for people who travel to feel somewhere new. Go gently, travel deeply.
            </p>
            <div className="flex gap-4 mt-2 text-xs font-semibold text-sand">
              <span className="cursor-pointer hover:text-white transition-colors">Twitter</span>
              <span className="cursor-pointer hover:text-white transition-colors">Instagram</span>
              <span className="cursor-pointer hover:text-white transition-colors">LinkedIn</span>
              <span className="cursor-pointer hover:text-white transition-colors">Pinterest</span>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold text-base mb-6">Company</h3>
            <ul className="flex flex-col gap-3.5 text-sm">
              <li><Link href="/about" className="text-white/75 hover:text-sand transition-colors">About Us</Link></li>
              <li><Link href="/philosophy" className="text-white/75 hover:text-sand transition-colors">Our Philosophy</Link></li>
              <li><Link href="/careers" className="text-white/75 hover:text-sand transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-white font-bold text-base mb-6">Destinations</h3>
            <ul className="flex flex-col gap-3.5 text-sm">
              <li><Link href="/explore" className="text-white/75 hover:text-sand transition-colors">All Stays</Link></li>
              <li><Link href="/explore/mountains" className="text-white/75 hover:text-sand transition-colors">Mountains</Link></li>
              <li><Link href="/explore/domes" className="text-white/75 hover:text-sand transition-colors">Domes</Link></li>
              <li><Link href="/explore/castles" className="text-white/75 hover:text-sand transition-colors">Castles</Link></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="text-white font-bold text-base mb-6">Support & Legal</h3>
            <ul className="flex flex-col gap-3.5 text-sm">
              <li><Link href="/faq" className="text-white/75 hover:text-sand transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-white/75 hover:text-sand transition-colors">Contact Us</Link></li>
              <li><Link href="/terms" className="text-white/75 hover:text-sand transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-white/75 hover:text-sand transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-white/60">
          <p>© {new Date().getFullYear()} WanderLust. Made with care for curious travelers.</p>
          <button 
            onClick={scrollToTop}
            className="hover:text-sand transition-colors flex items-center gap-1 font-semibold"
          >
            <span>Back to top</span>
            <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[2]">
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
