import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import { auth, mongoClient } from './config/auth';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import uploadRoutes from './routes/uploadRoutes';
import serviceRoutes from './routes/serviceRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import userRoutes from './routes/userRoutes';
import paymentRoutes from './routes/paymentRoutes';
import webhookRoutes from './routes/webhookRoutes';
import { authenticate } from './middleware/auth';
import { requireAdmin } from './middleware/role';
import { getAllTransactionsAdmin } from './controllers/paymentController';

const app: Application = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  process.env.CLIENT_URL,
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'stripe-signature'],
    exposedHeaders: ['set-auth-token'],
  })
);

// 1. Mount raw body listener for Stripe Webhook before express.json() parser
app.use(
  ['/api/webhooks/stripe', '/api/payments/webhook'],
  express.raw({ type: 'application/json' })
);
app.use('/api/webhooks', webhookRoutes);

// 2. Compatibility & Profile Auth Routes (specific sub-routes)
app.use('/api/auth', authRoutes);

// 3. OAuth Callback handler with seamless token propagation for cross-origin reliability
app.all('/api/auth/callback/:provider', async (req: Request, res: Response, next) => {
  try {
    await connectDB();
    await mongoClient.connect().catch(() => {});

    const originalSetHeader = res.setHeader.bind(res);
    const originalWriteHead = res.writeHead.bind(res);
    let capturedLocation: string | null = null;
    const capturedCookies: string[] = [];

    res.setHeader = function (name: string, value: any) {
      if (name.toLowerCase() === 'location' && typeof value === 'string') {
        capturedLocation = value;
      }
      if (name.toLowerCase() === 'set-cookie') {
        if (Array.isArray(value)) {
          capturedCookies.push(...value);
        } else if (typeof value === 'string') {
          capturedCookies.push(value);
        }
      }
      return originalSetHeader(name, value);
    };

    res.writeHead = function (statusCode: number, ...args: any[]) {
      let location = capturedLocation || (res.getHeader('location') as string | undefined);
      if (location && (statusCode === 302 || statusCode === 301 || statusCode === 303 || statusCode === 307)) {
        const allCookies = [
          ...capturedCookies,
          ...((res.getHeader('set-cookie') as string[] | string) ? [].concat(res.getHeader('set-cookie') as any) : []),
        ];

        let sessionToken: string | null = null;
        for (const cookieStr of allCookies) {
          const match = cookieStr.match(/(?:__Secure-)?better-auth\.session_token=([^;]+)/);
          if (match && match[1]) {
            sessionToken = match[1];
            break;
          }
        }

        if (sessionToken && location.startsWith('http')) {
          try {
            const redirectUrl = new URL(location);
            if (
              redirectUrl.hostname.endsWith('vercel.app') ||
              redirectUrl.hostname === 'localhost' ||
              redirectUrl.hostname === '127.0.0.1'
            ) {
              redirectUrl.searchParams.set('token', sessionToken);
              location = redirectUrl.toString();
              originalSetHeader('location', location);
            }
          } catch (e) {
            console.error('Error modifying OAuth redirect URL:', e);
          }
        }
      }
      return (originalWriteHead as any)(statusCode, ...args);
    };

    return toNodeHandler(auth)(req, res);
  } catch (err) {
    next(err);
  }
});

// 4. Official Better Auth catch-all for /api/auth/sign-in/email, /api/auth/get-session, etc.
app.all('/api/auth/*', async (req: Request, res: Response, next) => {
  try {
    await connectDB();
    await mongoClient.connect().catch(() => {});
    return toNodeHandler(auth)(req, res);
  } catch (err) {
    next(err);
  }
});

// 5. JSON body parser for all other REST endpoints
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const clientUrl =
  process.env.CLIENT_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://salonbook-booking.vercel.app'
    : 'http://localhost:3000');

app.get(['/', '/error'], (req: Request, res: Response) => {
  const error = req.query.error;
  if (error) {
    return res.redirect(`${clientUrl}/sign-in?error=${encodeURIComponent(String(error))}`);
  }
  return res.redirect(clientUrl);
});

app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'SalonBook Server API',
    authEngine: 'Better Auth (MongoDB Adapter)',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// 5. Application Domain Routes
app.use('/api/upload', uploadRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);
app.get('/api/transactions', authenticate, requireAdmin, getAllTransactionsAdmin);

// Global 404 handler for unmatched routes
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'API route not found',
  });
});

export default app;
