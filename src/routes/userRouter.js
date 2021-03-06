const express = require("express");
const router = express.Router();
const { auth } = require('../middlewares/auth');

const { test, addUser, loginUser, getUserById, updateUser, logoutUser } = require("../controllers/userCtrl");

router.get('/', test)

router.post('/signup', addUser);

router.post('/login', loginUser);

// all routes below protected to authenticated user
router.post('/logout', logoutUser)

router.get('/:id', auth, getUserById);

router.put('/:id', auth, updateUser)

module.exports = router;
