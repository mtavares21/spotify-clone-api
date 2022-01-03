const debug = require("debug")("playlist_fact");
const Playlist = require("../models/playlist_model");

exports.playlistMethods = function (playlistId) {

	const exists = (callback) => {
	
		Playlist.findById(playlistId).exec((error, data)=>{
			if(error){
				return callback(error,false);
			}
			callback(null, true)
		})
	}

	// Search track by spotifyId
	const containsTrack = async (trackSpotifyId, callback) => {
	
		Playlist.findById(playlistId).populate({path:"tracks"}).exec( (error, playlist) =>{
			if (error) {			
				return callback(error, null)
			}
			debug(playlist)
			const trackFilter = playlist.tracks.filter(track => track.spotifyId == trackSpotifyId)
			callback(null, !!trackFilter.length)
		})
	}
  // Add an track do playlist and return the playlist object
	const addTrack = (trackId, callback) => {
		Playlist.findById(playlistId).exec( (err, response) => {
			if(err)
				return callback(err, null)
			response.tracks.push(trackId)
			response.save()
			callback(null, response)
		})
	}
  
	const removeTrack = (trackId) => {
		Playlist.findById(playlistId).exec(track, (err, res) => callback(err, res))
	}
	return {exists, containsTrack, addTrack, removeTrack}
  }