const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    residents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resident" }],
    number: {
      type: Number,
      required: [true, "Please provide a valid room number"],
    },
    ups: {
      type: Number,
    },
    wapda: {
      type: Number,
    },
    totalMR: {
      type: Number,
    },
    newMR: {
      type: Number,
    },
    totalAttendance: {
      type: Number,
    },
    seats: {
      type: Number,
      required: [true, "Please provide how many seats are in this room"],
    },
    freeSeats: {
      type: Number,
      required: [true, "Please provide how many free seats are in this room"],
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
