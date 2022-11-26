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
  //   if (!(todoTitle || tasks)) {
  //     return res.status(400).json({
  //       success: false,
  //       message: "Pass some values",
  //     });
  //   }

  const todo = await Todo.findOne({ _id: todoId });

  try {
    if (todoTitle) {
      if (todoTitle != todo.todoTitle) {
        todo.todoTitle = todoTitle;
      }
    }
    if (tasks.length > 0) {
      for (let task in tasks) {
        if (tasks[task].taskTitle != todo.tasks[task].taskTitle) {
          todo.tasks[task].taskTitle = tasks[task].taskTitle;
          if (tasks[task].isDone != todo.tasks[task].isDone) {
            todo.tasks[task].isDone = tasks[task].isDone;
          }
        } else if (tasks[task].isDone != todo.tasks[task].isDone) {
          todo.tasks[task].isDone = tasks[task].isDone;
        }
      }
    }
    todo.save();
  } catch (error) {
    console.log("Error while creating/editing task");
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Error while creating/editing task",
    });
  }

  res.status(200).json({
    success: true,
    todo,
  });
};

module.exports = editTodo;
