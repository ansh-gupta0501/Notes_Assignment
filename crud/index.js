
import express from 'express';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
const app = express();
dotenv.config();
app.use(express.json());

// Basic health check
app.get('/', (req, res) => {
  
  res.send('Blog Post API is running');
});

// API routes
app.use('/api/posts', postRoutes);

// Error handling middleware 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
