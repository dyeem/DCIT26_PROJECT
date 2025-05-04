import express from 'express';
import { 
    createProduct, 
    deleteProduct, 
    getProduct, 
    updateProduct 
} from '../controller/product.controller.js';
import { protect, admin } from '../Middleware/auth.js'; 

const router = express.Router();

// FETCH ALL PRODUCTS (Accessible to all authenticated users)
router.get('/', protect, getProduct);

// CREATE A PRODUCT (Admin only)
router.post('/', protect, admin, createProduct);

// UPDATING A PRODUCT BY ID (Admin only)
router.put('/:id', protect, admin, updateProduct);

// DELETING A PRODUCT BY ID (Admin only)
router.delete('/:id', protect, admin, deleteProduct);

export default router;
