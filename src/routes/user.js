const express = require("express");
const User = require("../models/user");
const Tab = require("../models/tab");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    const token = await newUser.generateAuthToken();
    res.status(200).json({ newUser, token });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/users/login-auto", auth, async (req, res) => {
  try {
    if (req.user) {
      res.status(200).json(req.user);
    } else {
      throw new Error({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/login/", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    if (!user) {
      throw new Error({ message: "Invalid email/password" });
    }
    const token = await user.generateAuthToken();
    // res.cookie("auth", token, {
    //   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    //   secure: process.env.NODE_ENV === "production",
    //   ...(req.body.remember && { maxAge: process.env.JWT_EXPIRES_IN }),
    //   httpOnly: true,
    // });
    res.send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    // res.clearCookie("auth");
    res.redirect("/");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/users", auth, async (req, res) => {
  try {
    const users = await User.find({}, { _id: 1, name: 1 });
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.get("/users/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate({
      path: "tabs",
      model: Tab,
    });
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
