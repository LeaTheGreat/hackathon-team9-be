const jwt = require("jsonwebtoken");
const User = require("../services/userService");

const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send("not authenticated");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send("token not valid");
    req.userID = user;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).send("not authenticated");
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userID) => {
      if (err) return res.status(403).send("token not valid");
      User.getById(userID.id).then((user) => {
        if (user.role === "Admin") {
          req.userID = userID;
          next();
        } else {
          res.status(403).send({ error: " User hasn`t access" });
        }
      });
    });
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = { auth, isAdmin };
