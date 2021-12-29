const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = mongoose.model(
  "User",
  new Schema({
    username: { type: String, required: true },
	spotifyId: {type: String, required: true},
	deviceId: { type: String }
  })
);

//Export model
module.exports = User;