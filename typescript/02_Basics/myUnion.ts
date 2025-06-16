// union allows you to be into a situation where you are not pretty sure what type of data is going to come in it might be.
// It might be a number , it might be a string.
// Now instead of using any , it is highly recommended to use Union type. 
// Union is like a combination of two or three or more types of data that you can include into a variale or an array 

let score: number | string | boolean = 33

score = 44 // allowed , score can be number
score = "55"  // allowed , score can be string 
score = true // allowed , score can be boolean


type User = {
    name : string;
    id: number;
}


type Admin = {
    username : string;
    id: number;
}

// we have defined two types user and admin , like we have built in types string , number 

let ansh : User | Admin = {
    name: "Ansh ",
    id: 334
}

ansh = {
    username : "gupta",
    id : 334
}

// these are totally allowed as first we define variable with types either user or admin . and after that we redifine the variable with admin type. 


// function getDbId(id: number | string){
//     // making  some api calls 
//     console.log(`db id is : ${id}`)
// }

// getDbId(3) // allowed 
// getDbId("3") // allowed


function getDbId(id: number | string){

    // id.toLowerCase() // it shows error because toLowerCase is not available on number type . Property 'toLowerCase' does not exist on type 'string | number'. Property 'toLowerCase' does not exist on type 'number'
                    // means typescript does not take id as number , it does not take id as string . it takes id as new data type called number or string 

    // so we can use if to verify the type 

    if (typeof id === "string") {
        id.toLowerCase() // now it is totally string . (parameter) id: string
    }

    if(typeof id === "number"){
        id + 2;  // now it it totally number (parameter)) id: number
    }


}


// -------------------------------------------

// array 

// const data: number[] = [1,2,3,"4"] // now it shows error Type 'string' is not assignable to type 'number'.
// const data: string[] = [1,2,3,"4"] // now it shows error Type 'number' is not assignable to type 'string'.


const data2: string[] | number[] = [1,2,3]   // this means that either all the numbers in the array or either all the strings in the array 
const data3: string[] | number[] = ["1","2","3"] // it does not means mix match of the numbers or string 

// const data4: string[] | number[] = ["1","2",3] // shows error 


// to define mix match 

const data4 : (string | number)[] = ["1","2",3]
// we can also use any 

const data5 : any[] = ["1","2",3]

// but we don't do these 

// ----------------------------

// defining fixed values 

let pi: 3.14 = 3.14 
// pi = 3.145 // can't change value 


let seatAllotment : "aisle" | "middle" | "window"

seatAllotment = "aisle" // ok
// seatAllotment = "crew" // shows error 



export {}
