const express = require("express");
const router = express.Router();
const Spot = require("../models/Spot");

router.get("/", async (req, res) => {
  const { lat, lng } = req.query;
  try {
    const spots = await Spot.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: 5000,
        },
      },
    });
    res.json(spots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/spots
const cloudinary = require("../utils/cloudinary");

router.post("/", async (req, res) => {
  try {
    const { name, description, category, latitude, longitude, ratings } =
      req.body;
    let imageUrl = "";

    if (req.files && req.files.image) {
      const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
          folder: "hidden_spots",
        }
      );
      imageUrl = result.secure_url;
    }

    const newSpot = new Spot({
      name,
      description,
      category,
      latitude,
      longitude,
      location: { type: "Point", coordinates: [longitude, latitude] },
      ratings,
      imageUrl,
    });

    await newSpot.save();
    res.status(201).json(newSpot);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
