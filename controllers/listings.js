const Listing = require("../models/listing.js");

// 1. index  ->  to show all data.
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({}); //SHOW ALL DATA
  res.render("listings/index.ejs", { allListings }); // PASSED allListing
};

// add new listings
module.exports.renderNewForm = async (req, res) => {
  res.render("listings/new.ejs");
};

// show route - for individual id's
module.exports.showIndividualListings = async (req, res) => {
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
};

//Create New Listing form
module.exports.createNewListings = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "New Listing Created!");

  res.redirect("/listings");
  // console.log(newListing);
};

//Render EDIT form
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  res.render("listings/edit.ejs", { listing });
};

//Update Listings
module.exports.updateListings = async (req, res) => {
  if (!req.body.listing) {
    throw new ExpressError(400, "Send Valid Data For Listing");
  }
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success", "listing updated!");
  res.redirect(`/listings/${id}`);
};

// Delete Listings
module.exports.destroyListings = async (req, res) => {
  let { id } = req.params;

  const deleteList = await Listing.findByIdAndDelete(id);
  //   console.log(deleteList);
  req.flash("success", "listing deleted!");
  res.redirect("/listings");
};
