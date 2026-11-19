import dotenv from 'dotenv';
dotenv.config();

import dns from 'node:dns';
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignore in environments where setting servers is restricted
}

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { Service, SERVICE_CATEGORIES } from '../models/Service';
import { Appointment } from '../models/Appointment';
import { Transaction } from '../models/Transaction';

const SEED_SERVICES = [
  {
    serviceName: 'Artisanal Precision Haircut & Blowout',
    category: 'Haircut & Styling',
    description:
      'Bespoke scissor architecture tailored to your facial contours, accompanied by a botanical scalp purification and our signature rose-gold volume blowout.',
    price: 120,
    duration: 60,
    image:
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
  },
  {
    serviceName: 'Sun-Drenched Balayage & Gloss Finish',
    category: 'Hair Coloring',
    description:
      'Hand-painted dimensional highlights paired with an organic acidic gloss treatment to produce soft, sun-kissed reflection and lasting brilliance.',
    price: 260,
    duration: 150,
    image:
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
  },
  {
    serviceName: 'Caviar & Keratin Restorative Therapy',
    category: 'Hair Treatment',
    description:
      'Deep-conditioning cellular infusion of marine caviar peptide complexes and micronized keratin to seal cuticles, repair thermal fatigue, and eliminate frizz.',
    price: 175,
    duration: 75,
    image:
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
  },
  {
    serviceName: '24K Gold Cellular Renewal Facial',
    category: 'Facial & Skincare',
    description:
      'Youth-restoring couture ritual featuring ultrasound exfoliation, lymphatic micro-sculpting, and genuine 24-karat colloidal gold mask nourishment.',
    price: 210,
    duration: 80,
    image:
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
  },
  {
    serviceName: 'Hydra-Luminescence Oxygen Therapy',
    category: 'Facial & Skincare',
    description:
      'Hyperbaric pure oxygen delivery blended with deep-sea hyaluronic acid to decongest, re-energize circulation, and yield an instant dewy glass-skin glow.',
    price: 165,
    duration: 60,
    image:
      'https://images.unsplash.com/photo-1512290900672-1f416d860d5b?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
  },
  {
    serviceName: 'Red Carpet Haute Couture Glamour',
    category: 'Makeup',
    description:
      'Editorial-grade couture makeup artistry employing luxury micronized pigments, bespoke silk lashes, and high-definition waterproof setting techniques.',
    price: 185,
    duration: 90,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
  },
  {
    serviceName: 'Rosewater & Cashmere Spa Manicure',
    category: 'Manicure & Pedicure',
    description:
      'Damask rose petal hand bath, sweet apricot seed micro-buffing, warm cashmere paraffin moisture wrap, and flawless organic vegan gel lacquer.',
    price: 85,
    duration: 50,
    image:
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
  },
  {
    serviceName: 'Aromatherapy Basalt Stone Body Ritual',
    category: 'Spa & Massage',
    description:
      'Harmonizing full-body massage utilizing polished volcanic basalt stones paired with warm cold-pressed sweet almond and French lavender botanical extracts.',
    price: 195,
    duration: 90,
    image:
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
  },
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('ERROR: MONGODB_URI is not set in environment.');
    process.exit(1);
  }

  try {
    console.log('Connecting to database...');
    await mongoose.connect(uri);
    console.log('Connected to MongoDB.');

    console.log('Clearing existing collections...');
    await Promise.all([
      User.deleteMany({}),
      Service.deleteMany({}),
      Appointment.deleteMany({}),
      Transaction.deleteMany({}),
    ]);

    console.log('Creating admin and customer accounts...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Password123!', salt);

    const admin = await User.create({
      name: 'Helena Vance',
      email: 'admin@salonbook.com',
      password: hashedPassword,
      role: 'admin',
      isBlocked: false,
      phone: '+1 (555) 234-8901',
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    });

    const customer = await User.create({
      name: 'Vivienne Laurent',
      email: 'vivienne@example.com',
      password: hashedPassword,
      role: 'customer',
      isBlocked: false,
      phone: '+1 (555) 678-1234',
      image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    });

    console.log(`Seeded Admin: ${admin.email}`);
    console.log(`Seeded Customer: ${customer.email}`);

    console.log('Seeding salon services...');
    const createdServices = await Service.insertMany(SEED_SERVICES);
    console.log(`Seeded ${createdServices.length} luxury salon services.`);

    console.log('Seed completed successfully.');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seed script failed:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seed();
