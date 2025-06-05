const express = require('express')
const router = express.Router()
const {URL} = require('../models/url') 
router.get('/',async(req,res)=>{
    if(!req.user) return res.redirect('/login')
        console.log("req.user is ",req.user)
    const allUrls = await URL.find({'createdHistory.createdBy' : req.user.id})
    
    console.log("allUrls",allUrls)
    
    return res.render("home1",{
        urls : allUrls
    })
})

router.get('/login',(req,res)=>{
    console.log("here is login page ")
    res.render('login')
})

router.get('/signup',(req,res)=>{
    res.render('signup')
})
module.exports = router