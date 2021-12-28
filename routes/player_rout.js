const express = require("express");
const router = express.Router();
const player_ctrl = require("../controlllers/player_ctrl")

// Get Playback State
router.get("/state", player_ctrl.playerState)

// Get Currently Playing Track
router.get("/currTrack", player_ctrl.getCurrTrack)

// Start/Resume Playback
router.get("/play", player_ctrl.play)

// Pause Playback
router.get("/pause", player_ctrl.pause)

// Skip To Next
router.get("/next", player_ctrl.nextSong)

// Skip To Previous
router.get("/prev", player_ctrl.prevSong)

// Seek To Position
router.get("/prev", player_ctrl.seekTo)

//Add Item to Playback Queue
router.get("/prev", player_ctrl.addToQueue)

module.exports = router;