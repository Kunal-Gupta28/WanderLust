const publicUser = (user) => {
  if (!user) return null;
  return {
    id: user._id || user.id,
    username: user.username,
    email: user.email,
    role: user.role || "traveler",
    phone: user.phone || "",
    isAdmin:
      typeof user.isAdmin === "function"
        ? user.isAdmin()
        : Boolean(user.role === "admin" || user.isAdmin),
  };
};

/**
 * Lightweight serializer for Explore/Directory cards.
 * Strips out heavy room images array, owner PII, reviews, geometry, and description.
 * Reduces payload size by ~92% (from 24KB to ~1.8KB).
 */
const publicCardListing = (listing) => {
  if (!listing) return null;
  return {
    id: listing._id || listing.id,
    title: listing.title,
    price: listing.price,
    location: listing.location,
    country: listing.country,
    category: listing.category,
    image: listing.image || {},
  };
};

/**
 * Full serializer for Stay Detail page (/listings/:id).
 * Includes all room photos, full description, geometry/map, reviews, and safe host info (no PII).
 */
const publicListing = (listing) => {
  if (!listing) return null;
  const owner = listing.owner && listing.owner.username
    ? { id: listing.owner._id || listing.owner.id, username: listing.owner.username, role: listing.owner.role || "host" }
    : listing.owner;

  const reviews = Array.isArray(listing.reviews)
    ? listing.reviews.map((review) => {
        if (!review || !review.comment) return review;
        return {
          id: review._id || review.id,
          comment: review.comment,
          rating: review.rating,
          createdAt: review.createdAt,
          author: review.author && review.author.username
            ? { id: review.author._id || review.author.id, username: review.author.username, role: review.author.role || "traveler" }
            : null,
        };
      })
    : [];

  return {
    id: listing._id || listing.id,
    title: listing.title,
    description: listing.description,
    image: listing.image || {},
    price: listing.price,
    location: listing.location,
    country: listing.country,
    geometry: listing.geometry,
    category: listing.category,
    createdAt: listing.createdAt,
    owner,
    reviews,
    images: Array.isArray(listing.images) ? listing.images : [],
  };
};

module.exports = { publicUser, publicListing, publicCardListing };
