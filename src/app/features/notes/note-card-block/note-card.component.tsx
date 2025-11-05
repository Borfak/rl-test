'use client'

import { FC, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from '@/app/shared/ui'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/app/shared/ui'
import { useDeleteNote } from '@/app/entities/api'
import { INote } from '@/app/entities/models'
import { NoteFormComponent } from '../note-form-block'
import { useTranslations } from 'next-intl'

// interface
interface IProps {
  note: INote
}

// component
const NoteCardComponent: FC<Readonly<IProps>> = (props) => {
  const { note } = props
  const t = useTranslations('notes')
  const deleteNote = useDeleteNote()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  // handle delete
  const handleDelete = () => {
    deleteNote.mutate(note.id, {
      onSuccess: () => {
        setIsDeleteOpen(false)
      },
    })
  }

  const handleUpdateSuccess = () => {
    setIsEditOpen(false)
  }

  // return
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
          <CardDescription>
            {new Date(note.updatedAt).toLocaleDateString()} {new Date(note.updatedAt).toLocaleTimeString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className='whitespace-pre-wrap'>{note.content}</p>
        </CardContent>
        <CardFooter className='flex gap-2'>
          <Button variant='outline' onClick={() => setIsEditOpen(true)}>
            {t('edit')}
          </Button>
          <Button variant='outline' onClick={() => setIsDeleteOpen(true)}>
            {t('delete')}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('editNote')}</DialogTitle>
          </DialogHeader>
          <NoteFormComponent note={note} onSuccess={handleUpdateSuccess} onCancel={() => setIsEditOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('deleteNote')}</DialogTitle>
            <DialogDescription>{t('deleteConfirmation')}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsDeleteOpen(false)} disabled={deleteNote.isPending}>
              {t('cancel')}
            </Button>
            <Button onClick={handleDelete} disabled={deleteNote.isPending}>
              {deleteNote.isPending ? t('deleting') : t('delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default NoteCardComponent
