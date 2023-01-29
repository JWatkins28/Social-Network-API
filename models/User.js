const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

//NEED VIRTUALS: friendCount

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unqiue: true,
            // unique ?? 
            // trimmed ?? 
        },
        email: { 
            type: String,
            required: true,
            // unique ??
            // validate email
        },
        thoughts: [thoughtSchema],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
);



const User = model('user', userSchema);

module.exports = User;