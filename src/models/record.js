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
    info: {
      type: String,
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
    ups: {
      type: Number,
    },
    wapda: {
      type: Number,
    },
    overUnits: {
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

//Methods on Schema
recordSchema.statics.calculateBill = (
  totalAttendance,
  baseFee,
  package,
  wifi,
  record
) => {
  record.ebill = 0;
  var reb = record.overUnits * process.env.UNIT_RATE;
  if (reb > 3000) {
    reb = reb + (2.5 * reb) / 100;
  }
  record.ebill = Math.floor((reb / totalAttendance) * record.attendance);
  record.totalBill = Math.floor(
    baseFee + wifi + +record.arrears + record.fine + record.ebill + package
  );
  return record;
};

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
