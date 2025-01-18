const Genius = require("genius-lyrics");
const Client = new Genius.Client(process.env.GENIUS_ACCESS_TOKEN); // Genius API key

const getLyricsByTitleAndArtist = async (req, res) => {
  const { title, artist } = req.query;

  if (title === undefined || artist === undefined) {
    return res
      .status(400)
      .json({ message: "Title and artist query parameters are required" });
  }

  // Fetch the lyrics of a song by title and artists
  try {
    const searches = await Client.songs.search(`${title} ${artist}`);
    const song = searches[0];
    const lyrics = await song.lyrics();
    res.json({ lyrics });
  } catch (error) {
    console.error("Error fetching lyrics:", error.message);
  }
};

module.exports = {
  getLyricsByTitleAndArtist,
};
