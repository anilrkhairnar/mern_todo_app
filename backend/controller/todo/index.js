const getAllTodo = require("./getAllTodoController");
const createTodo = require("./createTodoController");
const createTask = require("./createTaskController");
const editTodo = require("./editTodoController");
const deleteTodo = require("./deleteTodoController");
const deleteTask = require("./deleteTaskController");

module.exports = {
  getAllTodo,
  createTodo,
  createTask,
  editTodo,
  deleteTodo,
  deleteTask,
};
