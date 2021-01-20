const { ObjectId } = require('mongodb');
const { User } = require('../models/User');

class userMethods {

    async get(id) {
        try {
            const user = await User.findOne({ _id: ObjectId(id) });
            return user;
        } catch (e) {
            return { error: "ID doesn't exist" };
        }
    }

    async getByEmail(email) {
        const user = await User.findOne({ email: email });
        return user;
    }

    async add(user) {
        const userDB = await User.create({ ...user });
        return userDB;
    }

    async updateProfile(id, updatedInfo) {
        const updatedUserDB = await User.findByIdAndUpdate(
            { _id: id },
            { ...updatedInfo },
            {
                new: true,
                omitUndefined: true,
                useFindAndModify: false,
                runValidators: true
            });
        console.log(updatedUserDB)
        return updatedUserDB;
    }
}


module.exports = { userMethods }