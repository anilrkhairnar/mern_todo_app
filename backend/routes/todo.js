// import router
const router = require("express").Router();

// import controller
const {
  getAllTodo,
  createTodo,
  createTask,
  editTodo,
  deleteTodo,
  deleteTask,
} = require("../controller");

router.route("/getAllTodo").get(getAllTodo);
router.route("/createTodo").post(createTodo);
router.route("/createTask/:todoId").put(createTask);
router.route("/editTodo/:todoId").put(editTodo);
router.route("/deleteTodo/:todoId").delete(deleteTodo);
router.route("/deleteTask/:todoId").delete(deleteTask);

module.exports = router;
