// import bigPromise
const bigPromise = require("../../middleware/bigPromise");

// import model
const Todo = require("../../model/todo");

const getAllTodo = bigPromise(async (req, res) => {
  const user = req.user;
  if (!user) {
    new Error("Access Denied");
    return res.status(400).json({
      success: false,
      message: "Access Denied",
    });
  }

  const todo = await Todo.find({ uid: user._id });

  if (todo.length == 0) {
    return res.sendStatus(204);
  }

  res.status(200).json({
    success: true,
    todo,
  });
});

module.exports = getAllTodo;
