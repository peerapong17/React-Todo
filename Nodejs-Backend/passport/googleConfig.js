const User = require("../models/user");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
// var ObjectId = require('mongodb').ObjectID;

const googleConfig = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALL_BACK_URL,
        userProfileURL: process.env.USER_PROFILE_URL,
      },
      async function (accessToken, refreshToken, profile, cb) {
        // var myId = JSON.parse(profile.id);
        User.findOrCreate(
          {
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
          },
          function (err, user) {
            return cb(err, user);
          }
        );
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
    // this user'Id is store in req.session.passport.user
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
      // this user will be attached to req.user
    });
  });
};

module.exports = googleConfig;
