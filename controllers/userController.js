const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models')

// GET USERNAME FROM ID
const getUsername = async (id) => User.aggregate().find({ _id: id }, 'username').exec();

// GET FRIEND COUNT
const friendCount = async () =>
    User.aggregate().count('friendCount').then((friends) => friends);

module.exports = {
    // GET ALL USERS
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                const userData = { users };
                return res.json(userData);
            })
            .catch((err) => {
                return res.status(500).json(err);
            });
    },
    // GET ONE USER
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then(async (user) =>
                !user ? res.status(404).json({ message: 'No users found by that ID' })
                    : res.json({ user, numberOfFriends: await friendCount }))
            .catch((err) => {
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
        User.findOneandRemove({ _id: req.params.userId })
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
                    ? res.status(404).json({ message: 'User delete but no thoughts found' })
                    : res.json({ message: 'User deleted' })
            )
            .catch((err) => { res.status(500).json(err); }
            )
    },
    // ADD THOUGHT TO USER
    addThought(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { thoughts: req.body } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user exists with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // REMOVE THOUGHT FROM USER
    removeThought(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { thoughts: { username: getUsername(req.params.userId) } } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user exists with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
}