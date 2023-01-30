const router = require('express').Router();
// IMPORT THOUGHT CONTROLLER FUNCTIONS
const { getThoughts, getOneThought, createThought, deleteThought, updateThought } = require('../../controllers/thoughtController')

// ALL THESE ROUTES ARE: /api/thoughts/*

// GET ALL THOUGHTS / CREATE THOUGHT
router.route('/').get(getThoughts).post(createThought)

// GET THOUGHT / UPDATE THOUGHT / DELTE THOUGHT - BY ID
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);

module.exports = router;