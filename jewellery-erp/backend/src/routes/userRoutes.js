import express from 'express';
import { registerUser, loginUser, getUsers, getUserById, updateUser } from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', protect, authorize('admin', 'manager'), getUsers);
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);

export default router;
