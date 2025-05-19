//create a server that returns hello world 

const http = require('http')
const port = 3000


const server = http.createServer((req,res)=>{

    res.end("Hello world")
})

server.listen(port,()=>{
    console.log(`server is listening at port ${port}`)
    console.log(`click on this link\n http://localhost:3000/`)
})

