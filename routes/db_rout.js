const express = require("express");
const router = express.Router();
const db_ctrl = require("../controlllers/db_ctrl");
const { artistMethods } = require("../model_methods/artist_fact");

// Create routes
router.post("/artist", db_ctrl.createArtist);
router.post("/album", db_ctrl.createAlbum);

router.post("/user", db_ctrl.createUser);
router.post("/track", db_ctrl.createTrack);
router.post("/playlist", db_ctrl.createPlaylist);

// Get routes
router.get("/playlist", db_ctrl.getPlaylist);
router.get("/album", db_ctrl.getAlbum);
router.get("/artist", db_ctrl.getArtist);
router.get("/track", db_ctrl.getTrack);
router.get("/user", db_ctrl.getUser);
// Song in playlist ?
router.put("/playlist/:playlistId/in", db_ctrl.isInPlaylist);
// Add song to playlist
router.put("/playlist/:playlistId/add", db_ctrl.addToPlaylist);
// Remove song from playlist
router.put("/playlist/:playlistId/remove", db_ctrl.removeFromPlaylist);

module.exports = router;
