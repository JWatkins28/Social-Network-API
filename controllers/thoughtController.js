const { User, Thought } = require('../models');

module.exports = {
    // GET ALL THOUGHTS
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // GET ONE THOUGHT
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought exists with this ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // CREATE A THOUGHT
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => {
                return res.status(500).json(err);
            });
    },
    // DELETE A THOUGHT
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought exists with this ID' })
                    : User.deleteMany({ _id: { $in: thought.user } })
            )
            .then(() => res.json({ message: 'Thoughts deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    // UPDATE A THOUGHT
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought exists with this ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    }
};