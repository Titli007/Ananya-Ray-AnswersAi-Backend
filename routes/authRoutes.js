const express = require('express')
const router = express.Router()
const {login} = require('../controllers/authController')



router.post('/login',login)

router.post('/logout',(req,res)=>{
    const {email, pass} = req.body
})

module.exports = router