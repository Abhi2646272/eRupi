const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = 3002;

app.use(cors());
// PostgreSQL database connection pool
const pool = new Pool({
  user: 'Abhishek', // Replace with your PostgreSQL username
  host: 'localhost', // Replace with your PostgreSQL host
  database: 'erupee', // Replace with your PostgreSQL database name
  password: '12345', // Replace with your PostgreSQL password
  port: 5432, // Replace with your PostgreSQL port (default is 5432)
});

app.use(bodyParser.json());

// Route to handle user registration
app.get('/', async(req,res) =>{
  res.send("Hello World")
})
app.post('/register', async (req, res) => {
  try {
    const { name, email, password, erupiBalance } = req.body;

    // Check if the email already exists in the database
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Insert the new user into the database
    await pool.query(
      'INSERT INTO users (name, email, password, erupi_balance) VALUES ($1, $2, $3, $4)',
      [name, email, password, erupiBalance]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
