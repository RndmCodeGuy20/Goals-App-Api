const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: [true, 'Please add a title value'],
        },
        text: {
            type: String,
            required: [true, 'Please add a text value'],
        },
        status: {
            type: Number,
            required: [true, 'status'],
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Goal', goalSchema);