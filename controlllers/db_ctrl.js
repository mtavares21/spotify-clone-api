const debug = require("debug")("db_ctrl");
const db_utils = require("./db_utils");
const Playlist = require("../models/playlist_model");
const Album = require("../models/album_model");
const Track = require("../models/track_model");
const Artist = require("../models/artist_model");
const User = require("../models/user_model");
const { artistMethods } = require("../model_methods/artist_fact");
const { albumMethods } = require("../model_methods/album_fact");
const { trackMethods } = require("../model_methods/track_fact");
const { playlistMethods } = require("../model_methods/playlist_fact");

// ----------------- GET docs -----------------------
exports.getPlaylist = async (req, res, next) => {
  db_utils.getPlaylistFromDb(Playlist, req, res, next, "db_ctrl: GET PLAYLIST");
};
exports.getAlbum = async (req, res, next) => {
  db_utils.getFromDb(Album, req, res, next, "db_ctrl: GET ALBUM");
};
exports.getArtist = async (req, res, next) => {
  db_utils.getFromDb(Artist, req, res, next, "db_ctrl: GET ARTIST");
};
exports.getTrack = async (req, res, next) => {
  db_utils.getFromDb(Track, req, res, next, "db_ctrl: GET TRACK");
};
exports.getUser = async (req, res, next) => {
  db_utils.getFromDb(User, req, res, next, "db_ctrl: GET USER");
};

// ----------------- POST docs -----------------------
exports.createUser = async (req, res, next) => {
  const creatUser = await db_utils.createUser(
    req.query.username,
    req.query.sportifyId,
    req.query.deviceId,
    next
  );
  // Error is dealt in createUser
  if (createUser === null) res.json(`New user created.`);
};

exports.createAlbum = async function (req, res, next) {
  const Album = await albumMethods(req.query.spotifyId);
  debug("token: ", req.query.token);
  Album.createAlbum(
    req.query.token,
    req.query.artists,
    req.query.spotifyUrl,
    req.query.name,
    req.query.images.split(","),
    req.query.totalTracks,
    req.query.spotifyUri
  )
    .then((response) => res.status(200).json("New album created."))
    .catch((error) => {
      res.status(404).json({ message: "Error accessing database.", error });
    });
};

exports.createArtist = (req, res, next) => {
  // Initiate instance of artist
  const Artist = artistMethods(req.query.spotifyId);
  Artist.createArtist(
    req.query.spotifyUrl,
    req.query.name,
    req.query.spotifyUri,
    req.query.images.split(",")
  )
    .then(() => res.status(200).json("New artist created."))
    .catch((error) => res.status(404).json(error));
};

exports.createTrack = async (req, res, next) => {
  const Track = await trackMethods(req.query.spotifyId);
  Track.createTrack(
    req.query.token,
    req.query.album,
    req.query.artists,
    req.query.spotifyUrl,
    req.query.name,
    req.query.trackNumber,
    req.query.spotifyUri
  )
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(404).json(error));
};

exports.createPlaylist = async (req, res, next) => {
  const playlistInstance = await playlistMethods();
  const playlistParams = {
    user: req.query.user,
    name: req.query.name,
    tracks: req.query.tracks ? req.query.tracks.split(",") : [],
    images: req.query.images ? req.query.images.split(",") : [],
    totalTracks: req.query.totalTracks,
    spotifyId: req.query.spotifyId,
    spotifyUri: req.query.spotifyUri,
  };
  playlistInstance
    .createPlaylist(playlistParams)
    .then((response) => res.json(response))
    .catch((err) => res.status(404).json(err));
};

// ----------------- PUT docs -----------------------

exports.addToPlaylist = async (req, res, next) => {
  const Track = await trackMethods(req.query.spotifyId);
  Track.createTrack(
    req.query.token,
    req.query.album,
    req.query.artists,
    req.query.spotifyUrl,
    req.query.name,
    req.query.trackNumber,
    req.query.spotifyUri
  )
    .then(async (track) => {
      const playlistInstance = await playlistMethods();
      playlistInstance
        .addToPlaylist(req.params.playlistId, track.track[0]._id)
        .then((response) => res.status(200).json(response))
        .catch((error) => res.status(404).json(error));
    })
    .catch((error) => res.status(404).json(error));
};
exports.removeFromPlaylist = async (req, res, next) => {
  const playlistInstance = await playlistMethods();
  playlistInstance
    .removeFromPlaylist(req.params.playlistId, req.query.trackId)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(404).json(error));
};
