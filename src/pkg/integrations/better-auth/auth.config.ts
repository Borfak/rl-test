import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '@/pkg/integrations/drizzle'
import * as schema from '@/app/entities/db/schemas'
import { envServer } from '@/config/env'
import { envClient } from '@/config/env'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  secret: envServer.BETTER_AUTH_SECRET,
  trustedOrigins: [envClient.NEXT_PUBLIC_APP_URL],
})
