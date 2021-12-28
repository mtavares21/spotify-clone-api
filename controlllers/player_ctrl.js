const express = require("express");
const axios = require("axios");
const utils = require("./utils");
const debug = require("debug")("player_ctrl");
const baseUrl = "https://api.spotify.com/v1/me";

async function getPlayerState(req) {
  const endpoint = `/player`;
  const query = utils.queryToParams(req.query);
  const url = baseUrl + endpoint + query;

  debug("player: " + url);
  // Set headers
  const headers = {
    Authorization: "Bearer " + req.session.token,
    "Content-Type": "application/json",
  };

  // Send request
  try {
    const response = await axios.get(url, { headers });
    return response.data;
    debug(response.data);
  } catch (error) {
    debug(error);
    return error;
  }
}
// Get Playback State
exports.playerState = async function (req, res, next) {
  const state = await getPlayerState(req, res, next);
  try {
    res.json(state);
  } catch (error) {
    next(error);
  }
};

// Get Currently Playing Track
exports.getCurrTrack = async function (req, res, next) {
  const endpoint = `/player/currently-playing`;
  const query = utils.queryToParams(req.query);
  const url = baseUrl + endpoint + query;

  debug("player: " + url);
  // Set headers
  const headers = {
    Authorization: "Bearer " + req.session.token,
    "Content-Type": "application/json",
  };

  // Send request
  try {
    const response = await axios.get(url, { headers });
    res.json(response.data);
    debug("track_name:" + response.data.item.name);
  } catch (error) {
    debug(error);
    next(error);
  }
};

// Start/Resume Playback
exports.play = async function (req, res, next) {
  const endpoint = `/player/play`;
  const query = utils.queryToParams(req.query);
  const url = baseUrl + endpoint;

  debug("play: " + url);
  // Set headers
  const headers = {
    Authorization: "Bearer " + req.session.token,
    "Content-Type": "application/json",
  };
  // Get currState
  const state = await getPlayerState(req);
  debug("constext_uri: " + state.context.uri);
  debug("progress:ms: " + state.progress_ms);
  const data = {
    context_uri: state.context.uri,
    offset: {
      position: 0,
    },
    position_ms: state.progress_ms,
  };

  // Send request
  try {
    const response = await axios.put(url, data, { headers });
    res.status(200).end();
  } catch (error) {
    debug(error);
    next(error);
  }
};

// Pause Playback
exports.pause = async function (req, res, next) {
  const endpoint = `/player/pause`;
  const url = baseUrl + endpoint;

  debug("pause: " + url);
  // Set headers
  const headers = {
    Authorization: "Bearer " + req.session.token,
    "Content-Type": "application/json",
  };
  // Send request
  try {
	const response = await axios.put(url,{device_id:""},{ headers });
	debug(response.data)
    res.status(200).end();
  } catch (error) {
    debug(error);
    next(error);
  }
};

// Skip To Next
exports.nextSong = async function (req, res, next) {};

// Skip To Previous
exports.prevSong = async function (req, res, next) {};

// Seek To Position
exports.seekTo = async function (req, res, next) {};

//Add Item to Playback Queue
exports.addToQueue = async function (req, res, next) {};
