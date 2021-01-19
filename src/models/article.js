const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
      trim: true,
    },
    picture: String,
    shorttext: String,
    text: String,
    linksource: String,
  },
  {
    timestamps: true,
  }
);

const article = mongoose.model("Article", articleSchema);

module.exports = article;
