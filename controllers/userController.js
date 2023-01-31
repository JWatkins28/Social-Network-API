const { ObjectId } = require('mongoose').Types;
const { Thought } = require('../models/Thought');
const { User } = require('../models/User');

// GET USERNAME FROM ID
const getUsername = async (id) => User.aggregate().find({ _id: id }, 'username').exec();

// GET FRIEND COUNT
const friendCount = async () =>
    User.aggregate().count('friendCount').then((friends) => friends);

module.exports = {
    // GET ALL USERS
    getUsers(req, res) {
        User.find()
            .select('-__v')
            .then(async (users) => {
                return res.json(users);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // GET ONE USER
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            // .populate('thoughts')
            // .populate('friends')
            .then(async (user) =>
                !user ? res.status(404).json({ message: 'No users found by that ID' })
                    : res.json({ user }))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // CREATE USER
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err))
    },
    // DELETE USER
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No users exists with that ID' })
                    : Thought.findOneAndUpdate(
                        { username: req.params.userId },
                        { $pull: { username: getUsername(req.params.userId) } },
                        { new: true }
                    )
            )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'User deleted but no thoughts found' })
                    : res.json({ message: 'User deleted' })
            )
            .catch((err) => { res.status(500).json(err); }
            )
    },
    // ADD A FRIEND
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user exists with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    },
    // REMOVE A FRIEND
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user exists with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    }
}