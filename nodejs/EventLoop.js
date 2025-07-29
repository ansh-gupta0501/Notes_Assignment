// Async code execution 

// Jacascript is a synchronous , blocking , single-threaded language 
// to make async programming language , we use libuv library 

// we have v8 engine combining of memory heap and call stack 

// whenever you declare variables or functions , memory is allocated on the heap
//  whenever you execute code , functions are pushed into the call stack and when the function returns it is popped off the call stack 

// also we have libuv , whenever you execute async method it is offloaded to libuv . Libuv will then run the task using native async mechanisms of the os and if that if not possible , it will utilize its thread pool to run the task ensuring the main thread is not blocked 

// Few Questions 
// Whenever an async task completes in libuv, at what point does node decide to run the associated callback function on the call stack ?
// What about async methods like setTimeout and setInterval which also delay the execution of a calback function ?
// If two async tasks such as setTimeout and readFile complete at the same time , how does node decide which callback function to run first on the call stack ?

// for all these there is Event Loop 

// Event Loop 
// - It is a C program and is part of libuv
// - A design pattern that orchestrates or co-ordinates the execution of synchronous and asynchronous code in Node.js 


// timer queue :- setTimeout/setInterval callbacks -----> I/O queue :- I/O callbacks like fs , http module  -----> check queue:- setImmediate callbacks -----> close queue:- close handlers
// all these are part of libuv 
// but there are more  which are not part of libuv 
// microtask queue in which we have two queues nextTick queue :- process.nextTick callbacks and promise queue :- promise callbacks 


//priority orer 
// user written synchronous javascript code takes prioriy over async code that the runtime would like to execute which means only after the callstack is empty , the event loop comes into the picture 

//1. Any callbacks in the micro task queues are executed. First tasks in the nextTick queue and only then tasks in the promise queue 
//2. All callbacks within the timer queue are executed 
//3. Callbacks in the micro task queues if present are executed. Again , first tasks in the nextTick queue and then tasks in the promise queue 
//4. all callbacks withing the i/o queues are executed 
//5. Callbacks in the micro task queues if present are executed. nextTick queue followed by promise queue. 
//6. All callbacks in the check queue are execurted
//7. Callbacks in the micro task queues if present are executed. nextTick queue followed by promise queue. 
//8. All callbacks in the close queue are executed
//9. For one final time in the same loop , the micro task queues are executed . nextTick queue followed by promise queue. 

// At this point, if there are more callbacks to be processed, the loop is kept alive for one more run and the same steps are repeated 
// On the other hand, if all callbacks are executed and there is no more code to process, the event loop exits.

// answers:-

// Whenever an async task completes in libuv, at what point does node decide to run the associated callback function on the call stack ?
// Ans:- Callback functions are executed only when the call stack is empth. The normal flow of execution will not be interrupted to run a callback function. 
// What about async methods like setTimeout and setInterval which also delay the execution of a calback function ?
// Ans:- They are given first priority 
// If two async tasks such as setTimeout and readFile complete at the same time , how does node decide which callback function to run first on the call stack ?
// Ans:- Timer callbacks are executed before I/O callbacks even if both are ready at the exact same time 


// ----------------------------

// experiments for these queue 

// Microtask queues 

// console.log('log 1');

// // nextTick queue 
// process.nextTick(()=>{
//     console.log('this is process.nextTIck 1')
// })

// console.log('log 2');

// // promise queue
// Promise.resolve().then(()=>{
//     console.log('This is the promise.resolve');
    
// })

/*
output :- 
log 1
log 2
this is process.nextTIck 1
This is the promise.resolve
*/


// -----------

// Promise.resolve().then(()=>{console.log('This is promise.resolve 1')})
// process.nextTick(()=>{console.log('THis is the process.nextTick 1')})
// output :-
// THis is the process.nextTick 1
// This is promise.resolve 1


// -----
// process.nextTick(()=>{console.log('THis is the process.nextTick 1')})
// process.nextTick(()=>{
//     console.log('THis is the process.nextTick 2')
//     process.nextTick(()=>{
//         console.log('This is inner nextTick inside next Tick 2')
//     })
// })
// process.nextTick(()=>{console.log('THis is the process.nextTick 3')})

// Promise.resolve().then(()=>{console.log('This is promise.resolve 1')})
// Promise.resolve().then(()=>{
//     console.log('This is promise.resolve 2')
//      process.nextTick(()=>{
//         console.log('This is inner nextTick inside promise.resolve 2')
//     })
// })
// Promise.resolve().then(()=>{console.log('This is promise.resolve 3')})

/*
output :- 
THis is the process.nextTick 1
THis is the process.nextTick 2
THis is the process.nextTick 3
This is inner nextTick inside next Tick 2
This is promise.resolve 1
This is promise.resolve 2
This is promise.resolve 3
This is inner nextTick inside promise.resolve 2
*/

// --------------------------------------

// Timer queue
//setTimeOut(()=>{})

// setTimeout(()=>console.log('This is setTimeOut 1'),0)
// setTimeout(()=>console.log('This is setTimeOut 2'),0)
// setTimeout(()=>console.log('This is setTimeOut 3'),0)

