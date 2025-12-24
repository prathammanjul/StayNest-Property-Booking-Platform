const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const listingSchema = new Schema({
  title: {
    type: String,
    requird: true,
  },
  description: String,

  image: {
    type: String,
    set: (v) =>
      v === ""
        ? "https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?q=80&w=1128&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        : v,
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
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
