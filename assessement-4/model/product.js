

import {query} from '../db/index.js';

export const getPaginatedProducts = async ({ page, limit }) => {
  const offset = (page - 1) * limit;

  const sqlquery = `
    SELECT * FROM products
    ORDER BY id
    LIMIT $1 OFFSET $2
  `;

  const values = [limit, offset];

  const { rows } = await query(sqlquery, values);
  return rows;
};


export const searchProductsByName = async (search) => {
  const sqlquery = `
    SELECT * FROM products
    WHERE LOWER(name) LIKE $1
    ORDER BY id
  `;
  const values = [`%${search.toLowerCase()}%`];

  const { rows } = await query(sqlquery, values);
  return rows;
};


export const getProductById = async (id) => {
  const result = await query('SELECT * FROM products WHERE id = $1', [id]);
  return result.rows[0];
};

export const createProduct = async ({ name, price, stock }) => {
  const result = await query(
    'INSERT INTO products (name, price, stock) VALUES ($1, $2, $3) RETURNING *',
    [name, price, stock]
  );
  return result.rows[0];
};

export const updateProduct = async (id, { name, price, stock }) => {
  const result = await query(
    'UPDATE products SET name=$1, price=$2, stock=$3 WHERE id=$4 RETURNING *',
    [name, price, stock, id]
  );
  return result.rows[0];
};

export const deleteProduct = async (id) => {
  const result = await query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};
