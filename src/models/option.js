const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  option: {
    type: String,
    required: true,
    unique: true,
  },
});

const option = mongoose.model("Option", optionSchema);

module.exports = option;
