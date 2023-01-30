const router = require('express').Router();
const userRoutes = require('./userRoutes');

router.user('/users', userRoutes);

module.exports = router;