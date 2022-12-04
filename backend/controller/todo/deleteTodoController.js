// import bigPromise
const bigPromise = require("../../middleware/bigPromise");

// import model
const Todo = require("../../model/todo");

const deleteTodo = bigPromise(async (req, res) => {
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
  if (!todoId) {
    return res.status(400).json({
      success: false,
      message: "Todo doesn't exit",
    });
  }

  try {
    await Todo.findOneAndDelete({ _id: todoId });
  } catch (error) {
    console.log("error while deleting Todo");
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Todo doesn't exit",
    });
  }
  res.status(200).json({
    success: true,
    message: "Todo deleted successfully",
  });
});

module.exports = deleteTodo;
