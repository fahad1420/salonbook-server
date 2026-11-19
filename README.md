# SalonBook — Luxury Salon & Spa Backend API

Production-ready backend API service for **SalonBook**, a luxury salon and spa appointment booking platform.

## Tech Stack
- **Runtime:** Node.js (v20+) with TypeScript
- **Framework:** Express.js
- **Database:** MongoDB via Mongoose ORM
- **Authentication:** JWT Bearer & Session Tokens with Role-Based Access Control (RBAC)
- **Payment Processing:** Stripe Checkout & Cryptographically Verified Webhooks
- **Asset Storage:** ImgBB Multipart API
- **Deployment:** Vercel Serverless

## Key Features
- **Strict Role-Based Security:** Customer vs. Admin guards with immediate suspension enforcement (`isBlocked`).
- **Slot Conflict Validation:** Prevents overlapping double-bookings for the same service and time window.
- **Idempotent Webhook Processing:** Cryptographically signed Stripe webhooks record transactions and transition appointment states atomically.
- **Serverless-Optimized Pooling:** Reuses cached Mongoose connections across serverless lambda invocations.

## API Documentation
- `GET /api/health` — Service health check
- `POST /api/auth/sign-up` — Customer registration
- `POST /api/auth/sign-in` — Customer & Admin authentication
- `GET /api/auth/me` — Current authenticated profile
- `PUT /api/auth/profile` — Update personal profile details
- `GET /api/services` — List active services with search, category filter, and sorting
- `GET /api/services/:id` — Single service details
- `POST /api/services` — [Admin] Create service with ImgBB upload
- `PUT /api/services/:id` — [Admin] Update service
- `DELETE /api/services/:id` — [Admin] Remove service
- `POST /api/appointments` — [Customer] Book appointment with slot conflict check
- `GET /api/appointments/my` — [Customer] List authenticated customer bookings
- `PATCH /api/appointments/:id/cancel` — [Customer] Cancel pending appointment
- `GET /api/appointments` — [Admin] List all salon appointments
- `PATCH /api/appointments/:id/status` — [Admin] Confirm or cancel appointment
- `GET /api/users` — [Admin] List all registered customers
- `PATCH /api/users/:id/block` — [Admin] Toggle customer account suspension
- `POST /api/payments/create-checkout-session` — [Customer] Generate Stripe checkout session
- `POST /api/webhooks/stripe` — Stripe raw-body webhook listener
- `GET /api/transactions` — [Admin] View financial ledger with masked session IDs
