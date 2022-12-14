const express = require("express");
const dayjs = require("dayjs");
const Resident = require("../models/resident");
const Record = require("../models/record");
const Room = require("../models/room");
const auth = require("../middleware/auth");
const router = new express.Router();
var isToday = require("dayjs/plugin/isToday");
dayjs.extend(isToday);

router.post("/residents", auth, async (req, res) => {
  try {
    const room = await Room.findById(req.body.room);
    room.freeSeats = room.freeSeats - req.body.seats;
    if (room.freeSeats < 0) {
      return res
        .status(406)
        .json({ message: "Room does not have enough seats" });
    }
    const newResident = new Resident({
      name: req.body.name,
      room: req.body.room,
      seats: req.body.seats,
      fee: req.body.fee,
      wifi: req.body.wifi,
      package: req.body.package,
      joined: req.body.joined,
      security: req.body.security,
    });
    const newRecord = new Record({
      owner: newResident._id,
      nxtArrears: req.body.arrears,
      nxtFine: req.body.fine,
      new: true,
    });
    newResident.records.push(newRecord._id);
    room.residents.push(newResident._id);
    await newRecord.save();
    await newResident.save();
    await room.save();
    res.status(200).json(newResident);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/residents/clearance", auth, async (req, res) => {
  try {
    const resident = await Resident.findById(req.body.id).populate("records");
    const room = await Room.findById(resident.room);
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
      const updatedValues = resident.generateClearance(
        clearanceRecord,
        resident
      );
      Object.assign(clearanceRecord, updatedValues);
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
        room.totalMR,
        clearanceRecord
      );
      Object.assign(clearanceRecord, billValues);
    }
    const updatedValues = resident.generateClearance(clearanceRecord, resident);
    Object.assign(clearanceRecord, updatedValues);
    resident.clearanceDate = dayjs().format("YYYY-MM-DD");
    resident.active = false;
    room.freeSeats += resident.seats;
    room.residents = room.residents.filter((res) => res._id !== resident._id);
    room.save();
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
    const rooms = await Room.find({}).populate([
      { path: "residents", populate: { path: "records" } },
    ]);
    const records = [];
    rooms.forEach((room) => {
      room.totalAttendance = 0;
      room.residents.forEach((res) => {
        for (let i = 0; i < req.body.values.length; i++) {
          if (req.body.values[i].id === res.id) {
            res.records[res.records.length - 1].arrears =
              res.records[res.records.length - 2].nxtArrears;
            res.records[res.records.length - 1].fine = res.records[
              res.records.length - 2
            ].nxtFine
              ? res.records[res.records.length - 2].nxtFine
              : 0;
            res.records[res.records.length - 1].attendance =
              req.body.values[i].attendance;
            room.totalAttendance =
              room.totalAttendance + req.body.values[i].attendance;
            break;
          }
        }
      });
    });
    rooms.forEach((room) => {
      room.residents.forEach((resident) => {
        resident.records[resident.records.length - 1] = Record.calculateBill(
          room.totalAttendance,
          resident.fee,
          resident.package,
          resident.wifi,
          resident.records[resident.records.length - 1]
        );
        records.push(resident.records[resident.records.length - 1]);
      });
    });
    await Room.bulkSave(rooms);
    await Record.bulkSave(records);
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post("/residents/changeseats", auth, async (req, res) => {
  try {
    if (req.body.seats <= 0) {
      return res.status(406).send("Seats cannot be less than or equal to 0");
    }
    const resident = await Resident.findById(req.body.resident).populate(
      "room"
    );
    const room = await Room.findById(resident.room._id);
    room.freeSeats += resident.seats;
    resident.seats = req.body.seats;
    room.freeSeats -= req.body.seats;
    resident.save();
    room.save();
    res.status(200).send(resident);
  } catch (error) {
    res.status(400).json(res);
  }
});

router.post("/residents/changeroom", auth, async (req, res) => {
  try {
    if (req.body.switch) {
      const resident1 = await Resident.findById(req.body.resident1);
      const resident2 = await Resident.findById(req.body.resident2);
      const room1 = await Room.findById(resident1.room);
      const room2 = await Room.findById(resident2.room);
      room1.freeSeats += resident1.seats;
      room2.freeSeats += resident2.seats;
      room1.freeSeats - +resident2.seats;
      room2.freeSeats - +resident2.seats;
      if (room1.freeSeats < 0 || room2.freeSeats < 0) {
        return res.status(406).json({ message: "Not enough free seats" });
      }
      resident1.room = room2._id;
      resident2.room = room1._id;
      resident1.save();
      resident2.save();
      room1.save();
      room2.save();
      resident1.populate("room");
      res.status(200).json(resident1);
    } else {
      const resident = await Resident.findById(req.body.resident);
      const fromroom = await Room.findById(resident.room);
      const toroom = await Room.findById(req.body.toroom);
      fromroom.freeSeats += resident.seats;
      toroom.freeSeats -= resident.seats;
      if (toroom.freeSeats < 0) {
        return res.status(406).json({ message: "Not enough free seats." });
      }
      resident.room = toroom._id;
      resident.save();
      fromroom.save();
      toroom.save();
      resident.populate("room");
      res.status(200).json(resident);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/residents", auth, async (req, res) => {
  try {
    const resident = await Resident.findById(req.query.id).populate([
      {
        path: "records",
        populate: { path: "paidTo", select: "name" },
      },
      {
        path: "room",
        select: "number",
      },
    ]);
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
    const residents = await Resident.find().populate({ path: "room" });
    if (residents.length === 0) {
      return res.status(404).send("No resident found");
    }
    const sorted = residents.sort((a, b) => a.room.number - b.room.number);
    res.status(200).json(sorted);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.get("/residents/active", auth, async (req, res) => {
  try {
    const residents = await Resident.find({ active: true }).populate("room");
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
