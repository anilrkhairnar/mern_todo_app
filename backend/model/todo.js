const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  todoTitle: {
    type: String,
    require: [true, "Please enter todo title"],
    unique: true,
  },
  color: String,
  tasks: [],
});

module.exports = mongoose.model("todo", todoSchema);
