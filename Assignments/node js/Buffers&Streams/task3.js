//compress a file using zlib + streams

const fs = require('fs')
const path = require('path')
const zlib = require('zlib')
const filepath = path.join(__dirname,'input.txt')
const zipfilepath = path.join(__dirname,'input.txt.gz')

const readStream = fs.createReadStream(filepath);

const writeStream = fs.createWriteStream(zipfilepath);


const gzip = zlib.createGzip();

// Pipe the read stream through the gzip stream and then to the write stream
readStream.pipe(gzip).pipe(writeStream);



writeStream.on('finish', () => {
    console.log('File has been compressed successfully!');
});


//error handling
readStream.on('error', (err) => {
    console.error('Error reading the file:', err);
});
writeStream.on('error', (err) => {
    console.error('Error writing the file:', err);
});