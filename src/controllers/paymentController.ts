import { Response } from 'express';
import { stripe } from '../config/stripe';
import { Appointment } from '../models/Appointment';
import { Service } from '../models/Service';
import { Transaction } from '../models/Transaction';
import { AuthenticatedRequest } from '../middleware/auth';
import { connectDB } from '../config/db';

export async function createCheckoutSession(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    if (req.user.isBlocked) {
      res.status(403).json({ success: false, message: 'Account is suspended' });
      return;
    }

    await connectDB();
    const { appointmentId } = req.body;

    if (!appointmentId) {
      res.status(400).json({ success: false, message: 'Appointment ID is required' });
      return;
    }

    const appointment = await Appointment.findOne({
      _id: appointmentId,
      customerId: req.user._id,
    });

    if (!appointment) {
      res.status(404).json({ success: false, message: 'Appointment reservation not found' });
      return;
    }

    // Pay Now is permitted ONLY when status === 'confirmed' AND paymentStatus === 'unpaid'
    if (appointment.status !== 'confirmed') {
      res.status(400).json({
        success: false,
        message: 'Payment is only permitted for confirmed appointments.',
      });
      return;
    }

    if (appointment.paymentStatus === 'paid') {
      res.status(400).json({
        success: false,
        message: 'This appointment has already been paid in full.',
      });
      return;
    }

    const service = await Service.findById(appointment.serviceId);
    if (!service) {
      res.status(404).json({ success: false, message: 'Associated service not found' });
      return;
    }

    const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: req.user.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `SalonBook: ${service.serviceName}`,
              description: `Date: ${appointment.appointmentDate} | Slot: ${appointment.timeSlot}`,
              images: service.image.startsWith('http') ? [service.image] : undefined,
            },
            unit_amount: Math.round(appointment.servicePrice * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        appointmentId: appointment._id.toString(),
        customerId: req.user._id.toString(),
        serviceId: service._id.toString(),
      },
      success_url: `${clientUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientUrl}/payment/cancel?appointment_id=${appointment._id.toString()}`,
    });

    res.status(200).json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Create checkout session error:', error);
    res.status(500).json({
      success: false,
      message: (error as Error).message || 'Failed to initiate Stripe checkout',
    });
  }
}

export async function getAllTransactionsAdmin(
  _req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    await connectDB();
    const transactions = await Transaction.find()
      .populate('customerId', 'name email phone')
      .populate({
        path: 'appointmentId',
        select: 'appointmentDate timeSlot servicePrice status paymentStatus serviceId',
        populate: {
          path: 'serviceId',
          select: 'serviceName category',
        },
      })
      .sort({ createdAt: -1 });

    const formatted = transactions.map((t) => {
      const fullId = t.stripeSessionId || '';
      const maskedSessionId =
        fullId.length > 16
          ? `${fullId.substring(0, 8)}...${fullId.substring(fullId.length - 8)}`
          : fullId;

      return {
        _id: t._id,
        amount: t.amount,
        currency: t.currency.toUpperCase(),
        status: t.status,
        stripeSessionId: maskedSessionId,
        fullSessionId: fullId,
        createdAt: t.createdAt,
        customer: t.customerId,
        appointment: t.appointmentId,
      };
    });

    res.status(200).json({
      success: true,
      count: formatted.length,
      data: formatted,
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve transactions ledger' });
  }
}
