const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    todoTitle: {
      type: String,
      require: [true, "Please enter todo title"],
      unique: true,
    },
    color: String,
    tasks: [],
  },
  {
    timestamps: true,
  }
);

todoSchema.methods.updateTodo = function (todoTitle, tasks) {
  if (todoTitle !== this.todoTitle) {
    this.todoTitle = todoTitle;
    this.markModified("todoTitle");
  }
  if (tasks) {
    for (let i in this.tasks) {
      if (this.tasks[i].taskTitle !== tasks[i].taskTitle) {
        this.tasks[i].taskTitle = tasks[i].taskTitle;
        this.markModified("tasks");
      }
      if (this.tasks[i].isDone !== tasks[i].isDone) {
        this.tasks[i].isDone = tasks[i].isDone;
        this.markModified("tasks");
      }
    }
  }
};

module.exports = mongoose.model("todo", todoSchema);
