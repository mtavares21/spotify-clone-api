const debug = require("debug")("artist_fact");
const Artist = require("../models/artist_model");
const dbUtils = require("../controlllers/db_utils");
// Promise based methods
exports.artistMethods = function (spotifyId) {
  function exists() {
    return dbUtils.existsInDb(Artist, spotifyId);
  }

  async function createArtist({ spotifyUrl, name, spotifyUri, images }) {
    const getExistResult = async () => {
      debug("getExistResult is called");
      return await exists();
    };

    const saveFlow = async () => {
      try {
        debug("artist saveFlow is called");
        const exist = await getExistResult();
        debug("1 exist", exist);
        if (exist == false) {
			const imageStr = images.map(img => JSON.stringify(img))
          const artistParams = {
            spotifyUrl,
            name,
            spotifyId,
            spotifyUri,
            images:imageStr,
		  };
		  debug("artistParams: ",artistParams)
          const newArtist = new Artist(artistParams);
          debug("newArtist", newArtist);
          const saveArtist = new Promise((resolve, reject) => {
            newArtist.save((error) => {
              if (error) {
                debug(error);
                return reject(error);
              }
              return resolve(true);
            });
          });
        } else if (exist) return Promise.resolve(true);
      } catch (error) {
        return Promise.reject(error);
      }
    };
    return await saveFlow();
  }
  return { exists, createArtist };
};
