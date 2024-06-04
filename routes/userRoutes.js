const express = require('express')
const router = express.Router()
const { createUser, getUserById, getQuestionByUserId } = require('../controllers/userController')


router.post('/', createUser)

router.get('/:userId', getUserById);
  
router.get('/:userId/questions', getQuestionByUserId);
  
module.exports = router;