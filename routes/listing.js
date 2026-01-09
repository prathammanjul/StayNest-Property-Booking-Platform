const express = require("express");
const router = express.Router();
//require wrapAsync for err handling
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

// 1. index route -  to show all data.
router.get("/", wrapAsync(listingController.index));

// add new listings
router.get("/new", isLoggedIn, listingController.renderNewForm);

// show route - for individual id's
router.get("/:id", wrapAsync(listingController.showIndividualListings));

//  create route
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(listingController.createNewListings)
);

//EDIT ROUTE
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

//UPDATE ROUTE
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingController.updateListings)
);

//Destroy ROUTE
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListings)
);

module.exports = router;
