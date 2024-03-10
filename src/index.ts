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

const createAdd = async () => {
  try {
    const result = await client.query(`
            CREATE TABLE addresses (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                city VARCHAR(100) NOT NULL,
                country VARCHAR(100) NOT NULL,
                street VARCHAR(255) NOT NULL,
                pincode VARCHAR(20),
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
    `);
    console.log('Address table craeted..');
  } catch (e) {
    console.log(e);
  } finally {
    client.end();
  }
};

const insertData = async () => {
  try {
    const insertQuery = `DROP users;`;

    // const values = [username, email, pass];
    const res = await client.query(insertQuery);
    console.log('inserted succesfully..');
  } catch (e) {
    console.log(e);
  } finally {
    client.end();
  }
};

const getUser = async () => {
  try {
    const insertQuery = `SELECT users.id, users.username, users.email, addresses.city, addresses.country, addresses.street, addresses.pincode
    FROM users
    JOIN addresses ON addresses.user_id = users.id
    WHERE users.id = '1';`;
    // const values = [email];
    const res = await client.query(insertQuery);
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
// createAdd();
insertData();
