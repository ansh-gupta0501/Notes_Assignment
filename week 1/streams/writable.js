const fs = require('fs')
const path = require('path')

const inputFilePath = path.join(__dirname,'input.txt')
const outputFilePath = path.join(__dirname,'output.txt')

const readStream = fs.createReadStream(inputFilePath,{encoding : 'utf-8'})



const writeStream = fs.createWriteStream(outputFilePath)

//now read the data and then transfer to the write stream using pipe

readStream.pipe(writeStream)

// when data has been written completely 
writeStream.on('finish',()=>{
    console.log("data has been written ")
})