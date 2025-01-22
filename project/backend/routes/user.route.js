import express from 'express';
import { 
    createUser, 
    deleteUser, 
    getUsers, 
    updateUser } 
from '../controller/user.controller.js';

/*NOTE
  200 - Success Request
  201 - Created product
  404 - Not Found
  500 - Internal Server Error
*/

const router = express.Router();

router.post('/', createUser);

router.put('/:id', updateUser);

export default router;