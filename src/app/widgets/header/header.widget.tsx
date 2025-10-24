'use client'

import { Button } from '@/app/shared/ui'
import { LogoutButtonComponent } from '@/app/features/auth'
import { useSession } from '@/app/shared/hooks'
import { useTranslations } from 'next-intl'
import { Link } from '@/pkg/libraries/locale'
import { FC } from 'react'

// interface
interface IProps {}

// component
const HeaderWidget: FC<Readonly<IProps>> = (props) => {
  const t = useTranslations('common')
  const { data: session } = useSession()

  // return
  return (
    <header className='border-b'>
      <div className='container mx-auto flex items-center justify-between px-4 py-4'>
        <div className='flex items-center gap-8'>
          <Link href='/' className='text-2xl font-bold'>
            {t('appName')}
          </Link>
        </div>
        <div className='flex items-center gap-4'>
          {session?.user ? (
            <>
              <span className='text-muted-foreground text-sm'>{session.user.name}</span>
              <LogoutButtonComponent />
            </>
          ) : (
            <Link href='/login'>
              <Button>{t('signIn')}</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default HeaderWidget
