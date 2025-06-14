let greetings: string = "Hello Ansh "
console.log(greetings)

// now we define it always a string , if an another programmer tries to assign it a number then it will give an error
// greetings = 10 // Type 'number' is not assignable to type 'string'.ts(2322) let greetings: string


// let myNum = 6
// myNum.toUpperCase() // get error Property 'toUpperCase' does not exist on type 'number'.ts(2339)

// sometimes we don't even need to just use this colon : to define the type of the variable . It automatically infers the value and stops you doing mischiefs like adding a number to greetings  


/* 
we got this error when we convert this ts file to js file after tsc command Cannot redeclare block-scoped variable 'greetings'.ts(2451)

use export {} to remove the error temporarily


*/

// -------------------------------------

// Number 

// let userId: number = 334455
// let userId: number = 334455.36  // stills a number 


  

//boolean 

let isloggedIn: boolean = false 



// type inference  

// if we immediately assigning a value to a variable, we can skip the type annotation. typescript automatically infers the type based on the value assigned.

let userId = 334455.36 // type inference, no need to define the type here
   
// userId = 'hlo' // this still give error Type 'string' is not assignable to type 'number'.


// --------------------------------------

// any 

// let hero;           // we don't have any idea whether this variable will be a string or number or boolean or anything else. So we can use any type here.  

let hero : string;

function getHero(){
    // return 'thor' // we can return anything here if we don't use any type 
    // return true // it will give an error if we now pass boolean as we define hero as string 

    return 'thor'

    // it is not the good case 
}

hero = getHero()   // we see this is infered as  type (let hero: any)
 
// so in such situations where the typescript cannot find out what value if going to come up later on in the future it puts that as any which is a kind of a get away from doing the things

// any is not any data type , it just tells typescript to not to check the type of the variable and just let it be anything. 
// you usually want to avoid this, though, because any isn't type-checked. Use the compiler flag **noImplicitAny** to flag any implicit any as an error 
// means we can set up in tsconfig file as noImplicitAny: true and it will give an error if we use any type in the code.