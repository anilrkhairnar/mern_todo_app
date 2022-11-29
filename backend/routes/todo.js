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

// import todo controller
const { register } = require("../controller/user");

router.route("/").get((req, res) => {
  res.status(200).send("hello");
});

// Todo routes
router.route("/getAllTodo").get(auth, getAllTodo);
router.route("/createTodo").post(auth, createTodo);
router.route("/createTask/:todoId").put(auth, createTask);
router.route("/editTodo/:todoId").put(auth, editTodo);
router.route("/deleteTodo/:todoId").delete(auth, deleteTodo);
router.route("/deleteTask/:todoId").delete(auth, deleteTask);

// User routes
router.route("/register").post(register);

module.exports = router;
