const express = require("express");
const Room = require("../models/room");
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
