const http = require('node:http')
const fs = require('fs')

const server = http.createServer((req,res)=>{
    // res.end(req.url) // it give the url we write in browser , not complete url , just the route path 
    
    // also we have req.method  GET,POST PUT , DELETE 

    if(req.url === '/'){
        res.writeHead(200,{"content-type" : "text/plain"})
        res.end("HOme page")
    }
    else if(req.url === '/about'){
         res.writeHead(200,{"content-type" : "text/plain"})
        res.end("about page")
    }
    else if(req.url === '/api'){
         res.writeHead(200,{"content-type" : "application/json"})
        res.end(JSON.stringify({
            firstName : "Bruce",
            lastName : "Wayne"
        }))
    }
    else{
         res.writeHead(404)
        res.end("Page not found")
    }

    
})


server.listen(3000,()=>{console.log(`server started at port 3000`)})