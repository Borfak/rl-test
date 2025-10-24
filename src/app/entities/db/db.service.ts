import { NotesRepository, AuthRepository } from './repositories'

export const DbService = {
  notes: NotesRepository,
  auth: AuthRepository,
}
