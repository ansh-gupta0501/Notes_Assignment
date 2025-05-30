
import { query } from '../db.js';

export const getAllPosts = async () => {
  const result = await query('SELECT * FROM posts ORDER BY created_at DESC');
  return result.rows;
};


export const getPostById = async (id) => {
  const result = await query('SELECT * FROM posts WHERE id = $1', [id]);
  return result.rows[0];
};

export const createPost = async ({ title, content, author }) => {
  const result = await query(
    `INSERT INTO posts (title, content, author) 
     VALUES ($1, $2, $3) RETURNING *`,
    [title, content, author]
  );
  return result.rows[0];
};

export const updatePost = async (id, { title, content, author }) => {
  const result = await query(
    `UPDATE posts SET title = $1, content = $2, author = $3
     WHERE id = $4 RETURNING *`,
    [title, content, author, id]
  );
  return result.rows[0];
};

export const deletePost = async (id) => {
  await query('DELETE FROM posts WHERE id = $1', [id]);
};
