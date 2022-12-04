// import router
const router = require("express").Router();

// middleware
const auth = require("../middleware/auth");

// import todo controller
const {
  getAllTodo,
  createTodo,
  createTask,
  editTodo,
  deleteTodo,
  deleteTask,
} = require("../controller/todo");

router.route("/").get((req, res) => {
  res.status(200).send("hello");
});

// Todo routes
router.route("/getAllTodo").post(getAllTodo);
router.route("/createTodo").post(createTodo);
router.route("/createTask/:todoId").put(createTask);
router.route("/editTodo/:todoId").put(editTodo);
router.route("/deleteTodo/:todoId").delete(deleteTodo);
router.route("/deleteTask/:todoId").delete(deleteTask);

module.exports = router;
