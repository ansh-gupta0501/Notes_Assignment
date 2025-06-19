import express,{Request,Response} from 'express'
const app = express()

import RootRoute from './routes/root.route'

app.use(express.json())

app.use('/',RootRoute)

app.listen(3000,()=>{console.log('Server is running on port 3000')})


//38:03