const express = require("express");
const router = express.Router();
const db_ctrl = require("../controlllers/db_ctrl");
const { artistMethods } = require("../model_methods/artist_fact");

// Create routes
router.post("/createArtist", db_ctrl.createArtist);
router.post("/createAlbum", db_ctrl.createAlbum);

router.post("/createUser", db_ctrl.createUser);
router.post("/createTrack", db_ctrl.createTrack);
router.post("/createPlaylist", db_ctrl.createPlaylist);

// Get routes
router.get("/playlist", db_ctrl.getPlaylist);
router.get("/album", db_ctrl.getAlbum);
router.get("/artist", db_ctrl.getArtist);
router.get("/track", db_ctrl.getTrack);
router.get("/user", db_ctrl.getUser);

// Add song to playlist
router.put("/addToPlaylist/:playlistId", db_ctrl.addToPlaylist);
// Remove song from playlist
router.put("/removeFromPlaylist/:playlistId", db_ctrl.removeFromPlaylist);

module.exports = router;
