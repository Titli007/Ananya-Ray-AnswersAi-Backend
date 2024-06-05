const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Question = require('../models/Question')

const createUser = async (req,res) => {
    try{
        const {name, email,pass} = req.body
        if(name === '' && email==='' && pass===''){
            res.status(400).send("insufficient data")
        }
        // const existingUser = await User.findOne({ where : {email} });
        // if(existingUser){
        //     res.status(400).send("user already exists")
        // }

        const encPass = await bcrypt.hash(pass,10)

        const newUser = await User.create({
            name,
            email,
            password: encPass
        });

        const token = jwt.sign(
            {
                user_id : newUser.id,
                email : newUser.email
            },
            'shhhh',
            {
                expiresIn: '2h'
            }
        )

        newUser.pass = undefined

        res.status(200).send({success : 'true' , token: token, user: newUser})

    }
    catch(error){
        console.log(error)
        res.status(500).send('internal server error')
    }
    
}


const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user by userId
        const user = await User.findOne({
        where: { id: userId },
        attributes: { exclude: ['password'] } // Exclude the password field from the response
        });

        if (!user) {
        res.status(404).send("User not found");
        return;
        }

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
};


const getQuestionByUserId = async(req,res) => {
    try {
        const { userId } = req.params;
    
        // Find the user by userId
        const user = await User.findOne({
          where: { id: userId },
          attributes: ['id', 'email']
        });
    
        if (!user) {
          res.status(404).send("User not found");
          return;
        }
    
        // Find all questions asked by the user
        const questions = await Question.findAll({
          where: { user_id: userId }
        });
    
        res.status(200).json({ user, questions });
      } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
      }
}



module.exports = {
    createUser,
    getUserById,
    getQuestionByUserId
}