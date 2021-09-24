const User = require("../models/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const googleConfig = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALL_BACK_URL,
        userProfileURL: process.env.USER_PROFILE_URL,
      },
      function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        User.findOrCreate({ id: profile.id }, function (err, user) {
          return done(err, user);
        });
        // User.findOneAndUpdate(
        //   {
        //     email: profile.id,
        //     username: profile.displayName ?? "No display name",
        //   },
        //   {
        //     returnOriginal: false,
        //     upsert: true,
        //   }
        // );
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
