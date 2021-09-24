const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");

const jwtConfigs = (passport) => {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.LITTLE_SECRETE;
  passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      const user = await User.findById(jwtPayload.id);
      if (user) {
        return done(null, { id: user.id, username: user.username });
      } else {
        return done(null, false, {
          message: "invalid token",
          authenticated: false,
        });
      }
    })
  );
};

module.exports = jwtConfigs;
