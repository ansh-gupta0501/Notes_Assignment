// Javascript is a synchronous , blocking , single threaded language 

// Synchronous 
// If we have two functions which log messages to the console, code executes top doesNotThrow, with only one line executing at any given time 

function A(){
    console.log('A');
    
}

function B(){
    console.log('B');
    
}
A()
B()

// it logs A then B 

// Blocking 

// Because of synchronous nature , js is blocking . No matter how long a previous takes , the subsequent process won't kick off until the former is completed 
// Web app runs in a browser and it executes an intensive chunk of code withour returning control to the browser, the browser can appear to be frozen 


// Single-threaded 
// A thread is simply a process that your javascript program can use to run a task 
// each thread can only do one task at a time 
// Javascript has just the one thread called the main thread for executing any code 


// ---
// Problem with this type of model of javascript 

let response = fetchDataFromDB('endpoint')
displayDataFromDB(response) 

// fetchDataFromDB('endpoint') could take 1 second or even more 
// During that time , we can't run any further code 
// javascript , if it simply proceeds to the next line without waiting, we have an error because data is not what we expect it to be 
// so we need to have a asynchronous behaviour with javascript , just javascript is not enought 
// we need new pieces which are outside of javascript to help us write asynchronous code 
// For front-end , this is where web browsers come into play. For back-end , this is where Node.js comes into play 

// Web browsers and node.js defines functions and APIs that allow us to register functions that should not be executed synchronously, should be invoked asynchronously when some kind of event occurs
// For eg, that could be passage of time (setTimeOut or setInterval), the user's interaction with the mouse(addEventListener), data being read from a file sytem or the arrival of data over the network (callbacks, promises, async-await )

// You can let your code do several things at the same time without stopping or blocking your main thread 
