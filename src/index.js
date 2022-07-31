require("dotenv-flow").config();
require("./db/mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Route Imports
const userRoutes = require("./routes/user");

const app = express();

//Other Mounts
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//Route Mounts
app.use(userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is up on ${process.env.PORT}`);
});
