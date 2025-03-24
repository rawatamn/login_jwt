const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  overview: { type: String, required: true },
  image: { type: String, required: true },
  release_date: { type: String, required: true },
  price: { type: Number, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, min: 0, max: 10, required: true }
});

// ✅ MongoDB will automatically generate an ObjectId
const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
