const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel')

/**
 * @desc Get Goals
 * @route GET /api/goals
 * @access private
 *
 * @param req
 * @param res
 */
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()
    res.status(200).json({
        goals
    })
})

/**
 * @desc Set Goals
 * @route POST /api/goal
 * @access private
 *
 * @param req
 * @param res
 */
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)

        throw new Error('Please add text in the request')
    }

    const goal = await Goal.create({
        text: req.body.text,
    })
    res.status(200).json(goal)
})

/**
 * @desc Update Goal
 * @route PUT /api/goals/:id
 * @access private
 *
 * @param req
 * @param res
 */
const updateGoal = asyncHandler(async (req, res) => {

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
        updatedGoal)
})

/**
 * @desc Delete Goal
 * @route GET /api/goals/:id
 * @access private
 *
 * @param req
 * @param res
 */
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found!')
    }

    await goal.remove()

    res.status(200).json({
        id: `Deleted Goal ${req.params.id}`
    })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}