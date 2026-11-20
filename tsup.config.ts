import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/entry.ts',
  },
  format: ['esm'],
  target: 'node20',
  clean: false,
  outDir: 'api',
  outExtension() {
    return {
      js: '.js',
    };
  },
  splitting: false,
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
