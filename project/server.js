import express from "express"
import "dotenv/config"
const app = express()
const PORT = process.env.PORT || 8000

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/',(req,res)=>{
    return res.json({message: "Hello it is working"})
})

//import routes
import ApiRoutes from './routes/api.js'
app.use('/api',ApiRoutes)

app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))
