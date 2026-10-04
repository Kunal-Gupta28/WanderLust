"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { API_URL } from "../../lib/api";

export default function AdminCRMPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState("users"); // users | listings | transactions | broadcasts | logs

  const [searchUserQuery, setSearchUserQuery] = useState("");
  const [searchListingQuery, setSearchListingQuery] = useState("");
  const [searchTxnQuery, setSearchTxnQuery] = useState("");

  const [broadcastMessage, setBroadcastMessage] = useState("🔥 Winter Travel Sale: Get 15% off Himalayan Stays this month!");
  const [broadcastActive, setBroadcastActive] = useState(true);

  const [users, setUsers] = useState([
    { id: "USR-001", name: "Elena Rostova", email: "elena@wanderlust.com", role: "host", status: "Verified", date: "2024-01-15", staysCount: 8 },
    { id: "USR-002", name: "Rohan Sharma", email: "rohan@example.com", role: "traveler", status: "Active", date: "2024-02-10", staysCount: 0 },
    { id: "USR-003", name: "Ananya Roy", email: "ananya@example.com", role: "traveler", status: "Active", date: "2024-03-04", staysCount: 0 },
    { id: "USR-004", name: "Vikramaditya K.", email: "vikram@wanderlust.com", role: "host", status: "Verified", date: "2024-03-22", staysCount: 4 },
    { id: "USR-005", name: "Kunal Gupta (Admin)", email: "kunal@wanderlust.com", role: "admin", status: "SuperAdmin", date: "2023-11-01", staysCount: 0 },
  ]);

  const [listings, setListings] = useState([
    { id: "LST-101", title: "Manali Alpine Sanctuary", owner: "Elena Rostova", price: 4500, category: "Mountains", featured: true, status: "Approved" },
    { id: "LST-102", title: "Coorg Coffee Estate Cottage", owner: "Vikramaditya K.", price: 3200, category: "Farms", featured: false, status: "Approved" },
    { id: "LST-103", title: "Goa Sunset Cliffside Villa", owner: "Elena Rostova", price: 7800, category: "Amazing pools", featured: true, status: "Approved" },
    { id: "LST-104", title: "Jaisalmer Desert Geodesic Dome", owner: "Vikramaditya K.", price: 5400, category: "Domes", featured: true, status: "Pending Approval" },
  ]);

  const [transactions, setTransactions] = useState([
    { id: "TXN-9901", orderId: "order_Orz8912A", guest: "Rohan Sharma", amount: 42360, platformFee: 4236, date: "2026-10-04", status: "SUCCESS", gateway: "Razorpay" },
    { id: "TXN-9902", orderId: "order_Orz7711B", guest: "Ananya Roy", amount: 15900, platformFee: 1590, date: "2026-10-03", status: "SUCCESS", gateway: "Razorpay" },
    { id: "TXN-9903", orderId: "order_Orz4490C", guest: "Vikramaditya K.", amount: 15550, platformFee: 1555, date: "2026-10-02", status: "SUCCESS", gateway: "Razorpay" },
  ]);

  const [logs, setLogs] = useState([
    { id: 1, time: "2026-10-04 14:02:12", type: "AUTH", text: "User 'rohan_sharma' authenticated via HTTP-only JWT.", status: "SUCCESS" },
    { id: 2, time: "2026-10-04 13:58:44", type: "PAYMENT", text: "Razorpay payment verified for order 'order_Orz8912A'.", status: "SUCCESS" },
    { id: 3, time: "2026-10-04 13:50:01", type: "MODERATION", text: "Admin promoted 'Vikramaditya K.' to Host role.", status: "SUCCESS" },
    { id: 4, time: "2026-10-04 13:42:19", type: "BROADCAST", text: "Global announcement banner updated.", status: "SUCCESS" },
  ]);

  useEffect(() => {
    // Check Auth Session
    const userStr = localStorage.getItem("wanderlust_user");
    if (userStr) {
      setIsAuthenticated(true);
      setCheckingAuth(false);
      return;
    }

    fetch(`${API_URL}/auth/me`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setIsAuthenticated(true);
      })
      .catch(() => {})
      .finally(() => setCheckingAuth(false));
  }, []);

  const handleUnlockDemoAdmin = () => {
    const adminUser = { username: "admin_kunal", email: "admin@wanderlust.app", role: "admin" };
    localStorage.setItem("wanderlust_user", JSON.stringify(adminUser));
    setIsAuthenticated(true);
  };

  const toggleUserRole = (id) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const nextRole = u.role === "traveler" ? "host" : u.role === "host" ? "admin" : "traveler";
        return { ...u, role: nextRole };
      }
      return u;
    }));
  };

  const toggleUserStatus = (id) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === "Active" || u.status === "Verified" ? "Suspended" : "Active" };
      }
      return u;
    }));
  };

  const toggleFeaturedListing = (id) => {
    setListings(listings.map(l => l.id === id ? { ...l, featured: !l.featured } : l));
  };

  const approveListing = (id) => {
    setListings(listings.map(l => l.id === id ? { ...l, status: "Approved" } : l));
  };

  const processRefund = (txnId) => {
    if (confirm(`Execute Razorpay refund for transaction ${txnId}?`)) {
      setTransactions(transactions.map(t => t.id === txnId ? { ...t, status: "REFUNDED" } : t));
    }
  };

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchUserQuery.toLowerCase()) || u.email.toLowerCase().includes(searchUserQuery.toLowerCase()));
  const filteredListings = listings.filter(l => l.title.toLowerCase().includes(searchListingQuery.toLowerCase()) || l.owner.toLowerCase().includes(searchListingQuery.toLowerCase()));
  const filteredTxns = transactions.filter(t => t.orderId.toLowerCase().includes(searchTxnQuery.toLowerCase()) || t.guest.toLowerCase().includes(searchTxnQuery.toLowerCase()));

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center font-bold text-ink">
        Loading Admin CRM Security Check...
      </div>
    );
  }

  // Protection Gate if not authenticated
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-paper text-ink pt-24 pb-20">
        <Navbar />
        <div className="mx-auto max-w-md px-6 py-16 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-clay/15 text-clay mx-auto flex items-center justify-center font-bold text-2xl shadow-inner">
            🔒
          </div>
          <div>
            <span className="text-xs font-bold text-clay uppercase tracking-widest">Admin Security Protection</span>
            <h1 className="font-display text-3xl font-bold mt-1">Admin CRM Access Restricted</h1>
            <p className="text-xs text-ink/70 mt-2 leading-relaxed">
              This area is restricted to platform administrators. Please sign in with admin credentials or unlock demo access.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleUnlockDemoAdmin}
              className="w-full py-4 rounded-xl bg-clay text-white font-bold text-sm hover:bg-[#9e442b] transition shadow-md"
            >
              Unlock Admin Demo Access ⚡
            </button>
            <Link
              href="/login"
              className="block w-full py-3 rounded-xl border border-ink/20 font-bold text-xs hover:bg-sand transition"
            >
              Log In with Account
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-paper text-ink selection:bg-clay selection:text-white pt-24 pb-20">
      <Navbar />

      <div className="mx-auto max-w-[90rem] px-[clamp(1.25rem,4vw,4.5rem)]">
        
        {/* Live Broadcast Banner Notice */}
        {broadcastActive && (
          <div className="mb-6 p-4 rounded-2xl bg-moss text-paper flex items-center justify-between text-xs font-bold shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sand animate-pulse" />
              <span>LIVE BROADCAST: {broadcastMessage}</span>
            </div>
            <button onClick={() => setBroadcastActive(false)} className="text-sand hover:text-white font-bold">✕</button>
          </div>
        )}

        {/* Admin CRM Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-ink/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-clay animate-pulse" />
              <span className="text-xs font-bold text-clay uppercase tracking-widest">Platform Command & Control CRM</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-[-.04em]">
              Admin Operations Center
            </h1>
            <p className="text-ink/70 mt-1 text-sm md:text-base">
              Control platform users, moderate property stays, audit Razorpay financial ledgers, and manage security settings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/host/dashboard"
              className="px-6 py-3.5 rounded-full bg-moss text-paper font-bold text-sm hover:bg-moss/90 transition shadow-md"
            >
              Host Operations Dashboard →
            </Link>
          </div>
        </div>

        {/* Executive KPI Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
          <div className="p-6 rounded-2xl bg-white border border-ink/10 shadow-sm">
            <span className="text-xs font-bold text-ink/50 uppercase tracking-wider block mb-1">Total Platform Users</span>
            <p className="font-display text-3xl font-bold text-ink">{users.length * 280}</p>
            <span className="text-[.68rem] text-moss font-semibold mt-2 inline-block">1,236 Travelers • 184 Hosts</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-ink/10 shadow-sm">
            <span className="text-xs font-bold text-ink/50 uppercase tracking-wider block mb-1">Total Published Stays</span>
            <p className="font-display text-3xl font-bold text-moss">490 Stays</p>
            <span className="text-[.68rem] text-ink/50 font-semibold mt-2 inline-block">Across 12 Categories</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-ink/10 shadow-sm">
            <span className="text-xs font-bold text-ink/50 uppercase tracking-wider block mb-1">Razorpay Gross Volume</span>
            <p className="font-display text-3xl font-bold text-clay">₹48,92,000</p>
            <span className="text-[.68rem] text-moss font-semibold mt-2 inline-block">Platform 10% Revenue: ₹4,89,200</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-ink/10 shadow-sm">
            <span className="text-xs font-bold text-ink/50 uppercase tracking-wider block mb-1">System Security & Health</span>
            <p className="font-display text-3xl font-bold text-moss">100% Operational</p>
            <span className="text-[.68rem] text-ink/50 font-semibold mt-2 inline-block">JWT HTTP-Only • SSL Encrypted</span>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex gap-2 mb-8 border-b border-ink/10 pb-4 overflow-x-auto">
          {[
            { id: "users", label: `User Directory CRM (${filteredUsers.length})` },
            { id: "listings", label: `Listing Moderation (${filteredListings.length})` },
            { id: "transactions", label: `Razorpay Ledger (${filteredTxns.length})` },
            { id: "broadcasts", label: "Broadcast & Platform Settings" },
            { id: "logs", label: `Security Audit Logs (${logs.length})` }
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

        {/* User Directory CRM Tab */}
        {activeTab === "users" && (
          <div className="bg-white rounded-3xl border border-ink/10 shadow-sm p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold">User Directory & Role Controls</h2>
                <p className="text-xs text-ink/60">Search, manage roles, suspend accounts, and verify host badges.</p>
              </div>
              <input
                type="text"
                placeholder="Search by user name or email..."
                value={searchUserQuery}
                onChange={(e) => setSearchUserQuery(e.target.value)}
                className="px-4 py-2.5 bg-sand/30 border border-ink/15 rounded-xl text-xs outline-none focus:border-clay max-w-xs"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-ink/10 bg-sand/30 text-xs text-ink/60 uppercase font-bold">
                    <th className="py-4 px-4">User ID</th>
                    <th className="py-4 px-4">Name & Email</th>
                    <th className="py-4 px-4">Assigned Role</th>
                    <th className="py-4 px-4">Account Status</th>
                    <th className="py-4 px-4 text-right">Admin Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/10">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-sand/10 transition">
                      <td className="py-4 px-4 font-bold text-xs text-ink/50">{u.id}</td>
                      <td className="py-4 px-4">
                        <span className="font-bold block text-ink">{u.name}</span>
                        <span className="text-xs text-ink/60">{u.email}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-[.68rem] font-bold ${u.role === "admin" ? "bg-clay text-white" : u.role === "host" ? "bg-moss text-paper" : "bg-sand text-ink"}`}>
                          {u.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-semibold text-xs">
                        <span className={`px-3 py-1 rounded-full text-[.65rem] font-bold ${u.status === "Suspended" ? "bg-clay/20 text-clay" : "bg-moss/20 text-moss"}`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <button
                          onClick={() => toggleUserRole(u.id)}
                          className="px-3 py-1 rounded-full border border-ink/20 text-xs font-bold hover:bg-sand transition"
                        >
                          Change Role
                        </button>
                        <button
                          onClick={() => toggleUserStatus(u.id)}
                          className="px-3 py-1 rounded-full bg-clay/10 text-clay text-xs font-bold hover:bg-clay hover:text-white transition"
                        >
                          {u.status === "Suspended" ? "Unsuspend" : "Suspend"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Listing Moderation Tab */}
        {activeTab === "listings" && (
          <div className="bg-white rounded-3xl border border-ink/10 shadow-sm p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold">Property Listing Moderation & Featuring</h2>
                <p className="text-xs text-ink/60">Approve new host submissions and feature top stays on the homepage.</p>
              </div>
              <input
                type="text"
                placeholder="Search stay title or host..."
                value={searchListingQuery}
                onChange={(e) => setSearchListingQuery(e.target.value)}
                className="px-4 py-2.5 bg-sand/30 border border-ink/15 rounded-xl text-xs outline-none focus:border-clay max-w-xs"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-ink/10 bg-sand/30 text-xs text-ink/60 uppercase font-bold">
                    <th className="py-4 px-4">Listing ID</th>
                    <th className="py-4 px-4">Property Title</th>
                    <th className="py-4 px-4">Host Owner</th>
                    <th className="py-4 px-4">Nightly Price</th>
                    <th className="py-4 px-4">Featured</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/10">
                  {filteredListings.map((l) => (
                    <tr key={l.id} className="hover:bg-sand/10 transition">
                      <td className="py-4 px-4 font-bold text-xs text-ink/50">{l.id}</td>
                      <td className="py-4 px-4 font-bold text-ink">{l.title}</td>
                      <td className="py-4 px-4 font-medium text-xs">{l.owner}</td>
                      <td className="py-4 px-4 font-bold text-clay">₹{l.price.toLocaleString("en-IN")}</td>
                      <td className="py-4 px-4">
                        {l.featured ? (
                          <span className="px-3 py-1 rounded-full bg-clay text-white text-[.65rem] font-bold">★ FEATURED</span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-sand text-ink/60 text-[.65rem] font-bold">Standard</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-[.65rem] font-bold ${l.status === "Approved" ? "bg-moss/20 text-moss" : "bg-sand text-clay"}`}>
                          {l.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        {l.status === "Pending Approval" && (
                          <button
                            onClick={() => approveListing(l.id)}
                            className="px-3 py-1 rounded-full bg-moss text-white text-xs font-bold hover:bg-moss/90 transition"
                          >
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => toggleFeaturedListing(l.id)}
                          className="px-3 py-1 rounded-full border border-ink/20 text-xs font-bold hover:bg-sand transition"
                        >
                          {l.featured ? "Unfeature" : "Make Featured"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Razorpay Transaction Ledger Tab */}
        {activeTab === "transactions" && (
          <div className="bg-white rounded-3xl border border-ink/10 shadow-sm p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold">Razorpay Payment & Refund Ledger</h2>
                <p className="text-xs text-ink/60">Audit gross booking volume, platform commission splits, and process refunds.</p>
              </div>
              <input
                type="text"
                placeholder="Search Razorpay Order ID or Guest..."
                value={searchTxnQuery}
                onChange={(e) => setSearchTxnQuery(e.target.value)}
                className="px-4 py-2.5 bg-sand/30 border border-ink/15 rounded-xl text-xs outline-none focus:border-clay max-w-xs"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-ink/10 bg-sand/30 text-xs text-ink/60 uppercase font-bold">
                    <th className="py-4 px-4">Txn ID</th>
                    <th className="py-4 px-4">Razorpay Order ID</th>
                    <th className="py-4 px-4">Guest</th>
                    <th className="py-4 px-4">Gross Paid</th>
                    <th className="py-4 px-4">Platform Fee (10%)</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-4 text-right">Refund Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/10">
                  {filteredTxns.map((t) => (
                    <tr key={t.id} className="hover:bg-sand/10 transition">
                      <td className="py-4 px-4 font-bold text-xs text-moss">{t.id}</td>
                      <td className="py-4 px-4 font-mono text-xs text-ink/70">{t.orderId}</td>
                      <td className="py-4 px-4 font-bold">{t.guest}</td>
                      <td className="py-4 px-4 font-bold text-clay">₹{t.amount.toLocaleString("en-IN")}</td>
                      <td className="py-4 px-4 font-bold text-moss">₹{t.platformFee.toLocaleString("en-IN")}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-[.65rem] font-bold ${t.status === "REFUNDED" ? "bg-clay/20 text-clay" : "bg-moss/20 text-moss"}`}>
                          {t.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        {t.status !== "REFUNDED" && (
                          <button
                            onClick={() => processRefund(t.id)}
                            className="px-3 py-1 rounded-full border border-clay text-clay text-xs font-bold hover:bg-clay hover:text-white transition"
                          >
                            Process Refund
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Broadcast & Platform Settings */}
        {activeTab === "broadcasts" && (
          <div className="bg-white rounded-3xl border border-ink/10 shadow-sm p-8 max-w-2xl space-y-6">
            <h2 className="font-display text-2xl font-bold">Platform Broadcast & Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-ink/70">
                  Global Site Announcement Banner
                </label>
                <textarea
                  rows={2}
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-sand/30 border border-ink/15 rounded-xl text-sm font-medium outline-none focus:border-clay"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-sand/30 rounded-xl border border-ink/10">
                <span className="text-xs font-bold">Banner Display Active</span>
                <button
                  onClick={() => setBroadcastActive(!broadcastActive)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold ${broadcastActive ? "bg-moss text-white" : "bg-sand text-ink"}`}
                >
                  {broadcastActive ? "ENABLED" : "DISABLED"}
                </button>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => alert("Global Broadcast Settings Updated Successfully.")}
                  className="px-6 py-3.5 bg-clay text-white rounded-xl text-sm font-bold hover:bg-[#9e442b] transition shadow-md"
                >
                  Save Platform Settings
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Security Audit Logs */}
        {activeTab === "logs" && (
          <div className="bg-white rounded-3xl border border-ink/10 shadow-sm p-8 max-w-4xl space-y-6">
            <h2 className="font-display text-2xl font-bold">Security Audit & Event Logs</h2>
            <div className="space-y-3 font-mono text-xs">
              {logs.map((log) => (
                <div key={log.id} className="p-4 rounded-xl bg-sand/30 border border-ink/10 flex justify-between items-center">
                  <div>
                    <span className="text-ink/40 mr-3">[{log.time}]</span>
                    <span className="font-bold text-clay mr-3">[{log.type}]</span>
                    <span className="text-ink">{log.text}</span>
                  </div>
                  <span className="text-moss font-bold px-2 py-0.5 rounded bg-moss/10">{log.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      <Footer />
    </main>
  );
}
