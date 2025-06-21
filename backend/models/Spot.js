const mongoose = require("mongoose");

const SpotSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  latitude: Number,
  longitude: Number,
  imageUrl: String,
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true }, // [lng, lat]
  },
  ratings: {
    vibe: Number,
    uniqueness: Number,
    safety: Number,
    crowd: Number,
  },
});

SpotSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Spot", SpotSchema);
