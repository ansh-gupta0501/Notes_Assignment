// streams
// A stream is a sequence of data that is being moved from one point to another over time 
// Ex. a stream of data over the internet being moved from one computer to another 
// Ex. A stream of data being transferred from one file to another within the same computer 


// Process streams of data in chunks as they arrive instead of waiting for the entire data to be available before processing 
// Ex. wating a video on youtube 
// The data arrives in chunks and you watch in chunks while the rest of the data arrives over time 
// Ex. transferring the file contents from fileA to file B
// The contents arrive in chunks and you transfer in chunks while the remaining contents arrive over time 
// prevents unnecessary data downloads and memory usage 

// stream is a built-in node module that inherits from the event emitter class but we rarely use this streams directly 
// other modules internally use streams for their functioning 



// tranfer contents of file.txt to file2.txt 

const fs = require('node:fs')

// to read data 
const readableStream = fs.createReadStream('./file.txt',{
    encoding: "utf-8",
    highWaterMark : 2   // now we get 2 bytes per 
}) // we created readableStream to read data in chunks from file.txt 

// when we write this readableStream , 
// Node.js starts reading the file in chunks. As it reads each chunk, it automatically emits a 'data' event with that chunk.

// to write data to file2.txt 

const writeableStream = fs.createWriteStream('./file2.txt');

// as streams extends eventemitter class so we can have access to listen and register events 

readableStream.on('data',(chunk)=>{ // receives chunk of data 
    console.log(chunk);
    
    // now write on file2.txt using writeableStream
    writeableStream.write(chunk)
}) // data is built-in stream events like other built-in events end', 'error'

// buffers,  the stream use has a default size of 64 kilobytes so this chunk is full file content 


// other modules which uses this stream internally is http module 
// http request is a readable stream and http response is a writable steam 


// four types of streams 

// readable streams from which data can be read 
// writable streams to which we can write data 
// duplex streams that are both readable and writable 
// transform streams that can modify or transform the data as it is written and read 

// ex. reading from a file as readable stream 
// ex. writing to a file as writable stream 
// ex. sockets as a duplex stream 
// ex. file compression where you can write compressed data and read de-compressed data to and from a file as a transform stream 

// ----


// Buffers 
// node js cannot control the pace at which data arrives in the stream. It can only decide when is the right time to send the data for processing 
// If there is data already processed or too little data to process, node puts the arriving data in a buffer 
// So buffers is an intentionally small area that node maintains in the runtime to process a stream of data 

//ex. streaming a video online 
// if your internet connection is fast enough, the speed of the stream will be fast enough to instantly fill up the buffer and send it out for processing 
// that will repeat till the stream is finished 
// But if your connection is slow, after processing the first chunk of data that arrived, the video player will display a loading spinner which indicates it is waiting for more data to arrive 
// once the buffer if filled up and the data is processed , the video player shows the video 
// While the video is playing , more data will continue to arrive and wait in the buffer 

// -----


// connection between binary data , character sets , and encoding < = > Buffers? 
// Node js provide buffer as gloabl feature so no need to import buffer 

// const buffer = new Buffer.from("Vishwas",'utf-8') // utf-8 is default encoding value 
// console.log(buffer.toJSON())

/*
{
  type: 'Buffer',
  data: [
     86, 105, 115,
    104, 119,  97,
    115
  ]           // each character in vishwas is represented by uni character code  // like 86 for V
}            
*/


// console.log(buffer) // <Buffer 56 69 73 68 77 61 73>  // vishwas in hexadecimal 
/*
    A buffer contains a raw binary data that is displayed as output when we log to the console but hang on as in binary just 0 and 1
    node js print hexadecimal or base16 notation of the number as printing 8 bits binary for every character can flood your terminal 
    but if I take 56 which is the representation of V and converted it to binary and decimal we get same binary represenation and 86 in decimal 
*/


// console.log(buffer.toString()) // Vishwas 

// writing to buffer 
// buffer.write('code')
// console.log(buffer.toString()) // codewas 
// this is because buffer have limited memory the four characters overwrite the four characters from vishwas 

// buffer.write('codeevolution ')
// console.log(buffer.toString()) // codeevo  // last few characters as skipped as they can't be stored in the buffer 
