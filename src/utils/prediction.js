const Survey = require("../models/survey");
const Child = require("../services/childService");
const axios = require("axios");

const baseUrl = "https://spectrum-screen-inference.herokuapp.com";

const sendPrediction = async (surveyID, childID) => {
  Survey.findOne({ _id: surveyID })
    .populate("answers.question", ["_id", "question"])
    .populate("answers.option", ["option", "weight"])
    .exec()
    .then((res) => {
      Child.getById(childID).then((child) => {
        const finalSurvey = formFinalSurvey(res.answers, child);
        console.log(finalSurvey);
        try {
          axios.post(baseUrl + "/api/predict", { finalSurvey }).then((res) => {
            savePredictionToSurvey(surveyID, res.data);
          });
        } catch (err) {
          return err;
        }
      });
    });
};

const formFinalSurvey = (answers, child) => {
  const finalSurvey = {};
  for (const answer of answers) {
    finalSurvey[answer.question._id] = answer.option.weight;
  }
  finalSurvey.age_month = child.age_month;
  finalSurvey.sex = child.sex == "Male" ? 0 : 1;
  finalSurvey.jaundice = child.jaundice ? 1 : 0;
  finalSurvey.family_mem_with_ASD = child.family_mem_with_ASD ? 1 : 0;
  return finalSurvey;
};

const savePredictionToSurvey = async (surveyID, data) => {
  const survey = await Survey.findOne({ _id: surveyID });
  survey.prediction = data.prediction;
  survey.prediction_probability = data.prediction_probability;
  await survey.save();
};

module.exports = { sendPrediction };
