import { notFound } from 'next/navigation'
import { hasLocale, Locale, NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { type FC, type ReactNode } from 'react'

import { MainLayoutModule } from '@/modules/layout'
import { routing } from '@/pkg/libraries/locale'
import RestApiProvider from '@/pkg/libraries/rest-api/rest-api.provider'
import '@/config/styles/globals.css'

// interface
interface IProps {
  children: ReactNode
  params: Promise<{ locale: Locale }>
}

// static params
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

// component
const LocaleLayout: FC<Readonly<IProps>> = async (props) => {
  const { children, params } = props
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = await getMessages({ locale })

  // return
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <RestApiProvider>
            <MainLayoutModule>{children}</MainLayoutModule>
          </RestApiProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default LocaleLayout
