const express = require("express");
const Option = require("../models/option");
const router = new express.Router();

// TODO router.post("/option", isAdmin, async (req, res) => {
router.post("/option", async (req, res) => {
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

module.exports = router;
