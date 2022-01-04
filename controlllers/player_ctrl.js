const express = require("express");
const axios = require("axios");
const utils = require("./utils");
const debug = require("debug")("player_ctrl");
const baseUrl = "https://api.spotify.com/v1/me";

async function getPlayerState(req, res, next) {
  const endpoint = `/player`;
  const query = utils.queryToParams(req.query);
  const url = baseUrl + endpoint + query;

  debug("player: " + url);
  debug("token: %O", req.session);
  // Set headers
  const headers = {
    Authorization: "Bearer " + req.session.token,
    "Content-Type": "application/json",
  };

  // Send request
  try {
    const response = await axios.get(url, { headers });
    debug("response: %O", response)
    return response.data;
  } catch (error) {
    utils.axiosErrorHandler(res, "player_ctrl",error, next);
  }
}
// Get Playback State
exports.playerState = async function (req, res, next) {
  const state = await getPlayerState(req, res, next);
  debug(state);
  try {
    res.status(200).json(state);
  } catch (error) {
    utils.axiosErrorHandler(res, "player_ctrl",error, next);
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
    res.status(200).json(response.data);
    debug("track_name:" + response.data.item.name);
  } catch (error) {
    utils.axiosErrorHandler(res, "player_ctrl",error, next);
  }
};

// Start/Resume Playback
exports.play = async function (req, res, next) {
  const endpoint = `/player/play`;
  const query = req.query;
  const device_id = query.device_id ? "?device_id=" +query.device_id : "";
  const url = baseUrl + endpoint + device_id;
  let contextUri = null;
  let progress = query.progress ? query.progress : "0";

  debug("play: " + url);
  // Set headers
  const headers = {
    Authorization: "Bearer " + req.session.token,
    "Content-Type": "application/json",
  };

  // Check if context exists or resume curr track
  debug("query.context!",query.contextUri)
  if (!!query.contextUri) contextUri = query.contextUri;
  else {
    const state = await getPlayerState(req,res, next);
    contextUri = state.context ? state.context.uri : null;
    progress = state.progress_ms;
  }

  const data = {
    context_uri: contextUri,
    position_ms: progress,
  };

  const offset = { position: 0 };
  if (req.query.offset) {
    Object.assign(data, { offset });
  }
  debug(data);
  // Send request
  try {
    const response = await axios.put(url, data, { headers });
    res.status(200).end();
  } catch (error) {
	debug("catch error")
    utils.axiosErrorHandler(res, "player_ctrl",error, next);
  }
};
// Pause Playback
exports.pause = async function (req, res, next) {
  const endpoint = `/player/pause`;
  const device_id = req.query.device_id ? "?device_id=" + req.query.device_id : "";
  const url = baseUrl + endpoint + device_id;

  debug("pause: " + url);
  // Set headers
  const headers = {
    Authorization: "Bearer " + req.session.token,
    "Content-Type": "application/json",
  };
  debug("headers",headers)
  // Send request
  try {
    const response = await axios.put(url,device_id,{ headers });
    res.status(200).end();
  } catch (error) {
    utils.axiosErrorHandler(res, "player_ctrl",error, next);
  }
};

// Skip To Next
exports.nextSong = async function (req, res, next) {
  const endpoint = `/player/next`;
  const device_id = req.query.device_id ? "?device_id=" + req.query.device_id : "";
  const url = baseUrl + endpoint + device_id;

  debug("pause: " + url);
  // Set headers
  const headers = {
    Authorization: "Bearer " + req.session.token,
    "Content-Type": "application/json",
  };
  // Send request
  try {
    const response = await axios.post(url, device_id, { headers });
    debug(response.data);
    res.status(200).end();
  } catch (error) {
    utils.axiosErrorHandler(res, "player_ctrl",error, next);
  }
};

// Skip To Previous
exports.prevSong = async function (req, res, next) {
  const endpoint = `/player/previous`;
  const device_id = req.query.device_id ?  "?device_id=" + req.query.device_id : "";
  const url = baseUrl + endpoint + device_id;

  debug("pause: " + url);
  // Set headers
  const headers = {
    Authorization: "Bearer " + req.session.token,
    "Content-Type": "application/json",
  };
  // Send request
  try {
    const response = await axios.post(url, device_id, { headers });
    debug(response.data);
    res.status(200).end();
  } catch (error) {
    res.redirect("http://localhost:3000/v1/player/play");
  }
};

// Seek To Position
exports.seekTo = async function (req, res, next) {
  const endpoint = `/player/seek`;
  const query = utils.queryToParams(req.query);
  const url = baseUrl + endpoint + query;

  debug("seekTo: " + url);

  // Set headers
  const headers = {
    Authorization: "Bearer " + req.session.token,
    "Content-Type": "application/json",
  };

  // Send request
  try {
	const response = await axios.put(url,query, { headers });
    res.status(200).end();
  } catch (error) {
    utils.axiosErrorHandler(res, "player_ctrl",error, next);
  }
};

//Add Item to Playback Queue
exports.addToQueue = async function (req, res, next) {
	const endpoint = `/player/queue`;
	const query = utils.queryToParams(req.query);
	const url = baseUrl + endpoint + query;
  
	debug("addToQueue: " + url);
  
	// Set headers
	const headers = {
	  Authorization: "Bearer " + req.session.token,
	  "Content-Type": "application/json",
	};

	// Send request
	try {
	  const response = await axios.post(url,query, {headers} );
	  res.status(200).end();
	} catch (error) {
	  utils.axiosErrorHandler(res, "player_ctrl",error, next);
	}
};


//Set Playback Volume
exports.setVolume = async function (req, res, next){
	const endpoint = `/player/volume`;
	const query = utils.queryToParams(req.query);
	const url = baseUrl + endpoint + query;
  
	debug("addToQueue: " + url);
  
	// Set headers
	const headers = {
	  Authorization: "Bearer " + req.session.token,
	  "Content-Type": "application/json",
	};

	// Send request
	const response = await axios.put(url,query, {headers} );
	try {
	  res.status(200).end();
	} catch (error) {
	  utils.axiosErrorHandler(res, "player_ctrl",error, next);
	}
}