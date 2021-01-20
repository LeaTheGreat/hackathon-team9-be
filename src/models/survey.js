const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema(
  {
    child: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child", //Used "User" for fast testing
    },
    answers: [
      {
        question: { type: String, ref: "Question" },
        option: { type: String, ref: "Option" },
      },
    ],
    prediction: Number,
    prediction_probability: Number,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const survey = mongoose.model("Survey", surveySchema);

module.exports = survey;
