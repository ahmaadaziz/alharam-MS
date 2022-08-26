const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resident",
      required: true,
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
      type: String,
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

//Methods on instance
recordSchema.methods.calculateBill = (
  baseFee,
  package,
  wifi,
  arrears,
  fine,
  previousMR
) => {
  this.ebill = 0;
  this.totalMR = this.wapda + this.ups;
  this.newMR = totalMR - previousMR;
  const overUnits = newMR - 17;
  if (overUnits > 0) {
    this.ebill = (overUnits / 30) * this.attendance * 36;
    if (this.ebill > 3000) {
      this.ebill = this.ebill + (2.5 * ebill) / 100;
    }
  }
  this.totalBill = baseFee + wifi + +arrears + fine + ebill + package;
};

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
