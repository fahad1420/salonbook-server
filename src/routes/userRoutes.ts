import { Router } from 'express';
import {
  getAllCustomersAdmin,
  toggleCustomerBlockAdmin,
} from '../controllers/userController';
import { authenticate } from '../middleware/auth';
import { requireAdmin } from '../middleware/role';

const router = Router();

router.get('/', authenticate, requireAdmin, getAllCustomersAdmin);
router.patch('/:id/block', authenticate, requireAdmin, toggleCustomerBlockAdmin);

export default router;
