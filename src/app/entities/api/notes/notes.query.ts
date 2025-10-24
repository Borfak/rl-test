import { queryOptions, useMutation, useQueryClient, type QueryFunctionContext } from '@tanstack/react-query'

import { NotesApi } from './notes.api'
import type { ICreateNoteInput, IUpdateNoteInput } from '@/app/entities/models'

// options
export const notesListOptions = () =>
  queryOptions({
    queryKey: ['notes', 'list'] as const,
    queryFn: (opt: QueryFunctionContext) => NotesApi.getAll(opt),
  })

export const noteByIdOptions = (id: string) =>
  queryOptions({
    queryKey: ['notes', 'detail', id] as const,
    queryFn: (opt: QueryFunctionContext) => NotesApi.getById(id, opt),
    enabled: !!id,
  })

// mutations
export const useCreateNote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ICreateNoteInput) => NotesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', 'list'] })
    },
  })
}

export const useUpdateNote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUpdateNoteInput }) => NotesApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['notes', 'list'] })
      queryClient.invalidateQueries({ queryKey: ['notes', 'detail', variables.id] })
    },
  })
}

export const useDeleteNote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => NotesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', 'list'] })
    },
  })
}
