const mongoose = require('mongoose');

const goalWithLikesSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        text: {
            type: String,
            required: [true, 'Please add a text value'],
        },
        likes: {
            type: Number,
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('GoalWLikes', goalWithLikesSchema);