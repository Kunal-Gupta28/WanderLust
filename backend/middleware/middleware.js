const userModel = require("../models/users.model.js");
const listingModel = require("../models/listing.model.js");
const reviewModel = require("../models/reviews.model.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const { verifyToken } = require("../utils/jwt.js");

module.exports.isLoggedIN = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ error: "Sign in to continue." });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: "Session expired or invalid token. Please sign in again." });
    }

    try {
      const user = await userModel.findById(decoded.id);
      req.user = user || { _id: decoded.id, id: decoded.id, username: decoded.username, email: decoded.email };
    } catch {
      req.user = { _id: decoded.id, id: decoded.id, username: decoded.username, email: decoded.email };
    }

    next();
  } catch (err) {
    return res.status(401).json({ error: "Authentication failed." });
  }
};

module.exports.isOwner = async (req, res, next) => {
  try {
    const listing = await listingModel.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ error: "That stay is no longer listed." });
    }
    if (!req.user || (listing.owner && !listing.owner.equals(req.user._id))) {
      return res.status(403).json({ error: "You do not own this stay." });
    }
    next();
  } catch (e) {
    next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
  try {
    const review = await reviewModel.findById(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found." });
    }
    if (!review.author.equals(req.user._id)) {
      return res.status(403).json({ error: "You did not write this review." });
    }
    next();
  } catch (e) {
    next();
  }
};

module.exports.validateListing = (req, res, next) => {
  const body = req.body.listing ? req.body : { listing: req.body };
  const result = listingSchema.validate(body);
  if (result.error) {
    const errMsg = result.error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  const body = req.body.review ? req.body : { review: req.body };
  const result = reviewSchema.validate(body);
  if (result.error) {
    const errMsg = result.error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  }
  next();
};
