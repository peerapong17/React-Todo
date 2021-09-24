
const logout = (req, res) => {
  try {
    req.logout();
    res.status(200).json({ message: "User logs out successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = logout;
