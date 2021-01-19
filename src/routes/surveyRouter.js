const express = require("express");
const Survey = require("../models/survey");
const router = new express.Router();
//TODO auth everywhere
// TODO router.post("/survey", isAdmin, async (req, res) => {
router.post("/child/:id", async (req, res) => {
  const survey = new Survey({
    ...req.body,
  });
  survey.child = req.params.id;
  try {
    await survey.save();
    res.status(201).send(survey);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/child/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const survey = await Survey.find({ child: req.params.id })
      .populate("answers.question")
      .populate("answers.option")
      .exec();
    console.log(survey);

    res.status(200).send(survey);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/:id", async (req, res) => {
  const _id = req.params.id;
  console.log(_id);

  try {
    const survey = await Survey.findOne({ _id })
      .populate("answers.question")
      .populate("answers.option")
      .exec();

    if (!survey) {
      return res.status(404).send();
    }
    res.send(survey);
  } catch (e) {
    console.log(e);

    res.status(500).send(e);
  }
});
module.exports = router;
