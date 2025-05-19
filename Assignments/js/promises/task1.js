// create a promise that resolve after 1 sec 

const promise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("resolved after 1 second ")
    },1000)
})

promise.then((message)=>{
    console.log(message)
})
.catch(()=>{
    console.log("error ")
})