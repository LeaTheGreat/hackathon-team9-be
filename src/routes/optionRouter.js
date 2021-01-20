const express = require("express");
const Option = require("../models/option");
const router = new express.Router();

// TODO router.post("/option", isAdmin, async (req, res) => {
router.post("/", async (req, res) => {
  const option = new Option({
    ...req.body,
  });

  try {
    await option.save();
    res.status(201).send(option);
  } catch (e) {
    res.status(400).send(e);
  }
});

// TODO router.post("/array", isAdmin, async (req, res) => {
router.post("/array", async (req, res) => {
  try {
    for (const item of req.body) {
      const option = new Option({
        ...item,
      });
      await option.save();
    }
    res.status(201).send("succeed");
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
