

import pkg from 'pg';
const { Pool } = pkg;


// console.log(PG_DB)
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database:process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT)
});
 

const testDBConnection = async () => {
  try {
    const client = await pool.connect(); 
    console.log('Postgres connected successfully');
    client.release(); 
  } catch (error) {
    console.error('Failed to connect to Postgres:', error);
    process.exit(1); 
  }
};



const query = (text, params) => pool.query(text, params)

export {
  testDBConnection,
query

};

