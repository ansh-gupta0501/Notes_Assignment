function greet(name){
    console.log(`Hello ${name}`);
    
}

function greetVishwas(greetfn){ // this greetVishwas is a function which accepts another function greetfn . so this greetfn is called callback function and greetVishwas is higher order function 
    const name = 'vishwas'
    greetfn(name)
}

greetVishwas(greet)


//types of callbacks :- Synchronous and asnynchronous

// Synchronous
//A callback which is executed immediately is called a synchronous callback 
// eg. in above greet is called immediately when control goes inside higher order function 
// another eg. 
let numbers = [1,2,3,4,5,6,7]
numbers.sort((a,b)=> a - b)
numbers.filter(n => n % 2 === 0)
numbers.map(n => n/2) 

// a callback function defines the logic that higher order function needs to apply 


// Asynchronous callbacks 
// A callback that is often used to continue or resume code execution after an asynchronous operation has completed 
// callbacks are used to delay the execution of a function until a particular time or event has occured 
// in node.js have an asynchronous nature to prevent blocking of execution 
// ex. reading data from a file, fetching data from a database or handling a network request 
