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
  contact: {
    type: Number,
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  emergencyContactName: {
    type: String,
  },
  emergencyNumber: {
    type: Number,
  },
  specialRequest: {
    type: String,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
