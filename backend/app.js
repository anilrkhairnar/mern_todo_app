require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const { Router } = require("express");
const express = require("express");

const app = express();

// connect DB
dbConnect();

// import routes
const todo = require("./routes/todo");

// middleware
app.use(express.json());
app.use("/", todo);

module.exports = app;
