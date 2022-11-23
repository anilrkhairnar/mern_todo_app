const mongoose = require("mongoose");

const dbConnect = () =>
  mongoose
    .connect(process.env.MONGO_URI)
    .then(console.log(`DB connected successfully`))
    .catch((error) => {
      console.log(`Error while connecting to DB`);
      console.log(error);
      process.exit(1);
    });

module.exports = dbConnect;
