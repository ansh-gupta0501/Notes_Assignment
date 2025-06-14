import 'dotenv/config'
import express from 'express'
const app = express()
import client from './db.js'  
import axios from 'axios'



// app.get('/',async (req,res)=>{

    

//     const {data} = await axios.get('https://jsonplaceholder.typicode.com/todos/')

//     return res.json(data)
// })

/*
if we don't use redis then in thunderclient we see , this api take time (Time: 437 ms)
if we again make request then this will take time (Time: 615 ms)
if we again make request then this will take time (Time: 630  ms)

so now we can speed up this data using redis 


*/




app.get('/',async (req,res)=>{

    //before req , we check first in cache memory
    const cacheValue = await client.get('todos') // check if we have todos
    // if yes then simple return 
    if(cacheValue) return res.json(JSON.parse(cacheValue)) // need to parse string data to json 

    // if not in cache , then first we fetch it 

    const {data} = await axios.get('https://jsonplaceholder.typicode.com/todos/')

    // and then store in redis database 

    console.log(await client.set('todos',JSON.stringify(data))) // need to convert the data to string using json.stringify

    // also set expiry to it otherwise we always work on cache data 

    await client.expire('todos',30) // expire todos after 30 sec

    return res.json(data)
})

/*
after using redis , first time request it take take (Time: 1.89 s) as first no data stored in redis database 
but after second time request it takes time (Time: 1.48 s) as data not stored in redis database
but after thired time request it takes time (Time: 1.39 s) as data  stored in redis database
but after fourth time request it takes time (Time: 505ms) as data  stored in redis database


*/

app.listen(9000,()=>{console.log('server started at port 9000')})