require("dotenv-flow").config();
require("./db/mongoose");
const path = require("path");
const express = require("express");
const cors = require("cors");

// Route Imports
const userRoutes = require("./routes/user");
const residentRoutes = require("./routes/resident");
const recordRoutes = require("./routes/record");
const tabRoutes = require("./routes/tab");
const roomRoutes = require("./routes/room");

const app = express();

//Other Mounts
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../ms-fe/build")));

//Route Mounts
app.use(userRoutes);
app.use(residentRoutes);
app.use(recordRoutes);
app.use(tabRoutes);
app.use(roomRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../ms-fe/build/index.html"));
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is up on ${process.env.PORT}`);
});
