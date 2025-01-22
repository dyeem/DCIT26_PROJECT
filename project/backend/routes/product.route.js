import express from 'express';
import { createProduct, deleteProduct, getProduct, updateProduct } from '../controller/product.controller.js';

const router = express.Router();

// FETCH ALL PRODUCTS
router.get('/', getProduct)
  
// CREATE A PRODUCT
router.post('/', createProduct);

// UPDATING A PRODUCT BY ID
router.put('/:id', updateProduct)
  
// DELETING A PRODUCT BY ID
router.delete('/:id', deleteProduct);

export default router;