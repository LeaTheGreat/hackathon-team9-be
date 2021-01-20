const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  _id: { type: String },
  option: {
    type: String,
    required: true,
    unique: true,
  },
  weight: Number,
});

const option = mongoose.model("Option", optionSchema);

module.exports = option;
