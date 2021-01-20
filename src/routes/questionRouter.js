const express = require("express");
const Question = require("../models/question");
const router = new express.Router();
const { auth } = require("../middlewares/auth");

// TODO router.post("/", isAdmin, async (req, res) => {
router.post("/", async (req, res) => {
  const question = new Question({
    ...req.body,
  });

  try {
    await question.save();
    res.status(201).send(question);
  } catch (e) {
    res.status(400).send(e);
  }
});

// TODO router.post("/array", isAdmin, async (req, res) => {
router.post("/array", async (req, res) => {
  try {
    for (const item of req.body) {
      const question = new Question({
        ...item,
      });
      await question.save();
    }
    res.status(201).send("succeed");
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    console.log("question");
    const questions = await Question.find({ use: true }).populate("options");
    res.status(200).send(questions);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/:id", auth, async (req, res) => {
  const _id = req.params.id;
  console.log(_id);

  try {
    const question = await Question.findOne({ _id }).populate("options");
    if (!question) {
      return res.status(404).send();
    }
    res.send(question);
  } catch (e) {
    console.log(e);

    res.status(500).send(e);
  }
});
module.exports = router;
