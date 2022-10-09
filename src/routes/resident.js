const express = require("express");
const dayjs = require("dayjs");
const Resident = require("../models/resident");
const Record = require("../models/record");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/residents", auth, async (req, res) => {
  try {
    const newResident = new Resident({
      name: req.body.name,
      room: req.body.room,
      fee: req.body.fee,
      wifi: req.body.wifi,
      package: req.body.package,
      joined: req.body.joined,
      security: req.body.security,
    });
    var newRecord = {};
    if (req.body.meter) {
      newRecord = new Record({
        owner: newResident._id,
        nxtArrears: req.body.arrears,
        nxtFine: req.body.fine,
        totalMR: req.body.meter,
        new: true,
      });
    } else {
      const otherResidents = await Resident.find({
        room: req.body.room,
        active: true,
      }).populate("records");
      if (otherResidents.length > 0) {
        newRecord = new Record({
          owner: newResident._id,
          nxtArrears: req.body.arrears,
          nxtFine: req.body.fine,
          new: true,
          totalMR:
            otherResidents[0].records[otherResidents[0].records.length - 1]
              .totalMR,
        });
      } else {
        newRecord = new Record({
          owner: newResident._id,
          nxtArrears: req.body.arrears,
          nxtFine: req.body.fine,
          new: true,
          totalMR: 0,
        });
      }
    }
    newResident.records.push(newRecord._id);
    await newRecord.save();
    await newResident.save();
    res.status(200).json(newResident);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/residents/clearance", auth, async (req, res) => {
  console.log(req.body, "BODY!");
  try {
    console.log("this ran");
    const resident = await Resident.findById(req.body.id).populate("records");
    if (!resident) {
      return res.status(404).send("Resident not found.");
    }
    var clearanceRecord = {};
    if (!resident.records[resident.records.length - 1].paid) {
      clearanceRecord = await Record.findById(
        resident.records[resident.records.length - 1]._id
      );
      clearanceRecord.notice = req.body.notice;
      clearanceRecord.clearance = true;
      Object.assign(clearanceRecord, billValues);
    } else {
      const previousRecord = resident.records[resident.records.length - 1];
      clearanceRecord = new Record({
        owner: resident._id,
        arrears: previousRecord.nxtArrears,
        fine: previousRecord.nxtFine ? previousRecord.nxtFine : 0,
        clearance: true,
      });
      resident.records.push(clearanceRecord._id);
      clearanceRecord.notice = req.body.notice;
      const billValues = clearanceRecord.calculateBill(
        req.body.ups,
        req.body.wapda,
        req.body.attendance,
        req.body.totalAttendance,
        resident.fee,
        resident.package,
        resident.wifi,
        clearanceRecord.arrears,
        clearanceRecord.fine,
        previousRecord.totalMR,
        clearanceRecord
      );
      Object.assign(clearanceRecord, billValues);
    }
    const updatedValues = resident.generateClearance(clearanceRecord, resident);
    Object.assign(clearanceRecord, updatedValues);
    resident.clearanceDate = dayjs().format("YYYY-MM-DD");
    resident.active = false;
    clearanceRecord.save();
    resident.save();
    res.status(200).json(clearanceRecord);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/residents/calculateBill", auth, async (req, res) => {
  try {
    const values = req.body.values;
    for (const value of values) {
      const resident = await Resident.findById(value.id).populate("records");
      var totalAttendance = value.attendance;
      for (const valueAtt of values) {
        const otherRecord = await Record.findById(valueAtt.rid).populate(
          "owner"
        );
        if (
          otherRecord.owner.name !== resident.name &&
          otherRecord.owner.room === resident.room
        ) {
          totalAttendance += valueAtt.attendance;
        }
        otherRecord.attendance = valueAtt.attendance;
        otherRecord.save();
      }
      const newRecord = await Record.findById(value.rid);
      if (!newRecord) {
        return res.status(404).send("Record not found");
      }
      const previousRecord = resident.records[resident.records.length - 2];
      const billValues = newRecord.calculateBill(
        value.ups,
        value.wapda,
        value.attendance,
        totalAttendance,
        resident.fee,
        resident.package,
        resident.wifi,
        newRecord.arrears,
        newRecord.fine,
        previousRecord.totalMR,
        newRecord
      );
      Object.assign(newRecord, billValues);
      newRecord.attendance = value.attendance;
      newRecord.ups = value.ups;
      newRecord.wapda = value.wapda;
      await newRecord.save();
    }
    res.status(200).json("Succesfull");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/residents", auth, async (req, res) => {
  try {
    const resident = await Resident.findById(req.query.id).populate({
      path: "records",
      populate: { path: "paidTo", select: "name" },
    });
    if (!resident) {
      return res.status(404).send("No resident found");
    }
    res.status(200).json(resident);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.get("/residents/all", auth, async (req, res) => {
  try {
    const residents = await Resident.find();
    if (residents.length === 0) {
      return res.status(404).send("No resident found");
    }
    res.status(200).json(residents);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
