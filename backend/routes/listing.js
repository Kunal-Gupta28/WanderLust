const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIN, isOwner, validateListing } = require("../middleware/middleware.js");
const listingController = require("../controllers/listing.controller.js");
const multer = require("multer");
const { storage } = require("../config/cloud.config.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIN,
    upload.single("image"),
    validateListing,
    wrapAsync(listingController.createRoute)
  );

router.get("/category/:category", wrapAsync(listingController.index));
router.get("/search", wrapAsync(listingController.searchListings));
router.get("/search/suggestions", wrapAsync(listingController.getSearchSuggestions));

router
  .route("/:id")
  .get(wrapAsync(listingController.showRoute))
  .put(
    isLoggedIN,
    isOwner,
    upload.single("image"),
    validateListing,
    wrapAsync(listingController.updateRoute)
  )
  .delete(isLoggedIN, isOwner, wrapAsync(listingController.deleteRoute));

module.exports = router;
