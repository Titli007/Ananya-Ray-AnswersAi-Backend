const express = require('express');
const router = express.Router();
const { createQuestion, getQuestionById } = require('../controllers/questionController')
const { verify } = require('../middleware/verify')

// Accept user question, and return AI-generated answer
router.post('/', verify, createQuestion);

// Retrieve specific question and answer by question ID
router.get('/:questionId', verify, getQuestionById);

module.exports = router;