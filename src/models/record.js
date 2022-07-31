const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resident",
    },
    ups: {
      type: Number,
    },
    wapda: {
      type: Number,
    },
    mr: {
      type: Number,
    },
    ebill: {
      type: Number,
    },
    attendance: {
      type: Number,
    },
    fine: {
      type: Number,
    },
    arrears: {
      type: Number,
    },
    totalBill: {
      type: Number,
    },
    amountPaid: {
      type: Number,
    },
    paidTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    paidVia: {
      type: String,
      enum: ["cash", "jazz", "online"],
      trim: true,
    },
    collectionDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
