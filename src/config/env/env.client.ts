import { z } from 'zod'
import { createEnv } from '@t3-oss/env-nextjs'

// env client
export const envClient = createEnv({
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 
      (typeof window !== 'undefined' ? window.location.origin : 
        process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
        'http://localhost:3000'),
  },
})
