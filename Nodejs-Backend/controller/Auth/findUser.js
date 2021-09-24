const User = require("../../models/user");

const findUser = async (req, res) => {
  const { email } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      res
        .status(400)
        .json({ message: "This username is already in-use", available: false });
    } else {
      res
        .status(200)
        .json({ message: "This username can be used", available: true });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = findUser;
