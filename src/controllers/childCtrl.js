const Child = require("../services/childService");
const errors = require("../utils/error");

const getChildById = async (req, res) => {
    const childDB = await Child.getById(req.params.id);
    if (!childDB || childDB.error) {
        return res.send(errors.incorrectID);
    }
    res.json(childDB);
}

const getAllChildrenWithoutDoctor = async (req, res) => {
    try {
        const children = await Child.getAllWithoutDoctor();
        res.json(children);
    } catch (e) {
        return res.send({ error: e });
    }

}

const getAllChildrenRelatedToDoctor = async (req, res) => {
    const id = req.params.id
    if (!id) {
        return res.send(errors.incorrectID);
    }
    try {
        const children = await Child.getAllDoctorRelated(id);
        res.json(children);
    } catch (e) {
        return res.send({ error: e });
    }
}

const getAllChildrenRelatedToParent = async (req, res) => {
    const id = req.params.id
    if (!id) {
        return res.send(errors.incorrectID);
    }
    try {
        const children = await Child.getAllParentRelated(id);
        res.json(children);
    } catch (e) {
        console.log(e);
        return res.send({ error: e });
    }
}

const addChild = async (req, res) => {
    const NewChild = req.body.child;
    if (!NewChild) {
        return res.send(errors.missingParams);
    }
    try {
        const addedChild = await Child.add(NewChild);
        res.status(201).send({ id: addedChild._id });
    } catch (e) {
        return res.send({ error: e });
    }
}


const updateChild = async (req, res) => {
    const infoToUpdate = req.body;
    const id = req.params.id;
    try {
        const updatedChild = await Child.updateChild(id, infoToUpdate);
        res.json(updatedChild);
    } catch (e) {
        return res.send({ error: e });
    }
}

const deleteChild = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.send(errors.incorrectID);
    }
    try {
        const deleted = await Child.delete(id);
        res.status(201).send(deleted._id);
    } catch (e) {
        return res.send({ error: e });
    }
}

module.exports = {
    getChildById,
    getAllChildrenWithoutDoctor,
    getAllChildrenRelatedToDoctor,
    getAllChildrenRelatedToParent,
    addChild,
    updateChild,
    deleteChild
};