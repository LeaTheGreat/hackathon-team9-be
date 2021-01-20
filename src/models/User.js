const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: [validator.isEmail, "Must be a valid email"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be minimum 6 characters long"],
    },
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength: [3, "First name must be atleast 3 characters long"],
        maxlength: [20, "First name cannot be longer than 20 characters"],
        validate: [validator.isAlpha, "First name cannot contain numbers"],
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minlength: [3, "Last name must be atleast 3 characters long"],
        maxlength: [20, "Last name cannot be longer than 20 characters"],
        validate: [validator.isAlpha, "Last name cannot contain numbers"],
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone number is required"],
        minlength: [9, "Phone number must be at least 9 characters long"],
        maxlength: [20, "Phone number cannot be longer than 20 characters"],
        validate: [validator.isMobilePhone, "Phone number is not valid"],
    },
    role: {
        type: String,
        required: [true, "user must have a role"],
        enum: ["Admin", "Doctor", "Parent"],
    },
});

const user = mongoose.model("User", userSchema);

module.exports = user;