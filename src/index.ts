import { Client } from 'pg';

const client = new Client(
  'postgresql://subhajit033:bCU5osZ4WFfc@ep-noisy-star-a5aia3el.us-east-2.aws.neon.tech/test-database?sslmode=require'
);

client
  .connect()
  .then(() => {
    console.log('connected..');
  })
  .catch((e) => {
    console.log(e);
  });

const createTable = async () => {
  const result = await client.query(`
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `);
  console.log(result);
};

const insertData = async (username: string, email: string, pass: string) => {
  try {
    const insertQuery =
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3);';

    const values = [username, email, pass];
    const res = await client.query(insertQuery, values);
    console.log('inserted succesfully..');
  } catch (e) {
    console.log(e);
  } finally {
    client.end();
  }
};

const getUser = async (email: string) => {
  try {
    const insertQuery = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const res = await client.query(insertQuery, values);
    if (res.rows.length > 0) {
      console.log(res.rows[0]);
    } else {
      console.log('No user found');
      return null;
    }
  } catch (e) {
    console.log(e);
  } finally {
    client.end();
  }
};

// createTable();
getUser('kundu@gmail.com');
