const Survey = require("../models/survey");
const Child = require("../services/childService");

const baseUrl = "https://spectrum-screen-inference.herokuapp.com/api/predict";

const sendPrediction = async (surveyID, childID) => {
  Survey.findOne({ _id: surveyID })
    .populate("answers.question", ["_id", "question"])
    .populate("answers.option", ["option", "weight"])
    .exec()
    .then((res) => {
      Child.getById(childID).then((child) => {
        const finalSurvey = {};
        for (const answer of res.answers) {
          finalSurvey[answer.question._id] = answer.option.weight;
        }
        finalSurvey.age_month = child.age;
        finalSurvey.sex = child.sex;
        finalSurvey.jaundice = child.jaundice;
        finalSurvey.family_mem_with_ASD = child.family_mem_with_ASD;
        console.log(finalSurvey);
        // console.log(child);
      });

      // axios.post(baseUrl + '/api/users/signup', { user });
      //     return response.data;
      // } catch (err) {
      //     return err;
      // }
    });
};

module.exports = { sendPrediction };
