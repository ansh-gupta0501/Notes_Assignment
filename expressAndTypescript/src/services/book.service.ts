// in this we write business login 

import { BookEntity } from "../entities/book.entity";
import BookMapper from "../mappers/book.mapper";
import BookRepo from "../repositories/book.repo";
import { BookRequestPayload } from "../request/book.request";
import { BookResponse } from "../response/book.response";

export default class BookService{
    // add book
    // requestPayload is client side parameters
    public static addBook(requestPayload: BookRequestPayload ){

        // now we don't directly add requestpayload to bookrepo because we need to add same fields so for this we make a mapper 

        BookRepo.addBook(BookMapper.requestToEntityMapper(requestPayload))
        return "success"
    }


    // delete book
    public static deleteBook(id : number){

        BookRepo.deleteBook(id)
        return "success"
    }



    // find all books
    public static findAllBooks(){

        // in findallbooks , we don't want to show the purchase price of the book to client , so we have to make sturcture of response in response folder 
        let data : BookResponse[]= BookRepo.findAllBooks().map((book)=>{
            return BookMapper.entityToResponseMapper(book)
        })
        
        return data
    }

    // find book by id 

    public static findBookById(id: number){

       let bookResponse = BookMapper.entityToResponseMapper(BookRepo.findBookById(id))
        
        return bookResponse
    }

}