const express = require("express");
const router = express.Router();
const querystring = require("querystring");
const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const axios = require("axios");
const debug = require('debug')('users')

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Test Connection");
});
const redirect_uri = "http://localhost:3000/v1/users/callback";

const app = express();

// // PASSPORT SPOTIFY STRATEGY
// passport.use(
//   new SpotifyStrategy(
//     {
//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       callbackURL: redirect_uri
//     },
//     function(accessToken, refreshToken, expires_in, profile, done) {
//       User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
//         return done(err, user);
//       });
//     }
//   )
// );

// router.get('/login', passport.authenticate('spotify'));

// router.get(
//   '/callback',
//   passport.authenticate('spotify', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   }
// );

router.get("/login", function (req, res) {
  const state = "myrandom0987state";
  const scope = "user-read-private user-read-email";

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
});

router.get("/callback", function (req, res) {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const params = new URLSearchParams()

  if (state === null) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        "code": code,
        "redirect_uri": redirect_uri,
        "grant_type": 'authorization_code',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
      }
    };
  }
  debug("callback: " + JSON.stringify(authOptions))
  params.append('code', code)
  params.append('redirect_uri', redirect_uri)
  params.append('grant_type', 'authorization_code')

  axios
    .post(authOptions.url,params, {headers: authOptions.headers})
    .then((response)=> debug(response.data))
    .catch((error) => res.send(error.message))
  res.redirect("/v1")
});

module.exports = router;
