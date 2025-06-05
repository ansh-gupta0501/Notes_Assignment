const {user_model} = require('../models/user')
const {setUser} = require('../services/auth')
const handleCreateUser = async (req,res) =>{
    const {name,email,password} = req.body
    await user_model.create({
        name,
        email,
        password
    })

    return res.redirect('/')
}
const handleLoginUser = async (req,res)=>{
    console.log("here user comes in actual login function ")
    const {email,password} = req.body

    const user = await user_model.findOne({email,password})
    console.log("user is ",user)
    if(!user) return res.render('login',{
        errormsg : "invalid user "
    })

    
   const token = setUser(user)

//    console.log("token is ",token )
   res.cookie('uid',token)
          

//    in case of mobile applications , no cookies 
    // res.json(token)

          
    return res.redirect('/')
}
                                                                                                        
module.exports = {
    handleCreateUser,
    handleLoginUser
}