const auth = require("./auth");
const todo = require("./todo");
const google = require("./google");
const pass = require("./pass");

module.exports = { auth, todo, google, resetPassword: pass };
