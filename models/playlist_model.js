const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Playlist = mongoose.model(
  "Playlist",
  new Schema({
	name:{type: String, unique:true},
	tracks:[{ type: Schema.Types.ObjectId, ref: 'Track' }],
	images:[{ type: Object}],
	totalTracks: { type: Number},
	spotifyUri: { type: String },
  })
);

// Export model
module.exports = Playlist;