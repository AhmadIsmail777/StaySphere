const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose =
  require("passport-local-mongoose").default ||
  require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

// username and password , hashing and salting field is automaticaly created due to passportLocalMongoose

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
