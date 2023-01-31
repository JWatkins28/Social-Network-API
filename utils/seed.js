const connection = require('../config/connection')
const { Thought } = require('../models/Thought');
const { User } = require('../models/User');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected to database');

    // DELETE EXISTING USERS/THOUGHTS
    await User.deleteMany({});
    await Thought.deleteMany({});


    console.info('Seeding completed!');

    process.exit(0);
})