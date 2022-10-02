const mongoose = require("mongoose");

const tabSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  amount: {
    type: Number,
  },
  amountPaid: {
    type: Number,
    default: 0,
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  record: { type: mongoose.Schema.Types.ObjectId, ref: "Record" },
});

const Tab = mongoose.model("Tab", tabSchema);

module.exports = Tab;
