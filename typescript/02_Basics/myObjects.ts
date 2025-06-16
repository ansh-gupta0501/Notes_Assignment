// const User = {
//     name: "Ansh",
//     email: "ansh@gmail.com",
//     isActive : true
// }

// function createUser({name: string,isPaid: boolean}){}

// createUser({name: "gupta",isPaid : false})


// function createCourse():{}{   // note :{} is return type and after that {} is defination 
//     return {}     // we return empty object because we set return type as {}
// } 



//also we can write this like 

// function createCourse():{name: string,price: number}{
//     return {name: "reactjs",price: 399}  // but here we need to return object with name and price properties always
// }



// bad behaviour of objects in typescript 

// function createUser({name: string,isPaid: boolean}){}

// createUser({name: "gupta",isPaid : false,email: "a@gmail.com"}) // it shows error Object literal may only specify known properties, and 'email' does not exist in type '{ name: any; isPaid: any; }'


// but the odd behaviour come here is if we define object separately and then pass it to function then it will not show error

// let newUser = {name: "gupta",isPaid : false,email: "a@gmail.com"}
// createUser(newUser) // now here we see it is not showing error and we are able to pass much more information than before 



// --------------------------------------------

// Type Aliases in Typescript 

// type Mystring = string;  // we can create type alias for string // means we can use Mystring instead of string in our code

// this type can be multiused in function or anything else you are defining 

// type User = {
//     name : string;
//     email : string;
//     isActive : boolean;
// }

// function createUser(user: User): User{  // means  the type of user we pass to this is User and also the return type of this function is also User 
//     return {name: "",email : "",isActive: true}
// }

// createUser({name: "",email : "",isActive: true})  // we need to pass object with name, email and isActive properties exists in type User 

// -------------------------------------------------------------

// readonly and optional in typescript 


type User = {
    readonly _id: string;    // now this _id property cannot be changed after creation of object
    name : string;
    email : string;
    isActive : boolean;
    creditcardDetails?: number  // we all know that all users don't have credit card details so we can make it optional by adding ? after property name
} 


let myUser: User = {
    _id : "12345",
    name : "h",
    email : "h@h.com",
    isActive : false
}

myUser.email = 'h@gmail.com'
// myUser._id = 'asa'  // show error Cannot assign to '_id' because it is a read-only property.


// mix match of the types 

type cardNumber = {
    cardnumber: string;
}

type cardDate = {
    carddate : string;
}

type cardDetails = cardNumber & cardDate & {
    cvv : number;
}

// now if we make any object with cardDetials type then it should have cardnumber, carddate and cvv properties