// process.nextTick(()=>{console.log('THis is the process.nextTick 1')})
// process.nextTick(()=>{
//     console.log('THis is the process.nextTick 2')
//     process.nextTick(()=>{
//         console.log('This is inner nextTick inside next Tick 2')
//     })
// })
// process.nextTick(()=>{console.log('THis is the process.nextTick 3')})

// Promise.resolve().then(()=>{console.log('This is promise.resolve 1')})
// Promise.resolve().then(()=>{
//     console.log('This is promise.resolve 2')
//      process.nextTick(()=>{
//         console.log('This is inner nextTick inside promise.resolve 2')
//     })
// })
// Promise.resolve().then(()=>{console.log('This is promise.resolve 3')})

/*
output :- 
THis is the process.nextTick 1
THis is the process.nextTick 2
THis is the process.nextTick 3
This is inner nextTick inside next Tick 2
This is promise.resolve 1
This is promise.resolve 2
This is promise.resolve 3
This is inner nextTick inside promise.resolve 2
This is setTimeOut 1
This is setTimeOut 2
This is setTimeOut 3
*/
// because callbacks in the microtask queues are executed before callbacks in the timer queue 


// ---------
// setTimeout(()=>console.log('This is setTimeOut 1'),0)
// setTimeout(()=>{
//     console.log('This is setTimeOut 2')
//     process.nextTick(()=>{
//         console.log('This is inner nextTick inside setTimeout 2')
//     })
// },0)
// setTimeout(()=>console.log('This is setTimeOut 3'),0)

// process.nextTick(()=>{console.log('THis is the process.nextTick 1')})
// process.nextTick(()=>{
//     console.log('THis is the process.nextTick 2')
//     process.nextTick(()=>{
//         console.log('This is inner nextTick inside next Tick 2')
//     })
// })
// process.nextTick(()=>{console.log('THis is the process.nextTick 3')})

// Promise.resolve().then(()=>{console.log('This is promise.resolve 1')})
// Promise.resolve().then(()=>{
//     console.log('This is promise.resolve 2')
//      process.nextTick(()=>{
//         console.log('This is inner nextTick inside promise.resolve 2')
//     })
// })
// Promise.resolve().then(()=>{console.log('This is promise.resolve 3')})

/*
output :- 
THis is the process.nextTick 1
THis is the process.nextTick 2
THis is the process.nextTick 3
This is inner nextTick inside next Tick 2
This is promise.resolve 1
This is promise.resolve 2
This is promise.resolve 3
This is inner nextTick inside promise.resolve 2
This is setTimeOut 1
This is setTimeOut 2
This is inner nextTick inside setTimeout 2
This is setTimeOut 3
*/

// because callbacks in microtask queues are executed in between the executin of callbacks in the timer queue



// -------------------------------

// I/O polling 

// - Most of the async methods from the build-in modules queue the callback function in the I/O queue 

// fs.readFile()

// const fs = require('fs')

// fs.readFile(__filename,()=>{
//     console.log('this is readFile 1');
    
// })


// process.nextTick(()=>{console.log('THis is the process.nextTick 1')})
// Promise.resolve().then(()=>{console.log('This is promise.resolve 1')})

/*
output:-
THis is the process.nextTick 1
This is promise.resolve 1
this is readFile 1
*/
//because callbacks in the microtask queue are executed before callbacks in the I/O queue

// ----

// const fs = require('fs')

// setTimeout(()=>{
//     console.log('setTimeout 1');
    
// },0)

// fs.readFile(__filename,()=>{
//     console.log('this is readFile 1');
    
// })

/*
when running this code we get inconsistent result as sometimes we get 
setTimeout 1
this is readFile 1
but sometimes we get 
this is readFile 1
setTimeout 1
*/
// because when running setTimeout with delay 0ms and an I/O async method,, the order of execution can never be guaranteed 



// -------------------------
// const fs = require('fs')

// fs.readFile(__filename,()=>{
//     console.log('this is readFile 1');
    
// })
// process.nextTick(()=>{console.log('THis is the process.nextTick 1')})
// Promise.resolve().then(()=>{console.log('This is promise.resolve 1')})
// setTimeout(()=>{
//     console.log('setTimeout 1');
    
// },0)

// for(let i = 0;i<2000000000;i++){} // to avoid above inconsistency for setTimeout
/*
THis is the process.nextTick 1
This is promise.resolve 1
setTimeout 1
this is readFile 1

*/

// ----

// check queue 
// to queue a callback function into the check queue , we can use a function called setImmediate 


// const fs = require('fs')

// fs.readFile(__filename,()=>{
//     console.log('this is readFile 1');
    
// })
// process.nextTick(()=>{console.log('THis is the process.nextTick 1')})
// Promise.resolve().then(()=>{console.log('This is promise.resolve 1')})
// setTimeout(()=>{
//     console.log('setTimeout 1');
    
// },1500)

// setImmediate(()=>{console.log('this is the setImmediate 1')})

