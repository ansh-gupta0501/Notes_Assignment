const {URL} = require('../models/url')
const shortid = require('shortid')

async function createShortId(req,res){
    const body = req.body
    if(!body.url) return res.status(400).json({msg : " url is required"})
    const short_id = shortid()

    const result = await URL.create({
        shortID : short_id,
        redirectURL : body.url,
        visitedHistory : [],
        createdHistory : {
            createdBy : req.user.id ,       // in this we use that id variable we define in token
            name : req.user.email      // this name won't come we don't put name in token , req.user only token value comes , but this is not in case of user , so in this case we pass email in name object 
          
        }
    })
 
    console.log("result is ",result)
    
    return res.render('home1',{
        id : short_id
    })
}

async function redirecttooriginal(req,res){
    const shortID = req.params.id      // note here shortID use only that variable you used in your schema
                                       
    const entry = await URL.findOneAndUpdate({shortID},{  // or we can do like this ({shortID : shortttid}) if you have const shortttid = req.params.id    means we have to match only key in schema in findone function 
        $push : {
            visitedHistory : {
                timestamp : Date.now(),
                ip_address : req.ip
            },
        },
    }
    )
    
     res.redirect(entry.redirectURL)
}

async function getanalytics(req,res){
    const shortID = req.params.id
    const result = await URL.findOne({shortID})
    return res.json({totalClicks : result.visitedHistory.length , analytics : result.visitedHistory})

}



module.exports = {
    createShortId,
    redirecttooriginal,
    getanalytics,
    // ejstemplate
}