import { NextFunction,Request,Response } from "express";


export interface User{
    username: string
    password: string 
    age : number
}

//dummy data
const users : User[] = [
    {username: "ansh",password: "ansh",age: 22},
    {username: "gupta",password: "gupta",age: 22},
    {username: "systumm",password: "systumm",age: 22},
    
]
export const AuthMiddleware = (req: Request,res: Response,next: NextFunction)=>{
    const username = req.body.username 
    const password = req.body.password 

    if(username === undefined){
        res.send("not allowed")
    }
    const user = users.find((userObj)=>{
        return userObj.username === username
    })

    if(user && password === user.password){
        next()
    }
    else{
        res.send("invalid credentials")
    }

    


}