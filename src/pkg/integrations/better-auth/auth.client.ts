import { createAuthClient } from 'better-auth/react'
import { envClient } from '@/config/env'

export const authClient = createAuthClient({
  baseURL: envClient.NEXT_PUBLIC_APP_URL,
})

export const { signIn, signUp, signOut, useSession } = authClient
