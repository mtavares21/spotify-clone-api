const debug = require("debug")("album_fact");
const Album = require("../models/album_model");
const dbUtils = require("../controlllers/db_utils");

exports.albumMethods = function (spotifyId) {
  function exists() {
    return dbUtils.existsInDb(Album, spotifyId);
  }
  function createAlbum(
    artists,
    spotifyUrl,
    name,
    images,
    totalTracks,
    spotifyUri
  ) {
    const newAlbum = new Album({
      artists,
      spotifyUrl,
      name,
      images,
      totalTracks,
      spotifyId,
      spotifyUri,
    });

    const response = new Promise((resolve, reject) => {
      newAlbum.save((error) => {
        if (error) return reject(error);
        resolve(true);
      });
    });

    return response;
  }
  return { exists, createAlbum };
};
