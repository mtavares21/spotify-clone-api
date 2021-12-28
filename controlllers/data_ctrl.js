const express = require("express");
const axios = require("axios");
const debug = require("debug")("search_ctrl");
const utils = require("./utils")
const baseUrl = "https://api.spotify.com/v1";

/* ------------- SEARCH by, type, song, album, etc (ex: ?q=exile&type=album&limit=10) -------------- */
exports.search = async function (req, res, next) {
  const endpoint = "/search";
  const query = req.originalUrl.slice(req.originalUrl.indexOf("?q="));
  const url = baseUrl + endpoint + query;
  const headers = {
    Authorization: "Bearer " + req.session.token,
    "Content-Type": "application/json",
  };
  // Search on spotify
  try {
    const response = await axios.get(url, { headers });
    res.json(response.data);
  } catch (error) {
    debug(error);
    next(error);
  }
};

/* ------------- ALBUMS -------------- */
//GET album by id
exports.getAlbum = async function (req, res, next) {

  //Compose URL
  const endpoint = "/albums/";
  const albumId = req.params.albumId;
  const url = baseUrl + endpoint + albumId + utils.queryToParams(req.query);
	debug("getAlbum url: " + url)
  // Set headers
  const headers = {
    Authorization: "Bearer " + req.session.token,
    "Content-Type": "application/json",
  };

  // Send request
  try {
	const response = await axios.get(url, { headers });
		res.json(response.data);
		debug(response.data.tracks.items.map( track => track.name))
  } catch (error) {
    debug(error);
    next(error);
  }
};

//GET albums (comma separated id's)
exports.getAlbums = async function (req, res, next) {

	//Compose URL
	const endpoint = "/albums";
	const query = utils.queryToParams(req.query);
	debug(query)
	const url = baseUrl + endpoint + query;
	debug("getAlbums url: " + url )
	// Set headers
	const headers = {
	  Authorization: "Bearer " + req.session.token,
	  "Content-Type": "application/json",
	};
  
	// Send request
	try {
	  const response = await axios.get(url, { headers });
	  res.json(response.data);
	  debug("getAlbums response:" + response.data)
	} catch (error) {
	  debug(error);
	  next(error);
	}
  };
//GET album tracks
exports.getAlbumTracks = async function (req, res, next) {

	//Compose URL
	const albumId = req.params.albumId;
	const endpoint = `/albums/${albumId}/tracks`;
	const query = utils.queryToParams(req.query);
	const url = baseUrl + endpoint + query;
  
	// Set headers
	const headers = {
	  Authorization: "Bearer " + req.session.token,
	  "Content-Type": "application/json",
	};
  
	// Send request
	try {
	  const response = await axios.get(url, { headers });
	  res.json(response.data);
	  debug(response.data.items.map(track => track.name))
	} catch (error) {
	  debug(error);
	  next(error);
	}
  };
/* ------------- ARTISTS -------------- */
// GET artist by id
exports.getArtist = async function (req, res, next) {
  //Compose URL
  const endpoint = "/artists/";
  const artistId = req.params.artistId;
  const query = utils.queryToParams(req.query);
  const url = baseUrl + endpoint + artistId + query;
  debug("getArtist url: " + url);
  // Set headers
  const headers = {
    Authorization: "Bearer " + req.session.token,
    "Content-Type": "application/json",
  };

  // Send request
  try {
    const response = await axios.get(url, { headers });
    res.json(response.data);
    debug("getArtist response.name: " + response.data.name);
  } catch (error) {
    debug(error);
    next(error);
  }
};
// GET artists
exports.getArtists = async function (req, res, next) {
  //Compose URL
  const endpoint = "/artists";
  const query = utils.queryToParams(req.query);
  const url = baseUrl + endpoint + query;

  debug("getArtists url: " + url);
  // Set headers
  const headers = {
    Authorization: "Bearer " + req.session.token,
    "Content-Type": "application/json",
  };

  // Send request
  try {
    const response = await axios.get(url, { headers });
    res.json(response.data);
    debug("getArtist response:" + response.data);
  } catch (error) {
    debug(error);
    next(error);
  }
};
// GET artists albums
exports.getArtistAlbums = async function (req, res, next) {

//Compose URL
const artistId = req.params.artistId;
const endpoint = `/artists/${artistId}/albums`;
const query = utils.queryToParams(req.query);
debug(req.query)

debug(utils.queryToParams(req.query));
const url = baseUrl + endpoint + query;

// Set headers
const headers = {
  Authorization: "Bearer " + req.session.token,
  "Content-Type": "application/json",
};

// Send request
try {
  const response = await axios.get(url, { headers });
  res.json(response.data);
  debug(response.data.items.map((album, index) => index + " - " + album.name))
} catch (error) {
  debug(error);
  next(error);
}
  };
/* ------------- TRACKS -------------- */
// GET track by id
exports.getTrack = async function (req, res, next) {

	//Compose URL
	const endpoint = "/tracks/";
	const trackId = req.params.trackId;
	const query = utils.queryToParams(req.query);
	const url = baseUrl + endpoint + trackId + query;
	debug("get track:" + url)
	// Set headers
	const headers = {
	  Authorization: "Bearer " + req.session.token,
	  "Content-Type": "application/json",
	};
  
	// Send request
	try {
	  const response = await axios.get(url, { headers });
	  res.json(response.data);
	} catch (error) {
	  debug(error);
	  next(error);
	}
  };
// GET tracks
exports.getTracks = async function (req, res, next) {

	//Compose URL
	const endpoint = "/tracks";
	const query = utils.queryToParams(req.query);
	const url = baseUrl + endpoint + query;
  
	// Set headers
	const headers = {
	  Authorization: "Bearer " + req.session.token,
	  "Content-Type": "application/json",
	};
  
	// Send request
	try {
	  const response = await axios.get(url, { headers });
	  res.json(response.data);
	} catch (error) {
	  debug(error);
	  next(error);
	}
  };