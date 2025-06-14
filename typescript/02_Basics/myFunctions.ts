// function addTwo(num){

//     num.toUpperCase(); // i am allowed to do this which is wrong 
//     return num + 2;
// }



// addTwo(5)  // here we see function addTwo(num: any): any      , any which is problem in typescript 

// also i was allowed ot pass string 
// addTwo("5")  // it is also wrong 


// so to fix this , 

function addTwo(num : number){
    // num.toUpperCase(); // this will also give error now , as we have defined num as number
    return num + 2;

}
addTwo(5)

// addTwo("5")  // this will give error now , as we have defined num as number



// function getUpper(val){
//     return val.toUpperCase()
// }

// getUpper(4)  // this works but it is wrong , as we are passing number and trying to call toUpperCase on it

function getUpper(val: string){
    return val.toUpperCase()
}

getUpper("ansh")

// so we conclude that in case of variables no need to for infer types of variables, but in case of functions we need to infer types of parameters 


// function signUpUser(name,email,isPaid){}

// signUpUser(1,2,3) // it is wrong 


function signUpUser(name : string,email : string,isPaid : boolean  ){}

signUpUser('ansh','ansh@gmail.com',true)


// arrow function 

// let loginUser = (name: string,email: string,isPaid:boolean)=>{}

// loginUser("h",'h@h.com')  // as it will give error as we need 3 parameters , but can give one default value here 

//giving default value 

let loginUser = (name: string,email: string,isPaid:boolean = false)=>{}

loginUser("h",'h@h.com') // now it will not give error 


// ----------


// function addTwo1(num : number){
   
//     // return num + 2;

//     //now we return string 

//     return "hello"

// }
// let myvalue = addTwo1(5)   // it does not give error as we have not defined return type of function // but it is wrong 


// to fix 

function addTwo1(num : number) : number{      // now we define return type of function as number
    

    //now we return string 

    // return "hello"   // now it give error Type 'string' is not assignable to type 'number'.

    return num + 2;

}
let myvalue = addTwo1(5)



// ----------------------

function getValue(myVal: number){
    if(myVal > 5){
        return true;
    }

    return "200 OK"
}


export {}


