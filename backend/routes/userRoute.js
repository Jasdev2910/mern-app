// create
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.post("/", async (req, res) => {
  const { name, email, age } = req.body;

  try {
    const userAdded = await User.create({
      name,
      email,
      age,
    });

    res.status(201).json(userAdded);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
    console.log(error);
  }
});

// get all data
router.get("/", async (req, res) => {
  try {
    const allData = await User.find({});
    res.status(200).json({
      allData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});
// get single user

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const singleUser = await User.findById({ _id: id });
    res.status(200).json({
      singleUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete({ _id: id });
    res.status(200).json({
      deletedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

// update user
router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
