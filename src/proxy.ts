import createMiddleware from 'next-intl/middleware'
import { routing } from './pkg/libraries/locale/routing'
import { NextRequest, NextResponse } from 'next/server'

const handleI18nRouting = createMiddleware(routing)

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  const publicRoutes = ['/', '/login', '/register']
  
  const authRoutes = ['/login', '/register']

  const localePattern = /^\/(en|uk-UA)/
  const pathWithoutLocale = pathname.replace(localePattern, '') || '/'

  const isPublicRoute = publicRoutes.some((route) => {
    return pathWithoutLocale === route || pathWithoutLocale.startsWith(`${route}/`)
  })

  const isAuthRoute = authRoutes.some((route) => 
    pathWithoutLocale === route || pathWithoutLocale.startsWith(`${route}/`)
  )

  const sessionToken = request.cookies.get('better-auth.session_token')

  if (isAuthRoute && sessionToken) {
    const locale = pathname.split('/')[1] || 'en'
    const homeUrl = new URL(`/${locale}`, request.url)
    return NextResponse.redirect(homeUrl)
  }

  if (!isPublicRoute && !sessionToken) {
    const locale = pathname.split('/')[1] || 'en'
    const loginUrl = new URL(`/${locale}/login`, request.url)
    return NextResponse.redirect(loginUrl)
  }

  return handleI18nRouting(request)
}

export const config = {
  matcher: ['/', '/(en|uk-UA)/:path*', '/((?!_next|_vercel|api|.*\\..*).*)'],
}
