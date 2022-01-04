const debug = require("debug")("db_ctrl");
const db_utils = require("./db_utils");
const Playlist = require("../models/playlist_model");
const Album = require("../models/album_model");
const Track = require("../models/track_model");
const Artist = require("../models/artist_model");
const User = require("../models/user_model");
const { artistMethods } = require("../model_methods/artist_fact");
const { albumMethods } = require("../model_methods/album_fact");

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
  debug("token: ", req.session.token);
  Album.createAlbum(
    req.session.token,
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
    req.query.images
  )
    .then(() => res.status(200).json("New artist created."))
    .catch((error) => res.status(404).json(error));
};

exports.createTrack = async (req, res, next) => {
  const createTrack = await db_utils.createTrack(
    req.query.album,
    req.query.artists,
    req.query.spotifyUrl,
    req.query.name,
    req.query.trackNumber,
    req.query.spotifyId,
    req.query.spotifyUri,
    next
  );

  if (createTrack === null) res.json(`New Track created.`);
};

exports.createPlaylist = async (req, res, next) => {
  const createPlaylist = await db_utils.createPlaylist(
    req.query.name,
    req.query.tracks.split(","),
    req.query.images,
    req.query.totalTracks,
    req.query.spotifyId,
    req.query.spotifyUri,
    next
  );
  if (createPlaylist === null) res.json(`New playlist created.`);
};

// Get playlist + query(liked_songs)
exports.getPlaylist = async (req, res, next) => {
  db_utils.getFromDb(Playlist, req, res, next, "db_ctrl: GET PLAYLIST");
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

// Add track to playlist + query(liked_songs)
// req => spotifyTrack.item =>
/*
{
	album,
	artists,
	external_urls {spotidy:spotifyUrl} 
	id, 
	name, 
	duration, 
	spotifyUri, 
	track_umber
}*/
exports.addToPlaylist = (req, res, next) => {
  const Playlist = db_utils.playlistMethods(req.params.playlistId);
  // Check for Playlist
  Playlist.exists((error, response) => {
    if (error) return res.status(404).json("Cant't find requested playlist.");
  });
  // Check for Track
  debug("trackId:", req.query.trackId);
  Playlist.containsTrack(req.query.trackId, (error, response) => {
    if (error)
      return res.status(404).json({ message: "Cant't find resource" }, error);
    else if (response)
      return res
        .status(200)
        .json({ message: "Track already in this playlist" });
    res.status(200).json({ message: "Track is not in this playlist." });
  });
  // Check for album (create or update)

  // Check for track (create or update)
};
exports.removeFromPlaylist = (req, res, next) => {};
