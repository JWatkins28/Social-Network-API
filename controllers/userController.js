const { ObjectId } = require('mongoose').Types;
const { Thought } = require('../models/Thought');
const { User } = require('../models/User');

// FUNCTION FOR UPDATING ALL FRIENDS LISTS CONTAINING THE DELETED USER'S ID
const friendFinder = async (id) => {
    // FIND USERS WITH THIS USER ON THEIR FRIEND LIST
    let f = await User.find(
        { friends: id },
        { new: true }
    )

    if (f) {
        for (let i = 0; i < f.length; i++) {
            await User.findOneAndUpdate(
                { friends: id },
                { $pull: { friends: id } },
                { new: true }
            )
        }
    } else {
        return false;
    }

    return true;
}

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
    // UPDATE USER
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user exists with that ID' })
                    : res.json(user)
            )
            .catch((err) => { res.status(500).json(err) })
    },
    // DELETE USER
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user exists with that ID' })
                    // DELETE THE ASSOCIATED THOUGHTS
                    : Thought.deleteMany({ username: user.username })
            )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'User deleted but no thoughts found' })
                    // USE FUNCTION I MADE AT THE TOP OF THIS PAGE TO LOOP THROUGH ALL USERS WITH THE DELETED USER AS A FRIEND AND REMOVE THEM FROM THEIR LISTS
                    : friendFinder(req.params.userId)
                        .then((friends) =>
                            !friends
                                ? res.json({ message: 'User deleted and no matching friends found' })
                                : res.json({ message: 'User deleted and removed from all friends lists' })
                        )
            )
            .catch((err) => { res.status(500).json(err); })
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
                    // ADD THE FRIEND REQUESTER TO THE REQUESTEE'S FRIEND LIST AS WELL
                    : User.findOneAndUpdate(
                        { _id: req.params.friendId },
                        { $addToSet: { friends: req.params.userId } },
                        { new: true }
                    )
                        .then((friends) =>
                            !friends
                                ? res.status(404).json({ message: `Added ${friends.username} to friends but unable to add back.` })
                                : res.json({ message: 'Succesfully added friend' })
                        )
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
                    // REMOVE USER FROM FRIEND'S LIST ALSO
                    : User.findOneAndUpdate(
                        { _id: req.params.friendId },
                        { $pull: { friends: req.params.userId } },
                        { new: true }
                    )
                        .then((friends) =>
                            !friends
                                ? res.status(404).json({ message: `Added ${friends.username} to friends but unable to add back.` })
                                : res.json({ message: 'Succesfully removed friend' })
                        )
            )
            .catch((err) => res.status(500).json(err))
    }
}