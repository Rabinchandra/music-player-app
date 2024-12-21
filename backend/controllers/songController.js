const Song = require("../model/song");

const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.json(500).json({ message: err });
  }
};

const getSongById = async (req, res) => {
  try {
    const songId = req.params.songId;
    const foundSong = await Song.findById(songId);
    console.log(foundSong);
    if (foundSong) {
      res.status(200).json(foundSong);
    } else {
      res.status(404).json({ message: "Song with given id is not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const addSong = async (req, res) => {
  try {
    const { title, artist, category, url, duration, thumbnailUrl } = req.body;
    const newSong = new Song({
      title,
      artist,
      category,
      url,
      duration,
      thumbnailUrl,
    });
    await newSong.save();
    res.status(201).json({ message: `New song has been created with` });
  } catch (err) {
    res.status(500).json({ message: `Some went wrong. Error: ${err}` });
  }
};

module.exports = {
  getAllSongs,
  getSongById,
  addSong,
};
