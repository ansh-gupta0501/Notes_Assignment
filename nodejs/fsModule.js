// fs module 

// the file system module allows you to work with file system on your computer

// const fs = require('node:fs')

// read contents of the file 

// const fileContents = fs.readFileSync('./file.txt')
// console.log(fileContents); // <Buffer 48 65 6c 6c 6f 20 43 6f 64 65 45 76 6f 6c 69 75 74 69 6f 6e 20>

// fs module interally uses the buffer 

// const fileContents1 = fs.readFileSync('./file.txt','utf-8')
// console.log(fileContents1); // Hello CodeEvoliution 


// readFileSync() tells the method is a synchronous way of reading a file . In other words, javscript engine will wait till the file contents are read before moving on next line 
// sometimes we want this synchronous behaviour but sometimes not 

// to make asynchronous

// fs.readFile('./file.txt',(error,data)=>{
//     if(error){
//         console.log(error);
        

//     }
//     else{
//         console.log(data);
        
//     }
// }) // <Buffer 48 65 6c 6c 6f 20 43 6f 64 65 45 76 6f 6c 69 75 74 69 6f 6e 20>

// fs.readFile('./file.txt','utf-8',(error,data)=>{
//     if(error){
//         console.log(error);
        

//     }
//     else{
//         console.log(data);
        
//     }
// }) // Hello CodeEvoliution 



// write contents into file 
// fs.writeFileSync('./greet.txt','hello world');

// async version 

// fs.writeFile('./greet.txt','hello vishwas ',(err)=>{
//     if(err){
//         console.log(err);
        
//     }
//     else{
//         console.log('file written successfuly ');
        
//     }
// })

// by default , file writte overwritten the existing txt 

// but to append text , we need to pass third argument as flag a (append)
// fs.writeFile('./greet.txt','hello vishwas ',{flag : 'a'},(err)=>{
//     if(err){
//         console.log(err);
        
//     }
//     else{
//         console.log('file written successfuly ');
        
//     }
// })

// fs.appendFileSync('./greet.txt','append text')



// ----------------------------------------------------

// fs promise Module 

const fs = require('node:fs/promises')


// now we only get asynchrnous method will fs , not sync method 
console.log('first');

fs.readFile('file.txt','utf-8')
.then(data => console.log(data))
.catch((error) => console.log(error))

console.log('third');

// first
// third
// Hello CodeEvoliution

// now the promise based fs module can be used with async/await as it is just syntatical wrapper over promises 

async function readFile(){
    try {
        const data = await fs.readFile('file.txt','utf-8')
        console.log(data);
        
    } catch (error) {
        console.log(error);
        
    }
}

readFile()