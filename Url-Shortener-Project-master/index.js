const express = require('express')
const app = express()
const PORT = process.env.PORT | 8001
const urlRouter = require('./routes/url')
const userRouter = require('./routes/user')
const {restrictTologgedinuser,checkAuth} = require('./middlewares/auth')
const {connectToMongoDb} = require('./connect')
const path = require('path')
const cookieParser = require('cookie-parser')
const staticRoute = require('./routes/staticRouter') 
 
app.set("views",path.resolve("./views")) 
app.set("view engine","ejs")


connectToMongoDb('mongodb://127.0.0.1:27017/reviseshorturlwithtokensandmobiles')
.then(()=>console.log("mongodb connected"))
.catch((err)=>console.log("error "))


app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(cookieParser())


app.use('/',checkAuth,staticRoute)
app.use('/url',restrictTologgedinuser,urlRouter)
app.use('/user',userRouter)


app.listen(PORT , ()=>console.log(`server started at port ${PORT}`))