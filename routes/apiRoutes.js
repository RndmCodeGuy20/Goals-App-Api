const express = require('express');
const {getGoals, setGoal, updateGoal, deleteGoal} = require("../controllers/apiControllers");
const router = express.Router();


router.route('/').get(getGoals).post(setGoal)
router.route('/:id').put(updateGoal).delete(deleteGoal)

// router.get('/', getGoals)
// router.post('/', setGoal)

// router.put('/:id', updateGoal)
// router.delete('/:id', deleteGoal)

module.exports = router