'use client'

import { FC, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/shared/ui'
import { NoteCardComponent, NoteFormComponent } from '@/app/features/notes'
import { notesListOptions } from '@/app/entities/api'
import { useTranslations } from 'next-intl'

// interface
interface IProps {}

// component
const HomeModule: FC<Readonly<IProps>> = (props) => {
  const t = useTranslations('notes')
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const { data: notes, isPending, isError, error } = useQuery(notesListOptions())

  const handleCreateSuccess = () => {
    setIsCreateOpen(false)
  }

  // Show loading state
  if (isPending) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center'>{t('loading')}</div>
      </div>
    )
  }

  // Show error state
  if (isError || !notes) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center text-red-500'>{error?.message || t('error')}</div>
      </div>
    )
  }

  // Ensure notes is an array
  const notesList = Array.isArray(notes) ? notes : []

  // return
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8 flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>{t('myNotes')}</h1>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger>
            <Button>{t('createNote')}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('createNote')}</DialogTitle>
            </DialogHeader>
            <NoteFormComponent onSuccess={handleCreateSuccess} onCancel={() => setIsCreateOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {notesList.length === 0 ? (
        <div className='py-12 text-center'>
          <p className='text-muted-foreground mb-4'>{t('noNotes')}</p>
          <Button onClick={() => setIsCreateOpen(true)}>{t('createFirstNote')}</Button>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {notesList.map((note) => (
            <NoteCardComponent key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  )
}

export default HomeModule
