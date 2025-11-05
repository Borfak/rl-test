import type { ICreateNoteInput, INote, IUpdateNoteInput } from '@/app/entities/models'
import { localApiFetcher } from '@/pkg/libraries/rest-api/local-fetcher'
import type { QueryFunctionContext } from '@tanstack/react-query'

export const NotesApi = {
  async getAll(opt: QueryFunctionContext): Promise<INote[]> {
    return localApiFetcher
      .get<INote[]>('notes', {
        signal: opt.signal,
      })
      .json()
  },

  async getById(id: string, opt: QueryFunctionContext): Promise<INote> {
    return localApiFetcher
      .get<INote>(`notes/${id}`, {
        signal: opt.signal,
      })
      .json()
  },

  async create(data: ICreateNoteInput): Promise<INote> {
    return localApiFetcher.post('notes', { json: data }).json<INote>()
  },

  async update(id: string, data: IUpdateNoteInput): Promise<INote> {
    return localApiFetcher.put(`notes/${id}`, { json: data }).json<INote>()
  },

  async delete(id: string): Promise<void> {
    return localApiFetcher.delete(`notes/${id}`).json<void>()
  },
}
