import mongoose, { Document, Schema, Model } from 'mongoose';

export const SALON_TIME_SLOTS = [
  '10:00 AM - 11:00 AM',
  '11:30 AM - 12:30 PM',
  '02:00 PM - 03:00 PM',
  '04:00 PM - 05:00 PM',
  '06:00 PM - 07:00 PM',
] as const;

export type SalonTimeSlot = (typeof SALON_TIME_SLOTS)[number];

export interface IAppointment extends Document {
  serviceId: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  appointmentDate: string;
  timeSlot: SalonTimeSlot;
  message?: string;
  servicePrice: number;
  paymentStatus: 'unpaid' | 'paid';
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: [true, 'Service reference is required'],
      index: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Customer reference is required'],
      index: true,
    },
    appointmentDate: {
      type: String,
      required: [true, 'Appointment date is required'],
      match: [/^\d{4}-\d{2}-\d{2}$/, 'Date format must be YYYY-MM-DD'],
      index: true,
    },
    timeSlot: {
      type: String,
      required: [true, 'Time slot is required'],
      enum: SALON_TIME_SLOTS,
      index: true,
    },
    message: {
      type: String,
      default: '',
      trim: true,
    },
    servicePrice: {
      type: Number,
      required: [true, 'Service price is required'],
      min: [1, 'Price must be greater than 0'],
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid'],
      default: 'unpaid',
      index: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
      index: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

// Compound index for slot conflict queries
AppointmentSchema.index(
  { serviceId: 1, appointmentDate: 1, timeSlot: 1, status: 1 }
);

export const Appointment: Model<IAppointment> =
  mongoose.models.Appointment ||
  mongoose.model<IAppointment>('Appointment', AppointmentSchema);
