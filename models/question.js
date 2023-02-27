const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
    // upvotes: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }],
    // upvotesCount: {
    //     type: Number,
    //     default: 0
    // },
    // downvotes: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }],
    // downvotesCount: {
    //     type: Number,
    //     default: 0
    // }
}, {
    timestamps: true
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;