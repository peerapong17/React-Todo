const User = require("../../models/user");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("todos");
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = getUsers;
