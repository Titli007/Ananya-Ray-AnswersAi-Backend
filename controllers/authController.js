const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {blacklistedToken} = require('../middleware/verify')



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


  const logout = (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send("Authorization header missing");
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).send("Bearer token missing");
        }

        // Add the token to the blacklist
        blacklistedToken.add(token);

        res.status(200).send({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
};

  
module.exports = { login, logout };;

