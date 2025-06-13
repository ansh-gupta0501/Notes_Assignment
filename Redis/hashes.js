import client from './db.js'




// Basic commands
// HSET: sets the value of one or more fields on a hash.
// HGET: returns the value at a given field.
// HMGET: returns the values at one or more given fields.
// HINCRBY: increments the value at a given field by the integer provided.


export async function hashes(){
    // const fieldsAdded = await client.hset('motorBike:1',{
    //     model : 'splender',
    //     brand : 'bajaj',
    //     type : '2 wheeler',
    //     price : 80000
    // })

    // console.log(fieldsAdded); // 4 // as 4 fields are added 

    // console.log(await client.hget('motorBike:1','model')) // splender


    // to get mutilple get , we can use hmget

    // console.log(await client.hmget('motorBike:1',['model','price'])) //[ 'splender', '80000' ]

     // increment the price of motorBike:1 by 100

    // console.log(await client.hincrby('motorBike:1','price',100)) // 80100
    
    // to decrement the price 
    // console.log(await client.hincrby('motorBike:1','price',-100)) // 80
    
    


    
}

