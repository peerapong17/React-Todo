const Todo = require("../../models/todo");

const deleteTodo = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ authenticated: false });
    }
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: "Todo deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = deleteTodo;
