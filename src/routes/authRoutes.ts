import { Router } from 'express';
import {
  signUp,
  signIn,
  googleAuth,
  getMe,
  updateProfile,
} from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.post('/google', googleAuth);
router.get('/me', authenticate, getMe);
router.put('/profile', authenticate, updateProfile);

export default router;
