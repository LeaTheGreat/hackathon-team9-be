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
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    role: {
        type: String,
        required: [true, "user must have a role"],
        enum: ["Admin", "Doctor", "Parent"],
    },
});

const child = mongoose.model("Child", childSchema);

module.exports = child;
