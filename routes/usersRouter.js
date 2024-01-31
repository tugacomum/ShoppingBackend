const express = require("express");
const router = express.Router();
const User = require("../models/user");
const nodemailer = require("nodemailer");

const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  const user = req.body;
  const code = Math.floor(Math.random() * (999_999 - 100_000 + 1)) + 100_000;
  try {
    const emailExists = await User.findOne({ email: user.email });

    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newuser = new User({
      name: user.name,
      email: user.email,
      verificationCode: code,
      password: bcrypt.hashSync(user.password, 10),
    });

    await newuser.save();

    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "shoppingforyouuuuu@gmail.com",
        password: "hicr taep kewb pjtl"
      },
    });

    let mailOptions = {
      from: "",
      to: user.email,
      subject: "Welcome to Shopping4U",
      text: "Verify your account by entering the following code: " + code,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

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

router.patch("/edituser", async (req, res) => {
  const params = req.body;
  try {
    const user = await User.findOne({ _id: params._id });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    user.name = params.name;
    user.imageUrl = params.imageUrl;

    await user.save();
    res.send(user);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/verifyuser", async (req, res) => {
  try {

  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;