require("dotenv-flow").config();
const Resident = require("../models/resident");
const mongoose = require("mongoose");

const residents = [
  new Resident({
    name: "Ahmad",
    room: "115",
    fee: 10000,
    wifi: 600,
    package: 3000,
  }),
  new Resident({
    name: "Hassan",
    room: "113",
    fee: 10000,
    wifi: 600,
    package: 3000,
  }),
  new Resident({
    name: "Fouad",
    room: "117",
    fee: 10000,
    wifi: 600,
    package: 3000,
  }),
  new Resident({
    name: "Mohammad",
    room: "116",
    fee: 10000,
    wifi: 600,
    package: 3000,
  }),
];

//connect mongoose
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to database for Resident seeding");
    residents.map(async (resident, index) => {
      await resident.save((err, result) => {
        if (index === residents.length - 1) {
          console.log("RESIDENTS SEEDED!");
          mongoose.disconnect();
        }
      });
    });
  })
  .catch((err) => console.error(err));
