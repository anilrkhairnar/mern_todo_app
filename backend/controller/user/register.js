const bigPromise = require("../../middleware/bigPromise");
const User = require("../../model/user");

const register = bigPromise(async (req, res) => {
  const { name, email, password } = req.body;

  if (!(name && email && password)) {
    return res.status(400).json({
      success: false,
      message: "all fields are required",
    });
  }

  if (
    typeof name !== "string" &&
    typeof email !== "string" &&
    typeof password !== "string"
  ) {
    new Error("all fields needs to be in string format");
    return res.status(400).json({
      success: false,
      message: "all fields needs to be in string format",
    });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        validMessage: "user already exist",
        message: "user already exist",
      });
    }

    user = await User.create({
      name,
      email,
      password,
    });

    const token = user.getJwtToken();

    user.password = undefined;

    res
      .status(201)
      .cookie("token", token, {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRY * 12 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: true,
      })
      .json({
        success: true,
        user,
        message: "user created successfully",
      });
  } catch (error) {
    if (error.code === 11000) {
      console.log("user already exist");
      return res.status(400).json({
        success: false,
        message: "user already exist",
      });
    }
    console.log("my custom error: ", error);
    res.status(500).json({
      success: false,
      validMessage: error.message,
      message: "error while creating user",
    });
  }
});

module.exports = register;
