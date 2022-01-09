const express = require("express");
const router = express.Router();
const userCtrl = require("../controlllers/users_ctrl")

// Spotify Login
router.get("/login", userCtrl.login);
router.get("/spotifylogin", userCtrl.spotifyLogin);

router.get("/callback", userCtrl.spotifyCallback);

module.exports = router;
