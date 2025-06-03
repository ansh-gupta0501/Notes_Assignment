import dotenv from 'dotenv'

// dotenv.config({
//     path : './.env'
// })
dotenv.config()

import {testDBConnection} from './db/index.js'
import { app } from './app.js'


testDBConnection()
.then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log('Server is running at port ')
    })

    app.on("error",(error)=>{
        console.log("Error : ",error);
        throw error 
    })
})
.catch((err)=>{
    console.log("postgress connection failed",err)
})