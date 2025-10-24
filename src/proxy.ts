import createMiddleware from 'next-intl/middleware'
import { routing } from './pkg/libraries/locale/routing'
import { NextRequest } from 'next/server'

const handleI18nRouting = createMiddleware(routing)

export function proxy(request: NextRequest) {
  return handleI18nRouting(request)
}

export const config = {
  matcher: ['/', '/(en|uk-UA)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
}