// for(let i = 0;i<2000000000;i++){}

/*
output:-
THis is the process.nextTick 1
This is promise.resolve 1
setTimeout 1
this is the setImmediate 1
this is readFile 1
*/
//setImeediate 1 before readFile 1 because of I/O POLLING between I/O queue and check queue
// I/O events are polled and callback functions are added to the I/O queue only after the I/O is complete 

// I/O POLLING
// I/O Polling is part of the Poll Phase of the Node.js event loop. It’s the mechanism by which Node.js waits for I/O operations (like file reads, network requests, etc.) to complete.
//  Two Scenarios in the Poll Phase
// ✅ Scenario 1: There are I/O callbacks ready
// Node.js executes them immediately.
// Then moves to the Check Phase (where setImmediate() runs).
// 🕓 Scenario 2: No I/O callbacks are ready
// Node.js waits (polls) for I/O events to complete.
// If a timer (like setTimeout) is due while polling, it ends polling early and moves to the Timers Phase.

// --------------------------------------

// const fs = require('fs')

// fs.readFile(__filename,()=>{
//     console.log('this is readFile 1');

//     setImmediate(()=>{console.log('this is the inner setImmediate 1 inside readFile ')}) // to ensure that this setimmediate queued up only after I/O polling completes 
    
// })
// process.nextTick(()=>{console.log('THis is the process.nextTick 1')})
// Promise.resolve().then(()=>{console.log('This is promise.resolve 1')})
// setTimeout(()=>{
//     console.log('setTimeout 1');
    
// },0)



// for(let i = 0;i<2000000000;i++){}

/*
output

THis is the process.nextTick 1
This is promise.resolve 1
setTimeout 1
this is readFile 1
this is the inner setImmediate 1 inside readFile
*/


// ----


// const fs = require('fs')

// fs.readFile(__filename,()=>{
//     console.log('this is readFile 1');

//     setImmediate(()=>{console.log('this is the inner setImmediate 1 inside readFile ')}) // to ensure that this setimmediate queued up only after I/O polling completes 
    
//     process.nextTick(()=>{console.log('THis is the inner process.nextTick 1')})
//     Promise.resolve().then(()=>{console.log('This is inner promise.resolve 1')})
// })


// process.nextTick(()=>{console.log('THis is the process.nextTick 1')})
// Promise.resolve().then(()=>{console.log('This is promise.resolve 1')})

// setTimeout(()=>{
//     console.log('setTimeout 1');
    
// },0)



// for(let i = 0;i<2000000000;i++){}

/*
THis is the process.nextTick 1
This is promise.resolve 1
setTimeout 1
this is readFile 1
THis is the inner process.nextTick 1
This is inner promise.resolve 1
this is the inner setImmediate 1 inside readFile 
*/


// -----

// setImmediate(()=>console.log('this is setImmediate 1'))
// setImmediate(()=>{
//     console.log('this is setImeediate 2');
//     process.nextTick(()=>{console.log('THis is the process.nextTick 1')})
//     Promise.resolve().then(()=>{console.log('This is promise.resolve 1')})
    
// })
// setImmediate(()=>console.log('this is setImmediate 3'))

/*
output
this is setImmediate 1
this is setImeediate 2
THis is the process.nextTick 1
This is promise.resolve 1
this is setImmediate 3
*/


// setTimeout(()=> console.log('settimeout 1'),0)
// setImmediate(()=>console.log('this is setImmediate 1'))

/*
this is setImmediate 1
settimeout 1

or 

settimeout 1
this is setImmediate 1
*/

// order can't be gurannteed 


// ---------------------------------------------------------

//close queue 

// const fs = require('fs')
// const readableStream = fs.createReadStream(__filename)
// readableStream.close()

// readableStream.on('close',()=>{
//     console.log('this is from readable stream close event callback ');
    
// })

// setImmediate(()=>{console.log('this is setImmediate 1')})
// setTimeout(()=> console.log('settimeout 1'),0)
// Promise.resolve().then(()=>{console.log('This is promise.resolve 1')})
// process.nextTick(()=>{console.log('This is the process.nextTick 1')})

/*
output
This is the process.nextTick 1
This is promise.resolve 1
settimeout 1
this is setImmediate 1
this is from readable stream close event callbac
*/
//because close queue callbacks are executed after all other queues calbacks in a given iteration of the event loop 




// -------------------------
// summary for event loop 

// - The event loop is a c program that orchestrates or co-ordinates the execution of synchronous and asynchronous code in node js 
// - it co-ordinates the execution of calbacks in six differnet queues 
// - they are nextTick , promise, timer ,I/O , check and close queues 

// We use process.nextTick() method to queue into the nextTick queue
// We resolve or reject a promise to queue into the promise queue 
// We use setTimeout or setInterval to queue into the timer queue 
// Execute an async method to queue into the I/O queue 
// Use setImmediate function to queue into the check queue 
// Attack close event listeners to queue into the close queue

// the order of execution follows the same order lister here 
// nextTick and promise queue are executed in between each queue and also in between each callback execution in the timer and check queues

