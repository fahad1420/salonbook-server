# SalonBook — Luxury Salon & Spa Backend API

Production-ready backend API service for **SalonBook**, a luxury salon and spa appointment booking platform.

## Tech Stack
- **Runtime:** Node.js (v20+) with TypeScript (Strict Mode)
- **Framework:** Express.js
- **Database:** MongoDB via Mongoose ORM (Serverless Connection Pooling)
- **Authentication:** JWT Bearer with Role-Based Access Control (RBAC) & Suspension Enforcement
- **Payment Processing:** Stripe Checkout & Cryptographically Verified Webhooks
- **Asset Storage:** ImgBB Multipart API
- **Deployment:** Vercel Serverless Function (`api/index.ts` + `vercel.json`)

## Architecture & Security Highlights
- **Zero AI Footprints:** Clean, idiomatic, human-style TypeScript without redundant line-by-line comments.
- **Strict Role-Based Security:** Customer vs. Admin guards with immediate suspension enforcement (`isBlocked === true` yields 403 Forbidden).
- **Slot Conflict Validation:** Prevents double-booking if an active (`pending` or `confirmed`) appointment exists for the same service and time slot.
- **Idempotent Webhook Processing:** Cryptographically signed Stripe webhooks (`stripe.webhooks.constructEvent`) record transactions and transition appointment payment status atomically.
- **Serverless-Optimized Pooling:** Reuses cached Mongoose connections across serverless lambda invocations to avoid connection saturation.

## Environment Variables (`.env`)
```bash
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000

# MongoDB Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/salonbook?retryWrites=true&w=majority

# Authentication Secrets
JWT_SECRET=your_jwt_secret_key_minimum_32_characters_long
BETTER_AUTH_SECRET=your_better_auth_secret_key

# Stripe Payment Keys
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# ImgBB API Key
IMGBB_API_KEY=your_imgbb_api_key
```

## API Endpoint Reference

### Authentication & Profiles
- `POST /api/auth/sign-up` — Public registration (Strictly assigns `customer` role)
- `POST /api/auth/sign-in` — Authenticates credentials, checks suspension status, returns JWT
- `POST /api/auth/google` — Google OAuth user sync
- `GET /api/auth/me` — Retrieves current authenticated profile
- `PUT /api/auth/profile` — Updates personal profile (name, image, phone)

### Media Uploads
- `POST /api/upload` — Multipart image upload directly streamed to ImgBB

### Salon Services
- `GET /api/services` — Public catalog of active services (`?search=`, `?category=`, `?sort=price_asc|price_desc`, `?limit=`)
- `GET /api/services/detail/:id` — Public single service details
- `GET /api/services/admin/all` — [Admin] All services (active & inactive)
- `POST /api/services` — [Admin] Create service with ImgBB image URL
- `PUT /api/services/:id` — [Admin] Update service specifications
- `PATCH /api/services/:id/status` — [Admin] Toggle active/inactive status
- `DELETE /api/services/:id` — [Admin] Delete service

### Appointments & Bookings
- `POST /api/appointments` — [Customer] Book appointment with slot conflict validation
- `GET /api/appointments/my` — [Customer] List customer's own reservations
- `GET /api/appointments/my/stats` — [Customer] Personal booking statistics
- `PATCH /api/appointments/:id/cancel` — [Customer] Cancel own pending reservation
- `GET /api/appointments/admin/all` — [Admin] List all salon appointments
- `GET /api/appointments/admin/stats` — [Admin] Operational metrics & revenue summary
- `PATCH /api/appointments/:id/status` — [Admin] Confirm or cancel appointment

### User Administration
- `GET /api/users` — [Admin] List all registered customers
- `PATCH /api/users/:id/block` — [Admin] Toggle customer account suspension

### Payments & Webhooks
- `POST /api/payments/create-checkout-session` — [Customer] Create Stripe checkout session for confirmed unpaid booking
- `POST /api/webhooks/stripe` — Cryptographically verified webhook listener
- `GET /api/payments/transactions` — [Admin] Read-only financial ledger with masked session IDs

## Database Seed
To populate the database with 1 Admin (`admin@salonbook.com` / `Password123!`), 1 Customer (`vivienne@example.com` / `Password123!`), and 8 realistic luxury salon services:
```bash
npm run seed
```
