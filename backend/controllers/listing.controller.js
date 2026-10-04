const listingModel = require("../models/listing.model.js");
const { publicListing } = require("../utils/serialize.js");

const CATEGORIES = [
  "Trending",
  "Rooms",
  "Iconic cities",
  "Mountains",
  "Castles",
  "Amazing pools",
  "Camping",
  "Farms",
  "Arctic",
  "Domes",
  "Boats",
];

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
  const query = {};
  if (category && category !== "all") query.category = category;
  const allListings = await listingModel.find(query).populate("owner");
  const categories = await listingModel.distinct("category");
  res.json({
    listings: allListings.map(publicListing),
    selectedCategory: category || "all",
    categories: categories.length ? categories : CATEGORIES,
    allCategories: CATEGORIES,
  });
};

module.exports.searchListings = async (req, res) => {
  const { q } = req.query;
  const query = {};
  if (q) {
    const searchRegex = new RegExp(q, "i");
    query.$or = [{ title: searchRegex }, { location: searchRegex }, { country: searchRegex }];
  }
  const listings = await listingModel.find(query).populate("owner");
  const categories = await listingModel.distinct("category");
  res.json({
    listings: listings.map(publicListing),
    selectedCategory: "all",
    categories: categories.length ? categories : CATEGORIES,
    query: q || "",
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

    if (!listing) {
      return res.status(404).json({ error: "That stay is no longer listed." });
    }
    res.json({ listing: publicListing(listing) });
  } catch (err) {
    next(err);
  }
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
