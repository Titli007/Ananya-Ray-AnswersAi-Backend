const jwt = require('jsonwebtoken')

const verify = async(req,res, next) => {
    try{
        if(req.headers.authorization.startsWith('Bearer')){
            const tokenFromUser = req.headers.authorization.split(" ")[1]
            const decode = jwt.verify(tokenFromUser, 'shhhh')
            console.log(decode)
            req.user = decode
        }
    }
    catch(error){
        console.log(error)
    }

    return next()
}

module.exports = { verify }