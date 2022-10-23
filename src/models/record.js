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
  room,
  record
) => {
  record.ebill = 0;
  const totalMR = +wapda + +ups;
  room.newMR = totalMR - room.totalMR;
  room.overUnits = room.newMR - process.env.FREE_UNITS;
  if (room.overUnits >= 0) {
    const reb = room.overUnits * process.env.UNIT_RATE;
    if (reb > 3000) {
      reb = reb + (2.5 * reb) / 100;
    }
    record.ebill = (reb / totalAttendance) * attendance;
  } else {
    room.overUnits = 0;
  }
  room.totalMR = totalMR;
  record.totalBill = baseFee + wifi + +arrears + fine + record.ebill + package;
  return {
    roomValues: {
      newMR: Math.floor(room.newMR),
      overUnits: Math.floor(room.overUnits),
      totalMR: Math.floor(room.totalMR),
    },
    recordValues: {
      ebill: Math.floor(record.ebill),
      totalBill: Math.floor(record.totalBill),
    },
  };
};

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
