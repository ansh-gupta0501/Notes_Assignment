import { Router, Request,Response } from "express"
import BookService from "../services/book.service";
import { BookRequestPayload } from "../request/book.request";
const BookRouter = Router();


// BookRouter.get('/',(req: Request,res: Response)=>{
//     res.send("Welcome to express server with typescript ")
// })

// BookRouter.post('/add', (req : Request, res: Response)=>{
//     res.send("This is book add request")
// })

// // all means all request types can be accepted
// BookRouter.all('/allrequest',(req : Request, res: Response)=>{
//       res.send(" all request types can be accepted ")
// })

// // Route paths string patterns
// //ab*cd means anything between ab cd 
// BookRouter.get('/ab*cd',(req: Request,res: Response)=>{
//     res.send("string patterns")
// })

// // route parameters
// BookRouter.get('/params/:userName/:userId/:bookId',(req: Request,res: Response)=>{
//     console.log(req.params)       // params value will be treated as string
//     res.json(req.params)
// })




BookRouter.get('/findAll',(req: Request,res: Response)=>{
    res.json(BookService.findAllBooks())
})

BookRouter.post('/add',(req: Request,res: Response)=>{
    res.json(BookService.addBook(req.body as BookRequestPayload)) // we are accepting req.body type as bookrequestpayload
})

BookRouter.get('/findById/:id',(req: Request,res: Response)=>{
    res.json(BookService.findBookById(Number(req.params.id))) 
})

BookRouter.delete('/delete/:id',(req: Request,res: Response)=>{
    res.json(BookService.deleteBook(Number(req.params.id))) 
})




export default BookRouter;