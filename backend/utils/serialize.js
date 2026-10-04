const publicUser = (user) => {
  if (!user) return null;
  return {
    id: user._id || user.id,
    username: user.username,
    email: user.email,
    role: user.role || "traveler",
    isAdmin: typeof user.isAdmin === "function" ? user.isAdmin() : false,
  };
};

const publicListing = (listing) => {
  if (!listing) return null;
  const owner = listing.owner && listing.owner.username ? publicUser(listing.owner) : listing.owner;
  const reviews = Array.isArray(listing.reviews)
    ? listing.reviews.map((review) => {
        if (!review || !review.comment) return review;
        return {
          id: review._id,
          comment: review.comment,
          rating: review.rating,
          createdAt: review.createdAt,
          author: publicUser(review.author),
        };
      })
    : [];

  return {
    id: listing._id,
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
  };
};

module.exports = { publicUser, publicListing };
