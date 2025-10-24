'use client'

import { Button } from '@/app/shared/ui'
import { Link } from '@/pkg/libraries/locale'
import { useTranslations } from 'next-intl'
import { FC } from 'react'

// interface
interface IProps {}

// component
const LandingModule: FC<Readonly<IProps>> = (props) => {
  const t = useTranslations('home')

  // return
  return (
    <div className='container mx-auto px-4 py-16'>
      <div className='mx-auto max-w-2xl space-y-6 text-center'>
        <h1 className='text-4xl font-bold'>{t('welcome')}</h1>
        <p className='text-muted-foreground text-xl'>{t('description')}</p>
        <div className='flex justify-center gap-4'>
          <Link href='/register'>
            <Button size='lg'>{t('getStarted')}</Button>
          </Link>
          <Link href='/login'>
            <Button variant='outline' size='lg'>
              {t('signIn')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandingModule
