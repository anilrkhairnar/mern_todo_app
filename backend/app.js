require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const { Router } = require("express");
const express = require("express");

const cookieParser = require("cookie-parser");

const app = express();

// connect DB
dbConnect();

// import routes
const todo = require("./routes/todo");
const user = require("./routes/user");

// middleware
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/", todo);
app.use("/api/v1/", user);

module.exports = app;
