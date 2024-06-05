const Question = require('../models/Question')
const { generateAiAnswer } = require('../utility/langchain')
const User = require('../models/User')


const createQuestion = async (req, res) => {
  try {
    const user = req.user;

    const existingUser = await User.findOne({
      where: { id: user.user_id },
    });

    if (!existingUser) {
      return res.status(404).json('No user found');
    }

    const user_id = existingUser.id;
    const { question } = req.body;

    let aians;
    try {
      aians = await generateAiAnswer(question);
    } catch (error) {
      console.error('Error generating AI answer:', error);
      return res.status(500).send('Error generating AI answer');
    }

    console.log("Answer from controller:", aians);

    const newQuestion = await Question.create({
      question: question,
      answer: aians,
      user_id: user_id
    });

    res.status(201).json(newQuestion);
  } catch (error) {
    console.error('Error in createQuestion:', error);
    res.status(500).send('Internal server error');
  }
};


const getQuestionById = async (req, res) => {
  try {
    const { questionId } = req.params;
    const user = req.user;

    const existingUser = await User.findOne({
      where: { id: user.user_id },
    });

    if (!existingUser) {
      return res.status(404).json('No user found');
    }

    const question = await Question.findOne({
      where: { id: questionId, user_id: existingUser.id },
      include: [{ model: User, attributes: ['id', 'email'] }]
    });

    if (!question) {
      return res.status(404).send("Question not found");
    }

    res.status(200).json(question);
  } catch (error) {
    console.error('Error in getQuestionById:', error);
    res.status(500).send('Internal server error');
  }
};



module.exports = {
    createQuestion,
    getQuestionById
}

