const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    shortID :{
        type : String,
        required : true,
        unique : true
    },
    redirectURL : {
        type : String,
        required : true 
    },
    visitedHistory : [
        {
            timestamp : {
                type : Number
            },
            ip_address : {
                type : String
            }
        }
    ],

    createdHistory : {
        
            createdBy : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'users'
            },
            name : {
                type : String, 
                 
            }
        
    }
},{timestamps : true})



const URL = mongoose.model("url",urlSchema)

module.exports = {
    URL
}