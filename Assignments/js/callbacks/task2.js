//read a file using fs.readFile() with callbacks 

//using callback 

const fs = require('fs')

const readFile = (callback)=>{
    fs.readFile('./sample.txt','utf-8',(err,data)=>{
        if(err){
            return callback(err);
        }
        callback(null,data)
    })
}

readFile((err,data)=>{
    if(err){
        console.log("Error reading file ",err)
        return ;
    }
    console.log(data)
})

//using promises

// const readData = ()=>{
//     return new Promise((resolve,reject)=>{
//         fs.readFile('./sampl.txt','utf-8',(err,data)=>{
//             if(err) reject(err)
//             resolve(data);
//         })
        
//     })
// }

// readData()
// .then((data)=>{
//     console.log(data)
// })
// .catch((err)=>console.log(err))


//using async/await

// const fs = require('fs').promises

// const readData = async ()=>{
//     try {
//         const data = await fs.readFile('./sample.txt','utf-8');
//         return data;
//     } catch (err) {
//         console.log("error",err)
//         throw err;
//     }
// };

// (async ()=>{
//     try {
//         const data = await readData()
//         console.log(data)
//     } catch (err) {
//         console.log(err)
//         throw err
//     }
// })()