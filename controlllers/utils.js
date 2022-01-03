const debug = require("debug")("utils");
// Transform req.params in query string
exports.queryToParams = (query) => {
  const keyArray = Object.keys(query);
  const valueArray = Object.values(query);
  let i;
  let buffer = "?";

  for (i = 0; i < keyArray.length; i++) {
    buffer += keyArray[i] + "=" + encodeURIComponent(valueArray[i]);
    if (i < keyArray.length - 1) buffer += "&";
  }

  return buffer;
};

exports.axiosErrorHandler = (res, file, error, next) => {
  if (error.response) {
    debug(file + " response_error_status: ", error.response.status);
    //debug("response headers: " + JSON.stringify(error.response.headers));
    debug(
      file + " response__error_message ",
      error.response.data.error.message
    );
    res.status(error.response.status).json({status: error.response.status, message: error.response.data.error.message})
  } else if (error.request) {
    debug(file + " request_error: ", error.request);
    res.status(404).json(error.request);
  } else {
    debug(file + " error_message: ", error.message);
    res.status(400).json(error)
  }
};
