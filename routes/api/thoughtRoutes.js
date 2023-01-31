const router = require('express').Router();
// IMPORT THOUGHT CONTROLLER FUNCTIONS
const { getThoughts, getOneThought, createThought, deleteThought, updateThought, addReaction, removeReaction } = require('../../controllers/thoughtController')

// ALL THESE ROUTES ARE: /api/thoughts/*

// GET ALL THOUGHTS / CREATE THOUGHT
router.route('/').get(getThoughts).post(createThought)

// GET THOUGHT / UPDATE THOUGHT / DELTE THOUGHT - BY ID
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);

// ADD REACTION TO THOUGHT BY THOUGHT ID
router.route('/:thoughtId/reactions').post(addReaction);

// DELETE REACTION BY THOUGHT AND REACTION ID
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;