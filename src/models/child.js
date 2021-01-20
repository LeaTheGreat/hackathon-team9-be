const mongoose = require("mongoose");
const validator = require("validator");

const childSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [2, "Name must be atleast 3 characters long"],
        validate: [validator.isAlpha, "Name cannot contain numbers"],
    },
    age: {
        type: Number,
        required: [true, "Age is required"],
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Parent is required"],
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
});

const child = mongoose.model("Child", childSchema);

module.exports = child;
