const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
export const fallbackListings = [
  { id: "alpine-retreat", title: "A-frame beneath the pines", location: "Manali", country: "India", price: 8400, category: "Mountains", image: { url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85" }, description: "A quiet timber hideaway for slow mornings and mountain air." },
  { id: "coastal-cove", title: "A salt-washed house by the sea", location: "Varkala", country: "India", price: 11200, category: "Trending", image: { url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=85" }, description: "An unhurried coastal stay with the ocean close enough to hear." },
  { id: "desert-dome", title: "Stargazing dome in the desert", location: "Jaisalmer", country: "India", price: 6800, category: "Domes", image: { url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85" }, description: "A private, open-sky escape designed around the night." },
  { id: "lake-cabin", title: "Still water cabin", location: "Nainital", country: "India", price: 9200, category: "Rooms", image: { url: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1200&q=85" }, description: "A warm, deeply restful retreat at the lake’s edge." },
  { id: "fort-house", title: "An old fort, made intimate", location: "Udaipur", country: "India", price: 15800, category: "Castles", image: { url: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=85" }, description: "Hand-carved details, serene courtyards, and a long history." },
  { id: "forest-pool", title: "A pool in the wild", location: "Wayanad", country: "India", price: 12700, category: "Amazing pools", image: { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85" }, description: "Spend the afternoon between lush forest and clear water." },
];
export const categories = ["All", "Trending", "Rooms", "Iconic cities", "Mountains", "Castles", "Amazing pools", "Camping", "Farms", "Arctic", "Domes", "Boats"];
async function request(path) { const response = await fetch(`${API_URL}${path}`, { next: { revalidate: 60 }, credentials: "include" }); if (!response.ok) throw new Error("Could not reach WanderLust"); return response.json(); }
export async function getListings(path = "/listings") { try { return await request(path); } catch { return { listings: fallbackListings, categories: categories.slice(1), selectedCategory: "all", isFallback: true }; } }
export async function getListing(id) {
  try { return await request(`/listings/${id}`); }
  catch { return { listing: fallbackListings.find((listing) => listing.id === id) || fallbackListings[0], isFallback: true }; }
}
export { API_URL };
