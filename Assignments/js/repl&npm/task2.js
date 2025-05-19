const axios = require('axios')

// https://jsonplaceholder.typicode.com/todos/

async function data(){
    const dummyData = await axios.get('https://jsonplaceholder.typicode.com/todos/');
    console.log(dummyData)
}

data()