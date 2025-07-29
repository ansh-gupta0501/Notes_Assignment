// Cluster Module 

// Node is single threaded 
// No matter how many cores you have , node only uses single core of your cpu 
// This is fine for I/O opeations but if the code has long running and cpu intensive opeartions , your application might struggle from a performance point of view 

// So , the cluster module enables the creation of child processes (also called workeres) that run simultaneiously 
// All created workers share the same server port 

// ---
// code if we don't use cluster module 


const http = require('node:http')

const server = http.createServer((req,res)=>{
    if(req.url === '/'){
        res.writeHead(200,{"content-type" : "text/plain"})
        res.end("Home page")
    }
    else if(req.url === '/slow-page'){
        for(let i = 0;i<60000000000;i++){} //simulate CPU work 

        res.writeHead(200,{"content-type" : "text/plain"})
        res.end("slow Page ")
    }
})
server.listen(8000,()=>{console.log(`server started at port 8000`)})

// in this if we load first / page , then we get the result very fast 
// but then if we load slow-page , then it takes a lot of time to load
// Now after that if we again load / page in different tab, then it take more time than before 
// because the single threaded of node js has been blocked by the slow-page so it is not ready for any other request and our application will be slow down 

// so for this we have cluster module 

// How cluster module work in node js ?

// when we run node clusterModule.js in the terminal , the file is treated as a cluster master and this master is in charge of spawning new workers which run an instance of our node application
/*
                index.js
              CLUSTER MASTER
                 /\
                /  \
               /    \
              /      \
             /        \
            /          \
        worker 1       worker 2

*/
// master is only incharge of the workers 
// starting , stopping restarting etc. but does not execute the application code itself 
// it is not in charge of handling incoming requests , reading files etc. 
// That is up to individual workers are in charge of handling incoming request, reading files etc.
// Each worker gets its own event loop, memory , and v8 instance 
//By this, we can share the workload across differnet instances without having to block incoming requests


// const cluster = require('node:cluster')

// if(cluster.isMaster){
//     console.log(`Master process ${process.pid} is running`);
// }else{
//     console.log(`Worker ${process.pid} started`);
// }

// when you first run node clusterModule.js now in the terminal , node treats this file as master and sets is master to true
// verify it by running node cluster  // we get output:-  Master process 4304 is running


// now as master we need to creater workers , for that we use the fork method on the cluster object 
// create two workers by calling it twice 
// const cluster = require('node:cluster')

// if(cluster.isMaster){
//     console.log(`Master process ${process.pid} is running`);
//     cluster.fork()
//     cluster.fork()
    
// }else{
//     console.log(`Worker ${process.pid} started`);
//     // now run the same http server code in this worker
    
//     const server = http.createServer((req,res)=>{
//     if(req.url === '/'){
//         res.writeHead(200,{"content-type" : "text/plain"})
//         res.end("Home page")
//     }
//     else if(req.url === '/slow-page'){
//         for(let i = 0;i<60000000000;i++){} //simulate CPU work 

//         res.writeHead(200,{"content-type" : "text/plain"})
//         res.end("slow Page ")
//     }
// })
// server.listen(8000,()=>{console.log(`server started at port 8000`)})

// }
// we see master is incharge of making workers and workers are incharge of incoming request 
// now run the file 
// we see 
/*
Worker 10584 started
server started at port 8000
Worker 18672 started
server started at port 8000
*/

// now if we make request on slow-page then it takes lot of time 
// but now parallely if we make reqeust on / page , it loads fast as now it is not blocked 
// it is becasue the first worker with its  node instance handles the first request and the second worker with its own node instance handles the second request 



// Now we should not create a large numbers of workers using cluster.fork() ,  we should only create as many workers as there are cpu cores on the maching the app is running.
// If you create more workers than there are logical cores on the computer it can cause an overhead as the system will have to schedue all the created workers with fewer number of cores

// to verfiy how many cores your maching have , use os module 
// const os = require('node:os')
// console.log(os.cpus().length); // 8



// Now there is easier way to do all of these 

// you can ask someone else to run your application as a cluster and also decide the best number of workers to create for your machine and that someone else is an npm package called pm2
// install it gloabllay 
// now we can ask pm2 to run our new cluster fle in cluster mode . Also run only the http code you write first on the top , don't use cluster module now  , as it is handled by pm2 now 
// use this command to run :- pm2 start file_name.js -i 0 // here 0 indicates we want pm2 to figure out the optimum number of workers to create . If you specify particular number like 2 instead of 0 then pm2 will create only two workers 

/*

┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ clusterModule      │ cluster  │ 0    │ online    │ 0%       │ 0b       │
│ 1  │ clusterModule      │ cluster  │ 0    │ online    │ 0%       │ 0b       │
│ 2  │ clusterModule      │ cluster  │ 0    │ online    │ 0%       │ 0b       │
│ 3  │ clusterModule      │ cluster  │ 0    │ online    │ 0%       │ 0b       │
│ 4  │ clusterModule      │ cluster  │ 0    │ online    │ 0%       │ 0b       │
│ 5  │ clusterModule      │ cluster  │ 0    │ online    │ 0%       │ 0b       │
│ 6  │ clusterModule      │ cluster  │ 0    │ online    │ 0%       │ 0b       │
│ 7  │ clusterModule      │ cluster  │ 0    │ online    │ 0%       │ 0b       │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
*/

// pm2 created 8  workers as we have total cores 8
// to stop pm2 ,use command :- pm2 stop filename.js

/*
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ clusterModule      │ cluster  │ 0    │ stopped   │ 0%       │ 0b       │
│ 1  │ clusterModule      │ cluster  │ 0    │ stopped   │ 0%       │ 0b       │
│ 2  │ clusterModule      │ cluster  │ 0    │ stopped   │ 0%       │ 0b       │
│ 3  │ clusterModule      │ cluster  │ 0    │ stopped   │ 0%       │ 0b       │
│ 4  │ clusterModule      │ cluster  │ 0    │ stopped   │ 0%       │ 0b       │
│ 5  │ clusterModule      │ cluster  │ 0    │ stopped   │ 0%       │ 0b       │
│ 6  │ clusterModule      │ cluster  │ 0    │ stopped   │ 0%       │ 0b       │
│ 7  │ clusterModule      │ cluster  │ 0    │ stopped   │ 0%       │ 0b       │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
*/