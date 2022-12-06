// import router
const router = require("express").Router();

// middleware
const auth = require("../middleware/auth");

// import todo controller
const { register, login, logout } = require("../controller/user");

router.route("/register").post(register);
router.route("/login").post(auth, login);
router.route("/logout").post(logout);

module.exports = router;
