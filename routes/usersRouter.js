const express = require("express");
const router = express.Router();
const User = require("../models/user");

const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  const user = req.body;
  try {
    const newuser = new User({
      name: user.name,
      email: user.email,
      password: bcrypt.hashSync(user.password, 10),
    });
    await newuser.save();
    res.send(newuser);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        res.send(user);
      } else {
        return res.status(400).json({ message: "Login failed" });
      }
    } else {
      return res.status(400).json({ message: "Login failed" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getallusers", async (res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/deleteuser", async (req, res) => {
  const userid = req.body.id;
  try {
    await User.deleteOne({ _id: userid });
    res.send("User deleted successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/disableuser", async (req, res) => {
  const userid = req.body.id;
  try {
    const user = await User.findOne({ _id: userid });
    if (user.status === "disabled") {
      user.status = "active";
      await user.save();
      return res.send("User enabled successfully");
    } else {
      user.status = "disabled";
      await user.save();
      return res.send("User disabled successfully");
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/roleuser", async (req, res) => {
  const userid = req.body.id;
  try {
    const user = await User.findOne({ _id: userid });
    if (user.isAdmin === true) {
      user.isAdmin = false;
      await user.save();
      return res.send("User is now a normal user");
    } else {
      user.isAdmin = true;
      await user.save();
      return res.send("User is now an admin user");
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getuserbyid", async (req, res) => {
  const userid = req.body.id;
  try {
    const user = await User.findOne({ _id: userid });
    res.send(user);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/edituser", async (req, res) => {
  const { user } = req.body;
  try {
    const result = await User.updateOne(
      { _id: user.id },
      {
        name: user.name,
        imageUrl: user.imageUrl,
      }
    );
    res.send(result);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;