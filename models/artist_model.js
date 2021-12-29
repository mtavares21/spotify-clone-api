const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Artist = mongoose.model(
  "Artist",
  new Schema({
    spotifyUrl: { type: String },
    name: { type: String },
    images: [{ type: String }],
    spotifyId: { type: String, required: true },
    spotifyUri: { type: String, required: true },
  })
);
//Export model
module.exports = Artist;
