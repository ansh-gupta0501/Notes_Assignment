//chain 3 callbacks (simulate async operation )
const fs = require('fs')

fs.readFile('./sample.txt','utf-8',(err,data)=>{
    console.log("task1")
    fs.readFile('./sample.txt','utf-8',(err,data)=>{
        console.log("task2")
        fs.readFile('./sample.txt','utf-8',(err,data)=>{
            console.log("task3")
        })
    })
})

