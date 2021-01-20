const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token)
        return res.status(401).send("not authenticated");
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send("token not valid");
        req.userID = user;
        next()
    });
}

module.exports = { auth };