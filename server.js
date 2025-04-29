const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// 🎬 Search for TV Shows
app.get("/search", async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: "❌ No query provided!" });
    }

    try {
        const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data from TVmaze API." });
    }
});

// 📺 Get TV Show Details by ID
app.get("/show/:id", async (req, res) => {
    const showId = req.params.id;

    try {
        const response = await axios.get(`https://api.tvmaze.com/shows/${showId}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch show details." });
    }
});

// 📅 Get Episode List by Show ID
app.get("/episodes/:id", async (req, res) => {
    const showId = req.params.id;

    try {
        const response = await axios.get(`https://api.tvmaze.com/shows/${showId}/episodes`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch episode list." });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
})
