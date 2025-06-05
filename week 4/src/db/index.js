// console.log("inside db file ")
// console.log("PG_USER from db file:", process.env.PG_USER);

// import dotenv from 'dotenv'

// dotenv.config()
// console.log("inside db file ")
// console.log(process.env)

//connecting mongodb 

import mongoose  from 'mongoose'
const testDBConnection =async ()=>{
  try {
    await mongoose.connect('mongodb+srv://AnshGupta:gupta9498@cluster0.swsj05x.mongodb.net/work')
    console.log('mongodb connected')
  } catch (error) {
    console.log('failed to connect',error)
  }
}



// connecting postgress
// import pkg from 'pg';
// const { Pool } = pkg;

// import {PG_DB} from "../constant.js"
 
// // console.log(process.env.PG_USER)
// // console.log('pg password',process.env.PG_PASSWORD)
// // console.log('pg password',typeof process.env.PG_PASSWORD)
// // console.log('pg_db' ,PG_DB)
// // console.log('TYPE OF PGDB' ,typeof PG_DB)

// // console.log(PG_DB)
// const pool = new Pool({
//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   database:PG_DB,
//   password: process.env.PG_PASSWORD,
//   port: Number(process.env.PG_PORT)
// });
 

// const testDBConnection = async () => {
//   try {
//     const client = await pool.connect(); 
//     console.log('Postgres connected successfully');
//     client.release(); // release the client back to the pool
//   } catch (error) {
//     console.error('Failed to connect to Postgres:', error);
//     process.exit(1); 
//   }
// };


// const query = (text, params) => pool.query(text, params)

export {
// query,
testDBConnection
};

