// import bigPromise
const bigPromise = require("../middleware/bigPromise");

// import model
const Todo = require("../model/todo");

const editTodo = async (req, res) => {
  const todoId = req.params.todoId;
  const { todoTitle, tasks } = req.body;
  if (!todoId) {
    res.status(400).json({
      success: false,
      message: "Todo ID not present",
    });
  }
  if (!(todoTitle && tasks)) {
    res.status(400).json({
      success: false,
      message: "Please send correct data",
    });
  }

  try {
    const todo = await Todo.findOne({ _id: todoId });

    todo.updateTodo(todoTitle, tasks);

    todo.save();

    console.log(todo);
    res.status(200).json({
      success: true,
      todo,
    });
  } catch (error) {
    console.log("Error while creating/editing task");
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Error while creating/editing task",
    });
  }
};

module.exports = editTodo;
