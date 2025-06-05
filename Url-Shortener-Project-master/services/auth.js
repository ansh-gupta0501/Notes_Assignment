const jwt = require('jsonwebtoken')
const secret = "an@#sh#"
function setUser(user){

    return jwt.sign({
        email : user.email,
        id : user._id 
    },secret)

}

function getUser(token){
    if(!token) return null                 // if we not use this condition than it says error jwt must be provided 
   
    try {
        return jwt.verify(token,secret)
        
    } catch (error) {
        return null
    }

    
}
module.exports = {
    setUser,
    getUser
}