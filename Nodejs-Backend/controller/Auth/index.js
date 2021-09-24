const login = require("./login");
const getUsers = require("./getUsers");
const createUser = require("./register");
const logout = require("./logout");
const findUser = require("./findUser");

module.exports = {
  login,
  createUser,
  logout,
  findUser,
  getUsers
};
