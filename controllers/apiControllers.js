const asyncHandler = require('express-async-handler');

/**
 * @desc Get Goals
 * @route GET /api/goals
 * @access private
 *
 * @param req
 * @param res
 */
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Get Goals"
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
    res.status(200).json({
        message: "Set Goals"
    })
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
    res.status(200).json({
        message: `Update Goal ${req.params.id}`
    })
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
    res.status(200).json({
        message: `Delete Goal ${req.params.id}`
    })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}