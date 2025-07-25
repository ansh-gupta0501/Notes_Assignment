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

const crypto = require('node:crypto')

const start = Date.now();

crypto.pbkdf2('password','salt',100000,512,'sha512') // password based key derivation function 2 and is one of the popular methods to hash passwords before storing them but it is a cpu intensive method that takes a long time so it is offloaded to the libuv's thread pool

console.log('hash: ', Date.now() - start);


