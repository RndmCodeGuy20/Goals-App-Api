// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
// const User = require('../models/userModel')


/**
 * @desc Register new user
 * @route POST /api/users
 * @access public
 *
 * @param req
 * @param res
 */
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    res.json({
        message: "Register User"
    })
})

/**
 * @desc Authenticate existing user
 * @route POST /api/users/login
 * @access public
 *
 * @param req
 * @param res
 */
const loginUser = asyncHandler(async (req, res) => {
    res.json({
        message: "Login User"
    })
})

/**
 * @desc Get User Data
 * @route GET /api/users/me
 * @access public
 *
 * @param req
 * @param res
 */
const getUser = asyncHandler(async (req, res) => {
    res.json({
        message: "Get My Data"
    })
})

module.exports = {
    registerUser,
    loginUser,
    getUser
}