// import bigPromise
const bigPromise = require("../../middleware/bigPromise");

const JWT = require("jsonwebtoken");

// import model
const Todo = require("../../model/todo");

const createTodo = bigPromise(async (req, res) => {
  const user = req.user;
  if (!user) {
    new Error("Access Denied");
    return res.status(400).json({
      success: false,
      message: "Access Denied",
    });
  }

  const uid = user._id;

  const { todoTitle, color } = req.body;

  if (!uid) {
    new Error("Access Denied");
    return res.status(400).json({
      success: false,
      message: "Access Denied",
    });
  }
  // checking todo
  if (!todoTitle) {
    new Error("Please fill all fields");
    return res.status(400).json({
      success: false,
      message: "Please fill all fields",
    });
  }

  try {
    const todo = await Todo.create({
      uid,
      todoTitle,
      color,
    });

    res.status(201).json({
      success: true,
      todo,
    });
  } catch (error) {
    console.log("error while creating todo");
    console.log(error.message);
    if (error.code == 11000) {
      return res.status(400).json({
        success: false,
        message: "Todo already exist",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error while creating todo",
    });
  }
});

module.exports = createTodo;
