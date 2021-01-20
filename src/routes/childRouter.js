const express = require("express");
const router = express.Router();
const { auth } = require('../middlewares/auth');

const { getChildById, addChild , updateChild, deleteChild } = require("../controllers/childCtrl");

router.get('/:id', auth, getChildById);

router.post('/', addChild);

router.put('/:id', auth, updateChild)

router.delete('/:id', auth, deleteChild)

module.exports = router;