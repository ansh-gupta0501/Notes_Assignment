import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});


export const testDBConnection = async () => {
  try {
    const client = await pool.connect(); 
    console.log('Postgres connected successfully');
    client.release(); // release the client back to the pool
  } catch (error) {
    console.error('Failed to connect to Postgres:', error.message);
    process.exit(1); 
  }
};

// testDBConnection();


export const query = (text, params) => pool.query(text, params);
