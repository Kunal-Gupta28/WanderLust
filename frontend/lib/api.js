import apiClient, { API_URL } from "./axios";
import listingsData from "./listings-data.json";

const ORIGINAL_STAYS = [
  { id: "alpine-retreat", title: "A-frame beneath the pines", location: "Manali", country: "India", price: 8400, category: "Mountains", image: { url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85" }, description: "A quiet timber hideaway for slow mornings and mountain air." },
  { id: "coastal-cove", title: "A salt-washed house by the sea", location: "Varkala", country: "India", price: 11200, category: "Trending", image: { url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=85" }, description: "An unhurried coastal stay with the ocean close enough to hear." },
  { id: "desert-dome", title: "Stargazing dome in the desert", location: "Jaisalmer", country: "India", price: 6800, category: "Domes", image: { url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85" }, description: "A private, open-sky escape designed around the night." },
  { id: "lake-cabin", title: "Still water cabin", location: "Nainital", country: "India", price: 9200, category: "Rooms", image: { url: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1200&q=85" }, description: "A warm, deeply restful retreat at the lake’s edge." },
  { id: "fort-house", title: "An old fort, made intimate", location: "Udaipur", country: "India", price: 15800, category: "Castles", image: { url: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=85" }, description: "Hand-carved details, serene courtyards, and a long history." },
  { id: "forest-pool", title: "A pool in the wild", location: "Wayanad", country: "India", price: 12700, category: "Amazing pools", image: { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85" }, description: "Spend the afternoon between lush forest and clear water." },
];

export const categories = listingsData.categories;
export const fallbackListings = [...ORIGINAL_STAYS, ...listingsData.listings];

export async function getListings(options = "/listings") {
  let path = "/listings";
  let page = 1;
  let limit = null;
  let category = "All";
  let q = "";

  if (typeof options === "string") {
    path = options;
  } else if (typeof options === "object" && options !== null) {
    if (options.path) path = options.path;
    if (options.page !== undefined) page = Math.max(1, parseInt(options.page, 10) || 1);
    if (options.limit !== undefined) limit = Math.max(1, parseInt(options.limit, 10) || 12);
    if (options.category) category = options.category;
    if (options.q) q = options.q.trim();
  }

  const params = {};
  if (page) params.page = page;
  if (limit) params.limit = limit;

  let requestUrl = path;
  if (q) {
    requestUrl = "/listings/search";
    params.q = q;
  } else if (category && category !== "All" && category !== "all") {
    requestUrl = `/listings/category/${encodeURIComponent(category.toLowerCase())}`;
  }

  try {
    const res = await apiClient.get(requestUrl, { params });
    const data = res.data;

    const total = data.total !== undefined ? data.total : (data.listings?.length || 0);
    const totalPages = data.totalPages !== undefined ? data.totalPages : (limit ? Math.max(1, Math.ceil(total / limit)) : 1);

    return {
      listings: data.listings || [],
      categories: data.categories || categories.slice(1),
      selectedCategory: data.selectedCategory || category,
      total,
      page: data.page || page,
      limit: data.limit || limit || total,
      totalPages,
      pagination: data.pagination || {
        page: data.page || page,
        limit: data.limit || limit || total,
        total,
        totalPages,
        hasMore: (data.page || page) < totalPages,
        hasPrev: (data.page || page) > 1,
      },
      isFallback: false,
    };
  } catch (err) {
    console.warn("API request failed, falling back to local dataset:", err.message);

    // Resilient local fallback filtering with pagination
    let filtered = fallbackListings.filter((stay) => {
      const matchesCategory =
        !category ||
        category === "All" ||
        category === "all" ||
        stay.category.toLowerCase() === category.toLowerCase();

      const searchTarget = `${stay.title} ${stay.location} ${stay.country} ${stay.category} ${stay.description || ""}`.toLowerCase();
      const matchesQuery = !q || searchTarget.includes(q.toLowerCase());

      return matchesCategory && matchesQuery;
    });

    const total = filtered.length;
    const effectiveLimit = limit || 12;
    const totalPages = Math.max(1, Math.ceil(total / effectiveLimit));
    const safePage = Math.min(Math.max(1, page), totalPages);
    const paginated = limit ? filtered.slice((safePage - 1) * limit, safePage * limit) : filtered;

    return {
      listings: paginated,
      categories: categories.slice(1),
      selectedCategory: category || "all",
      total,
      page: safePage,
      limit: effectiveLimit,
      totalPages,
      pagination: {
        page: safePage,
        limit: effectiveLimit,
        total,
        totalPages,
        hasMore: safePage < totalPages,
        hasPrev: safePage > 1,
      },
      isFallback: true,
    };
  }
}

export async function getListing(id) {
  try {
    const res = await apiClient.get(`/listings/${id}`);
    return res.data;
  } catch (err) {
    console.warn(`Could not fetch listing ${id}, falling back:`, err.message);
    return {
      listing: fallbackListings.find((listing) => listing.id === id) || fallbackListings[0],
      isFallback: true,
    };
  }
}

export async function getCurrentUser() {
  try {
    const res = await apiClient.get("/auth/me");
    return res.data?.user || null;
  } catch {
    return null;
  }
}

export async function logoutUser() {
  const res = await apiClient.post("/auth/logout");
  return res.data;
}

export async function loginUser(credentials) {
  const res = await apiClient.post("/auth/login", credentials);
  return res.data;
}

export async function signupUser(credentials) {
  const res = await apiClient.post("/auth/signup", credentials);
  return res.data;
}

export async function demoLoginUser(role = "traveler") {
  const res = await apiClient.post(`/auth/demo-login?role=${role}`, { role });
  return res.data;
}

export async function createReview(listingId, reviewData) {
  const res = await apiClient.post(`/listings/${listingId}/reviews`, reviewData);
  return res.data;
}

export async function createPaymentOrder(orderData) {
  const res = await apiClient.post("/payments/create-order", orderData);
  return res.data;
}

export async function verifyPayment(paymentData) {
  const res = await apiClient.post("/payments/verify-payment", paymentData);
  return res.data;
}

export async function sendMessage(messageData) {
  const res = await apiClient.post("/messages", messageData);
  return res.data;
}

export async function sendContactMessage(contactData) {
  const res = await apiClient.post("/contact", contactData);
  return res.data;
}

export async function createListing(formData) {
  const res = await apiClient.post("/listings", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function getWishlist() {
  try {
    const res = await apiClient.get("/auth/wishlist");
    return res.data?.wishlist || [];
  } catch {
    return [];
  }
}

export async function toggleWishlist(listingId) {
  try {
    const res = await apiClient.post("/auth/wishlist/toggle", { listingId });
    return res.data;
  } catch {
    return null;
  }
}

export { API_URL, apiClient };
