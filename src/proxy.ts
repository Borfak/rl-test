import createMiddleware from 'next-intl/middleware'
import { routing } from './pkg/libraries/locale/routing'
import { NextRequest, NextResponse } from 'next/server'

const handleI18nRouting = createMiddleware(routing)

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow API routes to pass through
  if (pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/register']
  
  // Auth routes that should redirect to home if already logged in
  const authRoutes = ['/login', '/register']

  const isPublicRoute = publicRoutes.some((route) => {
    // Check if pathname ends with the route (to handle locale prefixes)
    return pathname === route || pathname.endsWith(route) || pathname.includes(`${route}/`)
  })

  const isAuthRoute = authRoutes.some((route) => pathname.includes(route))

  const sessionToken = request.cookies.get('better-auth.session_token')

  // If user is logged in and trying to access login/register, redirect to home
  if (isAuthRoute && sessionToken) {
    const locale = pathname.split('/')[1] || 'en'
    const homeUrl = new URL(`/${locale}`, request.url)
    return NextResponse.redirect(homeUrl)
  }

  // Protected routes (everything else that's not public)
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
