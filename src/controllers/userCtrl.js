const User = require("../services/userService");
const {
    hashPassword,
    comparePasswords,
    createToken,
} = require("../utils/helper");

const { errors, errorsArray } = require("../utils/error");

const test = async (req, res) => {
    console.log(req.cookies.token);
    res.send("pass test");
}

const addUser = async (req, res) => {
    const NewUser = req.body.user;
    if (!NewUser) {
        return res.send(errors.missingParams);
    }
    if (await User.getByEmail(NewUser.email)) {
        return res.send(errors.emailExist);
    }
    try {
        const hasedPassword = await hashPassword(NewUser.password);
        NewUser.password = hasedPassword;
        const addedUser = await User.add(NewUser);
        res.status(201).send({ id: addedUser._id });
    } catch (e) {
        return res.send({ error: errorsArray(e) });
    }
};

const loginUser = async (req, res) => {
    const user = req.body.user;
    if (!user || !user.email || !user.password) {
        return res.send(errors.missingParams);
    }
    const userDB = await User.getByEmail(user.email);
    if (!userDB) {
        return res.send(errors.incorrectLoginParams);
    }
    try {
        const isEqual = await comparePasswords(user.password, userDB.password);
        if (!isEqual) {
            return res.send(errors.incorrectLoginParams);
        }
        const token = createToken(userDB._id);
        res.cookie('token', token, {
            maxAge: 24 * 60 * 60 * 100,
            httpOnly: true
        });
    } catch (e) {
        console.log(e);
        return res.send({ error: errorsArray(e) })
    }
    res.json({ id: userDB._id });
};

const getUserById = async (req, res) => {
    const userDB = await User.getById(req.params.id);
    if (!userDB || userDB.error) {
        return res.send(errors.incorrectID);
    }
    const user = {
        firstName: userDB.firstName,
        lastName: userDB.lastName,
        email: userDB.email,
        phoneNumber: userDB.phoneNumber,
        savedJobs: userDB.savedJobs,
        appliedJobs: userDB.appliedJobs,
    };
    res.json(user);
};

const updateUser = async (req, res) => {
    const infoToUpdate = req.body;
    const id = req.params.id;
    try {
        if (infoToUpdate.password) {
            const hasedPassword = await hashPassword(infoToUpdate.password);
            infoToUpdate.password = hasedPassword;
        }
        const updatedUser = await User.updateProfile(id, infoToUpdate);
        console.log(updatedUser);
        res.json(updatedUser);
    } catch (e) {
        return res.send({ error: errorsArray(e) });
    }
}


module.exports = {
    test,
    addUser,
    loginUser,
    getUserById,
    updateUser
};
