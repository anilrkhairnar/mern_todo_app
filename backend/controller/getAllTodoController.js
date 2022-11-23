// import bigPromise
const bigPromise = require("../middleware/bigPromise");

// import model
const Todo = require("../model/todo");

const getAllTodo = bigPromise(async (req, res) => {
  const todo = await Todo.find({});

  if (todo.length == 0) {
    return res.sendStatus(204);
  }

  res.status(200).json({
    success: true,
    todo,
  });
});

module.exports = getAllTodo;
