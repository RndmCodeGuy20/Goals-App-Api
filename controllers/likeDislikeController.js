const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalLModel')

/**
 * @desc Update Goal
 * @route PUT /api/goals/:id
 * @access private
 *
 * @param req
 * @param res
 */
const likeGoal = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found!')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )

    res.status(200).json(
        updatedGoal
    )
})

/**
 * @desc Update Goal
 * @route PUT /api/goals/:id
 * @access private
 *
 * @param req
 * @param res
 */
const dislikeGoal = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found!')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )

    res.status(200).json(
        updatedGoal
    )
})

module.exports = {
    likeGoal,
    dislikeGoal
}