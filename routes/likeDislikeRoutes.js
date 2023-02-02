const express = require('express');
const {likeGoal, dislikeGoal} = require("../controllers/likeDislikeController");
const router = express.Router();


router.route('/:id').post(likeGoal).delete(dislikeGoal)

// router.get('/', getGoals)
// router.post('/', setGoal)

// router.put('/:id', updateGoal)
// router.delete('/:id', deleteGoal)

module.exports = router