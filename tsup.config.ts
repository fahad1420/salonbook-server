import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['api/index.ts'],
  format: ['esm'],
  target: 'node20',
  clean: false,
  outDir: 'api_dist',
  bundle: true,
  noExternal: ['better-auth', '@better-auth/mongo-adapter', 'better-call'],
  external: [
    'mongoose',
    'mongodb',
    'express',
    'cors',
    'bcryptjs',
    'multer',
    'stripe',
    'dotenv',
  ],
});
