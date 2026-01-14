const mongoose = require("mongoose");
const Listing = require("../models/listing");

const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway.",
    image: {
      filename: "beach1",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b",
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
    geometry: { type: "Point", coordinates: [-118.7798, 34.0259] },
  },

  {
    title: "Modern Loft in Downtown",
    description:
      "Stay in the heart of the city in this stylish loft apartment.",
    image: {
      filename: "nyc1",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    },
    price: 1200,
    location: "New York City",
    country: "United States",
    geometry: { type: "Point", coordinates: [-74.006, 40.7128] },
  },

  {
    title: "Mountain Retreat",
    description: "Unplug and unwind in this peaceful mountain cabin.",
    image: {
      filename: "mountain1",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
    geometry: { type: "Point", coordinates: [-106.8231, 39.1911] },
  },

  {
    title: "Historic Villa in Tuscany",
    description:
      "Experience the charm of Tuscany in this beautifully restored villa.",
    image: {
      filename: "italy1",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
    geometry: { type: "Point", coordinates: [11.2558, 43.7696] },
  },

  {
    title: "Private Island Retreat",
    description: "Have an entire island to yourself.",
    image: {
      filename: "island1",
      url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972",
    },
    price: 10000,
    location: "Fiji",
    country: "Fiji",
    geometry: { type: "Point", coordinates: [178.065, -17.7134] },
  },

  {
    title: "Historic Canal House",
    description: "Stay in a piece of history in Amsterdam.",
    image: {
      filename: "amsterdam1",
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4",
    },
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
    geometry: { type: "Point", coordinates: [4.9041, 52.3676] },
  },

  {
    title: "Beachfront Bungalow in Bali",
    description: "Relax on the sandy shores of Bali.",
    image: {
      filename: "bali1",
      url: "https://images.unsplash.com/photo-1602391833977-358a52198938",
    },
    price: 1800,
    location: "Bali",
    country: "Indonesia",
    geometry: { type: "Point", coordinates: [115.1889, -8.4095] },
  },

  {
    title: "Modern Apartment in Tokyo",
    description: "Explore Tokyo from this modern apartment.",
    image: {
      filename: "tokyo1",
      url: "https://images.unsplash.com/photo-1480796927426-f609979314bd",
    },
    price: 2000,
    location: "Tokyo",
    country: "Japan",
    geometry: { type: "Point", coordinates: [139.6503, 35.6762] },
  },

  {
    title: "Luxury Villa in the Maldives",
    description: "Indulge in luxury over the ocean.",
    image: {
      filename: "maldives1",
      url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000",
    },
    price: 6000,
    location: "Maldives",
    country: "Maldives",
    geometry: { type: "Point", coordinates: [73.2207, 3.2028] },
  },

  {
    title: "Desert Oasis in Dubai",
    description: "Luxury in the middle of the desert.",
    image: {
      filename: "dubai1",
      url: "https://images.unsplash.com/photo-1518684079-3c830dcef090",
    },
    price: 5000,
    location: "Dubai",
    country: "United Arab Emirates",
    geometry: { type: "Point", coordinates: [55.2708, 25.2048] },
  },
];

// async function seedDB() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/stayNest");

//   await Listing.deleteMany({});
//   initData.data = initData.data.map((obj) => ({
//     ...obj,
//     owner: "6960ffb211c988d8b0fdff16",
//   }));
//   await Listing.insertMany(sampleListings);

//   console.log("Database seeded");
//   mongoose.connection.close();
// }

// seedDB();
module.exports = { data: sampleListings };
