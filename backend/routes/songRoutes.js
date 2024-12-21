const express = require("express");
const {
  getAllSongs,
  addSong,
  getSongById,
} = require("../controllers/songController");
const router = express.Router();

router.get("/api/songs", getAllSongs);
router.get("/api/songs/:songId", getSongById);
router.post("/api/songs", addSong);

module.exports = router;
