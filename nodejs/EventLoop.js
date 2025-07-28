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
setTimeout(()=>console.log('This is setTimeOut 1'),0)
setTimeout(()=>{
    console.log('This is setTimeOut 2')
    process.nextTick(()=>{
        console.log('This is inner nextTick inside setTimeout 2')
    })
},0)
setTimeout(()=>console.log('This is setTimeOut 3'),0)

process.nextTick(()=>{console.log('THis is the process.nextTick 1')})
process.nextTick(()=>{
    console.log('THis is the process.nextTick 2')
    process.nextTick(()=>{
        console.log('This is inner nextTick inside next Tick 2')
    })
})
process.nextTick(()=>{console.log('THis is the process.nextTick 3')})

Promise.resolve().then(()=>{console.log('This is promise.resolve 1')})
Promise.resolve().then(()=>{
    console.log('This is promise.resolve 2')
     process.nextTick(()=>{
        console.log('This is inner nextTick inside promise.resolve 2')
    })
})
Promise.resolve().then(()=>{console.log('This is promise.resolve 3')})

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

