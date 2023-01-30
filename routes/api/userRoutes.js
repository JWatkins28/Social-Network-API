const router = require('express').Router();
// IMPORT USER CONTROLLER FUNCTIONS
const {getUsers, getOneUser, createUser, deleteUser, addThought, removeThought} = require('../../controllers/userController')

// ALL THESE ROUTES ARE: /api/users/* 

// GET ALL USERS / CREATE USER 
router.route('/').get(getUsers).post(createUser);

// GET SINGLE USER / DELETE USER BY ID
router.route('/:userId').get(getOneUser).delete(deleteUser);

// ADD THOUGHT TO USER BY USER ID
router.route('/:userId/thoughts').post(addThought);

// DELETE THOUGHT BY ID
router.route('/:userId/thoughts/:thoughtId').delete(removeThought);

module.exports = router;