const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');


const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization &&
        req.headers.authorization.startsWith(`Bearer`)) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decodedToken.id).select(`-password`)

            next()
        } catch (err) {
            console.log(err);
            res.status(401);
            throw new Error('Not Authorized');
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token given.')
    }
})

module.exports = {protect}