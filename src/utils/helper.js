const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const hashPassword = async (password) => {
    const hasedPassword = await bcrypt.hash(password, 10);
    return hasedPassword;
}

const comparePasswords = async (password, hasedPassword) => {
    if (await bcrypt.compare(password, hasedPassword)) {
        return true;
    }
    return false;
}

const createToken = (id) => {
    const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET);
    return accessToken;
}




module.exports = { hashPassword, comparePasswords, createToken }