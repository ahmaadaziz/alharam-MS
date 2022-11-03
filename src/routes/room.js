const express = require("express");
const Room = require("../models/room");
const Record = require("../models/record");
const Resident = require("../models/resident");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/rooms", auth, async (req, res) => {
  try {
    const newRoom = new Room({
      number: req.body.roomNumber,
      ups: req.body.ups ? req.body.ups : 0,
      wapda: req.body.wapda ? req.body.wapda : 0,
      totalMR: req.body.totalMR ? req.body.totalMR : 0,
      overUnits: req.body.overUnits ? req.body.overUnits : 0,
      seats: req.body.seats,
      freeSeats: req.body.seats,
    });
    newRoom.save();
    res.status(200).json(newRoom);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/rooms/meter", auth, async (req, res) => {
  try {
    const rooms = await Room.find({}).populate("residents");
    const records = [];
    const updatedResidents = [];
    rooms.forEach((room) => {
      for (let i = 0; i < req.body.values.length; i++) {
        if (req.body.values[i].id === room.number) {
          room.residents.forEach((resident) => {
            const ovrUnts =
              req.body.values[i].ups +
              req.body.values[i].wapda -
              room.totalMR -
              process.env.FREE_UNITS;
            var record = {};
            if (ovrUnts < 0) {
              record = new Record({
                owner: resident._id,
                ups: req.body.values[i].ups,
                wapda: req.body.values[i].wapda,
                overUnits: 0,
              });
            } else {
              record = new Record({
                owner: resident._id,
                ups: req.body.values[i].ups,
                wapda: req.body.values[i].wapda,
                overUnits: ovrUnts,
              });
            }
            records.push(record);
            resident.records.push(record._id);
            updatedResidents.push(resident);
          });
          room.newMR =
            req.body.values[i].ups + req.body.values[i].wapda - room.totalMR;
          room.totalMR = req.body.values[i].ups + req.body.values[i].wapda;
          room.ups = req.body.values[i].ups;
          room.wapda = req.body.values[i].wapda;
          break;
        }
      }
    });
    await Record.insertMany(records);
    await Resident.bulkSave(updatedResidents);
    await Room.bulkSave(rooms);
    res.status(200).send();
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.get("/rooms", auth, async (req, res) => {
  const rooms = await Room.find().populate("residents").sort({ number: "asc" });
  return res.status(200).json(rooms);
});

router.get("/rooms/free", auth, async (req, res) => {
  const rooms = await Room.find({ freeSeats: { $gt: 0 } })
    .select({ number: 1, freeSeats: 1 })
    .sort({ number: "asc" });
  if (rooms.length === 0) {
    return res.status(200).json([]);
  }
  return res.status(200).json(rooms);
});

module.exports = router;
