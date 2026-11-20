
import { Request, Response } from 'express';
import { Appointment, SALON_TIME_SLOTS, SalonTimeSlot } from '../models/Appointment';
import { Service } from '../models/Service';
import { User } from '../models/User';
import { Transaction } from '../models/Transaction';
import { AuthenticatedRequest } from '../middleware/auth';
import { connectDB } from '../config/db';

export async function createBooking(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    if (req.user.role !== 'customer') {
      res.status(403).json({
        success: false,
        message: 'Administrative accounts cannot submit customer bookings',
      });
      return;
    }

    if (req.user.isBlocked) {
      res.status(403).json({
        success: false,
        message: 'Your account is suspended. Bookings are disabled.',
      });
      return;
    }

    await connectDB();
    const { serviceId, message } = req.body;
    const appointmentDate = req.body.appointmentDate || req.body.serviceDate;
    const timeSlot = req.body.timeSlot;

    if (!serviceId) {
      res.status(400).json({ success: false, message: 'Service ID is required' });
      return;
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      res.status(404).json({ success: false, message: 'Service not found' });
      return;
    }

    if (service.status !== 'active') {
      res.status(400).json({
        success: false,
        message: 'This salon service is currently inactive and cannot be reserved.',
      });
      return;
    }

    if (!appointmentDate || !/^\d{4}-\d{2}-\d{2}$/.test(appointmentDate)) {
      res.status(400).json({
        success: false,
        message: 'Valid appointment date (YYYY-MM-DD) is required',
      });
      return;
    }

    // Disallow past dates
    const today = new Date().toISOString().split('T')[0];
    if (appointmentDate < today) {
      res.status(400).json({
        success: false,
        message: 'Cannot schedule appointments for past dates',
      });
      return;
    }

    if (!timeSlot || !SALON_TIME_SLOTS.includes(timeSlot as SalonTimeSlot)) {
      res.status(400).json({
        success: false,
        message: `Valid time slot required. Available slots: ${SALON_TIME_SLOTS.join(', ')}`,
      });
      return;
    }

    // Check 1: Prevent duplicate active appointment for the same customer, date, and time slot
    const customerConflict = await Appointment.findOne({
      customerId: req.user._id,
      appointmentDate,
      timeSlot,
      status: { $in: ['pending', 'confirmed'] },
    });

    if (customerConflict) {
      res.status(409).json({
        success: false,
        message:
          'You already have an active appointment scheduled for this date and time slot. Please choose another time slot.',
      });
      return;
    }

    // Check 2: Prevent slot conflict for the same service, date, and time slot
    const serviceConflict = await Appointment.findOne({
      serviceId: service._id,
      appointmentDate,
      timeSlot,
      status: { $in: ['pending', 'confirmed'] },
    });

    if (serviceConflict) {
      res.status(409).json({
        success: false,
        message:
          'This appointment time slot has already been reserved for this service. Please select another slot.',
      });
      return;
    }

    const appointment = await Appointment.create({
      serviceId: service._id,
      customerId: req.user._id,
      appointmentDate,
      timeSlot,
      message: typeof message === 'string' ? message.trim() : '',
      servicePrice: service.price,
      paymentStatus: 'unpaid',
      status: 'pending',
    });

    const populated = await Appointment.findById(appointment._id)
      .populate('serviceId', 'serviceName category price duration image')
      .populate('customerId', 'name email phone');

    res.status(201).json({
      success: true,
      message: 'Appointment request submitted successfully',
      data: populated,
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ success: false, message: 'Failed to create appointment booking' });
  }
}

export async function getCustomerAppointments(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    await connectDB();
    const appointments = await Appointment.find({ customerId: req.user._id })
      .populate('serviceId', 'serviceName category price duration image status')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    console.error('Get customer appointments error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve appointments' });
  }
}

export async function getCustomerDashboardStats(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    await connectDB();
    const customerId = req.user._id;

    const [total, pending, confirmed, cancelled] = await Promise.all([
      Appointment.countDocuments({ customerId }),
      Appointment.countDocuments({ customerId, status: 'pending' }),
      Appointment.countDocuments({ customerId, status: 'confirmed' }),
      Appointment.countDocuments({ customerId, status: 'cancelled' }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalRequests: total,
        pending,
        confirmed,
        cancelled,
      },
    });
  } catch (error) {
    console.error('Customer stats error:', error);
    res.status(500).json({ success: false, message: 'Failed to calculate statistics' });
  }
}

export async function cancelCustomerAppointment(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    await connectDB();
    const { id } = req.params;

    const appointment = await Appointment.findOne({
      _id: id,
      customerId: req.user._id,
    });

    if (!appointment) {
      res.status(404).json({ success: false, message: 'Appointment not found' });
      return;
    }

    // Cancellation is strictly allowed ONLY for own pending appointments
    if (appointment.status !== 'pending') {
      res.status(400).json({
        success: false,
        message: 'Only pending appointment requests can be cancelled directly by the customer.',
      });
      return;
    }

    appointment.status = 'cancelled';
    await appointment.save();

    res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully',
      data: appointment,
    });
  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({ success: false, message: 'Failed to cancel appointment' });
  }
}

