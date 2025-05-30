
import * as postModel from '../models/post.js';


const validatePost = (post) => {
  const errors = [];
  if (!post.title || typeof post.title !== 'string') errors.push('Title is required');
  if (!post.content || typeof post.content !== 'string') errors.push('Content is required');
  if (!post.author || typeof post.author !== 'string') errors.push('Author is required');
  return errors;
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await postModel.getPostById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const errors = validatePost(req.body);
    if (errors.length) return res.status(400).json({ errors });

    const newPost = await postModel.createPost(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const errors = validatePost(req.body);
    if (errors.length) return res.status(400).json({ errors });

    const existingPost = await postModel.getPostById(req.params.id);
    if (!existingPost) return res.status(404).json({ error: 'Post not found' });

    const updatedPost = await postModel.updatePost(req.params.id, req.body);
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const existingPost = await postModel.getPostById(req.params.id);
    if (!existingPost) return res.status(404).json({ error: 'Post not found' });

    await postModel.deletePost(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
