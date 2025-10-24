import { defineRouting } from 'next-intl/routing'

// routing
export const routing = defineRouting({
  locales: ['en', 'uk-UA'],
  localePrefix: 'as-needed',
  localeDetection: false,
  defaultLocale: 'en',
})
