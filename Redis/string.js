import client from './db.js'

export async function string(){

     await client.set("msg:6","hey from node js")
  
     await client.set("bike:1", "Deimos" )
    await client.set("name", "ansh")

    await client.set("user:1","piyush")
    await client.set("user:2","john")
    await client.set("user:3","gupta")

     //  await client.expire('msg:6',10) // it will remove the key after 10 seconds
     const result1 = await client.get("msg:6")
     const result2 = await client.get("bike:1")
     const result3 = await client.get("name")
    //  console.log(result1);
    //  console.log(result2);
    //  console.log(result3);
     
    //  const result4 = await client.set("bike:1", "changedBike","NX") 
    //  console.log(result4);  // null
    //  const result5 = await client.set("bike:1", "changedBike","xx") 
    //  console.log(result5); // ok

    // console.log(await client.mset("bike:1", "Deimos" ,"bike:2", "Ares" ,"bike:3", "Vanth"))
    // console.log(await client.mget("user:1" ,"user:2"," mgs:1"))
     
    console.log(await client.set("count","1"))
    // console.log(await client.incr("count"))
    // console.log(await client.incr("count"))

    console.log(await client.incrby("count","10"))
    console.log(await client.decrby("count","10"))
    console.log(await client.incrbyfloat("count","10.36"))

}
