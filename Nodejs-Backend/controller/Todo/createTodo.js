const Todo = require("../../models/todo");
const User = require("../../models/user");
const todoSchema = require("../../validations/todo")

const createTodo = async (req, res) => {
  try {
    if (!req.user) {
      res.status(400).json({ authenticated: false });
    }

    const result = await todoSchema.validateAsync(req.body)

    const data = await Todo.create({ ...result, user: req.user.id }); // <--- {task: "work out",isCompleted: false,user: userData._id}
    // const user = await User.findById(req.user.id);
    // user.todos.push(data);

    // await user.save();

    res.status(200).json({ message: "Todo created successfully", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = createTodo;
