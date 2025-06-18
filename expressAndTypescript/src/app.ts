import express,{Request,Response} from 'express'
const app = express()

// controllers routes

app.get('/',(req: Request,res: Response)=>{
    res.send("Welcome to express server with typescript ")
})

app.listen(3000,()=>{console.log('Server is running on port 3000')})