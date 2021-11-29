const login = require("./login");
const getUsers = require("./getUsers");
const createUser = require("./register");
const logout = require("./logout");
const findUser = require("./findUser");
const getUserProfile = require("./getUserProfile");

module.exports = {
  login,
  createUser,
  logout,
  findUser,
  getUsers,
  getUserProfile,
};
