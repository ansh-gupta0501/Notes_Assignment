import express,{Request,Response} from 'express'
const app = express()

import RootRoute from './routes/root.route'
import { loggingMiddleware } from './middlewares/loggingMiddleware'
import { AuthMiddleware } from './middlewares/authMiddleware'

app.use(express.json())
app.use(loggingMiddleware)

app.use(AuthMiddleware)

app.use('/',RootRoute)

app.listen(3000,()=>{console.log('Server is running on port 3000')})


