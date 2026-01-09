const express = require("express");
const router = express.Router();
//require wrapAsync for err handling
const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

// 1. index route -  to show all data.
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({}); //SHOW ALL DATA

    res.render("listings/index.ejs", { allListings }); // PASSED allListing
  })
);

// add new listings
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

// show route - for individual id's
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("owner");

    if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  })
);

//  create route
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created!");

    res.redirect("/listings");
    // console.log(newListing);
  })
);

//EDIT ROUTE
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    res.render("listings/edit.ejs", { listing });
  })
);

//UPDATE ROUTE
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(async (req, res) => {
    if (!req.body.listing) {
      throw new ExpressError(400, "Send Valid Data For Listing");
    }
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "listing updated!");
    res.redirect(`/listings/${id}`);
  })
);

//DELETE ROUTE
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;

    const deleteList = await Listing.findByIdAndDelete(id);
    //   console.log(deleteList);
    req.flash("success", "listing deleted!");
    res.redirect("/listings");
  })
);

module.exports = router;
