const fs = require('fs')
const path = require('path')

const inputFilePath = path.join(__dirname,"input.txt")

const readStream = fs.createReadStream(inputFilePath,{encoding: 'utf-8'})

readStream.on('data',(chunk)=>{
    console.log("recieved a chunk of data",chunk)
});

readStream.on('end',()=>{
    console.log("i finished reading the file")
});

readStream.on("error",(err)=>{
    console.log("error occured while reading the file ",err.message)
});


