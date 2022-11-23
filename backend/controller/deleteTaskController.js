// import bigPromise
const bigPromise = require("../middleware/bigPromise");

// import model
const Todo = require("../model/todo");

const deleteTask = bigPromise(async (req, res) => {
  const todoId = req.params.todoId;
  const task = req.body;

  if (!todoId) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }

  try {
    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
    const todo = await Todo.findOne({ _id: todoId });
    todo.tasks.pull(task);
    console.log(todo);
    todo.save();
  } catch (error) {
    console.log("error while deleting Todo");
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});

module.exports = deleteTask;
