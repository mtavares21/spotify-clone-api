const express = require("express");
const router = express.Router();
const db_utils = require("../controlllers/db_utils");

const artists = "61cbeb445f44cb3d8a754389";
const spotifyUrl = "https://open.spotify.com/track/42o3gy9e8dzBHvQE991ad8";
const name = "Liked Songs";
const images = [
  {
    height: "640",
    url: "https://i.scdn.co/image/ab67616d0000b2734ada80e2e0d11d8f6a99d42e",
    width: "640",
  },
  {
    height: "640",
    url: "https://i.scdn.co/image/ab67616d0000b2734ada80e2e0d11d8f6a99d42e",
    width: "640",
  },
];
const totalTracks = 12;
const spotifyId = "42o3gy9e8dzBHvQE991ad8";
const spotifyUri = "spotify:track:42o3gy9e8dzBHvQE991ad8";
const trackNumber = 5;
const album = "61cbf08fda7a80c9ee757e7b";
const tracks = [
  "61cbf206c35735a3bec22d71",
  "61cbf206c35735a3bec22d73",
  "61cbf206c35735a3bec22d75",
];

router.get("/createUser", async (req, res, next) => {
  const creatUser = await db_utils.createUser(
    "migtavares6@gmail.com",
    "000000",
    "e163015fd31950a5afb4d54a5e026ad55cac2603",
    next
  );
  // Error is dealt in createUser
  if (createUser === null) res.json(`New user created.`);
});
router.get("/createAlbum", async (req, res, next) => {
  const createAlbum = await db_utils.createAlbum(
    artists,
    spotifyUrl,
    name,
    images,
    totalTracks,
    spotifyId,
    spotifyUri,
    next
  );
  if (createAlbum === null) res.json(`New Album created.`);
});
router.get("/createArtist", async (req, res, next) => {
  const createArtist = await db_utils.createArtist(
    spotifyUrl,
    name,
    spotifyId,
    spotifyUri,
    next
  );
  if (createArtist === null) res.json("New Artist created.");
});
router.get("/createTrack", async (req, res, next) => {
  const createTrack = await db_utils.createTrack(
    album,
    artists,
    spotifyUrl,
    name,
    trackNumber,
    spotifyId,
    spotifyUri,
    next
  );

  if (createTrack === null) res.json(`New Track created.`);
});
router.get("/createPlaylist", async (req, res, next) => {
  const createPlaylist = await db_utils.createPlaylist(
    name,
    tracks,
    images,
    totalTracks,
    spotifyId,
    spotifyUri,
    next
  );
  if (createPlaylist === null) res.json(`New playlist created.`);
});

module.exports = router;
