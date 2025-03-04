const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();
const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("middleware executed");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello, world");
});

const PORT = process.env.PORT || 5000; // Fixed the error
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
