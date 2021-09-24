const Todo = require("../../models/todo");

const updateTodo = async (req, res) => {
  try {
    if (!req.user) {
      res.status(400).json({ authenticated: false });
    }
    const { id } = req.params;
    const data = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    if (!data) {
      res.status(400).json({ message: "Data no found" });
    }
    res.status(200).json({ message: "Todo updated successfully", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = updateTodo;
