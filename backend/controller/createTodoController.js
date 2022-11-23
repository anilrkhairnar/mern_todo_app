// import bigPromise
const bigPromise = require("../middleware/bigPromise");

// import model
const Todo = require("../model/todo");

const createTodo = bigPromise(async (req, res) => {
  const { todoTitle, color } = req.body;

  // checking todo
  if (!todoTitle) {
    res.status(400).json({
      success: false,
      message: "Please fill all fields",
    });
  }

  try {
    const todo = await Todo.create({
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
