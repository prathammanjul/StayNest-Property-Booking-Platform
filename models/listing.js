const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

// create schema
const listingSchema = new Schema({
  title: {
    type: String,
    requird: true,
  },
  description: String,

  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
    min: [0, "Price cannot be negative"],
  },
  country: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
