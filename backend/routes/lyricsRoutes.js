const express = require("express");
const router = express.Router();
const {
  getLyricsByTitleAndArtist,
} = require("../controllers/lyricsController");

router.get("/api/lyrics", getLyricsByTitleAndArtist);

module.exports = router;
