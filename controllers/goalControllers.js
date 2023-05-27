const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');

/**
 * @desc Get Goals
 * @route GET /api/goals
 * @access private
 *
 * @param req
 * @param res
 */
const getGoals = asyncHandler(async (req, res) => {
    let user = req.user.id;
    console.log('called');
    const goals = await Goal.find({user: user},
        {
            _id: 1, user: 1, title: 1, text: 1, createdAt: 1, status: 1
        }
    )
    res.status(200).json(
        goals)
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
    let user = req.user.id;
    const {title, text, status} = req.body;

    if (!title || !text || !status) {
        res.status(400)

        throw new Error('Please add text/title in the request')
    }

    const goal = await Goal.create({
        title: title,
        text: text,
        user: user,
        status: status,
    })
    res.status(200).json(goal);
},)

/**
 * @desc Update Goal
 * @route PUT /api/goals/:id
 * @access private
 *
 * @param req
 * @param res
 */
const updateGoal = asyncHandler(async (req, res) => {
    let userID = req.user.id;
    const goal = await Goal.findById(req.params.id);


    if (!goal) {
        res.status(400)
        throw new Error('Goal not found!')
    }

    const user = await User.findById(userID);

    if (!user) {
        res.status(401)
        throw new Error('User not found');
    }

    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
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
    let userID = req.user.id;
    const goal = await Goal.findById(req.params.id);


    if (!goal) {
        res.status(400)
        throw new Error('Goal not found!')
    }

    const user = await User.findById(userID);

    if (!user) {
        res.status(401)
        throw new Error('User not found');
    }

    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
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
