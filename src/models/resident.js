const mongoose = require("mongoose");

const residentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide Name of Resident"],
    trim: true,
  },
  room: {
    type: String,
    required: [true, "Please Provide Room Number"],
  },
  fee: {
    type: Number,
    required: [true, "Please Provide Fee"],
  },
  wifi: {
    type: Number,
    required: [true, "Please Provide Wifi fee"],
    enum: [300, 600, 900],
  },
  package: {
    type: Number,
    required: [true, "Please Provide Package fee"],
  },
  records: [{ type: mongoose.Schema.Types.ObjectId, ref: "Record" }],
});

const Resident = mongoose.model("Resident", residentSchema);

module.exports = Resident;
