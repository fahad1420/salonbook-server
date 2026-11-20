import express, { Router } from 'express';
import {
  signUp,
  signIn,
  googleTokenAuth,
  getMe,
  updateProfile,
} from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = Router();

const jsonParser = express.json({ limit: '5mb' });

router.post('/sign-up', jsonParser, signUp);
router.post('/sign-in', jsonParser, signIn);
router.post('/google-token', jsonParser, googleTokenAuth);
router.get('/me', authenticate, getMe);
router.put('/profile', jsonParser, authenticate, updateProfile);

export default router;
