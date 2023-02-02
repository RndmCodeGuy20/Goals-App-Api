const express = require('express');
const {registerUser, loginUser, getUser} = require('../controllers/userController')
const router = express.Router();
const {protect} = require('../middleware/auth.middleware');

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getUser)


module.exports = router