const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const {generateHash} = require("../helpers/generateHash");
const {checkHash} = require("../helpers/checkHash");
const {generateToken} = require("../helpers/generateToken");

/**
 * @desc Register new user
 * @route POST /api/users/register
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

    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400);

        throw new Error('User already exists');
    }

    let hashedPassword = await generateHash(password)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: await generateToken(user._id)
        })
    } else {
        res.status(400);

        throw new Error('Invalid User Data');
    }
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

    const {email, password} = req.body;

    const user = await User.findOne({email});


    if (user && (await checkHash(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: await generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid Credentials');
    }
})

/**
 * @desc Get User Data
 * @route GET /api/users/me
 * @access private
 *
 * @param req
 * @param res
 */
const getUser = asyncHandler(async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name,
        email,
    })
})

module.exports = {
    registerUser,
    loginUser,
    getUser
}

