const express = require("express");
const Resident = require("../models/resident");
const Record = require("../models/record");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/residents", auth, async (req, res) => {
  try {
    const newResident = new Resident(req.body);
    await newResident.save();
    res.status(200).json({ newResident });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/records", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send("Missing Owner ID");
    }
    const newRecord = new Record(req.body);
    await newRecord.save();
    return res.status(200).json(newRecord);
  } catch (e) {
    console.log(e);
  }
});

router.post("/residents/calculateBill/:id:rid", auth, async (req, res) => {
  try {
    const resident = await Resident.findById(req.params.id).populate("records");
    if (!resident) {
      return res.status(404).send("Resident not found");
    }
    const previousRecord = resident.records[resident.records.length - 2];
    const newRecord = await Record.findById(req.params.rid);
    if (!newRecord) {
      return res.status(404).send("Record not found");
    }
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

router.get("/records/latest", auth, async (req, res) => {
  function partition(array, callback) {
    return array.reduce(
      function (result, element, i) {
        callback(element, i, array)
          ? result[0].push(element)
          : result[1].push(element);

        return result;
      },
      [[], []]
    );
  }
  try {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const fromDate = new Date(year, month - 2, 1);
    const records = await Record.find({
      createdAt: { $gte: fromDate, $lt: new Date() },
    }).populate("owner");
    if (!records || records.length === 0) {
      return res.status(404).send("No records found");
    }
    const [newRecords, oldRecords] = partition(
      records,
      (record) => record.createdAt.getMonth() === new Date().getMonth()
    );
    return res.status(200).json({ newRecords, oldRecords });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
