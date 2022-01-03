const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Album = mongoose.model(
  "Album",
  new Schema({
    artists: { type: Schema.Types.ObjectId, ref: "Artist", required: true },
    spotifyUrl: { type: String },
    name: { type: String },
    images: [{ type: Object }],
    totalTracks: { type: Number },
    spotifyId: { type: String, required: true },
    spotifyUri: { type: String, required: true },
  })
);
//Export model
module.exports = Album;
