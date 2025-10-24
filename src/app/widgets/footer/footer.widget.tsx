'use client'

import { FC, useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

// interface
interface IProps {}

// component
const FooterWidget: FC<Readonly<IProps>> = (props) => {
  const t = useTranslations('common')
  const [currentYear, setCurrentYear] = useState<number | null>(null)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  return (
    <footer className='mt-auto border-t'>
      <div className='container mx-auto px-4 py-6'>
        <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
          <div className='text-muted-foreground text-sm'>
            © {currentYear || '...'} {t('appName')}. {t('allRightsReserved')}
          </div>
          <div className='flex gap-6 text-sm'>
            <a href='#' className='hover:underline'>
              {t('privacy')}
            </a>
            <a href='#' className='hover:underline'>
              {t('terms')}
            </a>
            <a href='#' className='hover:underline'>
              {t('contact')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterWidget
