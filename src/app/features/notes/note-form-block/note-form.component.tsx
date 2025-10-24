'use client'

import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Label, Textarea } from '@/app/shared/ui'
import { useCreateNote, useUpdateNote } from '@/app/entities/api'
import { INote } from '@/app/entities/models'
import { useTranslations } from 'next-intl'

// interface
interface IFormData {
  title: string
  content: string
}

// interface
interface IProps {
  note?: INote
  onSuccess?: () => void
  onCancel?: () => void
}

// component
const NoteFormComponent: FC<Readonly<IProps>> = (props) => {
  const { note, onSuccess, onCancel } = props
  const t = useTranslations('notes')
  const createNote = useCreateNote()
  const updateNote = useUpdateNote()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      title: note?.title || '',
      content: note?.content || '',
    },
  })
  const [error, setError] = useState<string | null>(null)

  const isLoading = createNote.isPending || updateNote.isPending

  const onSubmit = async (data: IFormData) => {
    setError(null)
    try {
      if (note) {
        await updateNote.mutateAsync({ id: note.id, data })
      } else {
        await createNote.mutateAsync(data)
      }
      onSuccess?.()
    } catch (err: any) {
      setError(err?.message || t('errorSaving'))
    }
  }

  // return
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      {error && <div className='bg-destructive/15 text-destructive rounded-md p-3 text-sm'>{error}</div>}

      <div className='space-y-2'>
        <Label htmlFor='title'>{t('title')}</Label>
        <Input
          id='title'
          type='text'
          placeholder={t('titlePlaceholder')}
          {...register('title', { required: t('titleRequired') })}
        />
        {errors.title && <p className='text-destructive text-sm'>{errors.title.message}</p>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='content'>{t('content')}</Label>
        <Textarea
          id='content'
          placeholder={t('contentPlaceholder')}
          rows={5}
          {...register('content', { required: t('contentRequired') })}
        />
        {errors.content && <p className='text-destructive text-sm'>{errors.content.message}</p>}
      </div>

      <div className='flex justify-end gap-2'>
        {onCancel && (
          <Button type='button' variant='outline' onClick={onCancel} disabled={isLoading}>
            {t('cancel')}
          </Button>
        )}
        <Button type='submit' disabled={isLoading}>
          {isLoading ? t('saving') : note ? t('update') : t('create')}
        </Button>
      </div>
    </form>
  )
}

export default NoteFormComponent