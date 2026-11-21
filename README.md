# SalonBook — Luxury Salon & Spa Backend API

Production-ready backend API service for **SalonBook**, a luxury salon and spa appointment booking platform.

## Live Production Links & Repositories
- **Production API URL:** [https://salonbook-api.vercel.app](https://salonbook-api.vercel.app)
- **Live Client Web App:** [https://salonbook-booking.vercel.app](https://salonbook-booking.vercel.app)
- **Backend GitHub Repository:** [https://github.com/fahad1420/salonbook-server](https://github.com/fahad1420/salonbook-server)
- **Frontend GitHub Repository:** [https://github.com/fahad1420/salonbook-client](https://github.com/fahad1420/salonbook-client)

---

## Tech Stack
- **Runtime:** Node.js (v20+) with TypeScript (Strict Mode)
- **Framework:** Express.js
- **Database:** MongoDB via MongoDB Native Driver & Mongoose ODM (Serverless Connection Pooling)
- **Authentication:** Better Auth (MongoDB Adapter) with Session Management & Google OAuth 2.0 Integration
- **Payment Processing:** Stripe Checkout & Cryptographically Verified Webhooks
- **Asset Storage:** ImgBB Multipart Server API
- **Deployment:** Vercel Serverless Function (`api/index.js` + `vercel.json`)

---

## Architecture & Security Highlights
- **Better Auth Integration:** Official Better Auth with MongoDB adapter managing users, accounts, sessions, and verification tokens.
- **Strict Role-Based Access Control:** Customer vs. Admin guards with immediate suspension enforcement (`isBlocked === true` yields 403 Forbidden). Public registration is strictly restricted to `customer`.
- **Duplicate Booking Prevention:** Validates slot availability to prevent overlapping active (`pending` or `confirmed`) appointments for the same service, date, and time slot.
- **Idempotent Webhook Processing:** Cryptographically signed Stripe webhooks (`stripe.webhooks.constructEvent` on `/api/webhooks/stripe`) atomically record transactions and update appointment payment status.
- **Secure Image Uploads:** Multi-part file uploads are processed entirely server-side through `/api/upload` to ImgBB without exposing API keys to the client.

---

## Evaluation Demo Credentials
| Role | Email | Password | Primary Feature Access |
|---|---|---|---|
| **Administrator** | `admin@salonbook.com` | `Password123!` | Executive KPIs, Service CRUD, ImgBB Uploads, Appointment Confirmation/Cancellation, Customer Suspension (`isBlocked`), Financial Ledger |
| **Customer** | `vivienne@example.com` | `Password123!` | Treatment Discovery, Predefined Slot Reservations, Real-Time Conflict Checks, Stripe Checkout, PDF Receipt Download |
| **Google Account** | Any Google Account | Google OAuth | One-click instant OAuth sign-in to customer portal |

---

## Environment Variables (`.env`)
```bash
NODE_ENV=production
PORT=5000
CLIENT_URL=https://salonbook-booking.vercel.app
BETTER_AUTH_URL=https://salonbook-api.vercel.app
BETTER_AUTH_SECRET=your_better_auth_secret_key

# MongoDB Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/salonbook?retryWrites=true&w=majority

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe Payment Keys
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# ImgBB API Key
IMGBB_API_KEY=your_imgbb_api_key
```

---

## API Endpoint Reference

### Better Auth & Identity
- `POST /api/auth/sign-up/email` — Email/password registration (Strictly assigns `customer` role)
- `POST /api/auth/sign-in/email` — Email/password authentication & session creation
- `POST /api/auth/sign-in/social` — Google OAuth session initiation
- `GET /api/auth/callback/google` — Google OAuth callback verification
- `GET /api/auth/get-session` — Session verification
- `POST /api/auth/sign-out` — Session revocation
- `GET /api/auth/me` — Retrieves current authenticated profile
- `PUT /api/auth/profile` — Updates personal profile (name, image, phone)

### Media Uploads
- `POST /api/upload` — Authenticated multipart image upload streamed to ImgBB

### Salon Services
- `GET /api/services` — Public catalog of active services (`?search=`, `?category=`, `?sort=price_asc|price_desc`)
- `GET /api/services/detail/:id` — Public single service details
- `GET /api/services/admin/all` — [Admin] All services (active & inactive)
- `POST /api/services` — [Admin] Create service with ImgBB image URL
- `PUT /api/services/:id` — [Admin] Update service specifications
- `PATCH /api/services/:id/status` — [Admin] Toggle active/inactive status
- `DELETE /api/services/:id` — [Admin] Delete service

### Appointments & Bookings
- `GET /api/appointments/booked-slots` — Real-time slot availability check (`?serviceId=&date=`)
- `POST /api/appointments` — [Customer] Book appointment with slot conflict validation
- `GET /api/appointments/my` — [Customer] List customer's own reservations
- `GET /api/appointments/my/stats` — [Customer] Personal booking statistics
- `PATCH /api/appointments/:id/cancel` — [Customer] Cancel own pending reservation
- `GET /api/appointments/admin/all` — [Admin] List all salon appointments
- `GET /api/appointments/admin/stats` — [Admin] Real-time operational metrics & revenue summary
- `PATCH /api/appointments/:id/status` — [Admin] Confirm or cancel appointment

### User Administration
- `GET /api/users` — [Admin] List registered customers
- `PATCH /api/users/:id/block` — [Admin] Toggle customer account suspension

### Payments & Webhooks
- `POST /api/payments/create-checkout-session` — [Customer] Create Stripe checkout session for confirmed unpaid booking
- `POST /api/webhooks/stripe` — Cryptographically verified Stripe webhook listener
- `GET /api/transactions` — [Admin] Read-only financial ledger
