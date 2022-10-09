require("dotenv-flow").config();
require("./db/mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const CronJob = require("cron").CronJob;

const Resident = require("./models/resident");
const Record = require("./models/record");

// Route Imports
const userRoutes = require("./routes/user");
const residentRoutes = require("./routes/resident");
const recordRoutes = require("./routes/record");
const tabRoutes = require("./routes/tab");

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
app.use(residentRoutes);
app.use(recordRoutes);
app.use(tabRoutes);

const CreateRecords = new CronJob(
  "* 00 3 24 * *",
  async () => {
    const residents = await Resident.find({ active: true }).populate("records");
    for (const resident of residents) {
      const newRecord = new Record({ owner: resident._id });
      newRecord.arrears =
        resident.records[resident.records.length - 1].nxtArrears;
      newRecord.fine = resident.records[resident.records.length - 1].nxtFine;
      resident.records.push(newRecord._id);
      await newRecord.save();
      await owner.save();
    }
  },
  null,
  false,
  "Asia/Karachi"
);

app.listen(process.env.PORT, () => {
  CreateRecords.start();
  console.log(`Server is up on ${process.env.PORT}`);
});
