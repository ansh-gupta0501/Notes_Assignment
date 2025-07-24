// how the web works

// Computers connected to the internet are called clients and servers 
// Clients are internet-connected devices such as computers or mobile phones along with web-accessing software available on those devices such as web browser
// Servers on the other hand are computers that store web pages , sites or apps 

// when you type a URL in the browser , the client device requests access to a web page , a copy of the web page is downloaded from the server and sent as reponse to the client  to be displayed in the web browser .
// This model is popularly called client server model  
// Now as there is data transfer between client and server but what format of data it is ?
// What if data sent by the client cannot be understood by the server or what if the response sent by the server cannot by understood by the client ?
// This is where HTTP comes into the picture . 

// HTTP is a protocol that defines a format for clients and servers to speak to each other.  
// The client sends an HTTP request and the server responds with an HTTP response. 
// This is how the web works at a very high level 


// HTTP and Node 

// We can create a web server using Node.js 
// Node js has access to operating system functionality like networking 
// It has an event loop to run tasks asynchronously and is perfect for creating web servers that can simultaneously handle large volumes of requests. 
// But the node server we create should still respect the HTTP format . 
// The HTTP module allows creating of web servers that can transfer data over HTTP 


const http = require('node:http')
// http module also extends event emitter class 
// the callback function we passed here is actually a request listener means whenever request reaches the server , this callback function gets executed . 

// node handle the incoming request and we handle code to send back response 

// const server = http.createServer((req,res)=>{
//     res.writeHead(200, {"content-type" : "text/plain"})  // response headers is now content type plain 
   
//    /*
//    This method sets the status code and response headers.

//     You're telling the browser:
//     The request was successful (200)
//     The response body is plain text (text/plain)


//     "Content-Type": "text/plain":
//     Sets the MIME type of the response to plain text.
//     Tells the browser not to render HTML or JSON, but raw text.

//     Other common content types:
//     text/html        → For HTML pages
//     application/json → For JSON responses
//     text/css         → For stylesheets
//     image/png        → For PNG images

//    */
//     res.end('Hello World')
// })



// ---

const server = http.createServer((req,res)=>{

    const superHero = {
        firstName : 'Bruce',
        lastName : "Wayne"
    }

    res.writeHead(200, {"content-type" : "application/json"})   
   
  
    res.end(JSON.stringify(superHero))

})


// we also need to inform to the server to listen to any incoming request 

server.listen(3000,()=>{
    console.log(`server running on port 3000`);
    
})
