const express = require("express");
const Resident = require("../models/resident");
const Record = require("../models/record");
// const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/residents", async (req, res) => {
  try {
    const newResident = new Resident(req.body);
    await newResident.save();
    res.status(200).json({ newResident });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/residents/calculateBill/:id", async (req, res) => {
  try {
    const resident = await Resident.findById(req.params.id).populate("records");
    const previousRecord = resident.records[resident.records.length - 1];
    if (!resident) {
      return res.status(404).send("Resident not found");
    }
    const newRecord = new Record(req.body);
    newRecord.calculateBill(
      resident.fee,
      resident.package,
      resident.wifi,
      previousRecord.arrears,
      previousRecord.fine,
      previousRecord.totalMR
    );
    resident.records.push(newRecord._id);
    await resident.save();
    await newRecord.save();
    res.status(200).json(newRecord);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
