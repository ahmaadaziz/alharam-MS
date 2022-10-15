const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resident",
      required: true,
    },
    new: {
      type: Boolean,
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
    PMR: {
      type: Number,
    },
    newMR: {
      type: Number,
    },
    overUnits: {
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
    nxtFine: {
      type: Number,
    },
    nxtArrears: {
      type: String,
    },
    totalBill: {
      type: Number,
    },
    adjustment: {
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
    paid: {
      type: Boolean,
      default: false,
    },
    collected: {
      type: Boolean,
      default: false,
    },
    clearance: {
      type: Boolean,
    },
    pkgAdj: {
      type: String,
    },
    notice: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

//Methods on instance
recordSchema.methods.calculateBill = (
  ups,
  wapda,
  attendance,
  totalAttendance,
  baseFee,
  package,
  wifi,
  arrears,
  fine,
  previousMR,
  record
) => {
  record.ebill = 0;
  record.totalMR = +wapda + +ups;
  record.newMR = record.totalMR - previousMR;
  record.overUnits = record.newMR - 17;
  if (record.overUnits >= 0) {
    record.ebill = (record.overUnits / totalAttendance) * attendance * 36;
    if (record.ebill > 3000) {
      record.ebill = record.ebill + (2.5 * record.ebill) / 100;
    }
  } else {
    record.overUnits = 0;
  }
  record.totalBill = baseFee + wifi + +arrears + fine + record.ebill + package;
  return {
    ebill: Math.floor(record.ebill),
    totalBill: Math.floor(record.totalBill),
    newMR: Math.floor(record.newMR),
    overUnits: Math.floor(record.overUnits),
    totalMR: Math.floor(record.totalMR),
    overUnits: Math.floor(record.overUnits),
  };
};

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
