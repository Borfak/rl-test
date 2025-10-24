import { defineConfig } from 'drizzle-kit'

import { envServer } from '@/config/env'

export default defineConfig({
  out: './drizzle',
  schema: './src/app/entities/db/schemas',
  dialect: 'postgresql',
  dbCredentials: {
    url: envServer.DATABASE_URL,
  },
  verbose: true,
  strict: true,
})