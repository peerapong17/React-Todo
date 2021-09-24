const User = require("../../models/user");
const Token = require("../../models/token");
const bcrypt = require("bcrypt");

const enterPassword = async (req, res) => {
  const { token } = req.params;
  const { userId } = req.params;
  const { password } = req.body;
  try {
    // const schema = Joi.object({ password: Joi.string().required() });
    // const { error } = schema.validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(400)
        .json({ message: "Invalid link or Token has expired" });

    const tokenResetPassword = await Token.findOne({
      userId: user._id,
      token: token,
    });
    if (!tokenResetPassword)
      return res
        .status(400)
        .json({ message: "Invalid link or Token has expired" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();
    await tokenResetPassword.delete();

    res.status(200).json({ message: "password reset sucessfully" });
  } catch (error) {
    res.status(400).json({ message: "password change failed" });
  }
};

module.exports = enterPassword;
