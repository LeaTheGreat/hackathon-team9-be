const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    _id: { type: String },
    question: {
      type: String,
      required: true,
    },
    options: [{ type: String, ref: "Option" }],
    use: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const question = mongoose.model("Question", questionSchema);

module.exports = question;
