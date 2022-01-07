const debug = require("debug")("playlist_fact");
const mongoose = require("mongoose");
const Playlist = require("../models/playlist_model");

exports.playlistMethods = async function () {
  async function createPlaylist(args) {
    debug(args);
    const newPlaylist = new Playlist(args);
    try {
      const queryPlaylist = await Playlist.find({ name: args.name });
      debug("queryPlaylist: ", !!queryPlaylist.length);
      if (!queryPlaylist.length) {
        newPlaylist.save();
        return Promise.resolve({
          message: "New playlist created.",
          playlist: newPlaylist,
        });
      }
      return Promise.resolve({
        message: "Playlist already exists",
        playlist: queryPlaylist[0],
      });
    } catch (error) {
      Promise.reject(new Error(error));
    }
  }

  async function addToPlaylist(playlistId, trackId) {
    const mongooseId = mongoose.Types.ObjectId(playlistId);
    const response = new Promise((resolve, reject) => {
      Playlist.findById(mongooseId, function (err, playlist) {
		if(err)
			return reject({message: "Error accessing database", error: err})
		const tracks = playlist.tracks;
		const totalTracks = tracks.length;
		// Verify if track is in the playlist
		const isInPlaylist = !!tracks.filter(() => trackId).length
		if(!isInPlaylist){
			tracks.push(trackId);
			playlist.tracks = tracks;
			playlist.totalTRacks = totalTracks;
			playlist
			.save()
			.then((data) => {
					resolve({message: "Track added to playlist", playlist})
				})
			.catch((err) => {
				reject({message: "Error accessing database", error: err})
				});
		} else {
			return resolve({message: "Track already in playlist", playlist}
		)}
      })
    });
    return response;
  }

  async function removeFromPlaylist(playlistId, trackId){
	const playMongoId = mongoose.Types.ObjectId(playlistId);
	const trackMongoId = mongoose.Types.ObjectId(trackId);

    const response = new Promise((resolve, reject) => {
      Playlist.findById(playMongoId, function (err, playlist) {
		  if(err)
			  return reject({message: "Error accessing database", error: err})
		//Params to update
        const tracks = playlist.tracks;
		const totalTracks = playlist.totalTracks--;
		// Verify if track is in the playlist
		const removedTrack = tracks.filter((track) =>  !trackMongoId)
			playlist.tracks = removedTrack;
			playlist.totalTracks = removedTrack.length;
			debug("removedTrack: ",removedTrack)
			debug("totalTracks: ", totalTracks)
			playlist
			.save()
			.then(() => {
					resolve({message: "Track removed from playlist", playlist})
				})
			.catch((err) => {
				reject({message: "Error accessing database", error: err})
				});
      })
    });
    return response;
  }
  return { createPlaylist, addToPlaylist, removeFromPlaylist };
};
