const Booking = require("../models/booking.js");
const Listing = require("../models/listing.js");

//booking form
module.exports.renderBookingForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  res.render("listings/bookingForm.ejs", { listing });
};

//Create booking
module.exports.createBooking = async (req, res) => {
  const { id } = req.params;
  const { checkIn, checkOut } = req.body.booking;

  //so that we can get the location , country to insert in the database
  const listing = await Listing.findById(id);

  // Convert string dates → Date objects
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize

  //  Validation checks
  if (!checkIn || !checkOut) {
    req.flash("error", "Please select both check-in and check-out dates.");
    return res.redirect(`/listings/${id}/booking-page`);
  }

  if (checkInDate < today) {
    req.flash("error", "Check-in date cannot be in the past.");
    return res.redirect(`/listings/${id}/booking-page`);
  }

  if (checkOutDate <= checkInDate) {
    req.flash("error", "Check-out date must be after check-in date.");
    return res.redirect(`/listings/${id}/booking-page`);
  }

  //  DOUBLE BOOKING CHECK( Check if there is any existing booking on same date)
  const conflictingBooking = await Booking.findOne({
    listing: id,
    checkIn: { $lt: checkOutDate },
    checkOut: { $gt: checkInDate },
  });
  if (conflictingBooking) {
    req.flash(
      "error",
      "This listing is already booked for the selected dates.",
    );
    return res.redirect(`/listings/${id}/booking-page`);
  }
  // 3️ Create booking (only after validation passes)
  const newBooking = new Booking({
    ...req.body.booking,
    location: listing.location,
    country: listing.country,
    user: req.user._id,
    listing: id,
  });

  if (existingBooking) await newBooking.save();

  req.flash("success", "Booking confirmed!");
  res.redirect(`/listings/${id}`);
};
