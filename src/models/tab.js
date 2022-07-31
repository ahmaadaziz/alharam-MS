const mongoose = require("mongoose");

const tabSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  amountPaid: {
    type: Number,
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Tab = mongoose.model("Tab", tabSchema);

module.exports = Tab;
