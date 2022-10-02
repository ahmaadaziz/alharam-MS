const express = require("express");
const Tab = require("../models/tab");
const Record = require("../models/record");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/tabs", auth, async (req, res) => {
  try {
    const newTab = new Tab({
      title: req.body.title,
      amount: req.body.amount,
      owner: req.body.owner,
    });
    const user = await User.findById(req.body.owner);
    user.tabs.push(newTab._id);
    user.save();
    newTab.save();
    res.status(200).json(newTab);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/tabs/update", auth, async (req, res) => {
  try {
    const tab = await Tab.findById(req.body.id);
    if (tab.record) {
      const record = await Record.findById(tab.record);
      const diff = record.totalBill - (req.body.amount + tab.amountPaid);
      if (diff === 0) {
        const user = await User.findById(tab.owner);
        user.tabs = user.tabs.filter((tab) => tab !== req.body.id);
        record.collected = true;
        user.save();
        record.save();
        tab.delete();
      } else {
        tab.amountPaid += req.body.amount;
        tab.save();
      }
    } else {
      const diff = tab.amount - (req.body.amount + tab.amountPaid);
      if (diff === 0) {
        const user = await User.findById(tab.owner);
        user.tabs = user.tabs.filter((tab) => tab !== req.body.id);
        user.save();
        tab.delete();
      } else {
        tab.amountPaid += req.body.amount;
        tab.save();
      }
    }
    res.status(200).send();
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.get("/tabs/:id", auth, async (req, res) => {
  try {
    const user = await Tab.find({
      owner: req.params.id,
    }).populate({ path: "record", populate: { path: "owner" } });
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
