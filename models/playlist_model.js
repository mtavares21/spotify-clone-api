const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Playlist = mongoose.model(
  "Playlist",
  new Schema({
	name:{type: String},
	tracks:[{ type: Schema.Types.ObjectId, ref: 'Track' }],
	images:[{ type: Object}],
	totalTracks: { type: Number},
    spotifyId: { type: String },
	spotifyUri: { type: String },
  })
);

// Export model
module.exports = Playlist;