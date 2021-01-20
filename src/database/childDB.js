const { ObjectId } = require('mongodb');
const Child = require('../models/child');

class childMethods {

    async get(id) {
        try {
            const child = await Child.findOne({ _id: ObjectId(id) });
            return child;
        } catch (e) {
            return { error: "ID doesn't exist" };
        }
    }

    async add(child) {
        const childDB = await Child.create({ ...child });
        return childDB;
    }

    async updateChild(id, updatedInfo) {
        const updatedChildDB = await Child.findByIdAndUpdate(
            { _id: id },
            { ...updatedInfo },
            {
                new: true,
                omitUndefined: true,
                useFindAndModify: false,
                runValidators: true
            });
        return updatedChildDB;
    }

    async delete(id) {
        const deleted = await Child.findByIdAndDelete(id);
        return deleted;
    }
}

module.exports = { childMethods }