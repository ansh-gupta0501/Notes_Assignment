// Node js contians JS library , and some c/c++ features for file system and external dependencies

// external dependencies contain v8 , libuv , zlib , crypto , etc. 

// libuv is responsible for async behaviour as we know just javascript is not helpful for async behaviour


// libuv 

// libuv is a cross platform open source library written in c language
// It handles asynchronous non - blocking opeartions in Node.js and abstracts away all the complexity of dealing with the Operating system 
// It does this using two features Thread pool and Event Pool 



// Thread Pool 

// eg. reading a file from fs module 

// const fs = require('node:fs')

// console.log('first');

// fs.readFile('./file.txt','utf-8',(error,data)=>{
//    console.log('File Contents');
   
// }) 

// console.log('last');

// when we run this code , we get output 
// first
// last
// File Contents

// it confirms , read file method is asynchronous and non-blocking 
// how does node able to do this ? Because of libuv thread pool 

// Main thread:
// 'Hey libuv, i need file contents but that is a time consuming task . I don't want to block further code from being executed during this time. Can i offload this task to you ?'

// Libuv:
// 'Sure , main thread. Unline you, who is single threaded, I have a pool of threads that i can use to run some of these time consuming task. When the task is done, the file contents are retreived and the associated callback function can be run . '


// crypto :- also used libuv thread pool for some of its methods

// const crypto = require('node:crypto')

// const start = Date.now();

// crypto.pbkdf2Sync('password','salt',100000,512,'sha512') // password based key derivation function 2 and is one of the popular methods to hash passwords before storing them but it is a cpu intensive method that takes a long time so it is offloaded to the libuv's thread pool

// console.log('hash: ', Date.now() - start); // hash:  987 // password is hash in 987 ms // this also depends on your hardware 

// now doing same work twice 

// const crypto = require('node:crypto')

// const start = Date.now();

// crypto.pbkdf2Sync('password','salt',100000,512,'sha512') 
// crypto.pbkdf2Sync('password','salt',100000,512,'sha512')  

// console.log('hash: ', Date.now() - start) // hash:  1407 // we say it is blocking code as it increases the time of blocking 

// Every method in node js that has the "sync" suffix always runs on the main thread and is blocking 

// ---
// async version of pbkdf2

// const crypto = require('node:crypto')

// const MAX_CALLS = 5;

// const start = Date.now();

// for(let i = 0;i< MAX_CALLS;i++){
//     crypto.pbkdf2('password','salt',100000,512,'sha512',()=>{
//         console.log(`hash: ${i + 1}`, Date.now() - start);
//     }) 
// } // hash: 1 690 // as we see time is less 
// if we increased max_Calls , we see 
// hash: 2 820
// hash: 1 828    // both calls takes approximately equal time

// each call is running in separate thread which is in libuv thread pool 


// ----

// A few async methods like fs.readFile and crypto.pbkdf2 run on a separate thread in libuv's thread pool. They do run synchronoulsy in their own thread but as fas as the main thread is concerned , it appears as if the method is running asynchronously . 

// now from above code , if we run 2 times or 3 times , we can say we have 3 threads running parallel 

// But how many thread are total in thread pool ??

// if we take 5 MAX_calls then get 
/*

hash: 4 3361
hash: 2 3377
hash: 1 3451
hash: 3 3463
hash: 5 4131
*/      // we see 5th takes very long time which means libuv thread pool has 4 threads 
        // 5th needs to wait for a thread to free 

// Hence libuv's thread pool has 4 thread in total.

// can we increase the thread in thread pool ??

// yes to increase a thread pool size , we need to set process env variable  at top 


// const crypto = require('node:crypto')
// process.env.UV_THREADPOOL_SIZE = 5;
// const MAX_CALLS = 5;

// const start = Date.now();

// for(let i = 0;i< MAX_CALLS;i++){
//     crypto.pbkdf2('password','salt',100000,512,'sha512',()=>{
//         console.log(`hash: ${i + 1}`, Date.now() - start);
//     }) 
// }

// now we get almost equal time for all the threads 

// Hence , by increasing the thread pool size, we are able to improve the total time taken to run multiple calls of an asynchronous method like pbkdf2 
// Now if we increase threadpool_Size beyond your cpu cores your maching has the average time your method taken also increases 


// ----

// Not all async method uses thread pool , eg, 

const https = require('node:https')
const MAX_CALLS = 12;
const start = Date.now();
for(let i = 0;i<MAX_CALLS;i++ ){
    https
        .request('https://www.google.com',(res) => {
            res.on('data', () => {})
            res.on('end',()=>{
                console.log(`Request: ${i + 1}`,Date.now() - start);
                
            })
        })
        .end() // here we end the request 
}

// if MAX_CALLS = 1 , THEN Request: 1 944 , TAKES 944 MS 
// if MAX_CALLS = 2 , THEN Request: 2 995 , Request: 1 1007
// if MAX_CALLS = 4 , THEN Request: 1 786 , Request: 2 932,Request: 3 934,Request: 4 962
// if MAX_CALLS = 6 which is larger than default thread pool size  , THEN Request: 4 735,Request: 1 761,Request: 2 763,Request: 5 903,Request: 3 909,Request: 6 926
// if MAX_CALLS = 12  THEN Request: 9 1997,Request: 10 2015,Request: 11 2023,Request: 8 2026,Request: 5 2039,Request: 12 2050,Request: 7 2051,Request: 6 2631,Request: 3 2670,Request: 4 2689,Request: 2 2705,Request: 1 5002


// based on this , we can say 
// although both crypto.pbdkf2 and https.request are asynchornous , https.request method does not seem to use the thread pool as we can see the average time for multiple request is still the same 
// https.requst does not seem to be affected by the number of CPU cores either BECASUE 
// https.request is a network input/output opeartion and not a CPU bound operation . It does not use thread pool 
// Libuv instead delegates the work to the opearting system kernel and whenever possible , it will poll the kernel and see it the request has completed 



// ---
// so summary for libuv and async methods 

// In node.js , async methods are handled by libuv 
//They are handled in two different ways 
//1. Native async mechanism  2. Thread pool 
// Whenever possible, libuv will use native async mechanism in the Operating sytem so as to avoid blocking the main thread 
// Since this is part of the kernel , there is different mechanism for each OS, We have epoll for linux, kqueue for macos and IO Completion port on windows 
// Relying on native async mechanism makes node scalable as the only limitatin is the OS Kernel 
// Example of this type is a network I/O opeation 

// On the other hand , if there is no native async support and the task is file I/O or cpu intensive, libuv used the thread pool to avoid blocking the main thread 
