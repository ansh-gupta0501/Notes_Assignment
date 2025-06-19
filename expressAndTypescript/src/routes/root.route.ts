// root routes all the resource
import {Router} from 'express'
const RootRoute = Router()

import BookRouter from './book.route'

RootRoute.use('/book',BookRouter)

export default RootRoute