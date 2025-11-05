'use client'

import { notesListOptions } from '@/app/entities/api'
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/app/shared/ui'
import { Link } from '@/pkg/libraries/locale'
import { useQuery } from '@tanstack/react-query'
import { FileText, Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FC } from 'react'

// interface
interface IProps {}

// component
const HomeModule: FC<Readonly<IProps>> = (props) => {
  const t = useTranslations('home')
  const { data: notes } = useQuery(notesListOptions())

  const notesList = Array.isArray(notes) ? notes : []
  const notesCount = notesList.length

  // return
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-4xl font-bold'>{t('welcome')}</h1>
        <p className='text-muted-foreground mt-2 text-lg'>{t('dashboardDescription')}</p>
      </div>

      <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>{t('totalNotes')}</CardTitle>
            <FileText className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{notesCount}</div>
            <p className='text-muted-foreground text-xs'>{t('notesSubtitle')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>{t('quickAction')}</CardTitle>
            <Plus className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <Link href='/notes'>
              <Button className='w-full'>{t('viewNotes')}</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default HomeModule
