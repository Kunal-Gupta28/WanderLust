const listingModel = require("../models/listing.model.js");
const reviewModel = require("../models/reviews.model.js");
const { publicListing } = require("../utils/serialize.js");

module.exports.reviewRoute = async (req, res, next) => {
  try {
    const listing = await listingModel.findById(req.params.id).select("reviews");
    if (!listing) {
      return res.status(404).json({ error: "Listing not found." });
    }
    const payload = req.body.review || req.body;
    const newReview = new reviewModel({
      comment: payload.comment,
      rating: Number(payload.rating),
      author: req.user._id,
    });
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    const populated = await listingModel
      .findById(listing._id)
      .populate({
        path: "reviews",
        select: "comment rating createdAt author",
        populate: { path: "author", select: "username role" },
      })
      .populate("owner", "username role")
      .lean();
    res.status(201).json({ listing: publicListing(populated), message: "Review posted." });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteReviewRoute = async (req, res, next) => {
  try {
    const { id, reviewId } = req.params;
    await listingModel.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await reviewModel.findByIdAndDelete(reviewId);
    const populated = await listingModel
      .findById(id)
      .populate({
        path: "reviews",
        select: "comment rating createdAt author",
        populate: { path: "author", select: "username role" },
      })
      .populate("owner", "username role")
      .lean();
    res.json({ listing: publicListing(populated), message: "Review removed." });
  } catch (err) {
    next(err);
  }
};
