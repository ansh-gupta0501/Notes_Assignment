import dotenv from "dotenv/config";

// dotenv.config({
//     path : './.env'
// })

// dotenv.config()



import { User } from "./src/models/user.model.js";
import {testDBConnection} from './src/db/index.js'
import { app } from './src/app.js'

testDBConnection()
.then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`Server is running at port ${process.env.PORT}`)
    })

    app.on("error",(error)=>{
        console.log("Error : ",error);
        throw error 
    })
})
.catch((err)=>{
    console.log("postgress connection failed",err)
})