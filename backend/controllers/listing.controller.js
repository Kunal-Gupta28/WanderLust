const listingModel = require("../models/listing.model.js");
const { publicListing } = require("../utils/serialize.js");

let listingsData;
try {
  listingsData = require("../data/listings-data.json");
} catch {
  listingsData = {
    categories: [
      "All", "Trending", "Mountains", "Beaches", "Rooms", "Castles",
      "Amazing pools", "Camping", "Farms", "Arctic", "Domes", "Boats",
      "Treehouses", "Desert", "Lakefront", "Heritage", "Luxury Villas",
      "Tropical", "Iconic cities"
    ],
    listings: []
  };
}

const CATEGORIES = listingsData.categories.slice(1);

const listingPayload = (body) => {
  if (body.listing && typeof body.listing === "object") return body.listing;
  return {
    title: body.title,
    description: body.description,
    location: body.location,
    country: body.country,
    price: body.price,
    category: body.category,
  };
};

module.exports.index = async (req, res) => {
  const { category } = req.params;
  const targetCategory = category && category !== "all" ? category.toLowerCase() : null;
  const page = req.query.page ? Math.max(1, parseInt(req.query.page, 10) || 1) : null;
  const limit = req.query.limit ? Math.max(1, parseInt(req.query.limit, 10) || 12) : null;

  try {
    const query = {};
    if (targetCategory) query.category = new RegExp(`^${category}$`, "i");
    const total = await listingModel.countDocuments(query);
    let mongoQuery = listingModel.find(query).populate("owner");
    if (page && limit) {
      mongoQuery = mongoQuery.skip((page - 1) * limit).limit(limit);
    }
    const allListings = await mongoQuery;
    if (allListings && allListings.length > 0) {
      const categories = await listingModel.distinct("category");
      const totalPages = limit ? Math.max(1, Math.ceil(total / limit)) : 1;
      return res.json({
        listings: allListings.map(publicListing),
        selectedCategory: category || "all",
        categories: categories.length ? categories : CATEGORIES,
        allCategories: CATEGORIES,
        page: page || 1,
        limit: limit || allListings.length,
        total,
        totalPages,
        pagination: page && limit ? {
          page,
          limit,
          total,
          totalPages,
          hasMore: page < totalPages,
          hasPrev: page > 1,
        } : null,
      });
    }
  } catch (err) {
    console.warn("MongoDB listing query fallback to in-memory listings:", err.message);
  }

  // Resilient in-memory fallback with 900+ curated stays
  let filtered = listingsData.listings;
  if (targetCategory) {
    filtered = filtered.filter((l) => l.category.toLowerCase() === targetCategory);
  }

  const total = filtered.length;
  const totalPages = limit ? Math.max(1, Math.ceil(total / limit)) : 1;
  const paginated = (page && limit) ? filtered.slice((page - 1) * limit, page * limit) : filtered;

  res.json({
    listings: paginated,
    selectedCategory: category || "all",
    categories: CATEGORIES,
    allCategories: CATEGORIES,
    page: page || 1,
    limit: limit || total,
    total,
    totalPages,
    pagination: page && limit ? {
      page,
      limit,
      total,
      totalPages,
      hasMore: page < totalPages,
      hasPrev: page > 1,
    } : null,
  });
};

