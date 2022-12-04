const User = require("../model/user");
const JWT = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const { token } = req.cookies;
  console.log("token", token);

  if (token) {
    const decodedToken = JWT.verify(token, process.env.JWE_SECRET);

    const user = await User.findById(decodedToken.id);

    if (!user) {
      new Error("invalid token");
      return res.status(500).json({
        success: false,
        message: "invalid token",
      });
    }
    req.user = user;
  }
  return next();
};

module.exports = auth;
