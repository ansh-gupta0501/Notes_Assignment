// Worker Threads Module
// it is also for same purpose as cluster module . improving performance of node js application 


// The worker_threads module enables the use of threads that execute Javascript in parallel 
// Code executed in a worker thread runs in a separte child process, preventing it from blocking your main application 

// How this module is different from cluster module ?
// The cluster module can be used to run multiple instances of NOde.js that can distribute workloads 
// Worker_Threads module allows running multiple application threads within a single node.js instance

// when process isolation is not needed , that is , no separate instances of v8 ,event loop and memory are needed , you should use worker_Threads


// const http = require('node:http')

// const server = http.createServer((req,res)=>{
//     if(req.url === '/'){
//         res.writeHead(200,{"content-type" : "text/plain"})
//         res.end("Home page")
//     }
//     else if(req.url === '/slow-page'){
//         let j = 0;
//         for(let i = 0;i<6000000000;i++){ j++;} //simulate CPU work 

//         res.writeHead(200,{"content-type" : "text/plain"})
//         res.end(`slow Page ${j}`)
//     }
// })
// server.listen(8000,()=>{console.log(`server started at port 8000`)})

// same problem in this 

// now import worker thread module
const http = require('node:http')
const {Worker} = require('node:worker_threads')
const server = http.createServer((req,res)=>{
    if(req.url === '/'){
        res.writeHead(200,{"content-type" : "text/plain"})
        res.end("Home page")
    }
    else if(req.url === '/slow-page'){
        const worker = new Worker('./worker-thread.js') // create this file and paste this time consuming operation in this worker thread file 
        // let j = 0;
        // for(let i = 0;i<6000000000;i++){ j++;} //simulate CPU work 

        worker.on('message',(j)=>{
            res.writeHead(200,{"content-type" : "text/plain"})
            res.end(`slow Page ${j}`)
        })

        
    }
})
server.listen(8000,()=>{console.log(`server started at port 8000`)})

// now / page not blocked by slow-page 
// now this concept is not true multithreading means thread pool but lets you run code paraller outside of main thread 

// this worker module is Ideal for CPU-bound tasks like image processing, data crunching, or encryption.