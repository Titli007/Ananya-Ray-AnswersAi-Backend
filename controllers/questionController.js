const Question = require('../models/Question')
const { generateAiAnswer } = require('../utility/langchain')
const User = require('../models/User')

const createQuestion = async(req,res) => {
    try {
        const { question, userId } = req.body;

        const aians = await generateAiAnswer(question)

        console.log("ans from controller", aians)
    
        // Create a new question with the placeholder answer
        const newQuestion = await Question.create({
          question : question,
          answer: aians, // Placeholder answer
          user_id: userId
        });
    
        res.status(201).json(newQuestion);
      } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
      }
}

const getQuestionById = async (req, res) => {
    try {
      const { questionId } = req.params;
  
      // Find the question by questionId
      const question = await Question.findOne({
        where: { id: questionId },
        include: [{ model: User, attributes: ['id', 'email'] }] // Include the associated user
      });
  
      if (!question) {
        res.status(404).send("Question not found");
        return;
      }
  
      res.status(200).json(question);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
  };


module.exports = {
    createQuestion,
    getQuestionById
}