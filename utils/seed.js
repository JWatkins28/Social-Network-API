const connection = require('../config/connection')
const { Thought } = require('../models/Thought');
const { User } = require('../models/User');
const { getRandomUser, getRandomThoughts, getRandomEmail, getUsers, removeItem, getEmails } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected to database');

    // DELETE EXISTING USERS/THOUGHTS
    await User.deleteMany({});
    await Thought.deleteMany({});

    // // ARRAYS FOR SEEDED DATA TO USE
    // const users = [];
    // const thoughtList = [];
    // const userlist = getUsers();
    // const emailList = getEmails();
    // let newuserlist = userlist;
    // let newemailList = emailList;

    // // ADD USERS TO "USERS" ARRAY
    // for (let i=0; i<8; i++) {

    //     const username = getRandomUser(newuserlist);

    //     const thoughts = getRandomThoughts(1, username);

    //     newlist = removeItem(newuserlist, username);

    //     const email = getRandomEmail(newemailList);

    //     newemailList = removeItem(newemailList, email);

    //     const friends = [];
    //     for (let i=0; i<1; i++) {
    //         const f = getRandomUser(userlist);
    //         friends.push({f})
    //     }
        
    //     thoughtList.push({thoughts})
    //     users.push({username, email, thoughts, friends});

    // }


    // await Thought.collection.insertMany(thoughtList);

    // await User.collection.insertMany(users);

    console.info('Seeding completed!');

    process.exit(0);
})