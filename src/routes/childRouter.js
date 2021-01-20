const express = require("express");
const router = express.Router();
const { auth } = require('../middlewares/auth');

const { getChildById, addChild , updateChild, deleteChild } = require("../controllers/childCtrl");

router.get('/:id', auth, getChildById);

router.post('/', addChild);

router.put('/:id', updateChild)

router.delete('/:id', deleteChild)

module.exports = router;