const users = [
    'jwatkins',
    'user123',
    'coolguy69',
    'animefan4',
    'bigchungus1',
    'bigboi22',
    'frederick666',
    'matr1xlover'
]

const emails = [
    'justin@gmail.com',
    'test123@yahoo.com',
    'freddurst15@aol.com',
    'joemama69@gmail.com',
    'randomkek@outlook.com',
    'birdsarentreal@aol.com',
    'whoawhattheheck@yahoo.com',
    'outofideas@google.net'
]

const thoughts = [
    'this is a thought',
    'what ever will we do with all this information?',
    'I sure hope no one sees how small my hands are',
    'is anyone there?',
    'holy cow did you guys see that!?!',
    'random thoughts go here',
    'whatever happens I dont care!',
    'im running out of ideas here',
    'just a few more',
    'blah blah blah blah'
]

const reactions = [
    'I have to do more of these?',
    'haha what a silly thought',
    'this is bad and you should feel bad',
    'entering the code zone',
    'I agree, people just dont understand',
    'time to grow myself',
    'oh yeah? name 5 of their albums then',
    'im also out of ideas here',
    'what should I do then?',
    'I have to do more of these?',
    'haha what a silly thought',
    'this is bad and you should feel bad',
    'entering the code zone',
    'I agree, people just dont understand',
    'time to grow myself',
    'oh yeah? name 5 of their albums then',
    'im also out of ideas here',
    'what should I do then?'
]

// FUNCTION FOR GETTING A RANDOM ITEM FROM ARRAY
const getRandom = (a) => a[Math.floor(Math.random() * a.length)];

// GET RANDOM USER
const getRandomUser = (a) => getRandom(a);

// GET USER LIST
const getUsers = () => users;

// GET EMAIL LIST
const getEmails = () => emails;

// GET RANDOM EMAIL
const getRandomEmail = (a) => getRandom(a);

// REMOVE INDEX ITEM FUNCTION
const removeItem = (a, b) => {
    let n = a.indexOf(b)
    let c = a.splice(n, 1)
    return a;
}

// GET RANDOM REACTIONS
const getRandomReactions = (a) => {
    const array = [];
    for (let i = 0; i < a; i ++) {
        array.push({
            reactionBody: getRandom(reactions),
            username: getRandomUser(users),
        })
    }
    return array;
};

// FUNCTION TO ADD RANDOM THOUGHTS TO USER
const getRandomThoughts = (a,b) => {
    const array = [];
    for (let i = 0; i < a; i++) {
        array.push({
            thoughtText: getRandom(thoughts),
            username: b,
            reactions: getRandomReactions(5)
        })
    }
    return array;
};

module.exports = { getRandomUser, getRandomThoughts, getRandomEmail, getUsers, removeItem, getEmails }