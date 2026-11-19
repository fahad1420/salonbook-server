import { Request, Response } from 'express';
import Stripe from 'stripe';
import { stripe } from '../config/stripe';
import { Appointment } from '../models/Appointment';
import { Transaction } from '../models/Transaction';
import { connectDB } from '../config/db';

export async function handleStripeWebhook(req: Request, res: Response): Promise<void> {
  const signature = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    res.status(400).json({
      success: false,
      message: 'Missing stripe signature header or STRIPE_WEBHOOK_SECRET environment key',
    });
    return;
  }

  let event: Stripe.Event;

  try {
    // Verified cryptographic signature check using raw body buffer
    event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err);
    res.status(400).json({
      success: false,
      message: `Webhook signature verification failed: ${(err as Error).message}`,
    });
    return;
  }

  try {
    await connectDB();

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const appointmentId = session.metadata?.appointmentId;
      const customerId = session.metadata?.customerId;
      const amountInDollars = (session.amount_total || 0) / 100;
      const currency = session.currency || 'usd';

      if (appointmentId && customerId) {
        // Idempotency check: Ensure payment is not double-recorded
        const existingTx = await Transaction.findOne({ stripeSessionId: session.id });

        if (!existingTx) {
          // Strictly inside this verified webhook: update appointment paymentStatus to 'paid'
          await Appointment.findByIdAndUpdate(appointmentId, {
            paymentStatus: 'paid',
          });

          await Transaction.create({
            appointmentId,
            customerId,
            amount: amountInDollars,
            currency,
            stripeSessionId: session.id,
            status: 'paid',
          });

          console.log(`Successfully verified and settled payment for Appointment ${appointmentId}`);
        }
      }
    } else if (event.type === 'checkout.session.async_payment_failed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const appointmentId = session.metadata?.appointmentId;
      const customerId = session.metadata?.customerId;
      const amountInDollars = (session.amount_total || 0) / 100;

      if (appointmentId && customerId) {
        const existingTx = await Transaction.findOne({ stripeSessionId: session.id });
        if (!existingTx) {
          await Transaction.create({
            appointmentId,
            customerId,
            amount: amountInDollars,
            currency: session.currency || 'usd',
            stripeSessionId: session.id,
            status: 'failed',
          });
        }
      }
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error processing Stripe webhook payload:', error);
    res.status(500).json({ success: false, message: 'Internal webhook execution failure' });
  }
}
