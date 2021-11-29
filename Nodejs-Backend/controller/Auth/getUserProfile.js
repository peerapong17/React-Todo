const User = require("../../models/user");

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json({ username: user.username });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = getUserProfile;
