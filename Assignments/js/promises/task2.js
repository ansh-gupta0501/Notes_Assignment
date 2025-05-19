// 2. Convert a callback-based function to a Promise.

const fs = require('fs')

const readFile = ()=>{
    return new Promise((resolve,reject)=>{
        fs.readFile('./sample.txt','utf-8',(err,data)=>{
            if(err){
                reject(err)
            }
            resolve(data)
        })
    })
}
readFile()
.then((data)=>{
    console.log(data)
})
.catch((err)=>{
    console.log(err)
    throw err;
})


