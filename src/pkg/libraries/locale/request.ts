import { Formats } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'

import { routing } from './routing'

// request
export default getRequestConfig(async ({ locale }) => {
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    formats,
    messages: (await import(`../../../../translations/${locale}.json`)).default,
  }
})

export const formats = {
  dateTime: {
    short: {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    },
  },
  number: {
    precise: {
      maximumFractionDigits: 5,
    },
  },
  list: {
    enumeration: {
      style: 'long',
      type: 'conjunction',
    },
  },
} satisfies Formats
