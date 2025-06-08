import {
  getPaginatedProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProductsByName
} from '../model/product.js';

export const listProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const products = await getPaginatedProducts({ page, limit });

    res.json({
      page,
      limit,
      products
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const search = req.query.search;

    if (!search) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const products = await searchProductsByName(search);

    res.json(products);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to search products' });
  }
};
app.use(users)
app.get(users)

export const getProduct = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createProductHandler = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    if (!name || price < 0 || stock < 0)
      return res.status(400).json({ error: 'Invalid input' });

    const product = await createProduct({ name, price, stock });
    res.status(201).json({
      message : "product inserted successfuly",
      data : product
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateProductHandler = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const product = await updateProduct(req.params.id, { name, price, stock });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({
      message : "product updated successfuly",
      data: product
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteProductHandler = async (req, res) => {
  try {
    const product = await deleteProduct(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
