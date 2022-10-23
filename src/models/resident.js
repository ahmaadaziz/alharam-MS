const mongoose = require("mongoose");
const dayjs = require("dayjs");

const residentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide Name of Resident"],
    trim: true,
  },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  seats: {
    type: Number,
    required: [true, "Please provide number of seats taken"],
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
  joined: {
    type: Date,
    required: [true, "Please Provide Joining Date"],
  },
  security: {
    type: Number,
    required: [true, "Please Provide Security Amount"],
  },
  records: [{ type: mongoose.Schema.Types.ObjectId, ref: "Record" }],
  active: {
    type: Boolean,
    default: true,
  },
  clearanceDate: {
    type: Date,
  },
});

//Methods on Instance
residentSchema.methods.generateClearance = (record, resident) => {
  if (resident.package > 0) {
    const stay = dayjs(resident.joined).diff(dayjs(), "month");
    if (stay > 10) {
      record.pkgAdj = stay * -resident.package;
      record.totalBill = record.totalBill + record.pkgAdj;
    }
  } else {
    const stay = dayjs(resident.joined).diff(dayjs(), "month");
    if (stay < 10) {
      record.pkgAdj = stay * 3000;
      record.totalBill = record.totalBill + record.pkgAdj;
    }
    if (!record.notice) {
      record.totalBill = record.totalBill + 2 * resident.fee;
    }
  }
  record.totalBill -= resident.security;
  return record;
};

const Resident = mongoose.model("Resident", residentSchema);

module.exports = Resident;
