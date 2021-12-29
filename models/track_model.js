const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Track = mongoose.model(
  "Track",
  new Schema({
    album: { type: Schema.Types.ObjectId, ref: "Album" },
    artists: { type: Schema.Types.ObjectId, ref: "Artist", required: true },
    spotifyUrl: { type: String },
    name: { type: String },
    trackNumber: { type: Number },
    spotifyId: { type: String, required: true },
    spotifyUri: { type: String, required: true },
  })
);
//Export model
module.exports = Track;
