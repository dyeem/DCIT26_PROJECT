import express from 'express';
import { 
    createUser, 
    deleteUser, 
    getUsers, 
    updateUser } 
from '../controller/user.controller.js';
import { admin, protect } from '../Middleware/auth.js';

const router = express.Router();

router.get('/', protect, admin, getUsers);
router.post('/', protect, admin, createUser);
router.put('/:id', protect, admin, updateUser);
router.delete('/:id',protect, admin, deleteUser);

export default router;