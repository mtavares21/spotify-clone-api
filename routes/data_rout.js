const express = require("express");
const router = express.Router();
const data_ctrl = require("../controlllers/data_ctrl")

/* ------------- SEARCH by, type, song, album, etc (ex: ?q=exile&type=album&limit=10) -------------- */
router.get("/search", data_ctrl.search)

/* ------------- ALBUNS -------------- */
//GET album by id
router.get("/album/:albumId", data_ctrl.getAlbum)
//GET albuns (comma separated id's)
router.get("/albums", data_ctrl.getAlbums)
//GET album tracks
router.get("/albumTracks/:albumId", data_ctrl.getAlbumTracks)

/* ------------- ARTISTS -------------- */
// GET artist by id
router.get("/artist/:artistId", data_ctrl.getArtist)
// GET artists
router.get("/artists", data_ctrl.getArtists)
// GET artists albums
router.get("/artistAlbums/:artistId", data_ctrl.getArtistAlbums)

/* ------------- TRACKS -------------- */
// GET track by id
router.get("/track/:trackId", data_ctrl.getTrack)
// GET tracks
router.get("/tracks", data_ctrl.getTracks)

module.exports = router;