import { Router } from 'express';
import {
  createBooking,
  getCustomerAppointments,
  getCustomerDashboardStats,
  cancelCustomerAppointment,
  getAllAppointmentsAdmin,
  updateAppointmentStatusAdmin,
  getAdminDashboardStats,
} from '../controllers/appointmentController';
import { authenticate } from '../middleware/auth';
import { requireAdmin, requireCustomer } from '../middleware/role';

const router = Router();

// Customer endpoints
router.post('/', authenticate, requireCustomer, createBooking);
router.get('/my', authenticate, requireCustomer, getCustomerAppointments);
router.get('/my/stats', authenticate, requireCustomer, getCustomerDashboardStats);
router.patch('/:id/cancel', authenticate, requireCustomer, cancelCustomerAppointment);

// Admin endpoints
router.get('/admin/all', authenticate, requireAdmin, getAllAppointmentsAdmin);
router.get('/admin/stats', authenticate, requireAdmin, getAdminDashboardStats);
router.patch('/:id/status', authenticate, requireAdmin, updateAppointmentStatusAdmin);

export default router;
