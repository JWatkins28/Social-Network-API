const router = require('express').Router();
// IMPORT USER CONTROLLER FUNCTIONS
const { getUsers, getOneUser, createUser, deleteUser, addFriend, removeFriend } = require('../../controllers/userController')

// ALL THESE ROUTES ARE: /api/users/* 

// GET ALL USERS / CREATE USER 
router.route('/').get(getUsers).post(createUser);

// GET SINGLE USER / DELETE USER BY ID
router.route('/:userId').get(getOneUser).delete(deleteUser);

// ADD / REMOVE FRIENDS BY ID
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;