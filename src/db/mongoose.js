const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to database"))
  .catch((e) => console.log(e));
