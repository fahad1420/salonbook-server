import { Router } from 'express';
import {
  createCheckoutSession,
  getAllTransactionsAdmin,
} from '../controllers/paymentController';
import { authenticate } from '../middleware/auth';
import { requireAdmin, requireCustomer } from '../middleware/role';

const router = Router();

router.post('/create-checkout-session', authenticate, requireCustomer, createCheckoutSession);
router.get('/transactions', authenticate, requireAdmin, getAllTransactionsAdmin);

export default router;
