//log order of setTimeOut(fn,0) vs console.log()

console.log('1st log ')
setTimeout(()=>{
    console.log("Timeout log ")
},0)

console.log("2nd log")


//output :- 

//explanation 

// JavaScript runs in a single thread, but uses the event loop to handle asynchronous operations like setTimeout.

//  Steps:
// console.log('1') is synchronous → runs immediately.

// setTimeout(..., 0) is asynchronous:

// The function is scheduled in the callback queue.

// It will only execute after the call stack is empty.

// console.log('2') is also synchronous → runs immediately.

// The call stack is now empty → event loop checks the callback queue.

// The setTimeout() callback is executed ".