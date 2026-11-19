import { Router } from 'express';
import {
  getActiveServices,
  getServiceById,
  getAllServicesAdmin,
  createService,
  updateService,
  toggleServiceStatus,
  deleteService,
} from '../controllers/serviceController';
import { authenticate } from '../middleware/auth';
import { requireAdmin } from '../middleware/role';

const router = Router();

// Public routes
router.get('/', getActiveServices);
router.get('/detail/:id', getServiceById);

// Admin-protected routes
router.get('/admin/all', authenticate, requireAdmin, getAllServicesAdmin);
router.post('/', authenticate, requireAdmin, createService);
router.put('/:id', authenticate, requireAdmin, updateService);
router.patch('/:id/status', authenticate, requireAdmin, toggleServiceStatus);
router.delete('/:id', authenticate, requireAdmin, deleteService);

export default router;
