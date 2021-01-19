const express = require("express");
const Question = require("../models/question");
const router = new express.Router();

// TODO router.post("/question", isAdmin, async (req, res) => {
router.post("/question", async (req, res) => {
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

// TODO router.get("/question", auth, async (req, res) => {
router.get("/question", async (req, res) => {
  try {
    console.log("question");
    const questions = await Question.find({ use: true }).populate("options");
    res.status(200).send(questions);
  } catch (e) {
    res.status(500).send(e);
  }
});

// TODO router.get("/question/:id", auth, async (req, res) => {
router.get("/question/:id", async (req, res) => {
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
