const express = require("express");
const router = express.Router({ mergeParams: true });

const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
//require wrapAsync for err handling
const wrapAsync = require("../utils/wrapAsync.js");
//require ExpressCustom Error
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn, validateReview } = require("../middleware.js");

// REVIEWS

//Post route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    // 🚫 BLOCK: Owner cannot review own listing
    if (listing.owner.equals(req.user._id)) {
      req.flash("error", "You cannot review your own listing!");
      return res.redirect(`/listings/${listing._id}`);
    }

    let { review } = req.body;
    let newReview = new Review(review);

    // here we are accessing our reviews array from listing schema.
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    // console.log("new reviewed saved");
    // res.send("new reviewed saved");
    req.flash("success", "Review added!");

    res.redirect(`/listings/${listing._id}`);
  })
);

//Delete review route

router.delete(
  "/:reviewId",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;
