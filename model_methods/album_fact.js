const debug = require("debug")("album_fact");
const Album = require("../models/album_model");
const Artist = require("../models/artist_model");
const dbUtils = require("../controlllers/db_utils");
const axios = require("axios");
const { artistMethods } = require("./artist_fact");

exports.albumMethods = async function (spotifyId) {
  async function exists() {
    const exists = await dbUtils.existsInDb(Album, spotifyId);
    return exists;
  }
  async function createAlbum(
  {  token,
    artistsId,
    spotifyUrl,
    name,
    images,
    totalTracks,
    spotifyUri}
  ) {
    const getArtist = async () => {
      //Compose URL
      const baseUrl = "https://api.spotify.com/v1";
      const endpoint = "/artists/";
      debug(artistsId);
      const url = baseUrl + endpoint + artistsId;
      debug("getArtist url: ", url);
      debug("token: ", token);
      // Set headers
      const headers = {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      };
      try {
        const response = await axios.get(url, { headers });
        debug("response.data %O", response.data);
        return response.data;
      } catch (error) {
        debug("response.error %O", error);
        return new Error(error.toJSON());
      }
    };

    const saveArtistById = async () => {
      debug("saveArtistById was called");

      const artist = await getArtist();
      debug("saveArtist artist:", artist);
      const artistData = {
        spotifyUrl: artist.external_urls.spotify,
        name: artist.name,
        spotifyUri: artist.uri,
        images: artist.images,
	  };
	  debug("saveArtist artistData	:", artistData);
      const result = new Promise((resolve, reject) => {
        
		artistMethods(artistsId).createArtist(artistData)
			.then( ()=>{
        		Artist.find({ spotifyId: artistsId }).exec((err, data) => {
					debug("saveArtist find() error", err);
					debug("saveArtist find() data", data);
					if (err || data === null) 
						return reject(err);
					const id = data[0] ? data[0]._id : new Error("id not found");
					resolve(id);
				});
			})
			.catch( error => reject(new Error(error)) )
      });
      result
        .then((id) => debug("result data: ", id))
        .catch((error) => debug("saveArtist error:", error));
      return result;
    };

    const saveFlow = async () => {
      try {
        const exist = await exists();
        debug("getExistResult: ", exist);
        if (!exist) {
          debug("Save flow: exist: ", exist);
          try {
            const artists = await saveArtistById();
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
          } catch (error) {
            return Promise.reject(error);
          }
        } else return Promise.resolve(true);
      } catch (error) {
        debug("saveFlow error: ", exist);
        return Promise.reject(error);
      }
    };

    return await saveFlow();
  }
  return { exists, createAlbum };
};
