const mongoose = require("mongoose");
// const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: false,
    },
    googleId: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

// userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports = new mongoose.model("User", userSchema);
