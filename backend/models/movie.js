const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  overview: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, enum: [150, 160, 170, 180, 190, 200], required: true }
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
