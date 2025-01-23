import express from 'express';
import { 
    createUser, 
    deleteUser, 
    getUsers, 
    updateUser } 
from '../controller/user.controller.js';
import { admin, protect } from '../Middleware/auth.js';

const router = express.Router();

// users routes
router.get('/', protect, admin, getUsers); //get all users
router.post('/', protect, admin, createUser); //create user
router.put('/:id', protect, admin, updateUser); //update user
router.delete('/:id',protect, admin, deleteUser); //delete user

export default router;