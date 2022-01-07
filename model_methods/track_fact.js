const debug = require("debug")("track_fact");
const Artist = require("../models/artist_model");
const Album = require("../models/album_model");
const Track = require("../models/track_model");
const dbUtils = require("../controlllers/db_utils");
const axios = require("axios");
const { albumMethods } = require("./album_fact");

exports.trackMethods = async function (spotifyId) {
  async function exists() {
    const exists = await dbUtils.existsInDb(Track, spotifyId);
    return exists;
  }
  async function createTrack(
    token,
    album,
    artists,
    spotifyUrl,
    name,
    trackNumber,
    spotifyUri
  ) {
    const getAlbum = async () => {
      //Compose URL
      const baseUrl = "https://api.spotify.com/v1";
      const endpoint = "/albums/";
      debug("#albumId: ", album);
      const url = baseUrl + endpoint + album;
      debug("getAlbum url: ", url);
      debug("token: ", token);
      // Set headers
      const headers = {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      };
      debug("getAlbum headers", headers);
      try {
        const response = await axios.get(url, { headers });
        debug("response.data %O", response.data);
        return Promise.resolve(response.data);
      } catch (error) {
        debug("response.error %O", response.data);
        return Promise.reject(new Error(error.toJSON()));
      }
    };

    const saveAlbumById = async () => {
      debug("saveAlbumtById was called");
      try {
        const getAlbumInstance = await getAlbum();
        debug("getAlbumInstance: ", getAlbumInstance);
        const albumData = {
          token,
          artistsId: getAlbumInstance.artists[0].id,
          spotifyUrl: getAlbumInstance.external_urls.spotify,
          name: getAlbumInstance.name,
          images: getAlbumInstance.images,
          totalTracks: getAlbumInstance.total_tracks,
          spotifyUri: getAlbumInstance.uri,
        };
        debug("albumData: ", albumData);
        const result = new Promise(async (resolve, reject) => {
          //Create Album
          const albumMethodsInstance = await albumMethods(album);
          albumMethodsInstance
            .createAlbum(albumData)
            .then((newAlbum) => {
              // Get album id
              if (newAlbum) {
                debug("album: ", album);
                Album.find({ spotifyId: album }).exec((err, data) => {
                  debug("saveAlbum find() error :", err);
                  debug("saveAlbum find() data: ", data);
                  if (err) return reject(new Error(err));
                  const id = data[0]._id;
                  resolve(id);
                });
              } else return reject(new Error("Failed to create album"));
            })
            .catch((error) => {
              debug("createAlbum error:", error);
              return reject(new Error(error));
            });
        });
        result
          .then((id) => debug("result data: ", id))
          .catch((error) => debug("saveAlbumerror:", error));
        return result;
      } catch (error) {
        return Promise.reject(error);
      }
    };

    const saveFlow = async () => {
      try {
        const exist = await exists();
        debug("getExistResult: ", exist);
        if (!exist) {
          debug("Save flow: exist: ", exist);
          try {
            const albumId = await saveAlbumById();
            debug("#albumId", albumId);

            const artist = new Promise((resolve, reject) => {
              Artist.find({ spotifyId: artists }).exec((err, data) => {
                if (err) return reject(err);
                return resolve(data);
              });
            });

            const artistData = await artist;
            const trackParams = {
              album: albumId,
              artists: artistData[0]._id,
              spotifyUrl,
              name,
              trackNumber,
              spotifyId,
              spotifyUri,
            };
            debug("artistId", artistData);
            const newTrack = new Track(trackParams);
            const response = new Promise((resolve, reject) => {
              newTrack
                .save()
                .then((newtrack) =>
                  resolve({ message: "New track created", track: newtrack })
                )
                .catch((err) => reject(err));
            });
            response
              .then((res) => debug("response", res))
              .catch((err) => debug("error", err));
            return response;
          } catch (error) {
            return Promise.reject({ message: error });
          }
        } else {
          const trackFind = new Promise((resolve, reject) => {
            Track.find({ spotifyId: spotifyId })
              .then((track) =>
                resolve({ message: "Track already exists.", track: track })
              )
              .catch((error) =>
                reject({ message: "Failed to access database." ,error})
              );
		  });
          return trackFind;
        }
      } catch (error) {
        debug("saveFlow error: ", { message: error });
        return Promise.reject(new Error(error));
      }
    };

    return await saveFlow();
  }
  return { exists, createTrack };
};
