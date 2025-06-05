const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true 
    },
    email : {
        type : String ,
        required : true,
        unique : true 
    },
    password : {
        type : String ,
        required : true 
    }
},{timestamps : true})

const user_model = mongoose.model('user',userSchema)

module.exports = {
    user_model
}