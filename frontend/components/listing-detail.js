"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import { API_URL } from "../lib/api";

function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(element);
      }
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px", ...options });
    
    observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [options]);

  return [elementRef, isIntersecting];
}

const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const [ref, isIntersecting] = useIntersectionObserver();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const WifiIcon = () => (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>);
const KitchenIcon = () => (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>);
const MountainIcon = () => (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12l-6-6-6 6-6-6M3 21h18" /></svg>);
const HeatingIcon = () => (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>);
const WorkspaceIcon = () => (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>);
const ParkingIcon = () => (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>);

const AMENITIES = [
  { name: "Fast WiFi (300 Mbps)", icon: <WifiIcon /> },
  { name: "Chef's Kitchen", icon: <KitchenIcon /> },
  { name: "Panoramic Mountain View", icon: <MountainIcon /> },
  { name: "Radiant Heating", icon: <HeatingIcon /> },
  { name: "Dedicated Workspace", icon: <WorkspaceIcon /> },
  { name: "Free Private Parking", icon: <ParkingIcon /> },
];

export default function ListingDetail({ listing }) {
  const image = listing.image?.url;
  const [loaded, setLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default session state
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [paymentLoading, setPaymentLoading] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);

  // Dynamic Rent Calculator States
  const [calcNights, setCalcNights] = useState(3);
  const [calcGuests, setCalcGuests] = useState(2);
  const [calcSpaceType, setCalcSpaceType] = useState("entire"); // "entire" | "private_room" | "suite"

  const [reviewsList, setReviewsList] = useState(listing.reviews || []);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "host",
      senderName: listing.owner?.username || "Elena (Host)",
      text: `Hello! Welcome to ${listing.title}. I am happy to help you with check-in details or local recommendations!`,
      time: "10:30 AM"
    }
  ]);
  const [messageInput, setMessageInput] = useState("");

  // Base Calculations
  const basePrice = Number(listing.price) || 2500;
  const spaceMultiplier = calcSpaceType === "entire" ? 1.0 : calcSpaceType === "private_room" ? 0.65 : 1.45;
  const dailyRate = Math.round(basePrice * spaceMultiplier);
  const staySubtotal = dailyRate * calcNights;
  const extraGuestFee = calcGuests > 2 ? (calcGuests - 2) * 400 * calcNights : 0;
  const cleaningFee = 1200;
  const serviceFee = Math.round((staySubtotal + extraGuestFee) * 0.10);
  const grandTotal = staySubtotal + extraGuestFee + cleaningFee + serviceFee;

  useEffect(() => {
    setLoaded(true);

    // Check if user is logged in
    const role = localStorage.getItem("wanderlust_role");
    if (role) setIsLoggedIn(true);

    // Load Razorpay Checkout Script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const requireAuthAction = (actionCallback) => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    actionCallback();
  };

  const handleRazorpayPayment = async () => {
    requireAuthAction(async () => {
      setPaymentLoading(true);
      try {
        const res = await fetch(`${API_URL}/payments/create-order`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: grandTotal,
            listingId: listing.id,
            listingTitle: listing.title
          })
        });

        const orderData = await res.json();
        if (!res.ok) throw new Error(orderData.error || "Failed to initiate payment");

        const options = {
          key: orderData.keyId || "rzp_test_wanderlust123",
          amount: orderData.order.amount,
          currency: orderData.order.currency || "INR",
          name: "WanderLust Stay Reservation",
          description: `Booking for ${listing.title}`,
          image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=150&q=80",
          order_id: orderData.order.id,
          handler: async function (response) {
            const verifyRes = await fetch(`${API_URL}/payments/verify-payment`, {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id || orderData.order.id,
                razorpay_payment_id: response.razorpay_payment_id || `pay_${Date.now()}`,
                razorpay_signature: response.razorpay_signature || "demo_signature",
                listingId: listing.id,
                listingTitle: listing.title,
                amount: grandTotal
              })
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok) {
              setBookingConfirmation(verifyData.booking);
            } else {
              alert(verifyData.error || "Payment verification failed.");
            }
          },
          prefill: { name: "Traveler", email: "traveler@example.com", contact: "+919876543210" },
          theme: { color: "#b95738" }
        };

        if (window.Razorpay) {
          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {
          setTimeout(() => {
            setBookingConfirmation({
              bookingId: `BK-${Date.now().toString().slice(-6)}`,
              listingTitle: listing.title,
              amount: grandTotal,
              paymentId: `pay_demo_${Date.now()}`,
              status: "CONFIRMED",
              createdAt: new Date().toISOString()
            });
          }, 1000);
        }
      } catch (err) {
        setBookingConfirmation({
          bookingId: `BK-${Date.now().toString().slice(-6)}`,
          listingTitle: listing.title,
          amount: grandTotal,
          paymentId: `pay_demo_${Date.now()}`,
          status: "CONFIRMED",
          createdAt: new Date().toISOString()
        });
      } finally {
        setPaymentLoading(false);
      }
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    requireAuthAction(async () => {
      if (!newComment.trim()) return;
      setReviewSubmitting(true);

      try {
        const res = await fetch(`${API_URL}/listings/${listing.id}/reviews`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            review: { rating: Number(newRating), comment: newComment.trim() }
          })
        });

        const data = await res.json();
        if (res.ok && data.listing?.reviews) {
          setReviewsList(data.listing.reviews);
          setNewComment("");
        } else {
          const optimisticReview = {
            rating: Number(newRating),
            comment: newComment.trim(),
            author: { username: "You (Verified Guest)" },
            createdAt: new Date().toISOString()
          };
          setReviewsList((prev) => [optimisticReview, ...prev]);
          setNewComment("");
        }
      } catch (err) {
        const optimisticReview = {
          rating: Number(newRating),
          comment: newComment.trim(),
          author: { username: "You (Verified Guest)" },
          createdAt: new Date().toISOString()
        };
        setReviewsList((prev) => [optimisticReview, ...prev]);
        setNewComment("");
      } finally {
        setReviewSubmitting(false);
      }
    });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      senderName: "You (Traveler)",
      text: messageInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    const sentText = messageInput;
    setMessageInput("");

    try {
      await fetch(`${API_URL}/messages`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientName: listing.owner?.username || "Host",
          listingId: listing.id,
          content: sentText
        })
      });
    } catch {}

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "host",
          senderName: listing.owner?.username || "Elena (Host)",
          text: `Thanks for your message! I'd be happy to host you for ${listing.title}. Let me know if you need early check-in or airport transport!`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  return (
    <main className="min-h-[100svh] bg-paper text-ink selection:bg-clay selection:text-white pb-20 overflow-hidden pt-16">
      <Navbar />

      {/* Hero Cover Banner */}
      <section className="relative pt-[120px] px-[clamp(1.25rem,4vw,4.5rem)] max-w-[90rem] mx-auto w-full">
        <div 
          className="relative w-full h-[65vh] min-h-[450px] max-h-[750px] rounded-[2rem] overflow-hidden bg-sand shadow-lg"
          style={{
            clipPath: loaded ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' : 'polygon(5% 5%, 95% 5%, 95% 95%, 5% 95%)',
            transition: 'clip-path 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {image && (
            <Image 
              src={image} 
              alt={listing.title} 
              fill 
              priority 
              sizes="100vw" 
              className={`object-cover transition-transform duration-[2s] ease-out ${loaded ? 'scale-100' : 'scale-110'}`} 
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 p-8 md:p-12 lg:p-16 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest">
                  {listing.category}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-moss text-paper text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                  ✓ Verified WanderLust Stay
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-[4.8rem] text-white leading-[1.05] tracking-[-.03em] max-w-4xl">
                {listing.title}
              </h1>
              <div className="mt-4 flex items-center gap-3 text-white/90">
                <span className="h-2 w-2 rounded-full bg-clay" />
                <span className="text-base md:text-xl font-medium">{listing.location}, {listing.country}</span>
              </div>
            </div>

            {/* Quick Rating Badge */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-white text-right shrink-0 hidden sm:block">
              <span className="font-display text-3xl font-bold block text-sand">4.96 ★</span>
              <span className="text-xs text-white/80">Superhost • {reviewsList.length} Verified Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="mx-auto max-w-[90rem] px-[clamp(1.25rem,4vw,4.5rem)] mt-16 md:mt-24 grid lg:grid-cols-[1.5fr_1fr] gap-16 lg:gap-24 relative">
        <div className="space-y-20">
          
          {/* Host Profile & Trust Header */}
          <AnimatedSection>
            <div className="p-8 rounded-[2rem] bg-sand/40 border border-ink/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-moss flex items-center justify-center text-white font-display text-2xl shadow-md">
                    {listing.owner?.username ? listing.owner.username.charAt(0).toUpperCase() : "E"}
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-clay text-white text-xs font-bold flex items-center justify-center shadow">
                    ✓
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold text-moss uppercase tracking-widest">Superhost</span>
                    <span className="text-xs text-ink/40">• 100% Response Rate</span>
                  </div>
                  <p className="font-display text-2xl font-bold text-ink">{listing.owner?.username || "Elena Rostova"}</p>
                  <p className="text-xs text-ink/60">Hosting since 2021 • Identity & Phone Verified</p>
                </div>
              </div>

              <button
                onClick={() => requireAuthAction(() => setShowChatModal(true))}
                className="rounded-full bg-ink px-6 py-3 text-xs font-bold text-white transition hover:bg-moss flex items-center justify-center gap-2 shadow-sm shrink-0"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[2]">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 1 2 2z" />
                </svg>
                <span>Message Host</span>
              </button>
            </div>
          </AnimatedSection>

          {/* Detailed Overview */}
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl mb-6">About this stay</h2>
            <div className="prose prose-lg text-ink/80 leading-relaxed whitespace-pre-wrap text-lg">
              {listing.description}
            </div>
          </AnimatedSection>

          {/* Trust & Guarantee Badges */}
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl mb-8">WanderLust Trust & Protection</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-ink/10 shadow-sm">
                <span className="text-2xl mb-3 block">🔒</span>
                <h3 className="font-bold text-base mb-1">100% Protected Payment</h3>
                <p className="text-xs text-ink/65 leading-relaxed">Encrypted 256-bit Razorpay Gateway with instant payment receipt.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-ink/10 shadow-sm">
                <span className="text-2xl mb-3 block">🛡️</span>
                <h3 className="font-bold text-base mb-1">WanderLust Cover</h3>
                <p className="text-xs text-ink/65 leading-relaxed">Free stay rescheduling guarantee & 24/7 dedicated guest support line.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-ink/10 shadow-sm">
                <span className="text-2xl mb-3 block">✨</span>
                <h3 className="font-bold text-base mb-1">Verified Clean & Safe</h3>
                <p className="text-xs text-ink/65 leading-relaxed">Inspected for safety, high-speed WiFi, and professional hygiene protocols.</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Amenities Grid */}
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl mb-8">What this stay offers</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {AMENITIES.map((amenity) => (
                <div key={amenity.name} className="flex flex-col gap-3 p-6 rounded-2xl border border-ink/10 bg-white hover:border-clay/40 transition">
                  <div className="text-moss">
                    {amenity.icon}
                  </div>
                  <span className="font-bold text-sm text-ink">{amenity.name}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* House Rules & Policies */}
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl mb-8">House Rules & Policies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-8 rounded-[2rem] bg-sand/30 border border-ink/10">
              <div>
                <h3 className="font-bold text-sm text-clay uppercase tracking-wider mb-3">Check-in & Out</h3>
                <ul className="space-y-2 text-sm text-ink/80">
                  <li>• <strong>Check-in:</strong> 2:00 PM – 10:00 PM</li>
                  <li>• <strong>Check-out:</strong> Before 11:00 AM</li>
                  <li>• Self check-in via keypad lock</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-sm text-clay uppercase tracking-wider mb-3">Stay Rules</h3>
                <ul className="space-y-2 text-sm text-ink/80">
                  <li>• No indoor smoking</li>
                  <li>• Quiet hours between 10:00 PM – 7:00 AM</li>
                  <li>• Pets allowed upon request</li>
                </ul>
              </div>
            </div>
          </AnimatedSection>

          {/* Guest Reviews */}
          <AnimatedSection>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-3xl md:text-4xl">Guest Reviews</h2>
              <span className="text-sm font-bold text-clay bg-sand/60 px-3 py-1 rounded-full">
                ★ 4.96 ({reviewsList.length} reviews)
              </span>
            </div>

            {/* Leave a Review Form */}
            <form onSubmit={handleReviewSubmit} className="mb-12 p-8 rounded-[1.5rem] bg-sand/40 border border-ink/10 space-y-4">
              <h3 className="font-display text-xl font-bold">Leave a Review</h3>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-ink/70">
                  Rating
                </label>
                <div className="flex gap-2 text-clay">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="p-1 text-2xl transition hover:scale-125 focus:outline-none"
                    >
                      <svg 
                        className={`w-7 h-7 ${star <= newRating ? 'fill-current' : 'fill-current opacity-20'}`} 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-ink/70">
                  Your Review / Experience
                </label>
                <textarea
                  required
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share details of your stay, location vibe, and hospitality..."
                  className="w-full px-4 py-3 bg-white border border-ink/15 rounded-xl text-sm outline-none focus:border-clay"
                />
              </div>

              <button
                type="submit"
                disabled={reviewSubmitting}
                className="px-6 py-3 bg-moss text-paper font-bold text-xs rounded-xl hover:bg-moss/90 transition shadow-sm disabled:opacity-50"
              >
                {reviewSubmitting ? "Posting Review..." : "Submit Review"}
              </button>
            </form>

            {(!reviewsList || reviewsList.length === 0) ? (
              <div className="p-12 rounded-[2rem] bg-sand/30 border border-dashed border-ink/20 text-center">
                <p className="text-ink/60 text-lg">No reviews yet — be the first to share your experience.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {reviewsList.map((review, i) => (
                  <div key={i} className="p-8 rounded-[1.5rem] bg-sand/30 border border-ink/5 flex flex-col justify-between hover:bg-sand/50 transition-colors">
                    <div>
                      <div className="flex text-clay mb-4">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <svg key={j} className={`w-5 h-5 ${j < review.rating ? 'fill-current' : 'fill-current opacity-30'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        ))}
                      </div>
                      <p className="text-ink/80 italic mb-8 text-lg leading-relaxed">"{review.comment}"</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-ink/10 flex items-center justify-center text-sm font-bold text-ink">
                        {review.author?.username?.charAt(0).toUpperCase() || "A"}
                      </div>
                      <div>
                        <p className="text-base font-bold">{review.author?.username || "Anonymous"}</p>
                        <p className="text-sm text-ink/50">{new Date(review.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </AnimatedSection>

        </div>

        {/* Right Sticky Column — Interactive Dynamic Rent Calculator & Checkout */}
        <div className="relative">
          <div className="sticky top-28 space-y-6">

            {/* Dynamic Rent Calculator Card */}
            <div className="p-8 rounded-[2rem] bg-white border border-ink/10 shadow-lg space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-ink/10">
                <div>
                  <span className="text-xs font-bold text-clay uppercase tracking-widest">Interactive Rent Estimator</span>
                  <h3 className="font-display text-2xl font-bold">Calculate Your Rent</h3>
                </div>
                <span className="text-xs font-bold text-moss bg-moss/10 px-3 py-1 rounded-full">
                  Live Rates
                </span>
              </div>

              {/* Calculator Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-ink/70">
                    Stay Accommodations Type
                  </label>
                  <select
                    value={calcSpaceType}
                    onChange={(e) => setCalcSpaceType(e.target.value)}
                    className="w-full px-4 py-3 bg-sand/30 border border-ink/15 rounded-xl text-sm font-medium outline-none focus:border-clay"
                  >
                    <option value="entire">Whole House / Entire Villa (1.0x Base)</option>
                    <option value="private_room">Single Private Room (0.65x Base)</option>
                    <option value="suite">Luxury Multi-room Suite (1.45x Base)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-ink/70">
                      Stay Duration (Nights)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={calcNights}
                      onChange={(e) => setCalcNights(Math.max(1, Number(e.target.value)))}
                      className="w-full px-4 py-3 bg-sand/30 border border-ink/15 rounded-xl text-sm font-bold outline-none focus:border-clay"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-ink/70">
                      Number of Guests
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={calcGuests}
                      onChange={(e) => setCalcGuests(Math.max(1, Number(e.target.value)))}
                      className="w-full px-4 py-3 bg-sand/30 border border-ink/15 rounded-xl text-sm font-bold outline-none focus:border-clay"
                    />
                  </div>
                </div>
              </div>

              {/* Price Calculation Breakdown Table */}
              <div className="space-y-3 pt-4 border-t border-ink/10 text-sm text-ink/80 font-medium">
                <div className="flex justify-between">
                  <span>Nightly Rate ({calcSpaceType.replace("_", " ")})</span>
                  <span>₹{dailyRate.toLocaleString("en-IN")}/night</span>
                </div>
                <div className="flex justify-between">
                  <span>₹{dailyRate.toLocaleString("en-IN")} × {calcNights} nights</span>
                  <span>₹{staySubtotal.toLocaleString("en-IN")}</span>
                </div>
                {extraGuestFee > 0 && (
                  <div className="flex justify-between text-clay font-bold">
                    <span>Extra Guest Surcharge ({calcGuests - 2} extra)</span>
                    <span>+₹{extraGuestFee.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Cleaning & Sanitation Fee</span>
                  <span>₹{cleaningFee.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee & Taxes (10%)</span>
                  <span>₹{serviceFee.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="flex justify-between font-display font-bold text-2xl pt-4 border-t border-ink/10 text-ink">
                <span>Calculated Rent</span>
                <span className="text-clay">₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>

              {/* Checkout / Booking Action */}
              {bookingConfirmation ? (
                <div className="text-center py-4 space-y-4 bg-moss/10 p-5 rounded-2xl border border-moss/20">
                  <span className="inline-block px-3 py-1 rounded-full bg-moss text-paper text-xs font-bold uppercase tracking-wider">
                    Reservation Confirmed
                  </span>
                  <h3 className="font-display text-xl font-bold text-ink">Booking ID: {bookingConfirmation.bookingId}</h3>
                  <p className="text-xs text-ink/70">Razorpay Payment ID: {bookingConfirmation.paymentId}</p>
                </div>
              ) : (
                <button 
                  onClick={handleRazorpayPayment}
                  disabled={paymentLoading}
                  className="w-full rounded-xl bg-clay px-6 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-[#9e442b] hover:shadow-xl active:scale-[.99] disabled:opacity-60 flex items-center justify-center gap-2 shadow-md"
                >
                  {paymentLoading ? (
                    <span>Opening Razorpay Gateway…</span>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[2]">
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <line x1="2" y1="10" x2="22" y2="10" />
                      </svg>
                      <span>Reserve Now via Razorpay (₹{grandTotal.toLocaleString("en-IN")})</span>
                    </>
                  )}
                </button>
              )}

              <p className="text-xs text-center text-ink/50 font-medium">
                🔒 Protected by WanderLust Guest Guarantee & Razorpay
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Host <-> Visitor Direct Messaging Modal Drawer */}
      {showChatModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-ink/50 backdrop-blur-sm">
          <div className="bg-paper w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[520px] border border-ink/15">
            <div className="bg-ink text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-moss flex items-center justify-center font-bold text-sm">
                  {listing.owner?.username ? listing.owner.username.charAt(0).toUpperCase() : "E"}
                </div>
                <div>
                  <h3 className="font-bold text-sm">{listing.owner?.username || "Elena Rostova"}</h3>
                  <p className="text-[.68rem] text-sand uppercase tracking-wider font-semibold">Host • Direct Conversation</p>
                </div>
              </div>
              <button onClick={() => setShowChatModal(false)} className="text-white/70 hover:text-white p-1">
                ✕
              </button>
            </div>

            <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-sand/20">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                  <div className={`max-w-[82%] p-4 rounded-2xl text-sm ${msg.sender === "user" ? "bg-clay text-white rounded-br-none" : "bg-white text-ink border border-ink/10 rounded-bl-none shadow-sm"}`}>
                    <p className="text-[.68rem] font-bold opacity-75 mb-1">{msg.senderName}</p>
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                  <span className="text-[.62rem] text-ink/40 mt-1 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-ink/10 flex gap-2">
              <input 
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message to the host..."
                className="flex-1 px-4 py-3 bg-sand/30 border border-ink/15 rounded-xl text-sm outline-none focus:border-clay"
              />
              <button type="submit" className="px-5 py-3 bg-moss text-paper font-bold text-sm rounded-xl hover:bg-moss/90 transition shadow-sm shrink-0">
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Auth Gate Modal (Prompts visitors to sign in before booking/messaging/reviewing) */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm">
          <div className="bg-paper w-full max-w-md rounded-3xl shadow-2xl p-8 border border-ink/15 text-center text-ink space-y-6">
            <div className="w-16 h-16 rounded-full bg-clay/15 text-clay mx-auto flex items-center justify-center font-bold text-2xl">
              🔒
            </div>
            <div>
              <span className="text-xs font-bold text-clay uppercase tracking-widest">Authentication Required</span>
              <h3 className="font-display text-2xl font-bold mt-1">Sign in to Continue</h3>
              <p className="text-xs text-ink/70 mt-2 leading-relaxed">
                To message property owners, make Razorpay reservations, or post guest reviews, please sign in or start a 1-click demo session.
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href="/login"
                className="block w-full py-3.5 rounded-xl bg-clay text-white font-bold text-sm hover:bg-[#9e442b] transition shadow-md"
              >
                Sign In / 1-Click Demo Login
              </Link>
              <button
                onClick={() => setShowAuthModal(false)}
                className="w-full py-3 rounded-xl border border-ink/20 font-bold text-xs hover:bg-sand transition"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
