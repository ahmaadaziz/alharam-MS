const express = require("express");
const dayjs = require("dayjs");
const Record = require("../models/record");
const Resident = require("../models/resident");
const User = require("../models/user");
const Tab = require("../models/tab");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/records", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send("Missing Owner ID");
    }
    const owner = await Resident.findById(req.body.owner).populate("records");
    const newRecord = new Record(req.body);
    newRecord.arrears = owner.records[owner.records.length - 1].nxtArrears;
    newRecord.fine = owner.records[owner.records.length - 1].nxtFine;
    owner.records.push(newRecord._id);
    await newRecord.save();
    await owner.save();
    return res.status(200).json(newRecord);
  } catch (e) {
    console.log(e);
  }
});

router.post("/records/create", async (req, res) => {
  try {
    const residents = await Resident.find({ active: true }).populate("records");
    for (const resident of residents) {
      const newRecord = new Record({ owner: resident._id });
      newRecord.arrears =
        resident.records[resident.records.length - 1].nxtArrears;
      newRecord.fine = resident.records[resident.records.length - 1].nxtFine;
      resident.records.push(newRecord._id);
      await newRecord.save();
      await resident.save();
    }
    res.status(200).send();
  } catch (e) {
    console.log(e);
  }
});

router.post("/records/adjustment", auth, async (req, res) => {
  try {
    const record = await Record.findById(req.body.id).populate("owner");
    if (!record) {
      return res.status(404).send("Record not found");
    }
    record.totalBill = record.totalBill + req.body.adjustment;
    if (record.adjustment) {
      record.adjustment = record.adjustment + req.body.adjustment;
    } else {
      record.adjustment = req.body.adjustment;
    }
    await record.save();
    return res.status(200).json(record);
  } catch (e) {
    console.log(e);
  }
});

router.post("/records/submit-payment", auth, async (req, res) => {
  const record = await Record.findById(req.body.id);
  if (!record) {
    return res.status(404).send("Record not found");
  }
  const user = await User.findById(req.body.paidTo);
  const diff = record.totalBill - req.body.amountPaid;
  record.nxtArrears = diff;
  const dueDate = new Date(
    dayjs(record.createdAt).year(),
    dayjs(record.createdAt).month() + 1,
    7
  );
  const difference = dayjs(req.body.date).diff(dueDate, "day");
  if (difference > 0) {
    record.nxtFine = difference * 30;
  } else {
    record.nxtFine = 0;
  }
  if (req.body.info) {
    record.info = req.body.info;
  }
  if (user.name === "akhter aziz") {
    record.collected = true;
  } else {
    const newTab = new Tab({ owner: req.body.paidTo, record: record._id });
    user.tabs.push(newTab._id);
    user.save();
    newTab.save();
  }

  record.collectionDate = req.body.date;
  record.paidTo = req.body.paidTo;
  record.paidVia = req.body.paidVia;
  record.amountPaid = req.body.amountPaid;
  record.paid = true;
  record.save();
  return res.status(200).send("Payment Submitted Successfully!");
});

router.post("/records/remove-fine", auth, async (req, res) => {
  const record = await Record.findById(req.body.id).populate("owner");
  if (!record) {
    return res.status(404).send("Record not found");
  }
  if (record.owner.records.length > 1) {
    const index = record.owner.records.length - 2;
    const previousRecord = await Record.findById(
      record.owner.records[index]._id
    );
    previousRecord.nxtFine = 0;
    previousRecord.save();
  }
  record.fine = 0;
  record.save();
  return res.status(200).send("Fine Removed");
});

router.get("/records", auth, async (req, res) => {
  try {
    const record = await Record.findById(req.query.id).populate([
      { path: "owner", populate: { path: "room", select: "number" } },
    ]);
    if (!record) {
      return res.status(404).send("No record found");
    }
    return res.status(200).json(record);
  } catch (error) {
    console.log(error);
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
      $and: [
        { createdAt: { $gte: fromDate, $lt: new Date() } },
        { new: { $exists: false } },
      ],
    }).populate([
      { path: "owner", populate: { path: "room", select: "number" } },
      { path: "paidTo", select: "name" },
    ]);
    if (!records || records.length === 0) {
      return res.status(404).json(["No records found"]);
    }
    const [newRecords, oldRecords] = partition(
      records,
      (record) => record.createdAt.getMonth() === new Date().getMonth()
    );
    const [olderRecords, oldestRecords] = partition(
      oldRecords,
      (record) => record.createdAt.getMonth() === new Date().getMonth() - 1
    );
    if (oldestRecords.length > 0) {
      return res.status(200).json({ newRecords, olderRecords, oldestRecords });
    } else {
      return res.status(200).json({ newRecords, oldRecords });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/records/bymonth", auth, async (req, res) => {
  try {
    const fromMonth = req.query.month === 0 ? 11 : req.query.month - 1;
    const fromDate = new Date(req.query.year, fromMonth, 20);
    const toDate = new Date(req.query.year, req.query.month, 2);
    const records = await Record.find({
      $and: [
        { createdAt: { $gte: fromDate, $lt: toDate } },
        { new: { $exists: false } },
      ],
    }).populate({
      path: "owner",
      populate: { path: "room", select: "number" },
    });
    if (!records || records.length === 0) {
      return res.status(404).send("No records found");
    }
    return res.status(200).json(records);
  } catch (error) {
    console.log(error);
  }
});

router.get("/records/pages-count", async (req, res) => {
  try {
    let pages = [];
    const record = await Record.findOne().sort({ createdAt: 1 });
    const oldestYear = dayjs(record.createdAt).year();
    const diff = dayjs().year() - oldestYear;
    for (let index = 0; index <= diff; index++) {
      pages.push(dayjs().year() - index);
    }
    return res.status(200).json(pages);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
