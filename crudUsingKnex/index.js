const express = require('express');

const knexConfig = require('./knexfile').development;
const knex = require('knex')(knexConfig);

const app = express();
app.use(express.json());

// Create (POST) - Add new user

app.post('/users', async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const [user] = await knex('users')
      .insert({ name, email })
      .returning(['id', 'name', 'email']);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

// Read all users 
app.get('/users', async (req, res, next) => {
  try {
    const users = await knex('users').select('id', 'name', 'email');
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// Read one user by ID 
app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await knex('users')
      .select('id', 'name', 'email')
      .where('id', req.params.id)
      .first();  //retrieve the first matching record as an object (or undefined if none found).

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Update user by ID 
app.put('/users/:id', async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const updated = await knex('users')
      .where('id', req.params.id)
      .update({ name, email, updated_at: knex.fn.now() });

      //The result stored in updated is the count of rows updated (number).

    if (!updated) return res.status(404).json({ message: 'User not found' });

    const user = await knex('users')
      .select('id', 'name', 'email')
      .where('id', req.params.id)
      .first();

    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Delete user by ID 
app.delete('/users/:id', async (req, res, next) => {
  try {
    const deleted = await knex('users').where('id', req.params.id).del();

    //The variable deleted contains the number of rows deleted (an integer).

    if (!deleted) return res.status(404).json({ message: 'User not found' });

    res.status(204).send(); // No Content
  } catch (err) {
    next(err);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
