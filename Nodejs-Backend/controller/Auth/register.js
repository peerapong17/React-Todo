const User = require("../../models/user");
const bcrypt = require("bcrypt");

const create_user = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res
        .status(400)
        .json({ message: "This email is already in-use", available: false });
    }
    const existUsername = await User.findOne({ username });
    if (existUsername) {
      return res.status(400).json({
        message: "This username is already in-use",
        available: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(200).json({ message: "User successfully created" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = create_user;
