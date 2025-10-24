'use client'

import { useSession as useBetterAuthSession } from '@/pkg/integrations/better-auth'

export const useSession = () => {
  return useBetterAuthSession()
}
