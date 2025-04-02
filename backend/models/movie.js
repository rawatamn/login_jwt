import mongoose from "mongoose";
import { nanoid } from "nanoid"; // Import Nano ID

const movieSchema = new mongoose.Schema({
  _id: { 
    type: String, 
    default: () => nanoid(24) // Generates a 24-character string ID
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
