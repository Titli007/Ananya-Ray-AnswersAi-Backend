const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// const signIn = async (req,res) => {
//     try{
//         const {email,pass} = req.body
//         if(email==='' && pass===''){
//             res.status(400).send("insufficient data")
//         }
//         const existingUser = await User.findOne({ where : {email} });
//         if(existingUser){
//             res.status(400).send("user already exists")
//         }

//         const encPass = await bcrypt.hash(pass,10)

//         const newUser = await User.create({
//             email,
//             password: encPass
//         });

//         const token = jwt.sign(
//             {
//                 user_id : newUser._id,
//                 email : newUser.email
//             },
//             'shhhh',
//             {
//                 expiresIn: '2h'
//             }
//         )

//         newUser.pass = undefined

//         res.status(200).send({success : 'true' , token: token, user: newUser})

//     }
//     catch(error){
//         console.log(error)
//         res.status(500).send('internal server error')
//     }
    
// }


const login = async (req, res) => {
    try {
      const { email, pass } = req.body;
      if (email === '' || pass === '') {
        res.status(400).send("Insufficient data");
        return;
      }
      const existingUser = await User.findOne({ where: { email } });
      if (!existingUser) {
        res.status(404).send("User not found");
        return;
      }
  
      const isPasswordValid = await bcrypt.compare(pass, existingUser.password);
      if (!isPasswordValid) {
        res.status(401).send("Invalid password");
        return;
      }
  
      const token = jwt.sign(
        {
          user_id: existingUser.id,
          email: existingUser.email
        },
        'shhhh',
        {
          expiresIn: '1h'
        }
      );
  
      res.status(200).send({ success: true, token: token, user: existingUser });
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
  };


module.exports = {
    login
}