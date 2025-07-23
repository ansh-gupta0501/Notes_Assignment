// pipes 
const fs = require('node:fs')

const readableStream = fs.createReadStream('./file.txt',{
    encoding: "utf-8",
    highWaterMark : 2   
}) 


const writeableStream = fs.createWriteStream('./file2.txt');

readableStream.pipe(writeableStream) 
// we see data is written to file2.txt 
// pipe returns the destination stream which enables chaining however the condition is that destination stream has to be readable ,duplex or transform stream 
// in current eg, we have destination stream is writeablestream so we cannot chain by calling dot pipe 
// so for this we check another built in module which is zlib 

const zlib = require('node:zlib')
// zlib as built in transform stream 
// gzip is a Transform stream that compresses the data using the Gzip algorithm
const gzip = zlib.createGzip()    

// readableStream.pipe(gzip) // now it returns a transform stream so we can use chaining 
readableStream.pipe(gzip).pipe(fs.WriteStream('./file2.txt.gz'))
// means we are moving from a readable stream to transform stream to writeable stream 