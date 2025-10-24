import ky, { KyInstance } from 'ky'

import { envClient } from '@/config/env'

export const localApiFetcher: KyInstance = ky.create({
  prefixUrl: `${envClient.NEXT_PUBLIC_APP_URL}/api`,
  credentials: 'include',
  throwHttpErrors: true,
  timeout: 30000,
})
