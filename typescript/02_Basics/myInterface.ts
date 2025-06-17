// interaces are similar to "types"


/* 
Scenario:- You are creating a new user and this user has some of the properties like email , userID , google login or may be database id 
and you are starting a trial for this user for whatever the services you are selling and also you want to give him some discount code as well 
*/

interface User{
    readonly dbId: number,
    email: string,
    userId: number,
    googleId?: string

    // startTrial: () => string  // we define a method with return type string

    //another way of defing method 
    startTrial(): string  // return type as string

    getCoupon(couponname: string,value: number): number  // here we define another method with parameter couponname which having type string. and return type of this method will be number 
}

/* 
interface is more like a scenario. Interface doesn't have those nitty-gritty and details of how it will work 
but like when you are creating a user these are field which are compulsory, these are the method which are compulsory 
interface is loose form of class , very broad overview. it will force you that there should be a method the name should be same but 
it does not say what should you do inside it just has a basic protocol 
*/



// const ansh: User = {dbId: 22 ,email: "ansh@gmail.com",userId: 2221,
//     startTrial: ()=>{
//         return "trial started"
//         // return 1 // show error Type '() => number' is not assignable to type '() => string'.Type 'number' is not assignable to type 'string'.
//     },
//     getCoupon: (name: "anshgupta10", off: 10)=>{  // we don't need to provide same name of parameter here and in interface // also by default it does not show error if we don't provide any argument to this but we can change this in tsconfig file later 
//         return 10  
//     }
// } // we need to provide all the details including the method we define above 


//interface vs type

// reopening interfaces meaning adding more method to interface 
// we have made an interface User  before , now we need to add more method like github login id , so we can take this interface in another file and define again 

interface User { // allowed we can write User again 
    githubToken : string
}

// so as we haven't make it optional , so need to add it to ansh object 

const ansh: User = {dbId: 22 ,email: "ansh@gmail.com",userId: 2221,
    githubToken: "github",
    startTrial: ()=>{
        return "trial started"
      
    },
    getCoupon: (name: "anshgupta10", off: 10)=>{  // we don't need to provide same name of parameter here and in interface // also by default it does not show error if we don't provide any argument to this but we can change this in tsconfig file later 
        return 10  
    }
} 


// inheritance in interface

interface Admin extends User{
    role: "admin" | "ta" | "learner"
}

const ansh1: Admin = {dbId: 22 ,email: "ansh@gmail.com",userId: 2221,
    role : "admin",     // need to give value out of admin, ta ,learner as we define literal values inside interface admin 
    githubToken: "github",
    startTrial: ()=>{
        return "trial started"
      
    },
    getCoupon: (name: "anshgupta10", off: 10)=>{  // we don't need to provide same name of parameter here and in interface // also by default it does not show error if we don't provide any argument to this but we can change this in tsconfig file later 
        return 10  
    }
}

// we can also inherit multiple interfaces with just comma separator  
// interface Admin extends User, antherInterface{} 




/*
in types , we can also define method, but we can't reopen types . or we can't inherit types by extends keyword, 
to extend types , we do it by intersections like 

type Animal = {
name : string
}

type Bear = Animal & {
honey: boolean
}

function getBear(): Bear {
  return {
    name: "Winnie",
    honey: true
  };
}

const bear = getBear()
bear.name
bear.honey
*/
export {}