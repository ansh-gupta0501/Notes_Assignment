const fs = require('fs')
const path = require('path')


// we need some data, we need to transform that data and then we need to write that data 
const { Transform } = require('stream')

const inputFilePath = path.join(__dirname,'input.txt')
const transformOutputFilePath = path.join(__dirname,'transferOutput.txt')

const readStream = fs.createReadStream(inputFilePath,'utf-8')


const writeStream = fs.createWriteStream(transformOutputFilePath)

//Transform data 

// This creates a custom transform stream called upperCaseTransform.

// The transform function is called with each chunk of data.

// It converts the chunk to a string, makes it uppercase, and pushes it to the next stream.

// callback() tells Node.js that the transformation is done for this chunk.

const upperCaseTransform = new Transform({
    transform(chunk,encoding,callback){
        /*
        this.push(...) — send the transformed data downstream (to the next stream in the pipe chain).

        callback() — notify Node.js that the transformation is done so it can process the next chunk.
        */
        this.push(chunk.toString().toUpperCase())
        callback()
    },
})

readStream.pipe(upperCaseTransform).pipe(writeStream) 
//This line connects the streams:

// Read from input.txt

// Convert text to uppercase using the transform stream

// Write the result to transferOutput.txt