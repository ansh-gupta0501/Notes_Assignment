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


// in arrow functions 

const getHello = (s: string):string =>{
    return ""
}


// ----------------------

function getValue(myVal: number){

    if(myVal > 5){
        return true;
    }

    return "200 OK"
}  // function getValue(myVal: number): true | "200 OK" // it can be boolean or string . so we need to solve this using union type 


// array 

const heros = ['thor','spiderman','ironman'];

// heros.map(hero => {
//     return `hero is ${hero}`
// })  // it automatically predicts that hero is of type string[] , so we can use it directly without defining type


// const heros = [1,2,3];

// heros.map(hero => {
//     return `hero is ${hero}`
// })  // now it automatically predicts that hero is of type number[] , so we can use it directly without defining type

// so don't need to explicity define its type like 
heros.map((hero: string) => {
    // return `hero is ${hero}`
    return 1;
})  // we see both return types string are number are allowed , not giving error 
// but if we want to define type explicitly then we can do like this
heros.map((hero):string => {
    return `hero is ${hero}`
    // return 1; // now this will give error 
})  // input we can skip as it automatically predicts but return type need to define explicity 


 
// -----------


// function consoleError(errmsg: string){ //function consoleError(errmsg: string): void . the return type showing void because this function is not returning anything 
//     console.log(errmsg)
// }
// but best practice is to define return type as void explicitly

function consoleError(errmsg: string): void{ 
    console.log(errmsg)
    // return 1; // it shows error now 
}


function handleError(errmsg: string): never{ // function handleError(errmsg: string): never . the return type showing never because this function is not returning anything and it will never return anything
    throw new Error(errmsg)
}   // this is similar to void but void meaning returning nothing , but never meaning it will never return anything , so it is used in case of error handling

/*
The never type represents values which are never observed. In a return type, this means that the function throws an exception to terminates execution of the program . 
so we use never whereever we want forcefully terminate the program , like in case of error handling
*/



export {}