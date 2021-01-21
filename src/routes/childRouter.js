const express = require("express");
const router = express.Router();
const { auth } = require('../middlewares/auth');

const { getChildById, getAllChildrenWithoutDoctor, getAllChildrenRelatedToDoctor, getAllChildrenRelatedToParent, addChild, updateChild, deleteChild } = require("../controllers/childCtrl");

router.get('/doctor/:id', auth, getAllChildrenRelatedToDoctor)   //get all children relate to that doctor

router.get('/doctor/', auth, getAllChildrenWithoutDoctor)   //get all children not reltated to any doctor

router.get('/parent/:id', auth, getAllChildrenRelatedToParent)

router.get('/:id', auth, getChildById);

router.post('/', auth, addChild);

router.put('/:id', auth, updateChild)

router.delete('/:id', auth, deleteChild)

module.exports = router;