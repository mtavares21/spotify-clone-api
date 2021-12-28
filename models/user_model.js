const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = mongoose.model(
  "User",
  new Schema({
    username: { type: String, required: true },
    userId: {type: ID, required: true}
  })
);

//Export model
module.exports = User;