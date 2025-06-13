import client from './db.js'

// sets does not allow duplicate values 
// it is unordered collection 

// basics commands 
// SADD adds a new member to a set.
// SREM removes the specified member from the set.
// SISMEMBER tests a string for set membership.
// SINTER returns the set of members that two or more sets have in common (i.e., the intersection).
// SCARD returns the size (a.k.a. cardinality) of a set.


export async function sets(){

    // console.log(await client.sadd("ip", 1, 2, 3, 4)) // 4
    // console.log(await client.sadd("ip", 1)) // 0 // it does not give error , just return 0 indicates no element was added 

    // console.log(await client.srem('ip',2)) // 1 // indicates 1 element removed , if we are trying to remove element which doesn't exists in set , then it will simply return 0  // removes the 2 from set 

    // console.log(await client.sismember('ip',4)) // 1 // it is used to check whether element is present is set or not , 1 means true or 0 means false 

    // console.log(await client.scard('ip')) // 3 // return the length of list 



}