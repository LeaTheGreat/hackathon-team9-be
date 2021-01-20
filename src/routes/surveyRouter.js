const express = require("express");
const Survey = require("../models/survey");
const router = new express.Router();
const { auth } = require("../middlewares/auth");
const { sendPrediction } = require("../utils/prediction");

router.post("/child/:id", auth, async (req, res) => {
  const survey = new Survey({
    ...req.body,
  });
  survey.child = req.params.id;
  try {
    await survey.save();
    res.status(201).send(survey);
    sendPrediction(survey._id, survey.child);
    return;
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/child/:id", auth, async (req, res) => {
  console.log(req.params.id);
  try {
    const survey = await Survey.find({ child: req.params.id })
      .populate("answers.question", ["_id", "question"])
      .populate("answers.option", ["option", "weight"])
      .exec();

    res.status(200).send(survey[0]);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/child/:id/short", auth, async (req, res) => {
  console.log(req.params.id);
  try {
    const survey = await Survey.find({ child: req.params.id })
      .populate("answers.question", ["_id", "question"])
      .populate("answers.option", ["option", "weight"])
      .exec();
    const finalSurvey = {};
    for (const answer of survey[0].answers) {
      finalSurvey[answer.question._id] = answer.option.weight;
    }
    console.log(finalSurvey);
    res.status(200).send(finalSurvey);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/:id", auth, async (req, res) => {
  const _id = req.params.id;
  console.log(_id);

  try {
    const survey = await Survey.findOne({ _id })
      .populate("answers.question", ["_id", "question"])
      .populate("answers.option", ["option", "weight"])
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