module.exports.searchListings = async (req, res) => {
  const { q } = req.query;
  const page = req.query.page ? Math.max(1, parseInt(req.query.page, 10) || 1) : null;
  const limit = req.query.limit ? Math.max(1, parseInt(req.query.limit, 10) || 12) : null;

  try {
    const query = {};
    if (q) {
      const searchRegex = new RegExp(q, "i");
      query.$or = [{ title: searchRegex }, { location: searchRegex }, { country: searchRegex }, { category: searchRegex }];
    }
    const total = await listingModel.countDocuments(query);
    let mongoQuery = listingModel.find(query).populate("owner");
    if (page && limit) {
      mongoQuery = mongoQuery.skip((page - 1) * limit).limit(limit);
    }
    const listings = await mongoQuery;
    if (listings && listings.length > 0) {
      const categories = await listingModel.distinct("category");
      const totalPages = limit ? Math.max(1, Math.ceil(total / limit)) : 1;
      return res.json({
        listings: listings.map(publicListing),
        selectedCategory: "all",
        categories: categories.length ? categories : CATEGORIES,
        query: q || "",
        page: page || 1,
        limit: limit || listings.length,
        total,
        totalPages,
        pagination: page && limit ? {
          page,
          limit,
          total,
          totalPages,
          hasMore: page < totalPages,
          hasPrev: page > 1,
        } : null,
      });
    }
  } catch (err) {
    console.warn("MongoDB search fallback to in-memory:", err.message);
  }

  const queryLower = (q || "").trim().toLowerCase();
  const filtered = queryLower
    ? listingsData.listings.filter((item) =>
        `${item.title} ${item.location} ${item.country} ${item.category} ${item.description}`.toLowerCase().includes(queryLower)
      )
    : listingsData.listings;

  const total = filtered.length;
  const totalPages = limit ? Math.max(1, Math.ceil(total / limit)) : 1;
  const paginated = (page && limit) ? filtered.slice((page - 1) * limit, page * limit) : filtered;

  res.json({
    listings: paginated,
    selectedCategory: "all",
    categories: CATEGORIES,
    query: q || "",
    page: page || 1,
    limit: limit || total,
    total,
    totalPages,
    pagination: page && limit ? {
      page,
      limit,
      total,
      totalPages,
      hasMore: page < totalPages,
      hasPrev: page > 1,
    } : null,
  });
};

module.exports.getSearchSuggestions = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.json([]);

  const searchRegex = new RegExp(q, "i");
  const suggestions = await listingModel
    .find({
      $or: [{ title: searchRegex }, { location: searchRegex }, { country: searchRegex }],
    })
    .select("title location country")
    .limit(5);

  res.json(
    suggestions.map((item) => ({
      title: item.title,
      location: `${item.location}, ${item.country}`,
    }))
  );
};

module.exports.createRoute = async (req, res, next) => {
  try {
    const data = listingPayload(req.body);
    const imageUrl = req.file ? req.file.path : (data.imageUrl || req.body.image?.url || "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=1200&q=80");
    const imageFilename = req.file ? req.file.filename : "listing_img";
    const newListing = new listingModel({
      ...data,
      price: Number(data.price) || 2500,
      owner: req.user ? req.user._id : "650000000000000000000001",
      image: { url: imageUrl, filename: imageFilename },
      geometry: { type: "Point", coordinates: [0, 0] },
    });
    await newListing.save();
    const listing = await listingModel.findById(newListing._id).populate("owner");
    res.status(201).json({ listing: publicListing(listing), message: "Stay published." });
  } catch (err) {
    next(err);
  }
};

module.exports.showRoute = async (req, res, next) => {
  try {
    const listing = await listingModel
      .findById(req.params.id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner");

    if (listing) {
      return res.json({ listing: publicListing(listing) });
    }
  } catch (err) {
    // ID might not be a Mongo ObjectId
  }

  const fallback = listingsData.listings.find((l) => l.id === req.params.id);
  if (fallback) {
    return res.json({
      listing: {
        ...fallback,
        reviews: [],
        owner: { username: "wanderlust-curator", role: "host" }
      }
    });
  }

  res.status(404).json({ error: "That stay is no longer listed." });
};

module.exports.updateRoute = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = listingPayload(req.body);
    if (data.price) data.price = Number(data.price);
    const listing = await listingModel.findByIdAndUpdate(id, { ...data }, { new: true });
    if (!listing) {
      return res.status(404).json({ error: "That stay is no longer listed." });
    }
    if (req.file) {
      listing.image = { url: req.file.path, filename: req.file.filename };
      await listing.save();
    }
    const populated = await listingModel
      .findById(id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner");
    res.json({ listing: publicListing(populated), message: "Stay updated." });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteRoute = async (req, res, next) => {
  try {
    const deletedListing = await listingModel.findByIdAndDelete(req.params.id);
    if (!deletedListing) {
      return res.status(404).json({ error: "That stay is no longer listed." });
    }
    res.json({ message: "Stay removed." });
  } catch (err) {
    next(err);
  }
};
