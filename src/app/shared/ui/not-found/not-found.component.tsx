'use client'

import { useTranslations } from 'next-intl'
import { AlertCircle, Home } from 'lucide-react'
import { cn } from '@/config/styles/utils'
import { Link } from '@/pkg/libraries/locale'

interface NotFoundProps {
  className?: string
}

export function NotFoundComponent({ className }: NotFoundProps) {
  const t = useTranslations('common')

  return (
    <div className={cn('flex flex-col items-center justify-center gap-6 text-center', className)}>
      <div className='flex items-center justify-center'>
        <AlertCircle className='text-muted-foreground h-24 w-24' />
      </div>

      <div className='space-y-2'>
        <h1 className='text-4xl font-bold tracking-tight'>{t('notFound.title')}</h1>
        <p className='text-muted-foreground text-xl'>{t('notFound.message')}</p>
        <p className='text-muted-foreground text-sm'>{t('notFound.description')}</p>
      </div>

      <Link
        href='/'
        className={cn(
          'bg-primary text-primary-foreground inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-medium',
          'ring-offset-background hover:bg-primary/90 transition-colors',
          'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
          'disabled:pointer-events-none disabled:opacity-50',
        )}
      >
        <Home className='h-4 w-4' />
        {t('notFound.backToHome')}
      </Link>
    </div>
  )
}
