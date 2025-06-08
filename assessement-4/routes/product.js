import express from 'express';
import {
  listProducts,
  getProduct,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
  searchProducts
} from '../controllers/product.js';

const router = express.Router();

router.get('/products', listProducts);
router.get('/productsByName', searchProducts);

router.get('/products/:id', getProduct);
router.post('/products', createProductHandler);
router.put('/products/:id', updateProductHandler);
router.delete('/products/:id', deleteProductHandler);

export default router;
