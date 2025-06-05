const {getUser} = require('../services/auth')
function restrictTologgedinuser(req,res,next){
    const token = req.cookies?.uid

    if(!token) return res.redirect('/login')

    const user = getUser(token) 
    if(!user) return res.redirect('/login')

    req.user = user  
    console.log('middleware user is ',user)       // in this only token parmeters will come means only email and id of user will come not completer user 
    next()

    
    // in case of mobile phones 
    // const useruid = req.headers['authorization']
    // console.log("useduid",useruid)


    // const token = useruid.split('Bearer ')[1]
    // console.log('token is ',token)

    // if(!token) return res.redirect('/login')

    // const user = getUser(token)

    // if(!user) return res.redirect('/login')

    // req.user = user  
    // console.log('middleware user is ',user)      
    // next()


}   

function checkAuth(req,res,next){
    console.log("we are in checkAuth function before going to url router function ")
    console.log("req.url is ",req.url)
    const token = req.cookies?.uid 
    console.log("token is ",token)
    const user = getUser(token)
    console.log("user is ",user)

    
    req.user = user 

    next()

    // in case of mobile applications 

    // console.log("we are in checkAuth function before going to url router function ")
    // console.log("req.url is ",req.url)
    // const useruid = req.headers?.['authorization']
    // console.log("useruid in middleware is ",useruid)
    // if(!useruid) return next()
    // const token = useruid.split('Bearer ')[1]
    // console.log("token is ",token)
    // const user = getUser(token)
    // console.log("user is ",user)

    // req.user = user 

    // next()
}

module.exports = {
    restrictTologgedinuser,
    checkAuth
}