// import bigPromise
const bigPromise = require("../../middleware/bigPromise");

// import model
const Todo = require("../../model/todo");

const createTask = bigPromise(async (req, res) => {
  // const user = req.user;

  const { user } = req.body;
  if (!user) {
    new Error("Access Denied");
    return res.status(400).json({
      success: false,
      message: "Access Denied",
    });
  }

  const todoId = req.params.todoId;
  const { tasks } = req.body;
  const taskLength = tasks.length;
  if (!todoId) {
    res.status(400).json({
      success: false,
      message: "Todo ID not present",
    });
  }
  if (taskLength < 1) {
    return res.status(400).json({
      success: false,
      message: "Task is empty",
    });
  }

  const todo = await Todo.findOne({ _id: todoId });
  try {
    tasks.forEach((task) => {
      todo.tasks.push(task);
    });

    todo.save();
  } catch (error) {
    console.log("Error while creating/editing task");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while creating/editing task",
    });
  }

  res.status(201).json({
    success: true,
    todo,
  });
});
module.exports = createTask;
