const express = require('express');
const router = express.Router();
const { createQuestion, getQuestionById } = require('../controllers/questionController')

// Accept user question, and return AI-generated answer
router.post('/', createQuestion);

// Retrieve specific question and answer by question ID
router.get('/:questionId', getQuestionById);

module.exports = router;