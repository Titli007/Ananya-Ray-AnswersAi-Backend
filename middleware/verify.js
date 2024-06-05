const jwt = require('jsonwebtoken')

const blacklistedToken = new Set()

const verify = async(req,res, next) => {
    try{
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            const tokenFromUser = req.headers.authorization.split(" ")[1]
            console.log(blacklistedToken)
            
            if(blacklistedToken.has(tokenFromUser)){
                console.log("token is blacklisted")
                return res.status(401).send("Token is blacklisted");
            }
            else{
                const decode = jwt.verify(tokenFromUser, 'shhhh')
                console.log("in verify function")
                console.log("decode",decode)
                req.user = decode
            }
            
        }
    }
    catch(error){
        console.log(error)
    }

    return next()
}

module.exports = { verify, blacklistedToken }