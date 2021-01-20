const express = require("express");
const Option = require("../models/option");
const router = new express.Router();
const { isAdmin } = require("../middlewares/auth");

router.post("/", isAdmin, async (req, res) => {
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

router.post("/array", isAdmin, async (req, res) => {
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
