const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

module.exports = (passport) => {
  // passport.use(User.createStrategy());
  passport.use(
    new LocalStrategy(function (username, password, done) {
      console.log("this is in LocalStrategy");
      User.findOne({ email: username }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        bcrypt.compare(password, user.password, function (req, res) {
          if (err) return done(err);
          if (res == true) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Incorrect Password." });
          }
        });
      });
    })
  );

  passport.serializeUser(function (user, done) {
    console.log("this is in serializeUser");
    done(null, user.id);
    // this user'Id is store in req.session.passport.user
  });

  passport.deserializeUser(function (id, done) {
    console.log("this is in deserializeUser");
    User.findById(id, function (err, user) {
      done(err, user);
      // this user will be attached to req.user
    });
  });
};
