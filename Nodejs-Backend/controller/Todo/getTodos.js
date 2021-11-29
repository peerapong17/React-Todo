const Todo = require("../../models/todo");

const getTodos = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(400).json({ authenticated: false });
    }

    const todoList = await Todo.find({ user: req.user.id });
    if (!todoList) {
      res.status(400).json({ message: "Data with user'id is not found" });
      return;
    }

    res.status(200).json({ todoList });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = getTodos;
