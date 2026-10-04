"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import { API_URL } from "../../../lib/api";

export default function HostDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview"); // overview | listings | bookings | calendar | payouts | inbox

  const [listings, setListings] = useState([
    {
      id: "650000000000000000000001",
      title: "Manali Alpine Sanctuary",
      category: "Mountains",
      location: "Manali, Himachal Pradesh",
      price: 4500,
      status: "Active",
      bookingsCount: 14,
      earnings: 63000,
      peakRate: false
    },
    {
      id: "650000000000000000000002",
      title: "Coorg Coffee Estate Cottage",
      category: "Farms",
      location: "Coorg, Karnataka",
      price: 3200,
      status: "Active",
      bookingsCount: 9,
      earnings: 28800,
      peakRate: false
    },
    {
      id: "650000000000000000000003",
      title: "Goa Sunset Cliffside Villa",
      category: "Amazing pools",
      location: "Anjuna, Goa",
      price: 7800,
      status: "Occupied",
      bookingsCount: 15,
      earnings: 117000,
      peakRate: true
    }
  ]);

  const [bookings, setBookings] = useState([
    {
      id: "BK-982145",
      guestName: "Rohan Sharma",
      listingTitle: "Goa Sunset Cliffside Villa",
      dates: "Oct 12 - Oct 17 (5 nights)",
      guests: 3,
      amount: 42360,
      status: "CONFIRMED",
      paymentId: "pay_Orz8912A09"
    },
    {
      id: "BK-982144",
      guestName: "Ananya Roy",
      listingTitle: "Manali Alpine Sanctuary",
      dates: "Oct 20 - Oct 23 (3 nights)",
      guests: 2,
      amount: 15900,
      status: "CONFIRMED",
      paymentId: "pay_Orz7711B12"
    },
    {
      id: "BK-982140",
      guestName: "Vikramaditya K.",
      listingTitle: "Coorg Coffee Estate Cottage",
      dates: "Nov 01 - Nov 05 (4 nights)",
      guests: 4,
      amount: 15550,
      status: "PENDING_CHECKIN",
      paymentId: "pay_Orz4490C44"
    }
  ]);

  const [payouts, setPayouts] = useState([
    { id: "PO-3301", date: "2026-10-01", amount: 48500, bank: "HDFC Bank (**** 9821)", status: "COMPLETED" },
    { id: "PO-3302", date: "2026-09-15", amount: 62400, bank: "HDFC Bank (**** 9821)", status: "COMPLETED" },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingListing, setEditingListing] = useState(null);

  const [newStay, setNewStay] = useState({
    title: "",
    category: "Mountains",
    price: "",
    location: "",
    country: "India",
    description: "",
    imageUrl: ""
  });

  const totalEarnings = listings.reduce((acc, item) => acc + item.earnings, 0);

  const handleCreateStay = (e) => {
    e.preventDefault();
    const created = {
      id: `650000000000000000${Date.now().toString().slice(-6)}`,
      title: newStay.title,
      category: newStay.category,
      location: `${newStay.location}, ${newStay.country}`,
      price: Number(newStay.price),
      status: "Active",
      bookingsCount: 0,
      earnings: 0,
      peakRate: false
    };
    setListings([created, ...listings]);
    setShowCreateModal(false);
    setNewStay({ title: "", category: "Mountains", price: "", location: "", country: "India", description: "", imageUrl: "" });
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    setListings(listings.map(l => l.id === editingListing.id ? editingListing : l));
    setEditingListing(null);
  };

  const togglePeakRate = (id) => {
    setListings(listings.map((l) => {
      if (l.id === id) {
        const nextPeak = !l.peakRate;
        const newPrice = nextPeak ? Math.round(l.price * 1.25) : Math.round(l.price / 1.25);
        return { ...l, peakRate: nextPeak, price: newPrice };
      }
      return l;
    }));
  };

  const handleDeleteListing = (id) => {
    if (confirm("Are you sure you want to remove this property listing?")) {
      setListings(listings.filter((item) => item.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setListings(listings.map((item) => {
      if (item.id === id) {
        return { ...item, status: item.status === "Active" ? "Paused" : "Active" };
      }
      return item;
    }));
  };

  return (
    <main className="min-h-screen bg-paper text-ink selection:bg-clay selection:text-white pt-24 pb-20">
      <Navbar />

      <div className="mx-auto max-w-[90rem] px-[clamp(1.25rem,4vw,4.5rem)]">
        
        {/* Host Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-ink/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-moss animate-pulse" />
              <span className="text-xs font-bold text-moss uppercase tracking-widest">Property Host Operations Hub</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-[-.04em]">
              Host Dashboard
            </h1>
            <p className="text-ink/70 mt-1 text-sm md:text-base">
              Manage properties, view guest bookings, configure seasonal pricing, and audit bank payouts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3.5 rounded-full bg-clay text-white font-bold text-sm hover:bg-[#9e442b] transition shadow-md flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[3]">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span>List a New Stay</span>
            </button>
            <Link
              href="/admin"
              className="px-5 py-3.5 rounded-full bg-ink text-white font-bold text-xs hover:bg-moss transition shadow-sm"
            >
              Admin Control Center →
            </Link>
          </div>
        </div>

        {/* Overview KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
          <div className="p-6 rounded-2xl bg-white border border-ink/10 shadow-sm">
            <span className="text-xs font-bold text-ink/50 uppercase tracking-wider block mb-1">Total Host Earnings</span>
            <p className="font-display text-3xl font-bold text-clay">₹{totalEarnings.toLocaleString("en-IN")}</p>
            <span className="text-[.68rem] text-moss font-semibold mt-2 inline-block">↑ +18% from last month</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-ink/10 shadow-sm">
            <span className="text-xs font-bold text-ink/50 uppercase tracking-wider block mb-1">Active Stays Listed</span>
            <p className="font-display text-3xl font-bold text-ink">{listings.length} Stays</p>
            <span className="text-[.68rem] text-ink/50 font-semibold mt-2 inline-block">All properties verified</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-ink/10 shadow-sm">
            <span className="text-xs font-bold text-ink/50 uppercase tracking-wider block mb-1">Total Reservations</span>
            <p className="font-display text-3xl font-bold text-moss">{bookings.length}</p>
            <span className="text-[.68rem] text-moss font-semibold mt-2 inline-block">100% Razorpay Verified</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-ink/10 shadow-sm">
            <span className="text-xs font-bold text-ink/50 uppercase tracking-wider block mb-1">Superhost Rating</span>
            <p className="font-display text-3xl font-bold text-clay">4.96 ★</p>
            <span className="text-[.68rem] text-ink/50 font-semibold mt-2 inline-block">Based on 68 guest reviews</span>
          </div>
        </div>

        {/* Dashboard Nav Tabs */}
        <div className="flex gap-2 mb-8 border-b border-ink/10 pb-4 overflow-x-auto">
          {[
            { id: "overview", label: "Earnings & Analytics" },
            { id: "listings", label: `My Properties (${listings.length})` },
            { id: "bookings", label: `Guest Bookings (${bookings.length})` },
            { id: "calendar", label: "Pricing & Peak Rate Manager" },
            { id: "payouts", label: `Bank Payouts (${payouts.length})` },
            { id: "inbox", label: "Guest Messages & Inquiries" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition ${
                activeTab === tab.id
                  ? "bg-ink text-white shadow-sm"
                  : "bg-sand/40 text-ink/70 hover:bg-sand hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Analytics Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="p-8 rounded-3xl bg-white border border-ink/10 shadow-sm">
              <h2 className="font-display text-2xl font-bold mb-6">2026 Monthly Earnings Breakdown</h2>
              
              {/* Visual Bar Graph */}
              <div className="h-64 flex items-end justify-between gap-4 pt-8 pb-4 border-b border-ink/10">
                {[
                  { month: "May", val: 32000, h: "40%" },
                  { month: "Jun", val: 48000, h: "60%" },
                  { month: "Jul", val: 54000, h: "68%" },
                  { month: "Aug", val: 42000, h: "52%" },
                  { month: "Sep", val: 68000, h: "85%" },
                  { month: "Oct", val: 82000, h: "100%" },
                ].map((item) => (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[.68rem] font-bold text-clay opacity-0 group-hover:opacity-100 transition">
                      ₹{item.val.toLocaleString("en-IN")}
                    </span>
                    <div
                      className="w-full bg-sand hover:bg-clay transition-all rounded-t-xl"
                      style={{ height: item.h }}
                    />
                    <span className="text-xs font-bold text-ink/70">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-sand/30 border border-ink/10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-2xl font-bold">Your Active Properties</h2>
                <button onClick={() => setActiveTab("listings")} className="text-xs font-bold text-clay underline">
                  Manage All Properties →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {listings.map((stay) => (
                  <div key={stay.id} className="p-6 rounded-2xl bg-white border border-ink/10 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="px-2.5 py-1 rounded-full bg-sand text-[.68rem] font-bold text-ink/80">{stay.category}</span>
                        <span className={`px-2.5 py-1 rounded-full text-[.65rem] font-bold ${stay.status === "Active" ? "bg-moss/20 text-moss" : "bg-clay/20 text-clay"}`}>
                          {stay.status}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-bold mb-1">{stay.title}</h3>
                      <p className="text-xs text-ink/60 mb-4">{stay.location}</p>
                    </div>

                    <div className="pt-4 border-t border-ink/10 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-ink/50 block">Rate</span>
                        <span className="font-bold text-sm">₹{stay.price.toLocaleString("en-IN")}/night</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-ink/50 block">Earned</span>
                        <span className="font-bold text-sm text-clay">₹{stay.earnings.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* My Properties Tab */}
        {activeTab === "listings" && (
          <div className="bg-white rounded-3xl border border-ink/10 shadow-sm p-8 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-display text-2xl font-bold">Property Listings ({listings.length})</h2>
                <p className="text-xs text-ink/60">Create, edit, pause, or update listed stays.</p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-5 py-2.5 rounded-full bg-clay text-white font-bold text-xs hover:bg-[#9e442b] transition"
              >
                + Add New Listing
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-ink/10 bg-sand/30 text-xs text-ink/60 uppercase font-bold">
                    <th className="py-4 px-4">Property</th>
                    <th className="py-4 px-4">Category</th>
                    <th className="py-4 px-4">Nightly Rate</th>
                    <th className="py-4 px-4">Peak Rate (+25%)</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/10">
                  {listings.map((stay) => (
                    <tr key={stay.id} className="hover:bg-sand/10 transition">
                      <td className="py-4 px-4">
                        <Link href={`/listings/${stay.id}`} className="font-bold text-ink hover:text-clay">
                          {stay.title}
                        </Link>
                        <span className="block text-xs text-ink/50">{stay.location}</span>
                      </td>
                      <td className="py-4 px-4 font-semibold text-xs text-ink/75">{stay.category}</td>
                      <td className="py-4 px-4 font-bold text-clay">₹{stay.price.toLocaleString("en-IN")}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[.65rem] font-bold ${stay.peakRate ? "bg-clay text-white" : "bg-sand text-ink/60"}`}>
                          {stay.peakRate ? "ENABLED (+25%)" : "Standard"}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-[.68rem] font-bold ${stay.status === "Active" ? "bg-moss/20 text-moss" : "bg-sand text-ink/70"}`}>
                          {stay.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <button
                          onClick={() => setEditingListing({ ...stay })}
                          className="px-3 py-1 rounded-full border border-ink/15 text-xs font-bold hover:bg-sand transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => toggleStatus(stay.id)}
                          className="px-3 py-1 rounded-full border border-ink/15 text-xs font-bold hover:bg-sand transition"
                        >
                          {stay.status === "Active" ? "Pause" : "Activate"}
                        </button>
                        <button
                          onClick={() => handleDeleteListing(stay.id)}
                          className="px-3 py-1 rounded-full bg-clay/10 text-clay text-xs font-bold hover:bg-clay hover:text-white transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pricing & Peak Rate Manager */}
        {activeTab === "calendar" && (
          <div className="bg-white rounded-3xl border border-ink/10 shadow-sm p-8 max-w-3xl space-y-6">
            <h2 className="font-display text-2xl font-bold">Seasonal Pricing & Peak Rate Manager</h2>
            <p className="text-xs text-ink/60">Toggle peak rates (+25% pricing multiplier) for holidays and high-demand weekends.</p>

            <div className="space-y-4">
              {listings.map((stay) => (
                <div key={stay.id} className="p-5 rounded-2xl bg-sand/30 border border-ink/10 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-base">{stay.title}</h4>
                    <p className="text-xs text-ink/60">Base Rate: ₹{stay.price.toLocaleString("en-IN")}/night</p>
                  </div>

                  <button
                    onClick={() => togglePeakRate(stay.id)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold transition ${stay.peakRate ? "bg-clay text-white shadow-sm" : "bg-sand border border-ink/15 text-ink"}`}
                  >
                    {stay.peakRate ? "Peak Rate Active (+25%)" : "Enable Peak Rate (+25%)"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Guest Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="bg-white rounded-3xl border border-ink/10 shadow-sm p-8">
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold">Guest Reservations & Razorpay Receipts</h2>
              <p className="text-xs text-ink/60">Verified payments and guest stay dates.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-ink/10 bg-sand/30 text-xs text-ink/60 uppercase font-bold">
                    <th className="py-4 px-4">Booking ID</th>
                    <th className="py-4 px-4">Guest Name</th>
                    <th className="py-4 px-4">Reserved Stay</th>
                    <th className="py-4 px-4">Stay Dates</th>
                    <th className="py-4 px-4">Paid Amount</th>
                    <th className="py-4 px-4">Payment Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/10">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-sand/10 transition">
                      <td className="py-4 px-4 font-bold text-xs text-moss">{b.id}</td>
                      <td className="py-4 px-4 font-bold">{b.guestName}</td>
                      <td className="py-4 px-4 font-medium text-xs text-ink/80">{b.listingTitle}</td>
                      <td className="py-4 px-4 text-xs font-semibold">{b.dates}</td>
                      <td className="py-4 px-4 font-bold text-clay">₹{b.amount.toLocaleString("en-IN")}</td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 rounded-full bg-moss text-paper text-[.65rem] font-bold">
                          ✓ {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bank Payouts Tab */}
        {activeTab === "payouts" && (
          <div className="bg-white rounded-3xl border border-ink/10 shadow-sm p-8 max-w-3xl space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-display text-2xl font-bold">Bank Payout Settings & Audit</h2>
                <p className="text-xs text-ink/60">Automated Razorpay payouts directly to your registered bank account.</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-moss text-white text-xs font-bold">✓ Account Verified</span>
            </div>

            <div className="p-5 rounded-2xl bg-sand/30 border border-ink/10 space-y-2">
              <p className="text-xs font-bold text-ink/50 uppercase">Payout Destination</p>
              <p className="font-bold text-base">HDFC Bank Limited (A/C: **** 9821)</p>
              <p className="text-xs text-ink/60">IFSC: HDFC0000128 • Account Holder: Elena Rostova</p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-base">Recent Payout History</h3>
              {payouts.map((p) => (
                <div key={p.id} className="p-4 rounded-xl border border-ink/10 flex justify-between items-center text-sm">
                  <div>
                    <span className="font-bold block">{p.id} • ₹{p.amount.toLocaleString("en-IN")}</span>
                    <span className="text-xs text-ink/50">{p.date} • {p.bank}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-moss/20 text-moss text-xs font-bold">
                    ✓ {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Host Messages Inbox */}
        {activeTab === "inbox" && (
          <div className="bg-white rounded-3xl border border-ink/10 shadow-sm p-8 max-w-3xl">
            <h2 className="font-display text-2xl font-bold mb-6">Guest Inquiries & Messages</h2>
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-sand/30 border border-ink/10 flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-clay text-white font-bold flex items-center justify-center shrink-0">
                    R
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Rohan Sharma</h4>
                    <p className="text-xs text-ink/60 mb-2">Re: Goa Sunset Cliffside Villa</p>
                    <p className="text-xs text-ink/80 bg-white p-3 rounded-xl border border-ink/10">
                      "Hello Elena! Can we request early check-in around 11:00 AM on Oct 12th?"
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-moss text-white rounded-xl text-xs font-bold hover:bg-moss/90 transition shrink-0">
                  Reply
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Property Edit Modal */}
      {editingListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm">
          <div className="bg-paper w-full max-w-lg rounded-3xl shadow-2xl p-6 border border-ink/15 text-ink space-y-4">
            <div className="flex justify-between items-center border-b border-ink/10 pb-3">
              <h3 className="font-display text-xl font-bold">Edit Property Details</h3>
              <button onClick={() => setEditingListing(null)} className="font-bold text-ink/50">✕</button>
            </div>

            <form onSubmit={handleEditSave} className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">Title</label>
                <input
                  type="text"
                  value={editingListing.title}
                  onChange={(e) => setEditingListing({ ...editingListing, title: e.target.value })}
                  className="w-full px-3 py-2 bg-sand/30 border border-ink/15 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase mb-1">Nightly Price (₹)</label>
                <input
                  type="number"
                  value={editingListing.price}
                  onChange={(e) => setEditingListing({ ...editingListing, price: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-sand/30 border border-ink/15 rounded-xl text-sm"
                />
              </div>
              <button type="submit" className="w-full py-3 bg-clay text-white font-bold rounded-xl text-sm hover:bg-[#9e442b]">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Host Create Stay Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm">
          <div className="bg-paper w-full max-w-xl rounded-3xl shadow-2xl p-6 md:p-8 border border-ink/15 text-ink max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-ink/10">
              <div>
                <span className="text-xs font-bold text-clay uppercase tracking-widest">Property Host Portal</span>
                <h2 className="font-display text-2xl font-bold mt-0.5">List a New Stay</h2>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="text-ink/50 hover:text-ink text-xl font-bold p-1">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateStay} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-ink/70">Stay Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Luxurious Alpine Villa with Private Pool"
                  value={newStay.title}
                  onChange={(e) => setNewStay({ ...newStay, title: e.target.value })}
                  className="w-full px-4 py-3 bg-sand/30 border border-ink/15 rounded-xl text-sm outline-none focus:border-clay"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-ink/70">Price per night (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="3500"
                    value={newStay.price}
                    onChange={(e) => setNewStay({ ...newStay, price: e.target.value })}
                    className="w-full px-4 py-3 bg-sand/30 border border-ink/15 rounded-xl text-sm outline-none focus:border-clay"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-ink/70">Category</label>
                  <select
                    value={newStay.category}
                    onChange={(e) => setNewStay({ ...newStay, category: e.target.value })}
                    className="w-full px-4 py-3 bg-sand/30 border border-ink/15 rounded-xl text-sm outline-none focus:border-clay"
                  >
                    <option value="Trending">Trending</option>
                    <option value="Rooms">Rooms</option>
                    <option value="Iconic cities">Iconic cities</option>
                    <option value="Mountains">Mountains</option>
                    <option value="Castles">Castles</option>
                    <option value="Amazing pools">Amazing pools</option>
                    <option value="Camping">Camping</option>
                    <option value="Farms">Farms</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-ink/70">Location / City</label>
                  <input
                    type="text"
                    required
                    placeholder="Manali"
                    value={newStay.location}
                    onChange={(e) => setNewStay({ ...newStay, location: e.target.value })}
                    className="w-full px-4 py-3 bg-sand/30 border border-ink/15 rounded-xl text-sm outline-none focus:border-clay"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-ink/70">Country</label>
                  <input
                    type="text"
                    required
                    placeholder="India"
                    value={newStay.country}
                    onChange={(e) => setNewStay({ ...newStay, country: e.target.value })}
                    className="w-full px-4 py-3 bg-sand/30 border border-ink/15 rounded-xl text-sm outline-none focus:border-clay"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-clay text-white font-bold text-sm hover:bg-[#9e442b] transition shadow-md"
                >
                  Publish Property to WanderLust
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
