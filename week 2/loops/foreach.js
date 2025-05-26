const coding = ['js','ruby','java','python','cpp']


// coding.forEach(function(val){
//     console.log(val)
// })

// -------------------------------------------------------

// coding.forEach((item)=>{
//     console.log(item)
//})

// ----------------------------------------------------------

// function printMe(item){
//     console.log(item)
// }

// coding.forEach(printMe)

// ---------------------------------------------------------------


// const values = coding.forEach( (item)=>{
//     console.log(item)
// })

// console.log(values) //undefined  // for each never return value 

 
//if manually we  return 

const values1 = coding.forEach((item)=>{
    // console.log(item)
    return item;
})

console.log(values1) //undefined          // for each never returned value

