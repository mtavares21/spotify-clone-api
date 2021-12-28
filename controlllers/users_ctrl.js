const express = require("express");
const querystring = require("querystring");
const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const axios = require("axios");
const debug = require("debug")("users_ctrl");
const redirect_uri = "http://localhost:3000/v1/users/callback";

exports.spotifyLogin = function (req, res, next) {
  const state = "myrandom0987state";
  const scope ="user-read-playback-state,user-modify-playback-state,user-read-currently-playing,streaming,app-remote-control,user-read-playback-position,user-top-read";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: process.env.CLIENT_ID,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
};

exports.spotifyCallback = function (req, res, next) {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const params = new URLSearchParams();

  if (state === null) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
		grant_type: "authorization_code",
		scope: "user-read-playback-state,user-modify-playback-state,user-read-currently-playing,streaming,app-remote-control,user-read-playback-position,user-top-read"
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer(
            process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
          ).toString("base64"),
      },
    };
  }
  // URL ENCODE PARAMS
  debug("callback: " + JSON.stringify(authOptions));
  params.append("code", code);
  params.append("redirect_uri", redirect_uri);
  params.append("grant_type", "authorization_code");
  // POST TO SPOTIFY
  axios
    .post(authOptions.url, params, { headers: authOptions.headers })
    .then((response) => {
	// SAVE TOKEN TO SESSION
      req.session.token = response.data.access_token;
	  req.session.refresh_token = response.data.refresh_token;
	  debug(req.session)
      res.json(response.data);
    })
    .catch((error) => next(error));
};
