import express from 'express';
import dotenv from 'dotenv/config'
import productRoutes from './routes/product.js';
const app = express();
import { testDBConnection } from './db/index.js';


app.use(express.json());


app.use('/api', productRoutes);

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




