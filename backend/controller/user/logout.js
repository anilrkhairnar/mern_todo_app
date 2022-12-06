const bigPromise = require("../../middleware/bigPromise");

const logout = bigPromise((req, res) => {
  const { token } = req.body;
  if (!token) {
    new Error("Trying to logout without being logged in");
    return res.status(400).json({
      success: false,
      message: "Trying to logout without being logged in",
    });
  }

  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

module.exports = logout;
