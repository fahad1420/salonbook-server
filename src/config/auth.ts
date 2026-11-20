import dns from 'node:dns';
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignored in environments where DNS servers cannot be overridden
}

import { MongoClient } from 'mongodb';
import { betterAuth } from 'better-auth';
import { mongodbAdapter } from '@better-auth/mongo-adapter';
import { bearer } from 'better-auth/plugins/bearer';
import bcrypt from 'bcryptjs';

const mongoUri =
  process.env.MONGODB_URI ||
  'mongodb://127.0.0.1:27017/salonbook';

export const mongoClient = new MongoClient(mongoUri, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
});

mongoClient.connect().catch((err) => {
  console.error('Initial mongoClient connect error:', err);
});

const db = mongoClient.db();

const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
const serverUrl =
  process.env.BETTER_AUTH_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://salonbook-api.vercel.app'
    : 'http://localhost:5000');

const googleClientId = (process.env.GOOGLE_CLIENT_ID || '')
  .replace(/^\uFEFF/, '')
  .replace(/['"\s]/g, '')
  .trim();

const googleClientSecret = (process.env.GOOGLE_CLIENT_SECRET || '')
  .replace(/^\uFEFF/, '')
  .replace(/['"\s]/g, '')
  .trim();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client: mongoClient,
  }),
  user: {
    modelName: 'users',
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'customer',
        input: false,
      },
      isBlocked: {
        type: 'boolean',
        defaultValue: false,
        input: false,
      },
      phone: {
        type: 'string',
        defaultValue: '',
        input: true,
      },
    },
  },
  session: {
    modelName: 'sessions',
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  account: {
    modelName: 'accounts',
    skipStateCookieCheck: true,
  },
  advanced: {
    useSecureCookies: true,
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: true,
      partitioned: true,
    },
  },
  verification: {
    modelName: 'verifications',
  },
  emailAndPassword: {
    enabled: true,
    password: {
      hash: async (password: string) => bcrypt.hash(password, 10),
      verify: async ({ hash, password }: { hash: string; password: string }) =>
        bcrypt.compare(password, hash),
    },
  },
  socialProviders: {
    google: {
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user: any) => {
          return {
            data: {
              ...user,
              role: 'customer',
              isBlocked: false,
            },
          };
        },
      },
    },
  },
  plugins: [bearer()],
  baseURL: serverUrl,
  secret:
    process.env.BETTER_AUTH_SECRET ||
    'salonbook_better_auth_secret_key_production_2026_secure',
  trustedOrigins: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://salonbook-booking.vercel.app',
    clientUrl,
  ].filter(Boolean),
});
