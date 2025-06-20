// this is for like database logic

import { BookEntity } from "../entities/book.entity";

export default class BookRepo {
    public static data : BookEntity[] = []

    public static findAllBooks(){
        return this.data
    }

    public static findBookById(id : number){
        return this.data.filter((book)=>{
            return book.id === id
        })[0] // as will will be return array and in this array we will have only 1 book , so first element we get 
    }

    public static deleteBook(id : number){
         this.data = this.data.filter((book)=>{
            return book.id !== id
        })
    }

    public static addBook(book : BookEntity){
        this.data.push(book)
    }

    
}