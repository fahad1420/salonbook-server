import dns from 'node:dns';
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignored in environments where DNS servers cannot be overridden
}

import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const dynamicImport = new Function('specifier', 'return import(specifier)') as (
  specifier: string
) => Promise<any>;

const mongoUri =
  process.env.MONGODB_URI ||
  'mongodb+srv://fahadhossain04_db_user:taY4IFn2PrqN6Kak@cluster0.ulcxjyj.mongodb.net/salonbook?retryWrites=true&w=majority';

export const mongoClient = new MongoClient(mongoUri);
const db = mongoClient.db();

const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
const serverUrl =
  process.env.BETTER_AUTH_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://salonbook-api.vercel.app'
    : 'http://localhost:5000');

let authInstancePromise: Promise<{
  auth: any;
  toNodeHandler: (auth: any) => (req: any, res: any) => Promise<any>;
  fromNodeHeaders: (headers: any) => Headers;
}> | null = null;

export async function getAuth() {
  if (!authInstancePromise) {
    authInstancePromise = (async () => {
      const [
        { betterAuth },
        { mongodbAdapter },
        { bearer },
        { toNodeHandler, fromNodeHeaders },
      ] = await Promise.all([
        dynamicImport('better-auth'),
        dynamicImport('@better-auth/mongo-adapter'),
        dynamicImport('better-auth/plugins/bearer'),
        dynamicImport('better-auth/node'),
      ]);

      const auth = betterAuth({
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
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
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

      return { auth, toNodeHandler, fromNodeHeaders };
    })();
  }

  return authInstancePromise;
}
