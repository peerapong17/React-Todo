const Todo = require("../../models/todo");

const getTodos = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(400).json({ authenticated: false });
    }
    console.log(req.user)
    const data = await Todo.find({ user: req.user.id })
    if (!data) {
      res.status(400).json({ message: "Data with user'id is not found" });
      return;
    }
    res.status(200).json({ username: req.user.username, todos: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = getTodos;
