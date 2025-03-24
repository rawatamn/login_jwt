import mongoose from "mongoose";
import crypto from "crypto"; // Import crypto for unique ID generation

const movieSchema = new mongoose.Schema({
  _id: { 
    type: String, 
    default: () => crypto.randomBytes(12).toString("hex"), // ✅ 24-character ID
  },
  title: { type: String, required: true },
  overview: { type: String, required: true },
  image: { type: String, required: true },
  release_date: { type: String, required: true },
  price: { type: Number, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, min: 0, max: 10, required: true }
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
