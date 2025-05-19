const fs = require('fs')
const path = require('path')
const zlib = require('zlib')
const filepath = path.join(__dirname,'input.txt')
const zipfilepath = path.join(__dirname,'input.zip')
fs.createReadStream(filepath).pipe(zlib.createGzip().pipe(fs.createWriteStream(zipfilepath)))

// fs.createReadStream(filepath).pipe(zlib.createGzip()).pipe(fs.createWriteStream(zipfilepath))


