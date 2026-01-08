const Listing = require("./models/listing");
//require ExpressCustom Error
const ExpressError = require("./utils/ExpressError.js");
// require schema.js for server side validation using joi
const { listingSchema, reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
  // console.log(req.user);
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    // console.log(req.session.redirectUrl);

    req.flash("error", "User must be logged In");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "Your are not authorized to access it");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

// Create validation middleware for Listings
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    // console.log(errMsg);
    // console.log(error.details);
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Create validation middleware for reviews
module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
