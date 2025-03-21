import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2080;
const OMDB_API_KEY = process.env.OMDB_API_KEY;

app.use(cors());
app.use(express.json());

// Search movies endpoint
app.get("/api/search", async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: "Query is required" });

  try {
    const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=${OMDB_API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data from OMDb API" });
  }
});

// Get movie details endpoint
app.get("/api/movie", async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "Movie ID is required" });

  try {
    const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=${OMDB_API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching movie details" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
