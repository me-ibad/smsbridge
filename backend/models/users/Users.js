const mongoose = require("mongoose");

const Users = mongoose.model(
  "Users",
  new mongoose.Schema({
    userName: {
      type: String,
      required: true,
      unique: true,
    },
  })
);

module.exports.Users = Users;
