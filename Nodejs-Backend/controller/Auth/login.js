const passport = require("passport");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      const accessToken = jwt.sign({ id: user.id }, process.env.LITTLE_SECRETE, {
        expiresIn: 60 * 60,
      });

      return res
        .status(200)
        .json({
          message: "User logs in successfully",
          accessToken,
          authenticated: true,
        });
    });
  })(req, res, next);
};

module.exports = login;