export async function getAllAppointmentsAdmin(
  _req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    await connectDB();
    const appointments = await Appointment.find()
      .populate('serviceId', 'serviceName category price duration image status')
      .populate('customerId', 'name email phone isBlocked')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    console.error('Admin get appointments error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve appointments' });
  }
}

export async function updateAppointmentStatusAdmin(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    await connectDB();
    const { id } = req.params;
    const { status } = req.body;

    if (!['confirmed', 'cancelled'].includes(status)) {
      res.status(400).json({
        success: false,
        message: 'Invalid status. Status can only be updated to confirmed or cancelled.',
      });
      return;
    }

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      res.status(404).json({ success: false, message: 'Appointment not found' });
      return;
    }

    // Confirm is allowed only when status is pending
    if (status === 'confirmed' && appointment.status !== 'pending') {
      res.status(400).json({
        success: false,
        message: 'Only pending appointments can be confirmed.',
      });
      return;
    }

    // Cancel is allowed only when status is pending or confirmed
    if (status === 'cancelled' && !['pending', 'confirmed'].includes(appointment.status)) {
      res.status(400).json({
        success: false,
        message: 'Only pending or confirmed appointments can be cancelled.',
      });
      return;
    }

    appointment.status = status;
    await appointment.save();

    const populated = await Appointment.findById(id)
      .populate('serviceId', 'serviceName category price duration image')
      .populate('customerId', 'name email phone');

    res.status(200).json({
      success: true,
      message: `Appointment ${status} successfully`,
      data: populated,
    });
  } catch (error) {
    console.error('Admin update status error:', error);
    res.status(500).json({ success: false, message: 'Failed to update appointment status' });
  }
}

export async function getAdminDashboardStats(
  _req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    await connectDB();

    const [
      totalCustomers,
      activeServices,
      totalAppointments,
      pendingAppointments,
      confirmedAppointments,
      successfulPayments,
    ] = await Promise.all([
      User.countDocuments({ role: 'customer' }),
      Service.countDocuments({ status: 'active' }),
      Appointment.countDocuments(),
      Appointment.countDocuments({ status: 'pending' }),
      Appointment.countDocuments({ status: 'confirmed' }),
      Transaction.countDocuments({ status: 'paid' }),
    ]);

    const revenueResult = await Transaction.aggregate([
      { $match: { status: 'paid' } },
      { $group: { _id: null, totalRevenue: { $sum: '$amount' } } },
    ]);

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    res.status(200).json({
      success: true,
      data: {
        totalCustomers,
        activeServices,
        totalAppointments,
        pendingAppointments,
        confirmedAppointments,
        successfulPayments,
        totalRevenue,
      },
    });
  } catch (error) {
    console.error('Admin dashboard stats error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve metrics' });
  }
}

export async function getBookedSlots(req: Request, res: Response): Promise<void> {
  try {
    await connectDB();
    const { serviceId, date, customerId } = req.query;

    if (!serviceId || !date) {
      res.status(400).json({
        success: false,
        message: 'serviceId and date query parameters are required',
      });
      return;
    }

    const queryConditions: Array<Record<string, unknown>> = [
      {
        serviceId,
        appointmentDate: String(date),
        status: { $in: ['pending', 'confirmed'] },
      },
    ];

    if (customerId && typeof customerId === 'string' && customerId.trim().length > 0) {
      queryConditions.push({
        customerId: customerId.trim(),
        appointmentDate: String(date),
        status: { $in: ['pending', 'confirmed'] },
      });
    }

    const activeBookings = await Appointment.find({
      $or: queryConditions,
    }).select('timeSlot');

    const bookedSlots = Array.from(new Set(activeBookings.map((b) => b.timeSlot)));

    res.status(200).json({
      success: true,
      bookedSlots,
    });
  } catch (error) {
    console.error('Booked slots error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch booked slots' });
  }
}

export async function getAppointmentById(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    await connectDB();
    const { id } = req.params;

    const appointment = await Appointment.findById(id)
      .populate('serviceId', 'serviceName category price duration image')
      .populate('customerId', 'name email phone avatar');

    if (!appointment) {
      res.status(404).json({ success: false, message: 'Appointment not found' });
      return;
    }

    // Role check: customer can only view their own appointment
    const customerObjId = (appointment.customerId as any)?._id || appointment.customerId;
    if (
      req.user.role === 'customer' &&
      customerObjId.toString() !== req.user._id.toString()
    ) {
      res.status(403).json({
        success: false,
        message: 'Access denied. You do not have permission to view this reservation.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.error('Get appointment by ID error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve reservation' });
  }
}


