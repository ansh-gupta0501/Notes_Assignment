//use promise.all() to fetch 2 APIs in parallel
 
const axios = require('axios')
const api1 = async() => {
  try {
    const data = await axios.get('https://jsonplaceholder.typicode.com/posts/2') 
    return data;
  } catch (err) {
    console.log(err)
    throw err;
  }
};

const api2 = async() => {
 try {
    const data = await axios.get('https://jsonplaceholder.typicode.com/posts/2')
    return data;
 } catch (err) {
    console.log(err)
    throw err;
 }
};


Promise.all([api1(),api2()])
.then(([result1,result2])=>{
    console.log("response from api 1",result1.data)
    console.log("response from api 2",result2.data)
})
.catch((err)=>{console.log(err)})