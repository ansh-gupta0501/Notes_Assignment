const { Client } = require('pg');

// PostgreSQL connection config
const client = new Client({
  user: 'ansh',           // your PostgreSQL user
  host: 'localhost',
  database: 'test',       // your PostgreSQL database name
  password: 'ansh',  // the password for 'ansh'
  port: 5432,
});

async function main() {
  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL');

    // Create table if not exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS users1 (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100)
      );
    `);

    console.log('✅ Table ready');

    // --- CREATE: Insert a new user
    const insertQuery = 'INSERT INTO users1 (name, email) VALUES ($1, $2) RETURNING *';
    const values = ['Alice', 'alice@example.com'];

    const insertRes = await client.query(insertQuery, values);
    console.log('👤 User created:', insertRes.rows[0]);

    // --- READ: Fetch all users
    const selectRes = await client.query('SELECT * FROM users1');
    console.log('📋 All users:');
    console.table(selectRes.rows);

  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await client.end();
    console.log('🔌 Disconnected');
  }
}

main();
