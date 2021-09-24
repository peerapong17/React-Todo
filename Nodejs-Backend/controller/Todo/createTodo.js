const Todo = require("../../models/todo");
const User = require("../../models/user");

const createTodo = async (req, res) => {
  try {
    if (!req.user) {
      res.status(400).json({ authenticated: false });
    }

    const data = await Todo.create({ ...req.body, user: req.user.id }); // <--- {task: "work out",isCompleted: false,user: userData._id}
    const user = await User.findById(req.user.id);
    user.todos.push(data);

    await user.save();

    res.status(200).json({ message: "Todo created successfully", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = createTodo;
