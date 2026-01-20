const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  checkin: {
    type: Date,
    required: true,
  },
  checkout: {
    type: Date,
    required: true,
  },
  totalGuest: {
    type: Number,
    required: true,
  },
  emergencyName: {
    type: String,
  },
  emergencyContact: {
    type: Number,
  },
  specialRequest: {
    type: String,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
