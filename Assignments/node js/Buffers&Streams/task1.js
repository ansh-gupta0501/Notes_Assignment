//create a buffer from a string 

/*
Buffer.from() takes two arguments:

The string you want to convert into a buffer.

The encoding type ('utf-8' is the default and typically used for most text data).

*/
const str = "Hello world";
const buffer = Buffer.from(str, 'utf-8');

console.log(buffer);  


// Convert buffer back to a string
const originalStr = buffer.toString('utf-8');
console.log(originalStr);