const debug = require("debug")("db_utils")
const User = require("../models/user_model");
const Track = require("../models/track_model");
const Artist = require("../models/artist_model");
const Album = require("../models/album_model")
const Playlist = require("../models/playlist_model");

// Create items in db 

exports.createUser = async (username, spotifyId, deviceId, handleError) => {
	let result = null;

	const newUser = new User({
		username, spotifyId, deviceId
	});

	await newUser.save((error =>{
		if(error){
			return handleError(error)	
		}
	}))

	return result
}

exports.createAlbum = async (artists, spotifyUrl, name, images, totalTracks, spotifyId,spotifyUri, handleError) => {
	let result = null;

	const newAlbum = new Album({
		artists, spotifyUrl, name, images, totalTracks, spotifyId, spotifyUri
	});

	await newAlbum.save((error =>{
		if(error){
			debug("error", error)
			result = error
			handleError(error)	
		}
	}))
	debug("result:", result)
	return result
}

exports.createArtist = async (spotifyUrl, name, spotifyId, spotifyUri, handleError) =>{
	let result = null;

	const newArtist= new Artist({
		spotifyUrl, name, spotifyId, spotifyUri
	});

	await newArtist.save((error =>{
		if(error){
			debug(error)
			result = error;
			handleError(error)	
		}
	}))

	return result
}

exports.createTrack = async (album, artists, spotifyUrl, name, trackNumber, spotifyId, spotifyUri, handleError) =>{
	let result = null;

	const newTrack= new Track({
		album, artists, spotifyUrl, name, trackNumber, spotifyId, spotifyUri
	});

	await newTrack.save((error =>{
		if(error){
			debug(error)
			result = error;
			return handleError(error)	
		}
	}))

	return result
}

exports.createPlaylist = async (name, tracks, spotifyUrl, totalTracks, spotifyId, spotifyUri, handleError) => {
	const result = null;

	const newPlaylist= new Playlist({
		name, tracks, spotifyUrl, totalTracks, spotifyId, spotifyUri,
	});

	await newPlaylist.save((error =>{
		if(error){
			return handleError(error)	
		}
	}))

	return result
}

// Get items db